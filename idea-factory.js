/*! ============================================================================
 * Idea Factory — SHARED SITE BEHAVIOR  (v1.2.0)
 * DO NOT EDIT IN WEBFLOW. Source of truth = GitHub repo idea-factory-umd/idea-factory-site.
 * Loaded site-wide via jsDelivr <script> in Project Settings > Custom Code (Footer).
 * Each module is try/catch-isolated and binds by class.
 * Modules: base (count-up + v1 features), nav, main bundle, CSE placement, back-to-top.
 *
 * SCROLL EFFECTS — ONE ENGINE, MANDATORY. Read this before adding or editing
 * anything that reacts to scroll position.
 *
 * This file used to register up to 20 independent `scroll` listeners, each
 * running its own requestAnimationFrame loop. Because they were independent,
 * their DOM reads (getBoundingClientRect etc.) and DOM writes (style changes)
 * interleaved arbitrarily within a single frame: effect N's style write could
 * force effect N+1's measurement into a synchronous layout recalculation
 * ("forced reflow"), up to 20 times per scroll frame. That was a real,
 * measured cause of choppy scrolling in Chrome (main-thread work competing
 * with the compositor thread that's already smoothly scrolling the page).
 *
 * Fix: `ifScrollEngine` below is the ONLY `scroll`/`resize` listener pair for
 * every scroll-position-driven effect in this file. An effect registers a
 * `{read, write}` pair via `ifScrollEngine.add(...)`. Every effect's read()
 * runs first, for every effect, THEN every effect's write() runs — so no
 * write can ever land in between two reads and force a reflow.
 *
 * RULES FOR ANY SCROLL-DRIVEN EFFECT ADDED HERE GOING FORWARD:
 *   1. NEVER call addEventListener('scroll', ...) or ('resize', ...) yourself
 *      — register with ifScrollEngine.add({read, write}) instead.
 *   2. read(el) may only MEASURE (getBoundingClientRect, innerHeight, etc.).
 *      It must never set a style/class. write(m) may only WRITE (styles,
 *      classes); it must never measure. Mixing the two is what causes the
 *      forced-reflow problem above — keep them strictly separate.
 *   3. Prefer transform/opacity for anything animated on scroll. They're
 *      compositor-only. Never animate width/height/top/left/margin on
 *      scroll — those are layout properties (see the gold-bar fix below).
 *   4. Cache anything expensive to measure (document height, viewport size)
 *      instead of reading it every frame — several effects used to read
 *      document.documentElement.scrollHeight on every scroll frame, which
 *      flushes layout for the WHOLE page, every frame, while scrolling.
 *   5. Apply will-change only while an effect is actively animating, not
 *      permanently — a permanent will-change pins a compositor layer for
 *      the page's entire life, and Chrome demotes/re-rasterizes layers once
 *      its layer-memory budget is exceeded.
 *   6. GLOBAL LOAD GUARD (below, before this file does anything else): if this
 *      script is ever accidentally included twice on one page, every module's
 *      per-element re-entry guards (e.g. `if(el.__ifsm)return;`) already stop
 *      that SPECIFIC element from being double-processed — but the guard here
 *      stops the whole file, including a second `ifScrollEngine` definition,
 *      from running at all. Never remove it.
 *
 * SCOPE NOTE (2026-09): this pass consolidated every effect that registered
 * a `scroll` listener - all 20 of them: manifesto line-lift, Home stage-photo
 * parallax/zoom, the About synthesis-band parallax/zoom (syn-moment), the
 * hero + footer gold bars, the MIPS-Apply jump-nav and Walk-the-Factory-copy
 * current-section spies, the spinoff bottom-nav accent slides, the About
 * "Walk the Factory" bar (pin + current-stage spy), scroll-red, and both
 * count-up variants (.if-countup and .if-hero-countup). Only ifScrollEngine's
 * own single scroll/resize listener pair remains in the whole file.
 * Resize-ONLY modules (header-name-fit, walk-colalign, stage-header-eyebrow-
 * fix, stage-head-vcenter, nav-link-exact-fit, walkcopy-gap-tiers, jumpnav-
 * gap, the header/footer gold-bar height/position measurements) were
 * deliberately left untouched - they don't fire during a scroll gesture, so
 * they were never part of the choppy-scrolling problem, and touching them
 * was out of scope for this fix.
 * ========================================================================== */
