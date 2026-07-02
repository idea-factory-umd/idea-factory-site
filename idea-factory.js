/*! ============================================================================
 * Idea Factory — SHARED SITE BEHAVIOR  (v1.2.0)
 * DO NOT EDIT IN WEBFLOW. Source of truth = GitHub repo idea-factory-umd/idea-factory-site.
 * Loaded site-wide via jsDelivr <script> in Project Settings > Custom Code (Footer).
 * Each module is try/catch-isolated and binds by class.
 * Modules: base (count-up + v1 features), nav, main bundle, CSE placement, back-to-top.
 * ========================================================================== */

/* ===== module: base-v1 (count-up, logo, etc.) ===== */
try {
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

  /* ---- 5. HEADER GOLD BAR top measurement ------------------------------
     Markup: <div class="if-id-band"> … <div class="if-header-gold-bar"></div> </div>
     The bar's top edge aligns to mid-logo height; CSS handles left/right/bottom.
     Assign .if-id-band to the identity-band wrapper and .if-header-gold-bar to
     the absolute-positioned gold div inside it. The logo must be .if-logo-link
     or contain a > img/svg that can be measured. */
  function initHeaderGoldBar(){
    var band = document.querySelector(".if-id-band");
    var bar  = document.querySelector(".if-header-gold-bar");
    if(!band || !bar) return;
    function measure(){
      var logo = band.querySelector(".if-logo-link");
      if(!logo) return;
      var top = Math.round(logo.getBoundingClientRect().top - band.getBoundingClientRect().top);
      if(top > 0) bar.style.top = Math.round(top / 2) + "px";
    }
    measure();
    requestAnimationFrame(measure);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if(typeof ResizeObserver !== "undefined"){
      var ro = new ResizeObserver(measure);
      ro.observe(band);
      var logo = band.querySelector(".if-logo-link");
      if(logo) ro.observe(logo);
    } else { window.addEventListener("resize", measure); }
  }

  /* ---- 6. FOOTER GOLD BAR height measurement ----------------------------
     Markup: <footer> … <a class="if-give">…</a> … <div class="if-foot-cols">…</div>
               <div class="if-footer-gold-bar"></div> </footer>
     Bar runs from footer top to the lower of: Give-button baseline or foot-cols
     bottom. Assign .if-give to the Give CTA <a> and .if-foot-cols to the nav
     column grid. The bar element (.if-footer-gold-bar) must be inside <footer>. */
  function initFooterGoldBar(){
    var footer = document.querySelector("footer");
    var bar    = document.querySelector(".if-footer-gold-bar");
    var give   = document.querySelector(".if-give");
    var cols   = document.querySelector(".if-foot-cols");
    if(!footer || !bar || !give) return;
    function measure(){
      var fb   = footer.getBoundingClientRect();
      var gb   = give.getBoundingClientRect();
      var bottom = cols ? Math.max(gb.bottom, cols.getBoundingClientRect().bottom) : gb.bottom;
      var h = Math.round(bottom - fb.top);
      if(h > 0) bar.style.height = h + "px";
    }
    measure();
    requestAnimationFrame(measure);
    if(document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if(typeof ResizeObserver !== "undefined"){
      var ro = new ResizeObserver(measure);
      ro.observe(footer); ro.observe(give);
      if(cols) ro.observe(cols);
    } else { window.addEventListener("resize", measure); }
  }

  /* ---- 7. NAVBAR retract at footer --------------------------------------
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

  /* ---- 8. HERO font-load gate (no fallback-font flash) ------------------
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
    initHeaderGoldBar();
    initFooterGoldBar();
    initNavbarRetract();
  });
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] base-v1 (count-up, logo, etc.) error:', _e); } catch (_) {} }

/* ===== module: nav ===== */
try {
(function(){
  function go(){
    var menu=document.querySelector('.if-navmenu'); if(!menu) return;
    menu.querySelectorAll('.if-nav-link, .if-nav-sublink, .w-dropdown-toggle, .if-give-btn-solid').forEach(function(el){
      if(el.__ifm) return; el.__ifm=1;
      var d=el.querySelector(':scope > div');
      if(d && d.textContent.trim() && !d.children.length){ d.classList.add('if-mtext'); }
      else if(!d){ var t=(el.textContent||'').trim(); if(t){ el.textContent=''; var s=document.createElement('span'); s.className='if-mtext'; s.textContent=t; el.appendChild(s); } }
    });
  }
  if(document.readyState!=='loading') go(); else document.addEventListener('DOMContentLoaded', go);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] nav error:', _e); } catch (_) {} }

/* ===== module: main-bundle ===== */
try {
(function(){function init(){var ws=document.querySelectorAll('.if-dd-wrap');ws.forEach(function(w){var t=w.querySelector('.w-dropdown-toggle');if(!t||t.__ifb)return;t.__ifb=1;t.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();ws.forEach(function(o){if(o!==w)o.classList.remove('if-open');});w.classList.toggle('if-open');});});document.addEventListener('click',function(e){ws.forEach(function(w){if(!w.contains(e.target))w.classList.remove('if-open');});});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){function hero(){var h1=document.querySelector('.if-hero-h1');if(!h1||h1.__ifhero)return;var words=h1.querySelectorAll(':scope > span');if(!words.length)return;h1.__ifhero=1;words.forEach(function(w){w.classList.add('if-hero-word');});var sec=h1.closest('section')||h1.parentElement;var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);var started=reduce;if(reduce){words.forEach(function(w){if(w.classList.contains('if-hero-word-red'))w.classList.add('if-lit-red');});}function setStep(step){words.forEach(function(w,idx){w.style.opacity=(step===999)?1:(step===idx?1:(w.classList.contains('if-lit-red')?1:0.62));if((step===idx||step===999)&&w.classList.contains('if-hero-word-red'))w.classList.add('if-lit-red');});}function start(){if(started)return;started=true;var D=180,gap=40,ideasExtra=520,lastExtra=640,ideasPause=110,workPause=150;var seq=[];words.forEach(function(x,w){seq.push({step:w,hold:D+(x.classList.contains('if-hero-word-delay')?ideasExtra:0)+(w===words.length-1?lastExtra:0)});if(w<words.length-1)seq.push({step:-1,hold:gap+(x.classList.contains('if-hero-word-delay')?ideasPause:0)});});seq.push({step:-1,hold:workPause});seq.push({step:999,hold:0});var k=0;function run(){var s=seq[k];if(s.step===999)h1.classList.add('hero-settling');setStep(s.step);k++;if(k<seq.length)setTimeout(run,s.hold);}setTimeout(run,140);}sec.addEventListener('mouseenter',start);sec.addEventListener('touchstart',start,{passive:true});}if(document.readyState!=='loading')hero();else document.addEventListener('DOMContentLoaded',hero);})();(function(){var reduced=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);function ease(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}var rafId=null;function animate(toY){if(rafId)cancelAnimationFrame(rafId);var startY=window.pageYOffset,dist=toY-startY;if(Math.abs(dist)<2){window.scrollTo(0,toY);return;}var dur=Math.min(820,Math.max(430,Math.abs(dist)*0.28)),t0=null;function step(ts){if(t0==null)t0=ts;var p=Math.min(1,(ts-t0)/dur);window.scrollTo(0,Math.round(startY+dist*ease(p)));if(p<1){rafId=requestAnimationFrame(step);}else{rafId=null;}}rafId=requestAnimationFrame(step);}function dest(a){var href=a.getAttribute('href');if(!href||href.charAt(0)!=='#'||href.length<2)return null;var tgt=document.getElementById(href.slice(1));if(!tgt)return null;var sel=a.getAttribute('data-scroll-target');if(!sel&&href==='#audience')sel='.if-eyebrow';var m=sel?(tgt.querySelector(sel)||document.querySelector(sel)||tgt):tgt;var g=parseInt(a.getAttribute('data-scroll-gap'),10);if(isNaN(g))g=(href==='#audience')?50:24;var hdr=document.querySelector('.if-header')||document.querySelector('header');var h=hdr?hdr.offsetHeight:0;return Math.max(0,m.getBoundingClientRect().top+window.pageYOffset-h-g);}document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a.if-smooth-scroll,a[data-smooth-scroll],a[href="#audience"]');if(!a)return;var toY=dest(a);if(toY===null)return;e.preventDefault();e.stopImmediatePropagation();if(reduced){window.scrollTo(0,toY);}else{animate(toY);}},true);})();(function(){function init(){var bar=document.querySelector('.if-hero-goldbar');if(!bar)return;var MIN=30,MAX=90,ticking=false;function apply(){ticking=false;var r=bar.getBoundingClientRect();var vh=window.innerHeight||document.documentElement.clientHeight;var p=(vh-r.top)/(vh+r.height);if(p<0)p=0;if(p>1)p=1;bar.style.width=(MIN+(MAX-MIN)*p)+'%';}function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(apply);}}apply();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){function init(){var bar=document.querySelector('.if-foot-accent');if(!bar)return;var MAXFRAC=0.60,ticking=false;function apply(){ticking=false;var w=bar.offsetWidth||bar.getBoundingClientRect().width;var rect=bar.getBoundingClientRect();var vh=window.innerHeight||document.documentElement.clientHeight;var scrollMax=Math.max(1,(document.documentElement.scrollHeight||document.body.scrollHeight||0)-vh);var scrolled=window.pageYOffset||document.documentElement.scrollTop||0;var otop=rect.top+scrolled;var finalTop=otop-scrollMax;var denom=vh-finalTop;var p=denom>0?(vh-rect.top)/denom:1;if(p<0)p=0;if(p>1)p=1;bar.style.backgroundPosition=(p*MAXFRAC*w)+'px 0px';}function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(apply);}}apply();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);function initManifesto(){var h2=document.querySelector('.if-manifesto');if(!h2||h2.__ifmani)return;var lines=h2.querySelectorAll(':scope > span');if(!lines.length)return;h2.__ifmani=1;lines.forEach(function(l){l.classList.add('if-manifesto-line');});if(reduce){lines.forEach(function(l){var r=l.querySelector('.if-mani-red');if(r)r.classList.add('if-lit-red');});return;}var played=false;function run(){var HOLD=1130,GAP=410,seq=[],i;for(i=0;i<lines.length;i++){seq.push({k:i,hold:HOLD});if(i<lines.length-1)seq.push({k:-1,hold:GAP});}seq.push({k:999,hold:0});var s=0;function step(){var cur=seq[s];if(cur.k===999){h2.classList.remove('is-dimming');lines.forEach(function(l){l.classList.remove('is-lift');});}else{h2.classList.add('is-dimming');lines.forEach(function(l,idx){var on=idx===cur.k;l.classList.toggle('is-lift',on);if(on){var r=l.querySelector('.if-mani-red');if(r)r.classList.add('if-lit-red');}});}s++;if(s<seq.length)setTimeout(step,cur.hold);}step();}function check(){if(played)return;var r=h2.getBoundingClientRect(),vh=window.innerHeight||document.documentElement.clientHeight;if(r.top>=0&&r.bottom<=vh&&r.top<=vh*0.55){played=true;window.removeEventListener('scroll',check);run();}}window.addEventListener('scroll',check,{passive:true});window.addEventListener('resize',check);check();}if(document.readyState!=='loading')initManifesto();else document.addEventListener('DOMContentLoaded',initManifesto);})();(function(){var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);function initStage(){var sec=document.querySelector('.if-sm-box');if(!sec||sec.__ifsm)return;sec.__ifsm=1;if(reduce)return;var txt=sec.querySelector('.if-stage-text');var imgs=sec.querySelectorAll('.if-stage-photo-pos');var smooth=function(x){return x*x*x*(x*(x*6-15)+10);};var locked=false,txtRaf;function txtFrame(){txtRaf=null;if(locked||!txt)return;var rect=sec.getBoundingClientRect(),vh=window.innerHeight||document.documentElement.clientHeight;var amp=250,startTop=vh*0.88,endTop=vh*0.16;var p=Math.max(0,Math.min(1,(startTop-rect.top)/(startTop-endTop)));var over=72,tt=0.65,shift;if(p<tt)shift=-amp+(amp+over)*smooth(p/tt);else shift=over*(1-smooth((p-tt)/(1-tt)));var sc=1+0.06*smooth(p);txt.style.transform='translateY('+shift.toFixed(1)+'px) scale('+sc.toFixed(4)+')';txt.style.opacity=(p*p).toFixed(3);if(p>=1){locked=true;txt.style.transform='translateY(0px) scale(1.06)';txt.style.opacity='1';}}if(txt){var onScroll=function(){if(txtRaf==null)txtRaf=requestAnimationFrame(txtFrame);};txtFrame();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);}if(imgs&&imgs.length){var MIN=1.0,MAX=1.16,cur=null,peak=0;(function zoomFrame(){var rect=sec.getBoundingClientRect(),vh=window.innerHeight||document.documentElement.clientHeight;var p=Math.max(0,Math.min(1,(vh*0.88-rect.top)/(vh*0.88-vh*0.16)));if(rect.top>=vh){peak=0;cur=MIN;}else if(p>peak)peak=p;if(cur==null)cur=MIN;var eased=1-Math.pow(1-peak,3),tgt=MIN+(MAX-MIN)*eased;cur+=(tgt-cur)*0.1;if(Math.abs(tgt-cur)<0.0002)cur=tgt;var tf='translateZ(0) scale('+cur.toFixed(4)+')';for(var i=0;i<imgs.length;i++){imgs[i].style.transform=tf;}requestAnimationFrame(zoomFrame);})();}}if(document.readyState!=='loading')initStage();else document.addEventListener('DOMContentLoaded',initStage);})();(function(){function init(){var els=document.querySelectorAll('.if-hover-grow');els.forEach(function(el){if(el.__ifg)return;el.__ifg=1;if(el.querySelector(':scope > .if-hover-grow-t'))return;var s=document.createElement('span');s.className='if-hover-grow-t';while(el.firstChild){s.appendChild(el.firstChild);}el.appendChild(s);});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){var CX='164d3383cc05e4249';var loaded=false,ready=false,rendered=false,pending=null;var overlay,headEl,loadEl;function buildOverlay(){if(overlay)return;overlay=document.createElement('div');overlay.className='if-cse-overlay';overlay.innerHTML='<div class="if-cse-modal"><button class="if-cse-close" type="button" aria-label="Close search">×</button><div class="if-cse-head"></div><div class="if-cse-loading">Searching…</div><div id="if-cse-results"></div></div>';document.body.appendChild(overlay);headEl=overlay.querySelector('.if-cse-head');loadEl=overlay.querySelector('.if-cse-loading');overlay.addEventListener('mousedown',function(e){if(e.target===overlay)closeOverlay();});overlay.querySelector('.if-cse-close').addEventListener('click',closeOverlay);}function openOverlay(q){buildOverlay();headEl.textContent='Results for “'+q+'”';loadEl.style.display='block';overlay.classList.add('if-open');document.documentElement.style.overflow='hidden';}function closeOverlay(){if(overlay){overlay.classList.remove('if-open');document.documentElement.style.overflow='';}}document.addEventListener('keydown',function(e){if((e.key==='Escape'||e.keyCode===27)&&overlay&&overlay.classList.contains('if-open'))closeOverlay();});function onReady(){ready=true;render();if(pending){exec(pending);pending=null;}}function render(){if(rendered)return;if(!(window.google&&google.search&&google.search.cse&&google.search.cse.element))return;google.search.cse.element.render({div:'if-cse-results',tag:'searchresults-only',gname:'ifcse'});rendered=true;}function exec(q){render();var el=window.google&&google.search&&google.search.cse&&google.search.cse.element.getElement('ifcse');if(el){el.execute(q);if(loadEl)loadEl.style.display='none';}else{pending=q;}}function ensureCse(){if(loaded)return;loaded=true;window.__gcse={parsetags:'explicit',callback:onReady};var s=document.createElement('script');s.async=true;s.src='https://cse.google.com/cse.js?cx='+CX;document.head.appendChild(s);}function doSearch(q){q=(q||'').trim();if(!q)return;openOverlay(q);if(ready){exec(q);}else{pending=q;ensureCse();}}function wireBox(box){if(!box||box.__ifsearch)return;box.__ifsearch=1;var input;if(box.tagName==='INPUT'){input=box;}else{var ph=box.querySelector('.if-search-ph');input=document.createElement('input');input.type='search';input.className='if-search-realinput';input.setAttribute('placeholder',ph&&ph.textContent.trim()?ph.textContent.trim():'Search');if(ph)ph.style.display='none';box.appendChild(input);box.addEventListener('click',function(){input.focus();});}input.addEventListener('keydown',function(e){if(e.key==='Enter'||e.keyCode===13){e.preventDefault();doSearch(input.value);}});}function init(){var b=document.querySelectorAll('.if-search-input, .if-msearch');for(var i=0;i<b.length;i++)wireBox(b[i]);}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);function initCta(){var head=document.querySelector('.if-foot-cta-head');if(!head||head.__ifcta)return;var phrases=head.querySelectorAll(':scope > span');if(!phrases.length)return;head.__ifcta=1;var words=[],line1=0;phrases.forEach(function(ph,pi){var gold=ph.classList.contains('if-foot-cta-gold');var parts=ph.textContent.split(/(\s+)/);ph.textContent='';parts.forEach(function(tok){if(tok==='')return;if(/^\s+$/.test(tok)){ph.appendChild(document.createTextNode(tok));}else{var w=document.createElement('span');w.className=gold?'if-foot-cta-word if-foot-cta-gold':'if-foot-cta-word';w.textContent=tok;ph.appendChild(w);words.push(w);}});if(pi===0)line1=words.length;});if(!words.length)return;if(reduce){words.forEach(function(w){if(w.classList.contains('if-foot-cta-gold'))w.classList.add('if-lit-gold');});return;}var played=false,N=words.length,lineEnd=line1-1,last=N-1;function setStep(step){for(var i=0;i<N;i++){var w=words[i];w.style.opacity=(step===999)?1:(step===i?1:(w.classList.contains('if-lit-gold')?1:0.62));if((step===i||step===999)&&w.classList.contains('if-foot-cta-gold'))w.classList.add('if-lit-gold');}}function run(){var D=180,gap=40,ideasExtra=520,lastExtra=640,ideasPause=110,workPause=150;var seq=[];for(var w=0;w<N;w++){seq.push({step:w,hold:D+(w===lineEnd?ideasExtra:0)+(w===last?lastExtra:0)});if(w<last)seq.push({step:-1,hold:gap+(w===lineEnd?ideasPause:0)});}seq.push({step:-1,hold:workPause});seq.push({step:999,hold:0});var k=0;function tick(){var s=seq[k];if(s.step===999)head.classList.add('cta-settling');setStep(s.step);k++;if(k<seq.length)setTimeout(tick,s.hold);}tick();}var trig=head.closest('.if-footer')||head.closest('footer')||head;function onEnter(){if(played)return;played=true;trig.removeEventListener('mouseenter',onEnter);run();}trig.addEventListener('mouseenter',onEnter);}if(document.readyState!=='loading')initCta();else document.addEventListener('DOMContentLoaded',initCta);})();(function(){function init(){var menu=document.querySelector('.if-navmenu'),footer=document.querySelector('.if-footer');if(!menu||!footer||menu.__ifTuck)return;menu.__ifTuck=1;var io=new IntersectionObserver(function(es){es.forEach(function(e){menu.classList.toggle('if-nav-tucked',e.isIntersecting);});});io.observe(footer);}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] main-bundle error:', _e); } catch (_) {} }

/* ===== module: cse-placement ===== */
try {
(function(){var P='Results for',R='Search results for',raf=0;function place(){var w=document.querySelector('.gsc-results-wrapper-overlay'),b=document.getElementById('if-cse-results');if(w&&b&&!b.contains(w)){b.appendChild(w);}}function head(){var h=document.querySelector('.if-cse-head');if(h&&h.textContent.lastIndexOf(P,0)===0){h.textContent=R+h.textContent.slice(P.length);}}function measure(){var m=document.querySelector('.if-cse-modal');if(!m||!m.offsetParent)return;var res=m.querySelectorAll('.gsc-webResult.gsc-result');if(!res.length){m.style.removeProperty('--gold-bottom');return;}var last=res[res.length-1];var bottom=m.clientHeight-(last.getBoundingClientRect().bottom-m.getBoundingClientRect().top);if(bottom<0)bottom=0;m.style.setProperty('--gold-bottom',bottom+'px');}function unlock(){['documentElement','body'].forEach(function(k){var el=document[k];if(!el)return;el.style.overflow='';[].slice.call(el.classList).forEach(function(c){if(/overflow/i.test(c))el.classList.remove(c);});});}function watchOverlay(){var ov=document.querySelector('.if-cse-overlay');if(ov&&!ov.__ifunlock){ov.__ifunlock=1;new MutationObserver(function(){if(!ov.classList.contains('if-open'))unlock();}).observe(ov,{attributes:true,attributeFilter:['class']});}}function fixSearch(){var boxes=document.querySelectorAll('.if-search-input, .if-msearch');for(var i=0;i<boxes.length;i++){var box=boxes[i];if(box.__ifsfix)continue;var input=box.querySelector('.if-search-realinput');if(!input)continue;box.__ifsfix=1;var stray='';for(var n=box.firstChild;n;){var nx=n.nextSibling;if(n.nodeType===3&&n.textContent.trim()){stray=n.textContent.trim();box.removeChild(n);}n=nx;}if(stray)input.setAttribute('placeholder',stray);if(box.classList.contains('if-msearch'))input.style.width='100%';input.addEventListener('keydown',function(e){if(e.key==='Enter'||e.keyCode===13){var t=this;setTimeout(function(){t.value='';},0);}});if(getComputedStyle(box).position==='static')box.style.position='relative';var btn=document.createElement('button');btn.type='button';btn.className='if-search-go';btn.setAttribute('aria-label','Search');btn.style.cssText='position:absolute;top:0;right:0;bottom:0;width:40px;margin:0;padding:0;border:0;background:transparent;cursor:pointer;z-index:2;';btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var inp=this.parentNode.querySelector('.if-search-realinput');if(inp)inp.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));});box.appendChild(btn);}}function scan(){place();head();watchOverlay();fixSearch();if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(measure);}if(document.readyState!=='loading')scan();else document.addEventListener('DOMContentLoaded',scan);new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true,characterData:true});window.addEventListener('resize',scan);})();(function(){var GIVE='https://giving.umd.edu/giving/fund.php?name=maryland-technology-enterprise-institute-mtech-gift-fund';var UMD='https://www.umd.edu/',ENG='https://eng.umd.edu/';var SOC={x:'https://x.com/mtechumd','in':'https://www.linkedin.com/company/10550318/',f:'https://www.facebook.com/mtechumd'};function ext(a,href){if(!a||!href)return;var c=a.getAttribute('href');if(c&&c!=='#')return;a.setAttribute('href',href);a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer');}function links(){ext(document.querySelector('.if-umdbar-a1'),UMD);ext(document.querySelector('.if-umdbar-a2'),ENG);var g=document.querySelectorAll('.if-give-btn-solid,.if-give-btn,.if-give-mobile');for(var i=0;i<g.length;i++)ext(g[i],GIVE);var s=document.querySelectorAll('.if-social-box');for(var j=0;j<s.length;j++){var t=(s[j].textContent||'').trim().toLowerCase();if(SOC[t])ext(s[j],SOC[t]);}var wm=document.querySelector('.if-umd-wordmark');if(wm&&!wm.__iflinked&&wm.parentNode&&wm.parentNode.tagName!=='A'){wm.__iflinked=1;var a=document.createElement('a');a.href=UMD;a.target='_blank';a.rel='noopener noreferrer';a.className='if-umd-wordmark-link';a.setAttribute('aria-label','University of Maryland');wm.parentNode.insertBefore(a,wm);a.appendChild(wm);}}if(document.readyState!=='loading')links();else document.addEventListener('DOMContentLoaded',links);window.addEventListener('load',links);setTimeout(links,800);})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] cse-placement error:', _e); } catch (_) {} }

