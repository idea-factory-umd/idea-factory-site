/* ============================================================
   Idea Factory — custom motion for Webflow  (vanilla JS, no deps)
   ------------------------------------------------------------
   Host this file (GitHub + jsDelivr) and load it in Webflow
   site/page custom code, BEFORE </body>:
     <script defer src="https://cdn.jsdelivr.net/gh/<user>/<repo>@<ver>/idea-factory.js"></script>

   Every effect selects elements by CLASS (assigned in the Designer).
   No image URL or one-off ID is hardcoded, so swapping content in
   Webflow keeps the behavior. Safe to run on pages missing some
   sections — each init no-ops if its elements aren't found.
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function ready(fn){ if(document.readyState!=="loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }

  /* ---- 1. HERO reading highlight ----------------------------------------
     Markup: <h1 class="if-hero-h1"> <span class="if-hero-word">…</span> … </h1>
     On first hover the spotlight sweeps word-by-word, then all rise to full. */
  function initHeroReading(){
    var h1 = document.querySelector(".if-hero-h1");
    if(!h1) return;
    var words = h1.querySelectorAll(".if-hero-word");
    if(!words.length) return;
    var DIM = 0.62;
    function setAll(o){ words.forEach(function(w){ w.style.opacity = o; }); }
    if(reduce){ setAll(1); return; }
    setAll(1); // load at full power
    var started = false;
    function sweep(){
      if(started) return; started = true;
      var D = 180, gap = 40, ideasExtra = 230; // ideas(index 1) lingers
      var seq = [], i;
      for(i=0;i<words.length;i++){ seq.push({k:i, hold:D + (i===1?ideasExtra:0)}); if(i<words.length-1) seq.push({k:-1, hold:gap}); }
      seq.push({k:999, hold:0});
      var s = 0;
      function step(){
        var cur = seq[s];
        words.forEach(function(w,idx){ w.style.opacity = (cur.k===999) ? 1 : (cur.k===idx ? 1 : DIM); });
        if(cur.k===999) h1.classList.add("is-settling");
        s++;
        if(s<seq.length) setTimeout(step, cur.hold);
      }
      setTimeout(step, 140); // small delay after first hover
    }
    h1.closest("section").addEventListener("mouseenter", sweep);
    h1.closest("section").addEventListener("touchstart", sweep, {passive:true});
  }

  /* ---- 2. MANIFESTO sentence lift ---------------------------------------
     Markup: <h2 class="if-manifesto"><span class="if-manifesto-line">…</span> …</h2>
     Plays once when scrolled into the lower-middle of the viewport. */
  function initManifesto(){
    var h2 = document.querySelector(".if-manifesto");
    if(!h2) return;
    var lines = h2.querySelectorAll(".if-manifesto-line");
    if(!lines.length || reduce) return;
    var played = false;
    function run(){
      var HOLD = 1700, GAP = 620, seq = [], i;
      for(i=0;i<lines.length;i++){ seq.push({k:i, hold:HOLD}); if(i<lines.length-1) seq.push({k:-1, hold:GAP}); }
      seq.push({k:999, hold:0});
      var s = 0;
      function step(){
        var cur = seq[s];
        if(cur.k===999){ h2.classList.remove("is-dimming"); lines.forEach(function(l){ l.classList.remove("is-lift"); }); }
        else { h2.classList.add("is-dimming"); lines.forEach(function(l,idx){ l.classList.toggle("is-lift", idx===cur.k); }); }
        s++;
        if(s<seq.length) setTimeout(step, cur.hold);
      }
      step();
    }
    function check(){
      if(played) return;
      var r = h2.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
      if(r.top>=0 && r.bottom<=vh && r.top<=vh*0.55){ played = true; window.removeEventListener("scroll", check); run(); }
    }
    window.addEventListener("scroll", check, {passive:true}); window.addEventListener("resize", check); check();
  }

  /* ---- 3. PROOF count-up ------------------------------------------------
     Markup: <div class="if-countup">$94.8B</div>  (final value as text)
     Rolls 0 → value when scrolled into view, fading in WHILE counting,
     accelerating into the final number. Preserves prefix/suffix/commas. */
  function initCountUp(){
    var els = document.querySelectorAll(".if-countup");
    if(!els.length) return;
    els.forEach(function(el){
      var value = el.getAttribute("data-value") || el.textContent.trim();
      var m = value.match(/^([^\d]*)([\d.,]+)(.*)$/) || [null,"","0",""];
      var numStr = m[2], hasComma = numStr.indexOf(",")>=0, plain = numStr.replace(/,/g,"");
      var dot = plain.indexOf("."), decimals = dot>=0 ? plain.length-dot-1 : 0;
      var prefix = m[1]||"", suffix = m[3]||"", target = parseFloat(plain)||0;
      function fmt(n){ var s = n.toFixed(decimals); if(hasComma){ var p = s.split("."); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g,","); s = p.join("."); } return prefix+s+suffix; }
      if(reduce){ el.textContent = value; el.style.opacity = 1; return; }
      el.style.opacity = 0; el.textContent = fmt(0);
      var started = false, raf;
      function run(){
        var dur = 1600, fade = 480, t0 = performance.now();
        function tick(now){ var dt = now-t0, p = Math.min(1, dt/dur), e = p*p*p; // easeInCubic
          el.textContent = p<1 ? fmt(target*e) : value; el.style.opacity = Math.min(1, dt/fade).toFixed(3);
          if(p<1) raf = requestAnimationFrame(tick); else el.style.opacity = 1; }
        raf = requestAnimationFrame(tick);
      }
      function check(){ if(started) return; var r = el.getBoundingClientRect(), vh = window.innerHeight||document.documentElement.clientHeight;
        if(r.top<vh*0.85 && r.bottom>0){ started = true; window.removeEventListener("scroll", check); run(); } }
      window.addEventListener("scroll", check, {passive:true}); window.addEventListener("resize", check); check();
    });
  }

  /* ---- 4. STAGE headline parallax + photo zoom --------------------------
     Markup: <section class="if-stage-moment">
               <img class="if-stage-photo"> <div class="if-stage-text">…</div>
             </section>
     Headline drifts down & settles (locks once); photo zooms on scroll-down,
     holds, re-arms when scrolled fully back out of view. */
  function initStage(){
    var sec = document.querySelector(".if-stage-moment");
    if(!sec || reduce) return;
    var txt = sec.querySelector(".if-stage-text");
    var img = sec.querySelector(".if-stage-photo");
    var smooth = function(x){ return x*x*x*(x*(x*6-15)+10); };
    var locked = false, txtRaf;
    function txtFrame(){
      txtRaf = null; if(locked || !txt) return;
      var rect = sec.getBoundingClientRect(), vh = window.innerHeight||document.documentElement.clientHeight;
      var amp = 180, startTop = vh*0.88, endTop = vh*0.16;
      var p = Math.max(0, Math.min(1, (startTop-rect.top)/(startTop-endTop)));
      var over = 12, tt = 0.72, shift;
      if(p<tt) shift = -amp + (amp+over)*smooth(p/tt); else shift = over*(1-smooth((p-tt)/(1-tt)));
      txt.style.transform = "translateY("+shift.toFixed(1)+"px)"; txt.style.opacity = (p*p).toFixed(3);
      if(p>=1){ locked = true; txt.style.transform = "translateY(0px)"; txt.style.opacity = "1"; }
    }
    if(txt){ var onScroll = function(){ if(txtRaf==null) txtRaf = requestAnimationFrame(txtFrame); }; txtFrame();
      window.addEventListener("scroll", onScroll, {passive:true}); window.addEventListener("resize", onScroll); }
    if(img){
      var MIN=1.0, MAX=1.16, cur=null, peak=0;
      (function zoomFrame(){
        var rect = sec.getBoundingClientRect(), vh = window.innerHeight||document.documentElement.clientHeight;
        var p = Math.max(0, Math.min(1, (vh*0.88 - rect.top)/(vh*0.88 - vh*0.16)));
        if(rect.top>=vh){ peak=0; cur=MIN; } else if(p>peak) peak=p;
        if(cur==null) cur=MIN;
        var eased = 1-Math.pow(1-peak,3), tgt = MIN+(MAX-MIN)*eased;
        cur += (tgt-cur)*0.1; if(Math.abs(tgt-cur)<0.0002) cur=tgt;
        img.style.transform = "translateZ(0) scale("+cur.toFixed(4)+")";
        requestAnimationFrame(zoomFrame);
      })();
    }
  }

  /* ---- 5. NAVBAR retract at footer --------------------------------------
     Markup: <nav class="if-navbar"> … </nav> and a footer that contains
     <div class="if-foot-cols"> (the nav-link columns). Navbar slides up once
     those columns are in view; re-emerges on scroll up. */
  function initNavbarRetract(){
    var nav = document.querySelector(".if-navbar");
    var target = document.querySelector(".if-foot-cols");
    if(!nav || !target) return;
    nav.style.transition = "max-height 340ms " + getComputedStyle(document.documentElement).getPropertyValue("--if-ease-glide");
    function check(){ var vh = window.innerHeight||document.documentElement.clientHeight;
      var hide = target.getBoundingClientRect().top < vh - 160;
      nav.style.maxHeight = hide ? "0px" : (nav.scrollHeight + "px");
      nav.style.overflow = "hidden";
    }
    window.addEventListener("scroll", check, {passive:true}); window.addEventListener("resize", check); check();
  }

  /* ---- 6. HERO font-load gate (no fallback-font flash) ------------------
     Add class `font-pending` to .if-hero-h1 in the Designer; this removes it
     once the heading font is actually painted. */
  function initFontGate(){
    var h1 = document.querySelector(".if-hero-h1.font-pending");
    if(!h1){ return; }
    function reveal(){ h1.classList.remove("font-pending"); }
    if(!(document.fonts && document.fonts.load)){ reveal(); return; }
    document.fonts.load('800 1em "Interstate"').then(function(){ requestAnimationFrame(function(){ requestAnimationFrame(reveal); }); }).catch(reveal);
    setTimeout(reveal, 3000); // safety
  }

  ready(function(){
    initFontGate();
    initHeroReading();
    initManifesto();
    initCountUp();
    initStage();
    initNavbarRetract();
  });
})();