if (window.__ifEngine) { /* already loaded once on this page - stop here, do nothing else */ }
else {
window.__ifEngine = 1;
try {
window.ifScrollEngine = (function(){
  var effects = [], ticking = false;
  function frame(){
    ticking = false;
    var i, len = effects.length, results = new Array(len);
    // READ PHASE: every effect measures first. No writes happen yet, so no
    // effect's own prior-frame write can still be "settling" and force a
    // layout recalculation here - the DOM is only ever read in this loop.
    for (i=0; i<len; i++){
      try { results[i] = effects[i].read ? effects[i].read() : undefined; }
      catch (e) { try { console && console.warn && console.warn('[idea-factory] scroll-engine read error:', e); } catch(_){} }
    }
    // WRITE PHASE: every effect writes second, using what it measured above.
    // Because ALL reads already happened, no write here can force a reflow
    // for a read that hasn't run yet - there isn't one left to run.
    for (i=0; i<len; i++){
      try { if (effects[i].write) effects[i].write(results[i]); }
      catch (e) { try { console && console.warn && console.warn('[idea-factory] scroll-engine write error:', e); } catch(_){} }
    }
  }
  function onScrollOrResize(){ if(!ticking){ ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScrollOrResize, {passive:true});
  window.addEventListener('resize', onScrollOrResize, {passive:true});
  return {
    add: function(effect){ effects.push(effect); },
    kick: function(){ frame(); } // run one frame synchronously right after registering (initial paint / state)
  };
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] scroll-engine init error:', _e); } catch (_) {} }

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

  /* ---- 2/3/4. MANIFESTO lift, PROOF count-up, STAGE parallax+zoom -------
     Moved out of this legacy module entirely - see the new consolidated
     "manifesto-lift", "count-up" and "stage-parallax" modules further down
     (registered with ifScrollEngine). This legacy copy of all three was
     confirmed dead code before removal: its manifesto/stage targets
     (.if-manifesto-line / .if-stage-moment / .if-stage-photo) never actually
     existed on any live page when checked - the CURRENT generation creates
     those spans/uses different class names, and this legacy copy always ran
     first (earlier in this file) and found nothing. Its count-up target
     (.if-countup) is real and active, so that one's logic was carried over
     unchanged into the new "count-up" module - just re-wired onto the shared
     engine instead of its own private scroll listener. */

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

  /* ---- 7. NAVBAR retract at footer — REMOVED (2026-09) ------------------
     Targeted .if-navbar, which does not exist on any live page (confirmed
     before removal) - it's superseded by the IntersectionObserver-based
     nav-tuck mechanism (main-bundle, targets .if-navmenu/.if-nav-companion),
     which was left completely untouched since it never used a scroll
     listener in the first place. This was fully dead code, not a duplicate
     of anything current - safe to delete outright rather than alias. */

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
    initHeaderGoldBar();
    initFooterGoldBar();
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
(function(){function init(){var ws=document.querySelectorAll('.if-dd-wrap');ws.forEach(function(w){var t=w.querySelector('.w-dropdown-toggle');if(!t||t.__ifb)return;t.__ifb=1;t.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();ws.forEach(function(o){if(o!==w)o.classList.remove('if-open');});w.classList.toggle('if-open');});});document.addEventListener('click',function(e){ws.forEach(function(w){if(!w.contains(e.target))w.classList.remove('if-open');});});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){function hero(){var h1=document.querySelector('.if-hero-h1');if(!h1||h1.__ifhero)return;var words=h1.querySelectorAll(':scope > span');if(!words.length)return;h1.__ifhero=1;words.forEach(function(w){w.classList.add('if-hero-word');});var sec=h1.closest('section')||h1.parentElement;var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);var started=reduce;if(reduce){words.forEach(function(w){if(w.classList.contains('if-hero-word-red'))w.classList.add('if-lit-red');if(w.classList.contains('if-hero-word-gold'))w.classList.add('if-lit-gold');});}function setStep(step){words.forEach(function(w,idx){w.style.opacity=(step===999)?1:(step===idx?1:((w.classList.contains('if-lit-red')||w.classList.contains('if-lit-gold'))?1:0.62));if((step===idx||step===999)&&w.classList.contains('if-hero-word-red'))w.classList.add('if-lit-red');if((step===idx||step===999)&&w.classList.contains('if-hero-word-gold'))w.classList.add('if-lit-gold');});}function start(){if(started)return;started=true;var D=180,gap=40,ideasExtra=520,lastExtra=640,ideasPause=110,workPause=150;var seq=[];words.forEach(function(x,w){seq.push({step:w,hold:D+(x.classList.contains('if-hero-word-delay')?ideasExtra:0)+(w===words.length-1?lastExtra:0)});if(w<words.length-1)seq.push({step:-1,hold:gap+(x.classList.contains('if-hero-word-delay')?ideasPause:0)});});seq.push({step:-1,hold:workPause});seq.push({step:999,hold:0});var k=0;function run(){var s=seq[k];if(s.step===999)h1.classList.add('hero-settling');setStep(s.step);k++;if(k<seq.length)setTimeout(run,s.hold);}setTimeout(run,140);}sec.addEventListener('mouseenter',start);sec.addEventListener('touchstart',start,{passive:true});}if(document.readyState!=='loading')hero();else document.addEventListener('DOMContentLoaded',hero);})();(function(){var reduced=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);function ease(t){return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}var rafId=null;function animate(toY){if(rafId)cancelAnimationFrame(rafId);var startY=window.pageYOffset,dist=toY-startY;if(Math.abs(dist)<2){window.scrollTo(0,toY);return;}var dur=Math.min(820,Math.max(430,Math.abs(dist)*0.28)),t0=null;function step(ts){if(t0==null)t0=ts;var p=Math.min(1,(ts-t0)/dur);window.scrollTo(0,Math.round(startY+dist*ease(p)));if(p<1){rafId=requestAnimationFrame(step);}else{rafId=null;}}rafId=requestAnimationFrame(step);}function dest(a){var href=a.getAttribute('href');if(!href||href.charAt(0)!=='#'||href.length<2)return null;var tgt=document.getElementById(href.slice(1));if(!tgt)return null;var sel=a.getAttribute('data-scroll-target');if(!sel&&href==='#audience')sel='.if-eyebrow';var m=sel?(tgt.querySelector(sel)||document.querySelector(sel)||tgt):tgt;var g=parseInt(a.getAttribute('data-scroll-gap'),10);if(isNaN(g))g=(href==='#audience')?50:24;var hdr=document.querySelector('.if-header')||document.querySelector('header');var h=hdr?hdr.offsetHeight:0;return Math.max(0,m.getBoundingClientRect().top+window.pageYOffset-h-g);}document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a.if-smooth-scroll,a[data-smooth-scroll],a[href="#audience"]');if(!a)return;var toY=dest(a);if(toY===null)return;e.preventDefault();e.stopImmediatePropagation();if(reduced){window.scrollTo(0,toY);}else{animate(toY);}},true);})();(function(){function init(){var bar=document.querySelector('.if-hero-goldbar');if(!bar)return;var MIN=30,MAX=90;bar.style.width=MAX+'%';bar.style.transformOrigin='left center';ifScrollEngine.add({read:function(){var r=bar.getBoundingClientRect();var vh=window.innerHeight||document.documentElement.clientHeight;return{vh:vh,top:r.top,h:r.height};},write:function(m){if(!m)return;var p=(m.vh-m.top)/(m.vh+m.h);if(p<0)p=0;if(p>1)p=1;bar.style.transform='scaleX('+((MIN+(MAX-MIN)*p)/MAX)+')';}});ifScrollEngine.kick();}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){function init(){var bar=document.querySelector('.if-foot-accent');if(!bar)return;var MAXFRAC=0.60;
    /* PERF: previously read document.documentElement.scrollHeight on every scroll frame - that
       flushes layout for the WHOLE document, every frame, while scrolling. Document height only
       ever changes on resize/content-load, never mid-scroll, so it's measured once here and
       cached, refreshed only on resize/load/fonts.ready (matching the pattern already used by
       nav-tuck/botnav-hide elsewhere in this file). */
    var cache={w:0,scrollMax:1};
    function remeasure(){cache.w=bar.offsetWidth||bar.getBoundingClientRect().width;var vh=window.innerHeight||document.documentElement.clientHeight;cache.scrollMax=Math.max(1,(document.documentElement.scrollHeight||document.body.scrollHeight||0)-vh);}
    remeasure();
    window.addEventListener('resize',remeasure,{passive:true});window.addEventListener('load',remeasure);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(remeasure);
    ifScrollEngine.add({read:function(){var rect=bar.getBoundingClientRect();var vh=window.innerHeight||document.documentElement.clientHeight;var scrolled=window.pageYOffset||document.documentElement.scrollTop||0;return{vh:vh,top:rect.top,scrolled:scrolled};},write:function(m){if(!m)return;var otop=m.top+m.scrolled;var finalTop=otop-cache.scrollMax;var denom=m.vh-finalTop;var p=denom>0?(m.vh-m.top)/denom:1;if(p<0)p=0;if(p>1)p=1;bar.style.backgroundPosition=(p*MAXFRAC*cache.w)+'px 0px';}});ifScrollEngine.kick();}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();/* manifesto-lift moved to the consolidated 'manifesto-lift' module (ifScrollEngine) below. *//* stage parallax+zoom moved to the consolidated 'stage-parallax' module (ifScrollEngine) below. */(function(){function init(){var els=document.querySelectorAll('.if-hover-grow');els.forEach(function(el){if(el.__ifg)return;el.__ifg=1;if(el.querySelector(':scope > .if-hover-grow-t'))return;var s=document.createElement('span');s.className='if-hover-grow-t';while(el.firstChild){s.appendChild(el.firstChild);}el.appendChild(s);});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){var CX='164d3383cc05e4249';var loaded=false,ready=false,rendered=false,pending=null;var overlay,headEl,loadEl;function buildOverlay(){if(overlay)return;overlay=document.createElement('div');overlay.className='if-cse-overlay';overlay.innerHTML='<div class="if-cse-modal"><button class="if-cse-close" type="button" aria-label="Close search">×</button><div class="if-cse-head"></div><div class="if-cse-loading">Searching…</div><div id="if-cse-results"></div></div>';document.body.appendChild(overlay);headEl=overlay.querySelector('.if-cse-head');loadEl=overlay.querySelector('.if-cse-loading');overlay.addEventListener('mousedown',function(e){if(e.target===overlay)closeOverlay();});overlay.querySelector('.if-cse-close').addEventListener('click',closeOverlay);}function openOverlay(q){buildOverlay();headEl.textContent='Results for “'+q+'”';loadEl.style.display='block';overlay.classList.add('if-open');document.documentElement.style.overflow='hidden';}function closeOverlay(){if(overlay){overlay.classList.remove('if-open');document.documentElement.style.overflow='';}}document.addEventListener('keydown',function(e){if((e.key==='Escape'||e.keyCode===27)&&overlay&&overlay.classList.contains('if-open'))closeOverlay();});function onReady(){ready=true;render();if(pending){exec(pending);pending=null;}}function render(){if(rendered)return;if(!(window.google&&google.search&&google.search.cse&&google.search.cse.element))return;google.search.cse.element.render({div:'if-cse-results',tag:'searchresults-only',gname:'ifcse'});rendered=true;}function exec(q){render();var el=window.google&&google.search&&google.search.cse&&google.search.cse.element.getElement('ifcse');if(el){el.execute(q);if(loadEl)loadEl.style.display='none';}else{pending=q;}}function ensureCse(){if(loaded)return;loaded=true;window.__gcse={parsetags:'explicit',callback:onReady};var s=document.createElement('script');s.async=true;s.src='https://cse.google.com/cse.js?cx='+CX;document.head.appendChild(s);}function doSearch(q){q=(q||'').trim();if(!q)return;openOverlay(q);if(ready){exec(q);}else{pending=q;ensureCse();}}function wireBox(box){if(!box||box.__ifsearch)return;box.__ifsearch=1;var input;if(box.tagName==='INPUT'){input=box;}else{var ph=box.querySelector('.if-search-ph');input=document.createElement('input');input.type='search';input.className='if-search-realinput';input.setAttribute('placeholder',ph&&ph.textContent.trim()?ph.textContent.trim():'Search');if(ph)ph.style.display='none';box.appendChild(input);box.addEventListener('click',function(){input.focus();});}input.addEventListener('keydown',function(e){if(e.key==='Enter'||e.keyCode===13){e.preventDefault();doSearch(input.value);}});}function init(){var b=document.querySelectorAll('.if-search-input, .if-msearch');for(var i=0;i<b.length;i++)wireBox(b[i]);}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);function initCta(){var head=document.querySelector('.if-foot-cta-head');if(!head||head.__ifcta)return;var phrases=head.querySelectorAll(':scope > span');if(!phrases.length)return;head.__ifcta=1;var words=[],line1=0;phrases.forEach(function(ph,pi){var gold=ph.classList.contains('if-foot-cta-gold');var parts=ph.textContent.split(/(\s+)/);ph.textContent='';parts.forEach(function(tok){if(tok==='')return;if(/^\s+$/.test(tok)){ph.appendChild(document.createTextNode(tok));}else{var w=document.createElement('span');w.className=gold?'if-foot-cta-word if-foot-cta-gold':'if-foot-cta-word';w.textContent=tok;ph.appendChild(w);words.push(w);}});if(pi===0)line1=words.length;});if(!words.length)return;if(reduce){words.forEach(function(w){if(w.classList.contains('if-foot-cta-gold'))w.classList.add('if-lit-gold');});return;}var played=false,N=words.length,lineEnd=line1-1,last=N-1;function setStep(step){for(var i=0;i<N;i++){var w=words[i];w.style.opacity=(step===999)?1:(step===i?1:(w.classList.contains('if-lit-gold')?1:0.62));if((step===i||step===999)&&w.classList.contains('if-foot-cta-gold'))w.classList.add('if-lit-gold');}}function run(){var D=180,gap=40,ideasExtra=520,lastExtra=640,ideasPause=110,workPause=150;var seq=[];for(var w=0;w<N;w++){seq.push({step:w,hold:D+(w===lineEnd?ideasExtra:0)+(w===last?lastExtra:0)});if(w<last)seq.push({step:-1,hold:gap+(w===lineEnd?ideasPause:0)});}seq.push({step:-1,hold:workPause});seq.push({step:999,hold:0});var k=0;function tick(){var s=seq[k];if(s.step===999)head.classList.add('cta-settling');setStep(s.step);k++;if(k<seq.length)setTimeout(tick,s.hold);}tick();}var trig=head.closest('.if-footer')||head.closest('footer')||head;function onEnter(){if(played)return;played=true;trig.removeEventListener('mouseenter',onEnter);run();}trig.addEventListener('mouseenter',onEnter);}if(document.readyState!=='loading')initCta();else document.addEventListener('DOMContentLoaded',initCta);})();(function(){function init(){var menu=document.querySelector('.if-navmenu'),footer=document.querySelector('.if-footer');if(!menu||!footer||menu.__ifTuck)return;menu.__ifTuck=1;var companions=document.querySelectorAll('.if-nav-companion, .program-page-mips-apply-walkcopy-sec');var shortPage=false;function setTucked(on){menu.classList.toggle('if-nav-tucked',on);companions.forEach(function(c){c.classList.toggle('if-nav-tucked',on);});}function footerVisibleNow(){var r=footer.getBoundingClientRect();var vh=window.innerHeight||document.documentElement.clientHeight;return r.top<vh&&r.bottom>0;}function measure(){var vh=window.innerHeight||document.documentElement.clientHeight;var hdr=document.querySelector('.if-header')||menu;var scrollY=window.pageYOffset||document.documentElement.scrollTop||0;var dist=(footer.getBoundingClientRect().top+scrollY)-hdr.offsetHeight;var wasShort=shortPage;shortPage=dist<vh;if(shortPage){setTucked(false);}else if(wasShort){setTucked(footerVisibleNow());}}measure();window.addEventListener('resize',measure);window.addEventListener('load',measure);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);setTimeout(measure,500);setTimeout(measure,1500);var io=new IntersectionObserver(function(es){es.forEach(function(e){if(shortPage)return;setTucked(e.isIntersecting);});});io.observe(footer);}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();(function(){function init(){var menu=document.querySelector('.if-navmenu');var secs=document.querySelectorAll('[class*="-botnav-sec"]');if(!secs.length)return;secs.forEach(function(sec){if(sec.__ifBotnavHide)return;sec.__ifBotnavHide=1;function measure(){sec.classList.remove('if-botnav-hide');var vh=window.innerHeight||document.documentElement.clientHeight;var hdr=document.querySelector('.if-header')||menu||sec;var scrollY=window.pageYOffset||document.documentElement.scrollTop||0;var dist=(sec.getBoundingClientRect().top+scrollY)-hdr.offsetHeight;sec.classList.toggle('if-botnav-hide',dist<vh);}measure();window.addEventListener('resize',measure);window.addEventListener('load',measure);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);setTimeout(measure,500);setTimeout(measure,1500);});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] main-bundle error:', _e); } catch (_) {} }

/* ===== module: cse-placement ===== */
try {
(function(){var P='Results for',R='Search results for',raf=0;function place(){var w=document.querySelector('.gsc-results-wrapper-overlay'),b=document.getElementById('if-cse-results');if(w&&b&&!b.contains(w)){b.appendChild(w);}}function head(){var h=document.querySelector('.if-cse-head');if(h&&h.textContent.lastIndexOf(P,0)===0){h.textContent=R+h.textContent.slice(P.length);}}function measure(){var m=document.querySelector('.if-cse-modal');if(!m||!m.offsetParent)return;var res=m.querySelectorAll('.gsc-webResult.gsc-result');if(!res.length){m.style.removeProperty('--gold-bottom');return;}var last=res[res.length-1];var bottom=m.clientHeight-(last.getBoundingClientRect().bottom-m.getBoundingClientRect().top);if(bottom<0)bottom=0;m.style.setProperty('--gold-bottom',bottom+'px');}function unlock(){['documentElement','body'].forEach(function(k){var el=document[k];if(!el)return;el.style.overflow='';[].slice.call(el.classList).forEach(function(c){if(/overflow/i.test(c))el.classList.remove(c);});});}function watchOverlay(){var ov=document.querySelector('.if-cse-overlay');if(ov&&!ov.__ifunlock){ov.__ifunlock=1;new MutationObserver(function(){if(!ov.classList.contains('if-open'))unlock();}).observe(ov,{attributes:true,attributeFilter:['class']});}}function fixSearch(){var boxes=document.querySelectorAll('.if-search-input, .if-msearch');for(var i=0;i<boxes.length;i++){var box=boxes[i];if(box.__ifsfix)continue;var input=box.querySelector('.if-search-realinput');if(!input)continue;box.__ifsfix=1;var stray='';for(var n=box.firstChild;n;){var nx=n.nextSibling;if(n.nodeType===3&&n.textContent.trim()){stray=n.textContent.trim();box.removeChild(n);}n=nx;}if(stray)input.setAttribute('placeholder',stray);if(box.classList.contains('if-msearch'))input.style.width='100%';input.addEventListener('keydown',function(e){if(e.key==='Enter'||e.keyCode===13){var t=this;setTimeout(function(){t.value='';},0);}});if(getComputedStyle(box).position==='static')box.style.position='relative';var btn=document.createElement('button');btn.type='button';btn.className='if-search-go';btn.setAttribute('aria-label','Search');btn.style.cssText='position:absolute;top:0;right:0;bottom:0;width:40px;margin:0;padding:0;border:0;background:transparent;cursor:pointer;z-index:2;';btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var inp=this.parentNode.querySelector('.if-search-realinput');if(inp)inp.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));});box.appendChild(btn);}}function scan(){place();head();watchOverlay();fixSearch();if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(measure);}if(document.readyState!=='loading')scan();else document.addEventListener('DOMContentLoaded',scan);new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true,characterData:true});window.addEventListener('resize',scan);})();(function(){var GIVE='https://giving.umd.edu/giving/fund.php?name=maryland-technology-enterprise-institute-mtech-gift-fund';var UMD='https://www.umd.edu/',ENG='https://eng.umd.edu/';var SOC={x:'https://x.com/mtechumd','in':'https://www.linkedin.com/company/10550318/',f:'https://www.facebook.com/mtechumd'};function ext(a,href){if(!a||!href)return;var c=a.getAttribute('href');if(c&&c!=='#')return;a.setAttribute('href',href);a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer');}function links(){ext(document.querySelector('.if-umdbar-a1'),UMD);ext(document.querySelector('.if-umdbar-a2'),ENG);var g=document.querySelectorAll('.if-give-btn-solid,.if-give-btn,.if-give-mobile');for(var i=0;i<g.length;i++)ext(g[i],GIVE);var s=document.querySelectorAll('.if-social-box');for(var j=0;j<s.length;j++){var t=(s[j].textContent||'').trim().toLowerCase();if(SOC[t])ext(s[j],SOC[t]);}var wm=document.querySelector('.if-umd-wordmark');if(wm&&!wm.__iflinked&&wm.parentNode&&wm.parentNode.tagName!=='A'){wm.__iflinked=1;var a=document.createElement('a');a.href=UMD;a.target='_blank';a.rel='noopener noreferrer';a.className='if-umd-wordmark-link';a.setAttribute('aria-label','University of Maryland');wm.parentNode.insertBefore(a,wm);a.appendChild(wm);}}if(document.readyState!=='loading')links();else document.addEventListener('DOMContentLoaded',links);window.addEventListener('load',links);setTimeout(links,800);})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] cse-placement error:', _e); } catch (_) {} }

/* ===== module: back-to-top ===== */
/* Per-page opt-out: add a native custom attribute data-hide-backtotop="1" to any
 * element on a page (convention: the page's own .if-header Block, never an element
 * inside the shared Footer symbol) to hide the button on that page only, with zero
 * effect on the shared Footer component definition or any other page/instance. */
try {
(function(){if(window.__ifBTT)return;window.__ifBTT=1;function init(){var btn=document.querySelector('.if-backtotop'),footer=document.querySelector('.if-footer');if(!btn||!footer)return;if(document.querySelector('[data-hide-backtotop]'))return;var hero=document.querySelector('.if-hero-sec');var menu=document.querySelector('.if-navmenu');var footerIn=false,heroIn=false,shortPage=false;function apply(){btn.classList.toggle('is-visible',footerIn&&!heroIn&&!shortPage);}function measureShort(){if(!menu)return;var vh=window.innerHeight||document.documentElement.clientHeight;var hdr=document.querySelector('.if-header')||menu;var scrollY=window.pageYOffset||document.documentElement.scrollTop||0;var dist=(footer.getBoundingClientRect().top+scrollY)-hdr.offsetHeight;shortPage=dist<vh;apply();}new IntersectionObserver(function(es){es.forEach(function(e){footerIn=e.isIntersecting;});apply();}).observe(footer);if(hero){new IntersectionObserver(function(es){es.forEach(function(e){heroIn=e.isIntersecting;});apply();}).observe(hero);}measureShort();window.addEventListener('resize',measureShort);window.addEventListener('load',measureShort);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measureShort);setTimeout(measureShort,500);setTimeout(measureShort,1500);apply();var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});});}if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);})();
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

/* ===== module: hs-form-iframe-css (Updates page) =====
 * Real DevTools inspection (2026-08-21) showed HubSpot's "Canvas" theme renders this
 * form's fields/richtext inside an isolated iframe document (data-hs-shell/data-hs-frame
 * on the embed script), not directly in the host page. A host-page stylesheet can never
 * cross an iframe boundary — but if the iframe is same-origin (created + populated by
 * HubSpot's own script running on this page, not loaded via a cross-origin src=), the
 * parent page CAN reach its contentDocument directly and inject a real <style> there.
 * Polls every 500ms for up to ~15s since the iframe/content renders asynchronously.
 * Fails silently per-iframe (try/catch) if the browser blocks it as cross-origin —
 * that outcome is itself the definitive answer on whether this is reachable at all. */