/* ===== module: back-to-top ===== */
try {
(function(){if(window.__ifBTT)return;window.__ifBTT=1;function init(){var btn=document.querySelector('.if-backtotop'),footer=document.querySelector('.if-footer');if(!btn||!footer)return;var hero=document.querySelector('.if-hero-sec');var footerIn=false,heroIn=false;function apply(){btn.classList.toggle('is-visible',footerIn&&!heroIn);}new IntersectionObserver(function(es){es.forEach(function(e){footerIn=e.isIntersecting;});apply();}).observe(footer);if(hero){new IntersectionObserver(function(es){es.forEach(function(e){heroIn=e.isIntersecting;});apply();}).observe(hero);}apply();var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] back-to-top error:', _e); } catch (_) {} }

/* ===== module: cse-late-css (cascade fix) =====
 * Google CSE injects its stylesheet into <head> at runtime, which can override the
 * modal-neutralizing rules when those sit in <head>. Re-injecting them at the end of
 * <body> restores the original winning cascade position (body applies after head). */
try {
(function(){
  var CSS = ".gsc-results-wrapper-overlay{position:static!important;top:auto!important;left:auto!important;right:auto!important;bottom:auto!important;width:auto!important;height:auto!important;max-height:none!important;margin:0!important;padding:0!important;box-shadow:none!important;border:0!important;border-radius:0!important;background:transparent!important;z-index:auto!important;opacity:1!important;visibility:visible!important;transition:none!important;}.gsc-modal-background-image,.gsc-modal-background-image-visible{display:none!important;opacity:0!important;}.gsc-results-close-btn,.gsc-results-close-btn-visible{display:none!important;}.if-cse-overlay{background:rgba(0,0,0,0.78)!important;}.if-cse-overlay,.if-cse-overlay *{scrollbar-width:none!important;-ms-overflow-style:none!important;}.if-cse-overlay::-webkit-scrollbar,.if-cse-overlay *::-webkit-scrollbar{width:0!important;height:0!important;display:none!important;}.if-cse-modal{border-top:0!important;border-radius:6px 0 6px 6px!important;padding:20px 42px 30px 22px!important;overflow:visible!important;}.if-cse-modal::after{content:'';position:absolute;top:0;right:0;bottom:var(--gold-bottom,30px);width:14px;background:#ffd200;clip-path:polygon(0 0,100% 0,100% calc(100% - 2.5px),0 100%);z-index:3;}.if-cse-modal::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:#e21833;border-radius:6px 0 0 0;z-index:4;}.if-cse-head{font-family:'Interstate','Helvetica Neue',Arial,sans-serif!important;font-weight:800!important;font-size:22px!important;color:#e21833!important;letter-spacing:.01em;margin:0 26px 0 0!important;padding-bottom:14px;border-bottom:1px solid #ececec;word-break:break-word;}.if-cse-close{right:26px!important;z-index:5!important;}.if-cse-close:hover{background:transparent!important;}.if-msearch:focus-within{box-shadow:inset 0 -2px 0 #e21833!important;border-bottom-color:#1a1a1a!important;outline:none!important;}.if-foot-logolink,.if-umd-wordmark-link{transition:transform .22s cubic-bezier(.22,1,.36,1);will-change:transform;}.if-foot-logolink:hover,.if-umd-wordmark-link:hover{transform:scale(1.05);}.if-umd-wordmark-link{display:inline-block;text-decoration:none;line-height:0;cursor:pointer;}.if-cse-modal .gsc-above-wrapper-area{padding:14px 0 2px!important;border:0!important;}.if-cse-modal .gsc-result-info{color:#7f7f7f!important;font-family:'Interstate','Helvetica Neue',Arial,sans-serif!important;font-size:13px!important;padding-left:0!important;}.if-cse-modal .gsc-orderby-label,.if-cse-modal .gsc-selected-option-container{color:#7f7f7f!important;font-family:'Interstate','Helvetica Neue',Arial,sans-serif!important;}.if-cse-modal .gsc-webResult.gsc-result{padding:16px 14px!important;margin:0 -14px!important;border:0!important;border-bottom:1px solid #ececec!important;}.if-cse-modal .gsc-webResult.gsc-result:hover{background:#faf9f8!important;}.if-cse-modal a.gs-title,.if-cse-modal .gs-title,.if-cse-modal a.gs-title *{font-family:'Interstate','Helvetica Neue',Arial,sans-serif!important;font-size:18px!important;font-weight:600!important;color:#1a1a1a!important;text-decoration:none!important;line-height:1.3!important;}.if-cse-modal a.gs-title:hover,.if-cse-modal a.gs-title:hover *{color:#e21833!important;text-decoration:underline!important;}.if-cse-modal .gs-visibleUrl,.if-cse-modal .gs-visibleUrl-long,.if-cse-modal .gs-visibleUrl-short{color:#e21833!important;font-family:'Interstate','Helvetica Neue',Arial,sans-serif!important;font-size:13px!important;}.if-cse-modal .gs-snippet{font-family:Georgia,'Times New Roman',serif!important;color:#444!important;font-size:14px!important;line-height:1.55!important;}.if-cse-modal .gs-snippet b{color:#1a1a1a!important;}.if-cse-modal .gsc-cursor-page{color:#e21833!important;font-family:'Interstate','Helvetica Neue',Arial,sans-serif!important;}.if-cse-modal .gsc-cursor-current-page{color:#1a1a1a!important;font-weight:800!important;}";
  function inj(){ if(document.getElementById('if-cse-latecss')) return; var s=document.createElement('style'); s.id='if-cse-latecss'; s.textContent=CSS; (document.body||document.documentElement).appendChild(s); }
  if(document.readyState!=='loading') inj(); else document.addEventListener('DOMContentLoaded', inj);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] cse-late-css error:', _e); } catch (_) {} }

/* ===== module: program-filter (Students directory) =====
   Class-driven + portable: keys only off .if-filter-pills/.if-filter-pill[data-filter] and
   .if-prog-grid/.if-prog-card[data-tags] — never off ids, order, or text. On load NO pill is
   'current' (per requirement); after the first click exactly one .if-filter-pill.is-active
   remains (including "All"). "All" shows every card; any other filter shows cards whose
   data-tags contains that value. */
try {
(function(){
  function init(){
    var grid=document.querySelector('.if-prog-grid');
    var pillWrap=document.querySelector('.if-filter-pills');
    if(!grid||!pillWrap||grid.__ifprog)return;grid.__ifprog=1;
    var pills=pillWrap.querySelectorAll('.if-filter-pill');
    var cards=grid.querySelectorAll('.if-prog-card');
    var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var _fxtok=0;
    function _clearFx(c){c.style.transition='';c.style.transitionDelay='';c.style.transform='';c.style.opacity='';}
    function _matches(card,filter){
      if(filter==='All')return true;
      var tags=(card.getAttribute('data-tags')||'').split(',');
      for(var k=0;k<tags.length;k++){if(tags[k].replace(/^\s+|\s+$/g,'')===filter)return true;}
      return false;
    }
    /* Filter switch = a soft cross-dissolve, NO positional motion (nothing slides around). The cards
       on screen fade out together; the grid re-lays-out while everything is invisible (so the reflow
       is never seen as cards sliding); then the matching set fades back in with just a whisper of
       scale to settle in. A token cancels in-flight runs so rapid pill clicks stay clean;
       reduced-motion = instant show/hide. Dials: fade-out 260ms / fade-in 440ms / scale 0.985. */
    function apply(filter,animate){
      var target=[],i;
      for(i=0;i<cards.length;i++)target[i]=_matches(cards[i],filter);
      if(reduce||!animate){
        for(i=0;i<cards.length;i++)cards[i].classList.toggle('if-prog-hidden',!target[i]);
        return;
      }
      var tok=++_fxtok;
      for(i=0;i<cards.length;i++)_clearFx(cards[i]);
      var visible=[];
      for(i=0;i<cards.length;i++){if(!cards[i].classList.contains('if-prog-hidden'))visible.push(cards[i]);}
      for(i=0;i<visible.length;i++){var vc=visible[i];vc.style.transition='opacity 260ms ease';vc.style.opacity='0';}
      var swap=function(){
        if(tok!==_fxtok)return;
        var j,shown=[];
        for(j=0;j<cards.length;j++){cards[j].classList.toggle('if-prog-hidden',!target[j]);if(target[j])shown.push(cards[j]);else _clearFx(cards[j]);}
        for(j=0;j<shown.length;j++){var sc=shown[j];sc.style.transition='none';sc.style.opacity='0';sc.style.transform='scale(0.985)';}
        void grid.offsetWidth;
        for(j=0;j<shown.length;j++){var sp=shown[j];sp.style.transition='opacity 440ms ease,transform 440ms cubic-bezier(0.22,1,0.36,1)';sp.style.opacity='';sp.style.transform='';}
        setTimeout(function(){if(tok!==_fxtok)return;var m;for(m=0;m<shown.length;m++)_clearFx(shown[m]);},680);
      };
      if(visible.length)setTimeout(swap,270);else swap();
    }
    for(var i=0;i<pills.length;i++){(function(p){
      p.addEventListener('click',function(){
        for(var j=0;j<pills.length;j++)pills[j].classList.remove('is-active');
        p.classList.add('is-active');
        apply(p.getAttribute('data-filter')||'All',true);
      });
    })(pills[i]);}
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] program-filter error:', _e); } catch (_) {} }

/* ===== module: program-card-inner =====
   Wraps each .if-prog-body's content in a .if-prog-bodyinner div so the card-hover text grow can be
   applied to that wrapper (center-pinned) — the content grows WITHIN the body without pushing the
   body's own perimeter. Idempotent; content stays natively editable (this only groups it). */
try {
(function(){function init(){var bodies=document.querySelectorAll('.if-prog-body');for(var i=0;i<bodies.length;i++){var b=bodies[i];if(b.__ifinner)continue;b.__ifinner=1;if(b.querySelector(':scope > .if-prog-bodyinner'))continue;var w=document.createElement('div');w.className='if-prog-bodyinner';while(b.firstChild){w.appendChild(b.firstChild);}b.appendChild(w);}}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] program-card-inner error:', _e); } catch (_) {} }