try {
(function(){
  var CSS = ".hs-richtext,.hs-richtext p,.hs-main-font-element{font-size:18px!important;color:#454545!important;line-height:1.5!important;font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;margin-top:0!important;margin-bottom:32px!important;}"
    + ".hs-form-field label{display:block!important;margin-top:0!important;margin-bottom:8px!important;font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;color:#1a1a1a!important;font-size:16px!important;font-weight:600!important;}"
    + ".hs-form-required{color:#e21833!important;}"
    + ".hs-input{display:block!important;width:100%!important;margin-top:0!important;margin-bottom:24px!important;padding:12px 14px!important;border:1px solid #cfcfcf!important;border-radius:4px!important;background-color:#ffffff!important;font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;color:#1a1a1a!important;font-size:16px!important;box-sizing:border-box!important;}"
    + ".hs-button{display:inline-block!important;margin-top:16px!important;padding:14px 32px!important;border:0!important;border-radius:4px!important;background-color:#e21833!important;font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;color:#ffffff!important;font-size:16px!important;font-weight:700!important;text-align:center!important;cursor:pointer!important;}";
  function tryInject(frame){
    try {
      var doc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
      if (!doc) return false;
      if (doc.getElementById('if-hs-iframe-css')) return true;
      if (!doc.querySelector('.hs-richtext')) return false;
      var head = doc.head || doc.body || doc.documentElement;
      if (!doc.getElementById('if-hs-iframe-font')) {
        var l = doc.createElement('link');
        l.id = 'if-hs-iframe-font';
        l.rel = 'stylesheet';
        l.href = 'https://use.typekit.net/fdu6zpb.css';
        head.appendChild(l);
      }
      var s = doc.createElement('style');
      s.id = 'if-hs-iframe-css';
      s.textContent = CSS;
      head.appendChild(s);
      return true;
    } catch (e) { return false; }
  }
  var tries = 0;
  var timer = setInterval(function(){
    tries++;
    var frames = document.querySelectorAll('iframe');
    var done = false;
    for (var i = 0; i < frames.length; i++) { if (tryInject(frames[i])) done = true; }
    if (done || tries > 30) clearInterval(timer);
  }, 500);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] hs-form-iframe-css error:', _e); } catch (_) {} }

/* ===== module: ff-form-iframe-css (MIPS Company/Faculty Statement-of-Interest pages) =====
 * Same root cause and same fix as hs-form-iframe-css above, for a different vendor.
 * The Formstack "FastForms" embed on these two pages creates a blank <iframe
 * id="ffEmbedFrame"> and populates it itself via document.write() from a script
 * running on this host page — so, same as the HubSpot Canvas iframe, it's
 * same-origin and reachable via contentDocument even though it's still a real,
 * isolated document a host-page stylesheet could never otherwise reach.
 *
 * Two real bugs found here (2026-08-24), both confirmed by pulling and reading
 * Formstack's actual Main.js engine directly (sfapi.formstack.io/FormEngine/
 * Scripts/Main.js), not guessed:
 * 1. `.ff-submit-btn` is NOT the submit button — tracing Main.js's own DOM-
 *    construction chain shows it's a <div class="ff-submit-btn"> WRAPPER that
 *    contains BOTH the "- required" footnote AND the real button (a nested
 *    <input id="btnsubmit" class="sectionHeader ff-btn-submit">). Styling
 *    `.ff-submit-btn` as a button therefore painted the whole footnote+button
 *    row solid red — visually confirmed via a user screenshot. Fixed by
 *    dropping `.ff-submit-btn` and keeping only the real button's own class,
 *    `.ff-btn-submit`.
 * 2. Font override still wasn't sticking after two follow-up attempts
 *    (2026-08-24): first a 15s re-assert timer (real network load isn't
 *    bounded like a synthetic test's setTimeout, so a fixed window can run
 *    out before Formstack's own late CSS lands), then a MutationObserver
 *    watching for new nodes (didn't help either — verified afterward that
 *    the BUTTON styling from this SAME injected block, in the SAME CSS
 *    string, DID visibly apply, which rules out "never reaching the iframe
 *    at all"; the failure is specific to font-family). The real remaining
 *    possibility: Formstack's own jQuery-based engine may set font/typography
 *    via a direct inline style or .css() call on EXISTING elements rather
 *    than by adding a new stylesheet node — a plain childList-only
 *    MutationObserver is structurally blind to that (it only fires on nodes
 *    being added/removed, never on an existing node's own attributes
 *    changing). Fixed by no longer relying on a stylesheet rule to win a
 *    cascade fight at all: this now walks the real elements directly and
 *    sets `el.style.setProperty('font-family', ..., 'important')` — a JS-set
 *    inline !important beats a plain inline style and ties only against
 *    another !important stylesheet rule by simply running last, which this
 *    guarantees by re-running on every observed mutation (now including
 *    attribute changes, not just added nodes) AND on a belt-and-suspenders
 *    1s interval for a full 60s regardless of whether any mutation ever
 *    fires, since a jQuery .css() call while the observer setup is racing
 *    to attach could otherwise still slip through unnoticed once.
 * 3. Follow-up polish (2026-08-24): body/label/question text was rendering
 *    artificially bold, and each page/section box had a heavy 2-3px rounded
 *    gray border out of keeping with the site's plain 1px look. Font-weight/
 *    line-height are now forced to 400/1.5 on body-only selectors (titles and
 *    the submit button are deliberately excluded — same "target what it is,
 *    not what it's named" logic as the label/heading fix, extended to
 *    borders: no known class exists for the box, so it's detected by its
 *    COMPUTED border-width (>1px) instead and thinned to 1px solid #e6e6e6
 *    with border-radius:0, matching this site's own established subtle-edge
 *    convention (documented in CLAUDE.md as the border/shadow vocabulary
 *    used everywhere else instead of a heavy or rounded box).
 * 4. The height-sync fix below (syncFrameHeight) originally only re-ran when
 *    the iframe's OWN document mutated or on a fixed startup interval — so a
 *    fixed height applied once at load stayed locked forever, even though
 *    this iframe sits in a responsive column: narrowing the host browser
 *    changes the iframe's own rendered WIDTH, which reflows the form's
 *    fields (labels wrap, fields stack) and changes how much height it
 *    actually needs, in either direction, with no DOM mutation inside the
 *    iframe to trigger anything. Reported symptom: after the first fix, a
 *    narrower width clipped content off the bottom (fixed height now too
 *    SHORT for the reflowed content) instead of leaving a gap. Fixed by
 *    re-running the same syncFrameHeight() on every width change, via a
 *    ResizeObserver on the iframe element itself (see watch(), below) —
 *    so the iframe now tracks whatever height it actually needs at any
 *    width, continuously, with no fixed floor or ceiling.
 * 5. syncFrameHeight()'s original measurement technique (reset the iframe's
 *    own CSS height to 'auto', THEN read scrollHeight, since scrollHeight
 *    of the root scrolling element is defined as max(real content, current
 *    viewport height) and otherwise just reflects a too-tall height back)
 *    had a real side effect once it started re-running continuously instead
 *    of just once at load: setting the iframe's CSS height directly changes
 *    the HOST PAGE's own layout height too (the iframe occupies real space
 *    in that document), so every re-sync briefly, genuinely shrank the
 *    whole host page before growing it back a moment later. If the visitor
 *    was scrolled near the bottom when that fired, the browser clamped
 *    their scroll position to fit the momentarily-shorter page, and it did
 *    NOT return on its own once the height grew back — visible as an
 *    unexplained jump back up the page (reported: "jumping you back up to
 *    the middle of the form"). Fixed by never touching the iframe's own
 *    CSS height for the purpose of MEASURING at all: a normal in-flow
 *    content element's own rendered height reflects only its own content,
 *    not the height of some ancestor being stretched to fill the iframe's
 *    viewport, so reading the real bottom edge of the actual top-level
 *    content elements (not the root document/body) gives an accurate
 *    reading with zero effect on the iframe's CSS height, hence zero effect
 *    on the host page's layout or scroll position, right up until the one
 *    deliberate height write at the end — and even that write is now
 *    skipped whenever the measured height hasn't meaningfully changed. */
try {
(function(){
  var CSS = ".ff-general-text-label{font-size:18px!important;color:#454545!important;line-height:1.5!important;font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;}"
    + ".ff-label{font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;color:#1a1a1a!important;font-size:16px!important;font-weight:400!important;}"
    + ".ff-required-mark{color:#e21833!important;}"
    + ".ff-input-type input,.ff-input-type textarea,.ff-input-type select{font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;color:#1a1a1a!important;font-size:16px!important;border:1px solid #cfcfcf!important;border-radius:4px!important;padding:12px 14px!important;background-color:#ffffff!important;box-sizing:border-box!important;}"
    + ".ff-btn-submit{font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;background-color:#e21833!important;color:#ffffff!important;font-weight:700!important;border:0!important;border-radius:4px!important;padding:14px 32px!important;cursor:pointer!important;}"
    + ".ff-page-header,.ff-invalid-msg,.ff-alink,.ff-footnote-label{font-family:\"Interstate\",\"Helvetica Neue\",Arial,sans-serif!important;}"
    // Inline text links written INTO a question's own label/instruction copy
    // (e.g. "For more details Click Here") are plain <a> tags with no
    // Formstack-added class at all — Formstack only classes its OWN
    // functional UI links (.ff-alink, the repeatable-section Add/Remove
    // controls) differently. Deliberately NOT scoped to ".ff-label a"/
    // ".ff-general-text-label a" (an earlier, narrower version of this rule
    // — a real ancestor assumption that was never confirmed against the
    // actual live markup and turned out wrong): matches ANY <a> in the form
    // except .ff-alink, so it can't miss a link sitting under some other
    // wrapper class. Matches the site's established if-inline-link look
    // (color/weight/no-underline; letter-spacing intentionally left off
    // since that value is Interstate-specific kerning, not required for the
    // link to read as "on-brand").
    // .ff-fileupload-select (the "Add File..." trigger) is deliberately
    // EXCLUDED here — it needs a completely different treatment (grey at
    // rest, red only on hover, see below), not the always-red inline-link
    // look every other bare <a> gets.
    + "a:not(.ff-alink):not(.ff-fileupload-select){color:#e21833!important;font-weight:700!important;text-decoration:none!important;}"
    // The clickable "Add File..." trigger inside a file-upload field
    // (.ff-fileupload-select — confirmed as a real class name straight out
    // of Formstack's own Main.js) is meant to REST at its own normal
    // (grey/body) color — same as the surrounding form text — and only
    // turn red on hover, i.e. a genuine two-state rollover, not a static
    // link color. Only :hover/:active/:focus are touched, and only color —
    // font-weight/text-decoration are deliberately left alone at every
    // state so nothing about its rest appearance changes. A plain inline
    // JS-forced style could never express this (an inline style is one
    // static value with no notion of interaction state), so this has to be
    // a real stylesheet rule.
    + ".ff-fileupload-select:hover,.ff-fileupload-select:active,.ff-fileupload-select:focus{color:#e21833!important;}";
  var FONT_STACK = '"Interstate","Helvetica Neue",Arial,sans-serif';
  // Broad: every visible text piece gets the site's sans-serif face, titles included.
  var FONT_SEL = '.ff-general-text-label,.ff-label,.ff-input-type input,.ff-input-type textarea,.ff-input-type select,.ff-btn-submit,.ff-page-header,.ff-invalid-msg,.ff-alink,.ff-footnote-label,label,h1,h2,h3,h4,h5,h6,legend';
  // Narrower: "body" text only (instructions, questions, field labels, field
  // values) — titles/headings and the submit button are deliberately excluded
  // per the user's own read ("the title pieces you just fixed are fine").
  var BODY_SEL = '.ff-general-text-label,.ff-label,label,.ff-input-type input,.ff-input-type textarea,.ff-input-type select';
  var watched = null;
  function forceInlineFonts(doc){
    try {
      var els = doc.querySelectorAll(FONT_SEL);
      for (var i = 0; i < els.length; i++) {
        els[i].style.setProperty('font-family', FONT_STACK, 'important');
      }
      var bodyEls = doc.querySelectorAll(BODY_SEL);
      for (var j = 0; j < bodyEls.length; j++) {
        bodyEls[j].style.setProperty('font-weight', '400', 'important');
        bodyEls[j].style.setProperty('line-height', '1.5', 'important');
      }
      // Same belt-and-suspenders reasoning as the font-family fix above: a
      // plain stylesheet rule already targets these via the CSS string, but
      // this also forces the color/weight/underline inline so nothing
      // Formstack's own engine sets directly on the element (rather than via
      // its stylesheet) can silently win the cascade. Queries ALL <a> tags
      // in the iframe document directly (not scoped to a specific ancestor
      // class) — see the CSS rule's own comment for why an ancestor-scoped
      // version was dropped.
      var linkEls = doc.querySelectorAll('a');
      for (var k = 0; k < linkEls.length; k++) {
        if (linkEls[k].classList.contains('ff-alink')) continue;
        // .ff-fileupload-select rests at its own normal color and only
        // turns red on :hover (handled by the CSS rule above) — must NOT
        // get an unconditional inline color forced here, or that inline
        // value would apply at ALL times, including rest, overriding the
        // grey it's supposed to keep when not hovered.
        if (linkEls[k].classList.contains('ff-fileupload-select')) continue;
        linkEls[k].style.setProperty('color', '#e21833', 'important');
        linkEls[k].style.setProperty('font-weight', '700', 'important');
        linkEls[k].style.setProperty('text-decoration', 'none', 'important');
      }
    } catch (e) {}
    forceThinBorders(doc);
  }
  // No known class name for the heavy 2-3px, rounded-corner box Formstack
  // draws around each page/section — same problem as the earlier per-field
  // labels (mostly built via jQuery, not literal HTML strings a static grep
  // can find). Rather than guess another class, this detects the box by its
  // COMPUTED STYLE instead of its name: any element with more than 1px of
  // border on any side gets thinned to the site's own established subtle-edge
  // convention (1px solid #e6e6e6, the same value used for card/section
  // borders elsewhere on this site) and squared off (border-radius:0),
  // matching the user's explicit ask ("just make those borders one pixel...
  // slightly rounded corners which aren't really in keeping with the site").
  function forceThinBorders(doc){
    try {
      var all = doc.querySelectorAll('*');
      var sides = ['Top', 'Right', 'Bottom', 'Left'];
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var cs = getComputedStyle(el);
        var hadThickBorder = false;
        for (var s = 0; s < 4; s++) {
          var side = sides[s];
          if (cs['border' + side + 'Style'] !== 'none' && parseFloat(cs['border' + side + 'Width']) > 1) {
            hadThickBorder = true;
            el.style.setProperty('border-' + side.toLowerCase() + '-width', '1px', 'important');
            el.style.setProperty('border-' + side.toLowerCase() + '-color', '#e6e6e6', 'important');
            el.style.setProperty('border-' + side.toLowerCase() + '-style', 'solid', 'important');
          }
        }
        if (parseFloat(cs.borderTopLeftRadius) > 0 || parseFloat(cs.borderTopRightRadius) > 0
          || parseFloat(cs.borderBottomLeftRadius) > 0 || parseFloat(cs.borderBottomRightRadius) > 0) {
          el.style.setProperty('border-radius', '0px', 'important');
        }
        // The box itself (the element whose border was just thinned) gets a
        // faint lift so it pops off the page — this site's own established
        // subtle-shadow value, reused verbatim (same one used on the header
        // bars, the Walk-the-Factory bar, and the Premise section) rather
        // than inventing a new one. Also force overflow:visible on it — a
        // rounded box very commonly carries overflow:hidden to clip its own
        // content to the (now-removed) rounded corners, and overflow:hidden
        // clips that SAME element's own box-shadow from ever being painted
        // even though the property still computes as set. Safe to force
        // here specifically because the corners are already squared off, so
        // there's no rounding left to clip content to.
        if (hadThickBorder) {
          el.style.setProperty('box-shadow', '0 4px 8px -2px rgba(0,0,0,0.06)', 'important');
          el.style.setProperty('overflow', 'visible', 'important');
        }
      }
    } catch (e) {}
  }
  function keepLast(doc){
    try {
      var head = doc.head || doc.body || doc.documentElement;
      if (!doc.getElementById('if-ff-iframe-font')) {
        var l = doc.createElement('link');
        l.id = 'if-ff-iframe-font';
        l.rel = 'stylesheet';
        l.href = 'https://use.typekit.net/fdu6zpb.css';
        head.appendChild(l);
      }
      var existing = doc.getElementById('if-ff-iframe-css');
      var s = existing || doc.createElement('style');
      s.id = 'if-ff-iframe-css';
      s.textContent = CSS;
      head.appendChild(s);
      forceInlineFonts(doc);
      syncFrameHeight(doc);
    } catch (e) {}
  }
  // Formstack sets the iframe's own height itself (FFSetIframeSize, in the
  // embed's own script) based on the form's content height AT THE MOMENT IT
  // MEASURES — before this module's own font/weight/line-height changes have
  // been applied, and potentially before conditional fields finish showing/
  // hiding or a multi-page form settles on its actual visible page. That
  // locked-in height can end up taller than the real, final rendered content,
  // leaving a block of blank space between the form and the footer below it
  // (reported: ~260px on one page, ~650px on the other — the size varies with
  // how much each specific form's content shifted, not a fixed amount).
  // Rather than reverse-engineer exactly when/how Formstack calls
  // FFSetIframeSize, this re-measures the iframe's OWN real content height
  // every time it re-asserts styling anyway and sets the height to match —
  // self-correcting regardless of the exact cause, the same "fix the
  // resulting state, not the internal mechanism" approach used for the
  // fonts/borders above.
  function syncFrameHeight(doc){
    try {
      var frameEl = doc.defaultView && doc.defaultView.frameElement;
      if (!frameEl || !doc.body) return;
      // Measure the real bottom edge of the actual top-level content
      // elements directly — NOT document.body/documentElement.scrollHeight.
      // The root scrolling element's scrollHeight is defined as max(real
      // content, the iframe's own current viewport height), so it can only
      // be read honestly by first resetting the iframe's CSS height —  but
      // doing that on every re-sync (not just once at load) visibly shrinks
      // the HOST page too while it's mid-measurement, which can jump the
      // visitor's scroll position (see "5." above). A normal in-flow
      // element's own rendered box reflects only its own content, not the
      // size of some ancestor being stretched to fill the iframe's
      // viewport, so this never needs to touch the iframe's height at all
      // to get an accurate reading.
      var kids = doc.body.children;
      var maxBottom = 0;
      for (var i = 0; i < kids.length; i++) {
        // getBoundingClientRect().bottom stops at the element's own border
        // box — it does NOT include that element's own trailing margin,
        // which still occupies real, scrollable space below it (verified:
        // undercounted a form ending in a field with margin-bottom by
        // ~14-16px until this was added).
        var mb = parseFloat(getComputedStyle(kids[i]).marginBottom) || 0;
        var b = kids[i].getBoundingClientRect().bottom + mb;
        if (b > maxBottom) maxBottom = b;
      }
      var scrollY = (doc.defaultView && doc.defaultView.scrollY) || 0;
      var real = Math.ceil(maxBottom + scrollY) + 2; // +2px: avoid a hairline clip from subpixel rounding
      var current = frameEl.getBoundingClientRect().height;
      if (real > 0 && Math.abs(real - current) > 2) {
        frameEl.style.setProperty('height', real + 'px', 'important');
      }
    } catch (e) {}
  }
  function revealWrapper(doc){
    try {
      var frameEl = doc.defaultView && doc.defaultView.frameElement;
      var wrapper = frameEl && (frameEl.closest ? frameEl.closest('#iFrameWrapper') : frameEl.parentElement);
      if (wrapper) wrapper.classList.add('if-ff-ready');
    } catch (e) {}
  }
  function watch(doc){
    if (watched === doc) return;
    watched = doc;
    keepLast(doc);
    revealWrapper(doc);
    try {
      var flag = { self: false };
      var reassertSoon = function(){
        if (flag.self) return;
        flag.self = true;
        keepLast(doc);
        setTimeout(function(){ flag.self = false; }, 0);
      };
      var mo = new MutationObserver(reassertSoon);
      var obsOpts = { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] };
      mo.observe(doc.head || doc.documentElement, { childList: true });
      if (doc.body) mo.observe(doc.body, obsOpts);
      else { var bodyPoll = setInterval(function(){ if (doc.body) { mo.observe(doc.body, obsOpts); clearInterval(bodyPoll); } }, 300); }
    } catch (e) {}
    // Keep the height in sync with the iframe's own WIDTH, continuously, not
    // just once — see the "4." note in this module's header comment above.
    // Two mechanisms, belt-and-suspenders:
    // 1. A ResizeObserver on the iframe element itself, from the host side —
    //    fires the instant the host page gives it a different width (e.g. a
    //    responsive column reflowing on window resize). Guarded to act only
    //    when WIDTH actually changed: syncFrameHeight() below sets a new
    //    HEIGHT on this same element, which would otherwise immediately
    //    re-trigger this same observer forever; a self-triggered entry never
    //    changes width, so comparing against the last-seen width silently
    //    absorbs it with no extra re-entrancy flag needed.
    // 2. A debounced window resize listener as cheap extra coverage for any
    //    environment where ResizeObserver either isn't available or the
    //    guard above happens to land on an unchanged width mid-reflow.
    try {
      var frameEl = doc.defaultView && doc.defaultView.frameElement;
      if (frameEl) {
        var lastW = null;
        if (typeof ResizeObserver !== 'undefined') {
          var ro = new ResizeObserver(function(entries){
            for (var i = 0; i < entries.length; i++) {
              var w = entries[i].contentRect ? entries[i].contentRect.width : frameEl.clientWidth;
              if (lastW === null) { lastW = w; continue; }
              if (Math.abs(w - lastW) > 1) { lastW = w; syncFrameHeight(doc); }
            }
          });
          ro.observe(frameEl);
        }
        var resizeTimer = null;
        window.addEventListener('resize', function(){
          if (resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function(){ syncFrameHeight(doc); }, 150);
        });
      }
    } catch (e) {}
    var safetyTries = 0;
    var safetyNet = setInterval(function(){
      safetyTries++;
      forceInlineFonts(doc);
      syncFrameHeight(doc);
      if (safetyTries > 60) clearInterval(safetyNet);
    }, 1000);
  }
  function tryFind(frame){
    try {
      var doc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
      if (!doc) return false;
      if (!doc.querySelector('.ff-label,.ff-form,.ff-general-text-label')) return false;
      watch(doc);
      return true;
    } catch (e) { return false; }
  }
  var tries = 0;
  var timer = setInterval(function(){
    tries++;
    var frames = document.querySelectorAll('iframe');
    var found = false;
    for (var i = 0; i < frames.length; i++) { if (tryFind(frames[i])) found = true; }
    if (found || tries > 40) clearInterval(timer);
  }, 500);
  // Hard fallback: force the wrapper visible after 6s no matter what, so a
  // future regression in the detection/styling above (a changed selector, a
  // slow network, anything) can never leave the whole form permanently
  // invisible — worst case it just shows a moment later, unstyled, exactly
  // like before this reveal-on-ready behavior existed, instead of vanishing.
  setTimeout(function(){
    try {
      var wraps = document.querySelectorAll('#iFrameWrapper');
      for (var w = 0; w < wraps.length; w++) { wraps[w].classList.add('if-ff-ready'); }
    } catch (e) {}
  }, 6000);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] ff-form-iframe-css error:', _e); } catch (_) {} }

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
       reduced-motion = instant show/hide. Dials: fade-out 160ms / fade-in 440ms / scale 0.985. */
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
      for(i=0;i<visible.length;i++){var vc=visible[i];vc.style.transition='opacity 160ms ease';vc.style.opacity='0';}
      var swap=function(){
        if(tok!==_fxtok)return;
        var j,shown=[];
        for(j=0;j<cards.length;j++){cards[j].classList.toggle('if-prog-hidden',!target[j]);if(target[j])shown.push(cards[j]);else _clearFx(cards[j]);}
        for(j=0;j<shown.length;j++){var sc=shown[j];sc.style.transition='none';sc.style.opacity='0';sc.style.transform='scale(0.985)';}
        void grid.offsetWidth;
        for(j=0;j<shown.length;j++){var sp=shown[j];sp.style.transition='opacity 440ms ease,transform 440ms cubic-bezier(0.22,1,0.36,1)';sp.style.opacity='';sp.style.transform='';}
        setTimeout(function(){if(tok!==_fxtok)return;var m;for(m=0;m<shown.length;m++)_clearFx(shown[m]);},680);
      };
      if(visible.length)setTimeout(swap,170);else swap();
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

/* ===== module: read-line (footer-CTA-style word-by-word read on a headline) =====
   Any element with class .if-readline gets the footer-CTA reading reveal: its words dim then
   brighten one-by-one on first mouseenter of its section; a wrapped accent phrase (a child
   element, e.g. <span class="if-mani-red">) reddens as the read reaches it and HOLDS. Words are
   split at runtime so the source stays natively editable. Class-driven + portable. */
try {
(function(){
  var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function splitInto(text,parent,wrap,words){
    var parts=text.split(/(\s+)/);
    for(var i=0;i<parts.length;i++){var tok=parts[i];if(tok==='')continue;
      if(/^\s+$/.test(tok)){parent.appendChild(document.createTextNode(tok));}
      else{var s=document.createElement('span');s.className='if-rl-word';s.textContent=tok;parent.appendChild(s);words.push({span:s,wrap:wrap});}}
  }
  function wire(head){
    if(head.__ifrl)return;head.__ifrl=1;
    var words=[],nodes=[].slice.call(head.childNodes),n;
    for(n=0;n<nodes.length;n++){var node=nodes[n];
      if(node.nodeType===3){var frag=document.createDocumentFragment();splitInto(node.textContent,frag,null,words);head.replaceChild(frag,node);}
      else if(node.nodeType===1){var wrap=node,txt=node.textContent;node.textContent='';splitInto(txt,node,wrap,words);}}
    if(!words.length)return;
    if(reduce){for(var r=0;r<words.length;r++){if(words[r].wrap)words[r].wrap.classList.add('if-lit-red');}return;}
    var N=words.length,last=N-1,played=false;
    function setStep(step){for(var i=0;i<N;i++){var o=words[i],lit=o.wrap&&o.wrap.classList.contains('if-lit-red');
      o.span.style.opacity=(step===999)?1:(step===i?1:(lit?1:0.62));
      if((step===i||step===999)&&o.wrap)o.wrap.classList.add('if-lit-red');}}
    function run(){var D=180,gap=40,lastExtra=640,tail=150,seq=[],w;
      for(w=0;w<N;w++){seq.push({step:w,hold:D+(w===last?lastExtra:0)});if(w<last)seq.push({step:-1,hold:gap});}
      seq.push({step:-1,hold:tail});seq.push({step:999,hold:0});
      var k=0;(function tick(){var s=seq[k];if(s.step===999)head.classList.add('rl-settling');setStep(s.step);k++;if(k<seq.length)setTimeout(tick,s.hold);})();}
    var trig=head.closest('section')||head;
    function onEnter(){if(played)return;played=true;trig.removeEventListener('mouseenter',onEnter);run();}
    trig.addEventListener('mouseenter',onEnter);
  }
  function init(){var hs=document.querySelectorAll('.if-readline');for(var i=0;i<hs.length;i++)wire(hs[i]);}
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] read-line error:', _e); } catch (_) {} }

/* ===== module: count-up (proof stats, .if-countup) =====
   Carried over unchanged from the removed base-v1 copy - only the wiring changed (registers
   with ifScrollEngine instead of its own private scroll listener). Rolls 0 -> value once
   scrolled into view, fading in while counting, accelerating into the final number
   (easeInCubic). Preserves prefix/suffix/commas. Separate, deliberately, from
   hero-countup-easeout below (renamed off .if-hero-countup, see that module's own comment) -
   that one used a different easing curve on purpose for a different context (a hero-banner
   stat), so it was never a duplicate pair to consolidate.
   Selector also lists MIPS-Impact's and ASPIRE-Home's own standalone number classes
   (glance-value, stats-value, aspire-numbers-countup) directly by name, alongside .if-countup -
   added 2026-09-09 so those numbers count up the same way Home's do, WITHOUT sharing Home's
   if-countup style object (that coupling was deliberately removed once already per page, see
   CLAUDE-HISTORY.md HARD RULE #10 / §149). A combined set_style adding a brand-new marker class
   alongside an existing one kept failing ("styles not found") on freshly-created classes in the
   same session, so naming the classes directly in the selector was used instead of a marker
   class - same pattern stage-parallax already uses below for its own legacy+current class
   aliasing. Any FUTURE spinoff wanting this same effect just needs its own number class added
   to this one selector list - no Designer-side change required. */
try {
(function(){
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var els = document.querySelectorAll('.if-countup, .program-page-mips-impact-glance-value, .program-page-mips-impact-stats-value, .program-page-aspire-numbers-countup');
  els.forEach(function(el){
    if(el.__ifcu) return; el.__ifcu = 1;
    var value = el.getAttribute('data-value') || el.textContent.trim();
    var m = value.match(/^([^\d]*)([\d.,]+)(.*)$/) || [null,'','0',''];
    var numStr = m[2], hasComma = numStr.indexOf(',')>=0, plain = numStr.replace(/,/g,'');
    var dot = plain.indexOf('.'), decimals = dot>=0 ? plain.length-dot-1 : 0;
    var prefix = m[1]||'', suffix = m[3]||'', target = parseFloat(plain)||0;
    function fmt(n){ var s = n.toFixed(decimals); if(hasComma){ var p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g,','); s = p.join('.'); } return prefix+s+suffix; }
    if(reduce){ el.textContent = value; el.style.opacity = 1; return; }
    el.style.opacity = 0; el.textContent = fmt(0);
    var started = false;
    function run(){
      var dur = 1600, fade = 480, t0 = performance.now();
      function tick(now){ var dt = now-t0, p = Math.min(1, dt/dur), e = p*p*p; // easeInCubic
        el.textContent = p<1 ? fmt(target*e) : value; el.style.opacity = Math.min(1, dt/fade).toFixed(3);
        if(p<1) requestAnimationFrame(tick); else el.style.opacity = 1; }
      requestAnimationFrame(tick);
    }
    ifScrollEngine.add({
      read: function(){ if(started) return null; var r = el.getBoundingClientRect(); return {top:r.top, bottom:r.bottom, vh: window.innerHeight||document.documentElement.clientHeight}; },
      write: function(m){ if(started || !m) return; if(m.top<m.vh*0.85 && m.bottom>0){ started = true; run(); } }
    });
  });
  ifScrollEngine.kick();
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] count-up error:', _e); } catch (_) {} }

/* ===== module: manifesto-lift (CONSOLIDATED - see CLAUDE.md Class A note) =====
   Was two independent generations both targeting .if-manifesto: a legacy copy (no
   .if-scroll-red exclusion, HOLD=1700/GAP=620, no guard) and this current one
   (excludes .if-scroll-red, HOLD=1130/GAP=410, guarded by __ifmani). The legacy copy is
   REMOVED - confirmed dead before removal, since its target (.if-manifesto-line spans)
   are created by THIS module at runtime and the legacy copy always ran first (earlier in
   this file) and found none, every time, on every page checked. This copy's values/
   exclusion are authoritative (per CLAUDE.md's own record, they're the only ones that
   were ever actually playing). Plays once when scrolled into the lower-middle of the
   viewport. */
try {
(function(){
  var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var h2=document.querySelector('.if-manifesto:not(.if-scroll-red)');
  if(h2 && !h2.__ifmani){
    var lines=h2.querySelectorAll(':scope > span');
    if(lines.length){
      h2.__ifmani=1;
      lines.forEach(function(l){l.classList.add('if-manifesto-line');});
      if(reduce){
        lines.forEach(function(l){var r=l.querySelector('.if-mani-red');if(r)r.classList.add('if-lit-red');});
      } else {
        var played=false;
        function run(){
          /* will-change set only for this one-shot sequence's own duration, cleared at
             settle - never a permanent CSS declaration (B3 rule, see idea-factory.css). */
          lines.forEach(function(l){l.style.willChange='transform, text-shadow, opacity';});
          var HOLD=1130,GAP=410,seq=[],i;
          for(i=0;i<lines.length;i++){seq.push({k:i,hold:HOLD});if(i<lines.length-1)seq.push({k:-1,hold:GAP});}
          seq.push({k:999,hold:0});
          var s=0;
          function step(){
            var cur=seq[s];
            if(cur.k===999){h2.classList.remove('is-dimming');lines.forEach(function(l){l.classList.remove('is-lift');l.style.willChange='';});}
            else{h2.classList.add('is-dimming');lines.forEach(function(l,idx){var on=idx===cur.k;l.classList.toggle('is-lift',on);if(on){var r=l.querySelector('.if-mani-red');if(r)r.classList.add('if-lit-red');}});}
            s++;
            if(s<seq.length)setTimeout(step,cur.hold);
          }
          step();
        }
        ifScrollEngine.add({
          read: function(){ if(played) return null; var r=h2.getBoundingClientRect(); var vh=window.innerHeight||document.documentElement.clientHeight; return {top:r.top, bottom:r.bottom, vh:vh}; },
          write: function(m){ if(played || !m) return; if(m.top>=0 && m.bottom<=m.vh && m.top<=m.vh*0.55){ played=true; run(); } }
        });
        ifScrollEngine.kick();
      }
    }
  }
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] manifesto-lift error:', _e); } catch (_) {} }

/* ===== module: stage-parallax (CONSOLIDATED - see CLAUDE.md Class A note) =====
   Was two independent generations: legacy targeted .if-stage-moment/.if-stage-photo
   (amp=180/over=12/tt=0.72), current targets .if-sm-box/.if-stage-photo-pos
   (amp=250/over=72/tt=0.65). Both class names are matched here (aliased) so any spinoff
   markup still carrying the legacy names keeps working; the legacy target was confirmed
   to not exist on any live page before this change, so this is a safety net, not a
   behavior change for anything live today. Current generation's parameter values are
   authoritative (they're the only ones actually live).
   PERF FIXES applied while consolidating (both were in the ORIGINAL brief, kept in scope
   since they're inseparable from migrating this effect at all):
     - B3: will-change is now applied only while the effect is actively animating (between
       its first and last frame) and cleared once locked/settled, instead of being a
       permanent CSS declaration on .if-stage-photo/.if-stage-photo-pos/.if-stage-text for
       the whole life of the page.
     - B4: the photo-zoom used to lerp toward its target 10%/frame (cur += (tgt-cur)*0.1)
       and kept scheduling new animation frames on its own until the gap converged below
       0.0002 - meaning it kept running for ~60 frames (about a second) after the LAST
       scroll event, and it only had a chance to run at all because it self-scheduled via
       requestAnimationFrame independent of any new scroll input. Under the new engine,
       effects only get a frame when scroll/resize actually fires, so a lerp like that
       would freeze partway and never finish settling. Replaced with a direct mapping
       (cur = target, computed straight from the scroll-position-driven "peak" ratchet,
       no smoothing lerp) - same peak-ratchet behavior (zoom holds instead of reversing on
       scroll-up, re-arms only once the section scrolls fully out of view), but the very
       last ~1s of "catch-up" easing after you stop scrolling is gone (it now tracks scroll
       position exactly, every frame, rather than easing toward it). This is a real, minor,
       intentional visual difference - flagged rather than silently absorbed. */
try {
(function(){
  var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var sec=document.querySelector('.if-sm-box, .if-stage-moment');
  if(sec && !sec.__ifsm){
    sec.__ifsm=1;
    if(!reduce){
      var txt=sec.querySelector('.if-stage-text');
      var imgs=sec.querySelectorAll('.if-stage-photo-pos, .if-stage-photo');
      var smooth=function(x){return x*x*x*(x*(x*6-15)+10);};
      var txtLocked=false;
      var MIN=1.0,MAX=1.16,peak=0,imgSettled=false;
      ifScrollEngine.add({
        read: function(){
          var rect=sec.getBoundingClientRect(),vh=window.innerHeight||document.documentElement.clientHeight;
          return {top:rect.top, vh:vh};
        },
        write: function(m){
          if(!m) return;
          if(txt && !txtLocked){
            var amp=250,startTop=m.vh*0.88,endTop=m.vh*0.16;
            var p=Math.max(0,Math.min(1,(startTop-m.top)/(startTop-endTop)));
            var over=72,tt=0.65,shift;
            if(p<tt)shift=-amp+(amp+over)*smooth(p/tt);else shift=over*(1-smooth((p-tt)/(1-tt)));
            var sc=1+0.06*smooth(p);
            if(p>0 && p<1) txt.style.willChange='transform,opacity';
            txt.style.transform='translateY('+shift.toFixed(1)+'px) scale('+sc.toFixed(4)+')';
            txt.style.opacity=(p*p).toFixed(3);
            if(p>=1){txtLocked=true;txt.style.transform='translateY(0px) scale(1.06)';txt.style.opacity='1';txt.style.willChange='auto';}
          }
          if(imgs && imgs.length){
            var p2=Math.max(0,Math.min(1,(m.vh*0.88-m.top)/(m.vh*0.88-m.vh*0.16)));
            if(m.top>=m.vh){ peak=0; } else if(p2>peak){ peak=p2; }
            var eased=1-Math.pow(1-peak,3), cur=MIN+(MAX-MIN)*eased;
            var animating = peak>0 && peak<1;
            var tf='translateZ(0) scale('+cur.toFixed(4)+')';
            for(var i=0;i<imgs.length;i++){ if(animating) imgs[i].style.willChange='transform'; imgs[i].style.transform=tf; if(!animating) imgs[i].style.willChange='auto'; }
          }
        }
      });
      ifScrollEngine.kick();
    }
  }
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] stage-parallax error:', _e); } catch (_) {} }

/* ===== module: syn-moment (About synthesis "One place. Every stage." scroll) =====
   Mirrors the Home stage-moment scroll on the About synthesis band: the text block
   (.if-syn-inner) drifts down + scales + fades in as it enters; the background photo
   (.if-syn-bg) zooms 1.0->1.16 on scroll. The .if-syn-hero section already clips
   (overflow:hidden). Independent of the Home stage-parallax module (left untouched).
   Migrated onto ifScrollEngine; same B3/B4 fixes as stage-parallax above (will-change
   only while animating; direct scroll-to-scale mapping, no persistent lerp loop). */
try {
(function(){
  var reduce=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function init(){
    var sec=document.querySelector('.if-syn-hero');if(!sec||sec.__ifsyn)return;sec.__ifsyn=1;if(reduce)return;
    var txt=sec.querySelector('.if-syn-inner'),img=sec.querySelector('.if-syn-bg');
    var smooth=function(x){return x*x*x*(x*(x*6-15)+10);};
    var txtLocked=false;
    var MIN=1.0,MAX=1.16,peak=0;
    if(txt)txt.style.transformOrigin='left center';
    ifScrollEngine.add({
      read: function(){ var rect=sec.getBoundingClientRect(),vh=window.innerHeight||document.documentElement.clientHeight; return {top:rect.top, vh:vh}; },
      write: function(m){
        if(!m) return;
        if(txt && !txtLocked){
          var amp=200,startTop=m.vh*0.9,endTop=m.vh*0.2;
          var p=Math.max(0,Math.min(1,(startTop-m.top)/(startTop-endTop)));
          var over=48,tt=0.68,shift;if(p<tt)shift=-amp+(amp+over)*smooth(p/tt);else shift=over*(1-smooth((p-tt)/(1-tt)));
          var sc=1+0.05*smooth(p);
          if(p>0 && p<1) txt.style.willChange='transform,opacity';
          txt.style.transform='translateY('+shift.toFixed(1)+'px) scale('+sc.toFixed(4)+')';txt.style.opacity=(p*p).toFixed(3);
          if(p>=1){txtLocked=true;txt.style.transform='translateY(0px) scale(1.05)';txt.style.opacity='1';txt.style.willChange='auto';}
        }
        if(img){
          var p2=Math.max(0,Math.min(1,(m.vh*0.9-m.top)/(m.vh*0.9-m.vh*0.2)));
          if(m.top>=m.vh){ peak=0; } else if(p2>peak){ peak=p2; }
          var eased=1-Math.pow(1-peak,3), cur=MIN+(MAX-MIN)*eased;
          var animating = peak>0 && peak<1;
          img.style.willChange = animating ? 'transform' : 'auto';
          img.style.transform='translateZ(0) scale('+cur.toFixed(4)+')';
        }
      }
    });
    ifScrollEngine.kick();
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] syn-moment error:', _e); } catch (_) {} }

/* ===== module: about-goldbars (scroll-width, like the Hero gold bar) =====
   The stage-photo gold bars (.if-stg-goldbar) and the synthesis gold bar (.if-syn-goldbar)
   grow in width 30%->90% as they scroll into view, matching .if-hero-goldbar.
   PERF: previously wrote element.style.width on every scroll frame - width is a
   layout-affecting property, so that forced a real synchronous layout recalculation
   on every single scroll frame, for every bar on the page (up to 5 on the About page).
   Fixed to set the CSS width ONCE (to its own max value) and drive the actual growth
   via transform:scaleX() instead, which is compositor-only and never touches layout.
   transform-origin:left keeps it anchored/growing from the left edge exactly like the
   old width-based version did. Migrated onto ifScrollEngine (was already RAF-gated
   correctly on its own private listener; only the wiring changed here). */
try {
(function(){
  function init(){var bars=document.querySelectorAll('.if-stg-goldbar, .if-syn-goldbar');if(!bars.length)return;
    var MIN=30,MAX=90,i;
    for(i=0;i<bars.length;i++){var _bar=bars[i];var _max=_bar.classList.contains('if-syn-goldbar')?60:MAX;_bar.style.width=_max+'%';_bar.style.transformOrigin='left center';}
    ifScrollEngine.add({
      read: function(){ return window.innerHeight||document.documentElement.clientHeight; },
      write: function(vh){
        var j;
        for(j=0;j<bars.length;j++){var _b=bars[j];var r=_b.getBoundingClientRect();var p=(vh-r.top)/(vh+r.height);if(p<0)p=0;if(p>1)p=1;var mx=_b.classList.contains('if-syn-goldbar')?60:MAX;var w=MIN+(mx-MIN)*p;_b.style.transform='scaleX('+(w/mx)+')';}
      }
    });
    ifScrollEngine.kick();
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] about-goldbars error:', _e); } catch (_) {} }

/* ===== module: scroll-red (accent phrase reddens on scroll — no read/lift) =====
   Any heading with class .if-scroll-red stays all-black; its wrapped accent (.if-mani-red child)
   fades to red once the heading has scrolled ~1/3 of the way up into the viewport, and HOLDS.
   No word-by-word read, no line-lift — just the color. Color transition lives on .if-mani-red.
   Migrated onto ifScrollEngine. */
try {
(function(){
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var TRIGGER = 2/3; // fire when heading top has risen above this fraction of viewport height
  function init(){
    var heads = document.querySelectorAll('.if-scroll-red');
    if(!heads.length) return;
    var items = [];
    for(var i=0;i<heads.length;i++){ var h=heads[i]; if(h.__ifsr) continue; h.__ifsr=1;
      var reds = h.querySelectorAll('.if-mani-red'); if(reds.length) items.push({h:h, reds:reds, done:false}); }
    if(!items.length) return;
    if(reduce){ items.forEach(function(it){ for(var k=0;k<it.reds.length;k++) it.reds[k].classList.add('if-lit-red'); }); return; }
    ifScrollEngine.add({
      read: function(){
        var vh = window.innerHeight || document.documentElement.clientHeight, tops=[];
        for(var i=0;i<items.length;i++){ tops.push(items[i].done ? null : items[i].h.getBoundingClientRect().top); }
        return {vh:vh, tops:tops};
      },
      write: function(m){
        if(!m) return;
        for(var i=0;i<items.length;i++){ var it=items[i]; if(it.done || m.tops[i]==null) continue;
          if(m.tops[i] <= m.vh*TRIGGER){ for(var k=0;k<it.reds.length;k++) it.reds[k].classList.add('if-lit-red'); it.done=true; } }
      }
    });
    ifScrollEngine.kick();
  }
  if(document.readyState!=='loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] scroll-red error:', _e); } catch (_) {} }

/* ===== module: walk-sticky (About "Walk the Factory" bar pins under the header) =====
   The .if-walk-sec wayfinding bar pins just below the sticky .if-header while scrolling through
   the Premise + four stages, then is pushed up and released as the .if-syn-hero ("One place.
   Every stage.") section rises to meet it. A spacer preserves layout on pin (no jump). Desktop
   only (>=992) where the bar is one slim row — the stacked mobile form would be too tall to pin.
   Also widens the walk anchors' data-scroll-gap so a stage jump clears the pinned bar. Class-driven.
   Migrated onto ifScrollEngine - both scroll and resize now drive the same read/write pair
   (the engine treats both triggers identically), so the pin geometry + gap sync always run
   together instead of via two separately-named handlers. */
try {
(function(){
  function init(){
    var bar=document.querySelector('.if-walk-sec');
    var stop=document.querySelector('.if-syn-hero');
    var header=document.querySelector('.if-header');
    if(!bar||!stop||bar.__ifwalk)return;bar.__ifwalk=1;
    var spacer=null,stuck=false;
    function active(){var bh=bar.offsetHeight,vh=window.innerHeight||document.documentElement.clientHeight;return bh>0&&bh<vh*0.5;}
    function headerH(){return header?Math.round(header.getBoundingClientRect().height):0;}
    /* gap = bar height so a clicked stage lands FLUSH under the pinned bar (no white strip of the
       preceding section showing); 0 when the bar can't pin. (walk-spy reads this for its threshold.) */
    function syncGap(){var items=bar.querySelectorAll('.if-walk-item'),g=active()?bar.offsetHeight:0,i;
      for(i=0;i<items.length;i++)items[i].setAttribute('data-scroll-gap',g);}
    function unpin(){if(!stuck)return;stuck=false;
      bar.style.position='';bar.style.top='';bar.style.left='';bar.style.width='';bar.style.zIndex='';
      if(spacer&&spacer.parentNode)spacer.parentNode.removeChild(spacer);spacer=null;}
    function pin(r){if(stuck)return;stuck=true;
      spacer=document.createElement('div');spacer.setAttribute('aria-hidden','true');spacer.style.height=r.height+'px';
      bar.parentNode.insertBefore(spacer,bar);
      bar.style.position='fixed';bar.style.left=r.left+'px';bar.style.width=r.width+'px';bar.style.zIndex='40';bar.style.top=headerH()+'px';}
    ifScrollEngine.add({
      read: function(){
        var isActive=active();
        var barRect = isActive && !stuck ? bar.getBoundingClientRect() : null;
        var spacerRect = stuck && spacer ? spacer.getBoundingClientRect() : null;
        /* barH/synTop are read UNCONDITIONALLY (not gated on the current `stuck` flag) - on the
           exact frame pin() first fires, write() flips `stuck` mid-call and then immediately needs
           these same two numbers for the handoff math below; gating the read on the pre-write
           `stuck` value produced a stale barH=0/synTop=0 for that one frame (bar.style.top briefly
           computed as 0px right as it pinned). Both are safe to read every frame regardless of
           stuck state - bar's own height doesn't change across the fixed/in-flow transition (its
           width is pinned to match), and stop's rect is unaffected by whether bar or its spacer is
           currently holding the flow space. */
        var barH = bar.offsetHeight;
        var synTop = stop.getBoundingClientRect().top;
        return {isActive:isActive, hb:headerH(), barRect:barRect, spacerRect:spacerRect, barH:barH, synTop:synTop};
      },
      write: function(m){
        if(!m) return;
        if(!m.isActive){ unpin(); syncGap(); return; }
        if(!stuck && m.barRect && m.barRect.top<=m.hb) pin(m.barRect);
        if(stuck){
          bar.style.top=((m.synTop<m.hb+m.barH)?Math.round(m.synTop-m.barH):m.hb)+'px';
          if(m.spacerRect && m.spacerRect.top>=m.hb) unpin();
        }
        syncGap();
      }
    });
    syncGap();
    ifScrollEngine.kick();
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] walk-sticky error:', _e); } catch (_) {} }

/* ===== module: walk-spy (About "Walk the Factory" current-stage marker) =====
   Scrollspy: the walk button whose linked stage (#stage-0X) is scrolled up to just below the
   pinned bar gets class .is-current — styled (shared CSS) full-colour + a red left bar that stays
   on regardless of hover; hovering a non-current item is full-colour too but has no bar.
   Migrated onto ifScrollEngine. */
try {
(function(){
  function init(){
    var items=[].slice.call(document.querySelectorAll('.if-walk-item[href^="#stage-"]'));
    if(!items.length)return;
    var header=document.querySelector('.if-header'), bar=document.querySelector('.if-walk-sec');
    var pairs=[];
    for(var i=0;i<items.length;i++){var sec=document.getElementById(items[i].getAttribute('href').slice(1));if(sec)pairs.push({it:items[i],sec:sec});}
    if(!pairs.length)return;
    ifScrollEngine.add({
      read: function(){
        var hb=header?header.getBoundingClientRect().height:0, barH=bar?bar.offsetHeight:0;
        /* threshold must sit just BELOW where a clicked stage lands (headerH + data-scroll-gap),
           else the just-navigated stage stays under the line and the PRECEDING button reads current. */
        var g=parseInt(pairs[0].it.getAttribute('data-scroll-gap'),10); if(isNaN(g)) g=barH;
        var threshold=hb+g+12, tops=[];
        for(var p=0;p<pairs.length;p++){ tops.push(pairs[p].sec.getBoundingClientRect().top); }
        return {threshold:threshold, tops:tops};
      },
      write: function(m){
        if(!m) return;
        var cur=-1, p;
        for(p=0;p<pairs.length;p++){ if(m.tops[p]<=m.threshold) cur=p; }
        for(p=0;p<pairs.length;p++){ pairs[p].it.classList[p===cur?'add':'remove']('is-current'); }
      }
    });
    ifScrollEngine.kick();
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] walk-spy error:', _e); } catch (_) {} }

/* ===== module: jumpnav-spy (current-section marker for a sticky in-page nav bar) =====
   Any link carrying both class .program-page-mips-apply-jumpnav-link and a data-label attribute
   is treated as a jump-nav item; its target is resolved from its own href (#section-id). As the
   page scrolls, whichever target section has most recently scrolled up past the sticky header +
   bar line is marked current by toggling .is-current on that link itself, which reveals a bottom
   border (the link's own base style already reserves a transparent border-bottom of the same
   width, so revealing its color on .is-current never shifts layout). Class-driven, portable to
   any future link sharing the same two markers. Migrated onto ifScrollEngine. */
try {
(function(){
  function init(){
    var links=document.querySelectorAll('.program-page-mips-apply-jumpnav-link[data-label]');
    if(!links.length)return;
    var header=document.querySelector('.if-header');
    var bar=document.querySelector('.program-page-mips-apply-jumpnav-sec');
    var items=[];
    links.forEach(function(a){
      var href=a.getAttribute('href')||'';
      var id=href.charAt(0)==='#'?href.slice(1):null;
      var target=id?document.getElementById(id):null;
      if(target)items.push({target:target,link:a});
    });
    if(!items.length)return;
    ifScrollEngine.add({
      read:function(){
        var headerH=header?header.getBoundingClientRect().height:0;
        var barH=bar?bar.getBoundingClientRect().height:0;
        var line=headerH+barH+12, tops=[];
        for(var i=0;i<items.length;i++){tops.push(items[i].target.getBoundingClientRect().top);}
        return {line:line, tops:tops};
      },
      write:function(m){
        if(!m)return;
        var cur=-1,i;
        for(i=0;i<items.length;i++){if(m.tops[i]<=m.line)cur=i;}
        for(i=0;i<items.length;i++){items[i].link.classList.toggle('is-current',i===cur);}
      }
    });
    ifScrollEngine.kick();
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] jumpnav-spy error:', _e); } catch (_) {} }

/* module: walkcopy-spy — current-section marker for the MIPS-Apply Walk-the-Factory duplicate.
   A link carrying .program-page-mips-apply-walkcopy-item and data-smooth-scroll is tracked; its
   target is resolved from its own href. As the page scrolls, the last target whose top has
   scrolled up past (header + gap + 12) is marked current by toggling the same
   .program-page-mips-apply-walkcopy-current combo already used for the static demo state, so
   this simply makes it live instead. Migrated onto ifScrollEngine. */
try {
(function(){
  function init(){
    var links=document.querySelectorAll('.program-page-mips-apply-walkcopy-item[data-smooth-scroll]');
    if(!links.length)return;
    var header=document.querySelector('.if-header');
    var bar=document.querySelector('.program-page-mips-apply-walkcopy-sec');
    var items=[];
    links.forEach(function(a){
      var href=a.getAttribute('href')||'';
      var id=href.charAt(0)==='#'?href.slice(1):null;
      var target=id?document.getElementById(id):null;
      if(target)items.push({target:target,link:a});
    });
    if(!items.length)return;
    ifScrollEngine.add({
      read:function(){
        var headerH=header?header.getBoundingClientRect().height:0;
        var barH=bar?bar.getBoundingClientRect().height:0;
        var g=parseInt(items[0].link.getAttribute('data-scroll-gap'),10);
        if(isNaN(g))g=barH+24;
        var line=headerH+g+12, tops=[];
        for(var i=0;i<items.length;i++){tops.push(items[i].target.getBoundingClientRect().top);}
        return {line:line, tops:tops};
      },
      write:function(m){
        if(!m)return;
        var cur=-1,i;
        for(i=0;i<items.length;i++){if(m.tops[i]<=m.line)cur=i;}
        for(i=0;i<items.length;i++){items[i].link.classList.toggle('program-page-mips-apply-walkcopy-current',i===cur);}
      }
    });
    ifScrollEngine.kick();
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] walkcopy-spy error:', _e); } catch (_) {} }

/* module: hero-countup-easeout — was one specific instance (MIPS-Impact hero "41:1" stat) that
   needed a different feel than the shared .if-countup (ease-in-cubic, slow start / abrupt stop):
   ease-out-quad instead, for a quicker pickup and a gentle deceleration into the final value.
   Scoped to its own class (.if-hero-countup) so .if-countup and every element using it elsewhere
   were completely unaffected. Migrated onto ifScrollEngine (same pattern as count-up above).
   2026-09-09: the hero "41:1" stat's class was renamed to program-page-mips-impact-hero-stat
   (per the user's request to stop it counting up) - .if-hero-countup no longer exists anywhere
   sitewide, so this module's querySelectorAll now always returns empty and it's a harmless,
   permanent no-op. Left in place (guarded, costs nothing) rather than deleted, in case a future
   hero stat ever wants this exact easing again. */
try {
(function(){
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var els = document.querySelectorAll('.if-hero-countup');
  els.forEach(function(el){
    var value = el.getAttribute('data-value') || el.textContent.trim();
    var m = value.match(/^([^\d]*)([\d.,]+)(.*)$/) || [null,'','0',''];
    var numStr = m[2], hasComma = numStr.indexOf(',')>=0, plain = numStr.replace(/,/g,'');
    var dot = plain.indexOf('.'), decimals = dot>=0 ? plain.length-dot-1 : 0;
    var prefix = m[1]||'', suffix = m[3]||'', target = parseFloat(plain)||0;
    function fmt(n){ var s = n.toFixed(decimals); if(hasComma){ var p = s.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g,','); s = p.join('.'); } return prefix+s+suffix; }
    if(reduce){ el.textContent = value; el.style.opacity = 1; return; }
    el.style.opacity = 0; el.textContent = fmt(0);
    var started = false;
    function run(){
      var dur = 1600, fade = 480, t0 = performance.now();
      function tick(now){ var dt = now-t0, p = Math.min(1, dt/dur), e = 1-(1-p)*(1-p); // easeOutQuad
        el.textContent = p<1 ? fmt(target*e) : value; el.style.opacity = Math.min(1, dt/fade).toFixed(3);
        if(p<1) requestAnimationFrame(tick); else el.style.opacity = 1; }
      requestAnimationFrame(tick);
    }
    ifScrollEngine.add({
      read: function(){ if(started) return null; var r = el.getBoundingClientRect(); return {top:r.top, bottom:r.bottom, vh: window.innerHeight||document.documentElement.clientHeight}; },
      write: function(m){ if(started || !m) return; if(m.top<m.vh*0.85 && m.bottom>0){ started = true; run(); } }
    });
  });
  ifScrollEngine.kick();
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] hero-countup-easeout error:', _e); } catch (_) {} }

/* ===== module: botnav-accent-scroll (spinoff bottom-nav tricolor bars) =====
   Deliberate mirror of the footer's own if-foot-accent scroll module (see the main-bundle
   IIFE that targets '.if-foot-accent') - same scroll-progress formula, applied to every
   [class*="-botnav-accent"] bar (originally .program-page-ventures-botnav-accent; now also
   matches .program-page-cbscf-botnav-accent and any future spinoff's own bar, so a new
   program page's bottom-nav gets this animation automatically as long as it follows the
   established naming convention), but with the travel distance scaled to 1/3 (MAXFRAC =
   -0.20 vs the footer's 0.60) and the sign flipped so the pattern slides in the opposite
   direction as the page scrolls. See idea-factory.css for the matching reversed gradient
   (red/white/gold instead of the footer's gold/white/red). Each bar found gets its own entry
   on ifScrollEngine, keyed off that bar's own position — one page having two bars would
   animate both correctly and independently (not currently the case, but the loop makes no
   page-count assumption).
   PERF: previously read document.documentElement.scrollHeight on every scroll frame (the same
   bug .if-foot-accent had, above) - that flushes layout for the whole document, every frame,
   while scrolling. Document height only ever changes on resize/content-load, never mid-scroll,
   so it's measured once per bar and cached, refreshed only on resize/load/fonts.ready. */
try {
(function(){
  function initBar(bar){
    if (!bar || bar.__ifBotnavAccent) return;
    bar.__ifBotnavAccent = 1;
    var MAXFRAC = -0.20; // 1/3 of the footer bar's 0.60, sign flipped for opposite direction
    var cache={w:0,scrollMax:1};
    function remeasure(){cache.w=bar.offsetWidth||bar.getBoundingClientRect().width;var vh=window.innerHeight||document.documentElement.clientHeight;cache.scrollMax=Math.max(1,(document.documentElement.scrollHeight||document.body.scrollHeight||0)-vh);}
    remeasure();
    window.addEventListener('resize',remeasure,{passive:true});window.addEventListener('load',remeasure);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(remeasure);
    ifScrollEngine.add({
      read:function(){var rect=bar.getBoundingClientRect();var vh=window.innerHeight||document.documentElement.clientHeight;var scrolled=window.pageYOffset||document.documentElement.scrollTop||0;return{vh:vh,top:rect.top,scrolled:scrolled};},
      write:function(m){if(!m)return;var otop=m.top+m.scrolled;var finalTop=otop-cache.scrollMax;var denom=m.vh-finalTop;var p=denom>0?(m.vh-m.top)/denom:1;if(p<0)p=0;if(p>1)p=1;bar.style.backgroundPosition=(p*MAXFRAC*cache.w)+'px 0px';}
    });
  }
  function init(){
    var bars = document.querySelectorAll('[class*="-botnav-accent"]');
    bars.forEach(initBar);
    ifScrollEngine.kick();
  }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] botnav-accent-scroll error:', _e); } catch (_) {} }

/* ===== module: walk-colalign (About "Walk the Factory" stacked column alignment) =====
   When the bar is stacked (2 rows), the buttons' content is centered (CSS). Within each column the
   two stacked buttons have different-length names, so their content lands at different x. This
   equalises the two buttons' text-block width per column (to the column's longest) so the LONGEST
   is centred and the SHORTER left-aligns to it (they share a left edge). Runs on load / fonts /
   resize; clears itself in the one-row (desktop) layout. Measurement-based → portable to any names.
   Also, while stacked, sets the "WALK THE FACTORY / Jump to a stage" label's left padding to match
   the resulting shared text left-edge of the FIRST (leftmost) column — the centered content's x
   position depends on the rendered glyph+text width, which is font/viewport-dependent, so this
   can't be a fixed CSS value; it has to reuse the same measurement this module already does. */
try {
(function(){
  function init(){
    var row=document.querySelector('.if-walk-row'); if(!row) return;
    var items=[].slice.call(row.querySelectorAll('.if-walk-item')); if(!items.length) return;
    var label=document.querySelector('.if-walk-label');
    function txt(it){ return it.querySelector('.if-walk-txt'); }
    function align(){
      var i,t;
      for(i=0;i<items.length;i++){ t=txt(items[i]); if(t) t.style.width=''; }   // reset to natural first
      var topSet={}; for(i=0;i<items.length;i++){ topSet[Math.round(items[i].getBoundingClientRect().top)]=1; }
      if(Object.keys(topSet).length<=1){ if(label) label.style.paddingLeft=''; return; } // one row (desktop) → leave natural
      var cols={};
      for(i=0;i<items.length;i++){ var L=Math.round(items[i].getBoundingClientRect().left); (cols[L]=cols[L]||[]).push(items[i]); }
      var keys=[]; for(var k in cols){ if(cols.hasOwnProperty(k)) keys.push(parseFloat(k)); }
      keys.sort(function(a,b){ return a-b; });
      for(var ci=0;ci<keys.length;ci++){ var grp=cols[keys[ci]], max=0, j, w;
        for(j=0;j<grp.length;j++){ t=txt(grp[j]); if(t){ w=t.getBoundingClientRect().width; if(w>max) max=w; } }
        for(j=0;j<grp.length;j++){ t=txt(grp[j]); if(t) t.style.width=Math.ceil(max)+'px'; }
      }
      if(label && keys.length){
        var firstCol=cols[keys[0]], t0=firstCol[0] && txt(firstCol[0]);
        if(t0){
          var rowLeft=row.getBoundingClientRect().left, txtLeft=t0.getBoundingClientRect().left;
          label.style.paddingLeft=Math.max(0,Math.round(txtLeft-rowLeft))+'px';
        }
      }
    }
    var raf=null; function onR(){ if(raf) cancelAnimationFrame(raf); raf=requestAnimationFrame(align); }
    align();
    window.addEventListener('resize', onR, {passive:true});
    if(document.fonts && document.fonts.ready && document.fonts.ready.then){ document.fonts.ready.then(align); }
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] walk-colalign error:', _e); } catch (_) {} }

/* ===== module: stage-header-eyebrow-fix (About "four stages" glyph/watermark realign) =====
   The glyph-to-title-baseline lock (native CSS calc formula) assumes the eyebrow ("STAGE 0X ...")
   renders as exactly ONE line. Longer stage names wrap to two lines at widths that differ per
   stage (each stage's own text wraps at its own width - measured 450/522/548/488px for the four
   current stages) - no single CSS breakpoint can match all four. This measures the eyebrow's
   ACTUAL rendered height at runtime and nudges the glyph + watermark down by whatever extra
   height wrapping added, at any width, for any future stage-name text - no magic breakpoint. */
try {
(function(){
  function adjust(){
    var secs = document.querySelectorAll('.if-stage-head-sec');
    for (var i=0;i<secs.length;i++){
      var sec = secs[i];
      var eyebrow = sec.querySelector('.if-stage-eyebrow');
      var glyph = sec.querySelector('.if-stage-glyphimg');
      var wm = sec.querySelector('.if-stage-wm');
      if(!eyebrow || !glyph) continue;
      glyph.style.marginTop = '';
      if (wm) wm.style.top = '';
      var fs = parseFloat(getComputedStyle(eyebrow).fontSize) || 0;
      var actualH = eyebrow.getBoundingClientRect().height;
      var extra = Math.round(actualH - fs);
      if (extra < 1) continue;
      var baseGlyphTop = parseFloat(getComputedStyle(glyph).marginTop) || 0;
      glyph.style.marginTop = (baseGlyphTop + extra) + 'px';
      if (wm) {
        var baseWmTop = parseFloat(getComputedStyle(wm).top) || 0;
        wm.style.top = (baseWmTop + extra) + 'px';
      }
    }
  }
  var raf=null; function onR(){ if(raf) cancelAnimationFrame(raf); raf=requestAnimationFrame(adjust); }
  function init(){ adjust(); window.addEventListener('resize', onR, {passive:true}); if(document.fonts && document.fonts.ready && document.fonts.ready.then){ document.fonts.ready.then(adjust); } }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] stage-header-eyebrow-fix error:', _e); } catch (_) {} }

/* ===== module: stage-head-vcenter (About "four stages" equalize top/bottom bar margin) =====
   The section's padding-top/padding-bottom (native CSS) was tuned once for a single-line title;
   it does not re-balance when the title wraps to 2-3 lines (varies per stage/per width), so the
   visual gap above the whole content cluster (glyph+eyebrow+title+watermark) and below it can end
   up unequal. This measures the ACTUAL rendered top/bottom gap at runtime and redistributes the
   section's own padding-top/padding-bottom (their SUM — hence the bar's total height — is left
   unchanged; only the split moves) so the two gaps come out equal. Runs after stage-header-
   eyebrow-fix (later in this file → later init → sees its corrections already applied) so it
   measures final positions, not pre-correction ones. Touches ONLY section padding-top/-bottom —
   no other property, per explicit instruction. */
try {
(function(){
  function centerV(){
    var secs = document.querySelectorAll('.if-stage-head-sec');
    for (var i=0;i<secs.length;i++){
      var sec = secs[i];
      sec.style.paddingTop = ''; sec.style.paddingBottom = ''; // reset to native CSS values first (idempotent re-runs)
      var els = sec.querySelectorAll('.if-stage-glyphimg,.if-stage-eyebrow-row,.if-stage-title,.if-stage-wm');
      if (!els.length) continue;
      var top = Infinity, bottom = -Infinity, r, j;
      for (j=0;j<els.length;j++){ r = els[j].getBoundingClientRect(); if (r.top < top) top = r.top; if (r.bottom > bottom) bottom = r.bottom; }
      var secRect = sec.getBoundingClientRect();
      var topGap = top - secRect.top, bottomGap = secRect.bottom - bottom;
      var delta = topGap - bottomGap;
      if (Math.abs(delta) < 0.5) continue;
      var pt = parseFloat(getComputedStyle(sec).paddingTop) || 0;
      var pb = parseFloat(getComputedStyle(sec).paddingBottom) || 0;
      sec.style.paddingTop = Math.max(0, pt - delta / 2) + 'px';
      sec.style.paddingBottom = Math.max(0, pb + delta / 2) + 'px';
    }
  }
  var raf=null; function onR(){ if(raf) cancelAnimationFrame(raf); raf=requestAnimationFrame(centerV); }
  function init(){ centerV(); window.addEventListener('resize', onR, {passive:true}); if(document.fonts && document.fonts.ready && document.fonts.ready.then){ document.fonts.ready.then(centerV); } }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] stage-head-vcenter error:', _e); } catch (_) {} }

/* ===== module: header-name-fit (header content between the Idea Factory logo and the hamburger
   never breaks beyond its intended shape) =====
   Applies per .if-id-band (the logo + tagline/program-name row). Two content shapes share it:
   program-page identity blocks (.if-hdrprog: glyph badge + program name, e.g. "ASPIRE Program",
   "Maryland Industrial / Partnerships (MIPS)", "Minor in Technology / Entrepreneurship &
   Corporate Innovation") and the regular tagline (.if-tag-p, non-program pages). The logo/badge/
   title selectors match EITHER the shared .if-logo-img-hdr/.if-hdrprog-badge/.if-hdrprog-title
   marker classes OR any class ending in -hdrprog-badge / -hdrprog-title (badge/title) resp.
   .if-logo-mark (logo) - a page's own program-page-<name>-hdrprog-badge/-title class is enough on
   its own, no extra marker class required. Program names use
   non-breaking spaces within each authored line, so the browser can never wrap a line internally -
   it either fits or overflows its box. The tagline wraps normally, but must never exceed 3 lines,
   AND must never get within a small safety margin of the hamburger button (.if-navbtn) - checked
   as a direct two-element comparison (the text's real rendered right edge vs the button's left
   edge), not a sum of paddings/gaps/positions, and only while the button is genuinely rendered
   (hidden on desktop, where its rect collapses to 0 and would otherwise read as a false
   collision). The text's "real rendered right edge" is measured via a Range over its content, not
   the paragraph element's own getBoundingClientRect() - a left-aligned, ragged-right paragraph is
   width:100% of its container regardless of where the glyphs actually stop, so the element's own
   box tells us nothing about how close the visible text is to the button; a Range's per-line
   client rects do.
   Response, in order, each stage only engaging if the previous one wasn't enough:
   1. Program pages only: the glyph badge (.if-hdrprog-badge) drops the instant the name overflows
      its box - frees its room at zero visual cost, no shrink involved yet.
   2. If still too tight, the logo (.if-logo-img-hdr) and the tagline/name text shrink TOGETHER, by
      the same proportional factor, down to a legibility floor - rather than the text alone
      absorbing all the compression while the logo stays fixed. Native left/right padding is left
      alone (only the logo's own width/height and the text's own font-size scale), and both stay
      vertically centered within their own flex parents, so this reads as one consistent unit
      shrinking in place, not a resize that shifts margins or alignment.
   Fully measurement-based (not a fixed breakpoint) because the trigger point depends on real
   rendered text width, which a static breakpoint cannot predict for every program name. */
try {
(function(){
  var FLOOR_RATIO = 0.6;
  var STEP = 0.02;

  function fitHeaderLeft(){
    document.querySelectorAll('.if-id-band').forEach(function(band){
      var logo = band.querySelector('.if-logo-img-hdr, .if-logo-mark');
      var badge = band.querySelector('.if-hdrprog-badge, [class*="-hdrprog-badge"]');
      var title = band.querySelector('.if-hdrprog-title, [class*="-hdrprog-title"]');
      var tagline = band.querySelector('.if-tag-p');
      var navbtn = band.querySelector('.if-navbtn');
      var textEl = title || tagline;
      if (!textEl) return;

      // Reset to native defaults every run so behavior is fully reversible.
      if (logo) { logo.style.width = ''; logo.style.height = ''; }
      if (badge) badge.style.display = '';
      textEl.style.fontSize = '';

      var isProgram = !!title;

      function navVisible(){
        if (!navbtn) return false;
        var r = navbtn.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      }

      function actualTextRight(){
        // textEl.getBoundingClientRect() reflects the PARAGRAPH's own box (width:100% of its
        // container, always), not where the rendered glyphs actually stop on a ragged-right,
        // left-aligned line - so it can't tell us whether the text has really reached the
        // hamburger. A Range over the text content gives the real per-line rendered rects.
        var range = document.createRange();
        range.selectNodeContents(textEl);
        var rects = range.getClientRects();
        var right = -Infinity;
        for (var i = 0; i < rects.length; i++) if (rects[i].right > right) right = rects[i].right;
        return right === -Infinity ? textEl.getBoundingClientRect().right : right;
      }

      var SAFE_GAP = 8; // small buffer so this engages just BEFORE real contact, not only after it

      function tooTight(){
        if (isProgram) return textEl.scrollWidth > textEl.clientWidth + 1; // +1: subpixel slack
        var lh = parseFloat(getComputedStyle(textEl).lineHeight);
        var tooManyLines = lh ? Math.round(textEl.getBoundingClientRect().height / lh) > 3 : false;
        if (tooManyLines) return true;
        if (navVisible() && (navbtn.getBoundingClientRect().left - actualTextRight()) < SAFE_GAP) return true;
        return false;
      }

      // 1) Program pages: glyph badge drops first - no shrink involved yet.
      if (isProgram && tooTight() && badge) badge.style.display = 'none';

      // 2) Still too tight: logo + text shrink together, proportionally, to a shared floor.
      if (tooTight() && logo) {
        var logoBaseW = parseFloat(getComputedStyle(logo).width) || 0;
        var logoBaseH = parseFloat(getComputedStyle(logo).height) || 0;
        var textBaseSize = parseFloat(getComputedStyle(textEl).fontSize) || (isProgram ? 19 : 16);
        if (logoBaseW && logoBaseH) {
          var factor = 1;
          var guard = 0;
          while (tooTight() && (factor - STEP) >= FLOOR_RATIO && guard < 60) {
            factor -= STEP;
            logo.style.width = (logoBaseW * factor) + 'px';
            logo.style.height = (logoBaseH * factor) + 'px';
            textEl.style.fontSize = (textBaseSize * factor) + 'px';
            guard++;
          }
        }
      }
    });
  }

  var raf=null; function onR(){ if(raf) cancelAnimationFrame(raf); raf=requestAnimationFrame(fitHeaderLeft); }
  function init(){ fitHeaderLeft(); window.addEventListener('resize', onR, {passive:true}); if(document.fonts && document.fonts.ready && document.fonts.ready.then){ document.fonts.ready.then(fitHeaderLeft); } }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] header-name-fit error:', _e); } catch (_) {} }

try {
// Cross-page / same-page smooth-scroll landing for "#goto:<id>" links: a link to another page's
// section appends "#goto:<id>" (instead of a real "#<id>") so the browser's native instant
// hash-jump never fires (no element has that literal id) — this module scrolls to the real target
// with the same eased motion + .if-header offset as the in-page smooth-scroll module. Handles BOTH
// directions: (1) arriving from another page -- a real navigation reloads the document, so the
// on-load check below runs fresh with the new hash already set; (2) clicking one of these links
// while ALREADY on the target page -- only the URL hash differs from the current page, so the
// browser treats it as a same-document navigation and never reloads, meaning the on-load check
// (which only ever runs once, at the original page load) never sees the new hash. The click
// listener below is what makes that second case work: it intercepts the click directly, runs the
// scroll immediately, and lets the browser navigate normally (uninterrupted) for any link whose
// own page differs from the current one.
(function(){
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  function ease(t){ return t<0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }
  function animate(toY){
    var startY = window.pageYOffset, dist = toY - startY;
    if (Math.abs(dist) < 2) { window.scrollTo(0, toY); return; }
    var dur = Math.min(820, Math.max(430, Math.abs(dist)*0.28)), t0 = null;
    function step(ts){
      if (t0 == null) t0 = ts;
      var p = Math.min(1, (ts-t0)/dur);
      window.scrollTo(0, Math.round(startY + dist*ease(p)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function goTo(id){
    var tgt = document.getElementById(id);
    if (!tgt) return false;
    var hdr = document.querySelector('.if-header') || document.querySelector('header');
    var h = hdr ? hdr.offsetHeight : 0;
    var toY = Math.max(0, tgt.getBoundingClientRect().top + window.pageYOffset - h - 24);
    if (reduced) { window.scrollTo(0, toY); } else { animate(toY); }
    return true;
  }
  function runFromHash(){
    var m = /^#goto:([\w-]+)$/.exec(location.hash);
    if (!m) return;
    if (goTo(m[1]) && history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  }
  if (document.readyState !== 'loading') runFromHash(); else document.addEventListener('DOMContentLoaded', runFromHash);
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest && e.target.closest('a[href*="#goto:"]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var m = /#goto:([\w-]+)$/.exec(href);
    if (!m) return;
    var linkPath = a.pathname || href.split('#')[0];
    if (linkPath && linkPath !== location.pathname) return;
    if (goTo(m[1])) {
      e.preventDefault();
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    }
  }, true);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] cross-page-anchor-scroll error:', _e); } catch (_) {} }

/* ===== module: jumpnav-gap (sticky secondary nav bar clearance) =====
   Any sticky in-page nav bar carrying class .if-jumpnav-gap gets its own live height synced onto
   the data-scroll-gap of its data-smooth-scroll links, so a section jump clears BOTH the fixed
   .if-header AND this bar sitting beneath it (the shared smooth-scroll module only accounts for
   .if-header's height by default). Re-syncs on resize and font load since the bar's height can
   change (e.g. its links wrap onto more lines at narrow widths). Clearance = bar height - 51px
   (moves the scroll destination 50px further down the page per user feedback on MIPS-Apply — the
   target section's OWN top padding, e.g. 72px on program-page-mips-apply-section, sits between
   this scroll-target boundary and the actual visible heading; this constant controls the visible
   gap to that heading, not the invisible section edge). Class-driven + portable. */
try {
(function(){
  function init(){
    var bars=document.querySelectorAll('.if-jumpnav-gap');
    if(!bars.length)return;
    bars.forEach(function(bar){
      if(bar.__ifjng)return;bar.__ifjng=1;
      var links=bar.querySelectorAll('a[data-smooth-scroll],a.if-smooth-scroll');
      if(!links.length)return;
      function sync(){var g=bar.offsetHeight-1;for(var i=0;i<links.length;i++)links[i].setAttribute('data-scroll-gap',g);}
      sync();
      window.addEventListener('resize',sync,{passive:true});
      if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sync);
    });
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] jumpnav-gap error:', _e); } catch (_) {} }

/* jumpnav-spy moved to the consolidated 'jumpnav-spy' module (ifScrollEngine) above, right
   after walk-spy. */
/* walkcopy-spy moved to the consolidated 'walkcopy-spy' module (ifScrollEngine) above, right
   after jumpnav-spy. walkcopy-gap-tiers (below) is unchanged - it's resize-only, out of scope
   for the scroll-engine migration - and walkcopy-spy still reads the data-scroll-gap attribute
   it sets, exactly as before. */
/* module: walkcopy-gap-tiers — sets data-scroll-gap on the walkcopy items to one of four EXPLICIT,
   fixed numbers depending on which native breakpoint is currently active. No measurement, no
   computation — these are exact values set directly: Desktop >=992px = 50, Tablet 768-991px = 100,
   Horizontal-phone 480-767px = 150, Vertical-phone <=479px = 300. Re-applies on load and resize;
   walkcopy-spy reads this same attribute fresh each sync, so its threshold stays in step. */
try {
(function(){
  function init(){
    var links=document.querySelectorAll('.program-page-mips-apply-walkcopy-item[data-smooth-scroll]');
    if(!links.length)return;
    function pick(){
      var w=window.innerWidth;
      if(w<=479)return 300;
      if(w<=767)return 150;
      if(w<=991)return 100;
      return 50;
    }
    function sync(){
      var g=pick();
      links.forEach(function(a){a.setAttribute('data-scroll-gap',g);});
    }
    sync();
    window.addEventListener('resize',sync,{passive:true});
  }
  if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] walkcopy-gap-tiers error:', _e); } catch (_) {} }

/* hero-countup-easeout moved to the consolidated 'hero-countup-easeout' module (ifScrollEngine)
   above, right after walkcopy-spy. */

/* ===== module: nav-link-exact-fit (desktop only, >991px) =====
   Static CSS cannot do this: fit-content/max-content are defined as "available space, clamped
   by content" - not "current wrap state" - so the box and the text's wrap state are circularly
   dependent (verified directly: flex-grow and flex-basis:fit-content both keep growing the box
   as viewport widens even while the text stays wrapped). This measures the ACTUAL rendered
   width of each plain nav-link's text (the .if-mtext span the "nav" module above already
   creates) and pins the link's width to exactly that plus its own left/right padding - read
   live from computed style, never assumed. Dropdown toggles (if-ddtoggle) are skipped: they
   pair text with an icon, a different composition this isn't meant to size. Desktop-only by
   design (clears any pinned width below 992px so the native mobile width:100% governs).
   Re-runs on load, after web fonts finish loading (a font swap after initial layout can leave
   a stale measurement), and via ResizeObserver on the row (catches any width change without a
   raw window-resize listener; observing the row rather than the links it writes to avoids a
   feedback loop, since the row's own width comes from max-width/viewport, not its children). */
try {
  (function(){
    var mq = window.matchMedia('(min-width:992px)');
    function widestLineWidth(target){
      var range = document.createRange();
      range.selectNodeContents(target);
      var rects = range.getClientRects();
      if(!rects.length) return null;
      var lines = {};
      for(var i=0;i<rects.length;i++){
        var r = rects[i], key = Math.round(r.top);
        if(!lines[key]) lines[key] = {left:r.left, right:r.right};
        else { lines[key].left = Math.min(lines[key].left, r.left); lines[key].right = Math.max(lines[key].right, r.right); }
      }
      var widest = 0;
      Object.keys(lines).forEach(function(k){ var w = lines[k].right - lines[k].left; if(w > widest) widest = w; });
      return widest;
    }
    function fit(){
      var menu = document.querySelector('.if-navmenu'); if(!menu) return;
      var all = menu.querySelectorAll('.if-nav-link');
      var links = [];
      for(var i=0;i<all.length;i++){ if(all[i].className.indexOf('if-ddtoggle')===-1) links.push(all[i]); }
      if(!links.length) return;
      if(!mq.matches){
        links.forEach(function(el){ el.style.width=''; });
        return;
      }
      links.forEach(function(el){ el.style.width=''; });
      var plans = links.map(function(el){
        var target = el.querySelector('.if-mtext'); if(!target) return null;
        var widest = widestLineWidth(target); if(widest===null) return null;
        var cs = getComputedStyle(el);
        var pad = (parseFloat(cs.paddingLeft)||0) + (parseFloat(cs.paddingRight)||0);
        return { el: el, width: Math.ceil(widest + pad) + 1 };
      });
      plans.forEach(function(p){ if(p) p.el.style.width = p.width + 'px'; });
    }
    var raf = 0;
    function scheduleFit(){ if(raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(function(){ raf=0; fit(); }); }
    if(document.readyState!=='loading') fit(); else document.addEventListener('DOMContentLoaded', fit);
    window.addEventListener('load', function(){ setTimeout(fit, 50); });
    if(document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ setTimeout(fit, 30); }).catch(function(){}); }
    if(mq.addEventListener) mq.addEventListener('change', scheduleFit); else if(mq.addListener) mq.addListener(scheduleFit);
    var navbarIn = document.querySelector('.if-navbar-in');
    if(navbarIn && window.ResizeObserver){
      new ResizeObserver(scheduleFit).observe(navbarIn);
    } else {
      window.addEventListener('resize', scheduleFit, {passive:true});
    }
  })();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] nav-link-exact-fit error:', _e); } catch (_) {} }

/* ===== module: nav-toggle-js (mobile hamburger open/close for plain-element navs
   that don't use Webflow's native Navbar component/runtime) =====
   Webflow's native Navbar open/close state is managed entirely by its own JS
   (webflow.js), not by any Designer-authored CSS - a plain-element nav has no
   native runtime to drive it. This reimplements the same end-user behavior
   (closed by default at <=991px, hamburger reveals the menu, click again or
   pick a link closes it) using only class toggles, so it needs zero native
   Navbar support.
   Scoped via two dedicated marker classes so it can NEVER affect a page whose
   nav already has native Navbar toggle behavior:
     .if-navbtn.if-navbtn-js   - the hamburger button to wire up
     .if-navmenu.if-navmenu-js - the menu it controls (closed by default at the
                                 medium breakpoint via that combo's own CSS)
   Toggling adds/removes:
     - "is-nav-open" on the menu (its own combo .if-navmenu.if-navmenu-js.is-nav-open
       reopens it, reusing if-navmenu's existing max-height transition)
     - "w--open" on the button - the SAME literal class name the in-site layout
       embed's hamburger-to-X morph CSS already keys off (.w--open .if-bar:nth-child(N)),
       so the icon animates without any new CSS at all. */
try {
(function(){
  document.querySelectorAll('.if-navbtn.if-navbtn-js').forEach(function(btn){
    var root = btn.closest('.if-navroot') || document;
    var menu = root.querySelector('.if-navmenu.if-navmenu-js');
    if(!menu) return;
    function isOpen(){ return menu.classList.contains('is-nav-open'); }
    function setOpen(open){
      menu.classList.toggle('is-nav-open', open);
      btn.classList.toggle('w--open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    setOpen(false);
    btn.addEventListener('click', function(e){
      e.preventDefault();
      setOpen(!isOpen());
    });
    menu.addEventListener('click', function(e){
      if(e.target.closest('a')) setOpen(false);
    });
    window.addEventListener('resize', function(){
      if(window.innerWidth > 991 && isOpen()) setOpen(false);
    }, {passive:true});
  });
})();
} catch (_e) { try { console && console.warn && console.warn('[idea-factory] nav-toggle-js error:', _e); } catch (_) {} }

/* botnav-accent-scroll moved to the consolidated 'botnav-accent-scroll' module (ifScrollEngine)
   above, right after hero-countup-easeout. */
} /* end window.__ifEngine load guard */

