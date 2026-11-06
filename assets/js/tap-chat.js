// TAP Assistant on every page: the dark chat button opens Google's chat panel (the agent "TAP Assistant" in the Google
// Cloud project techauditpros-leadmagnet). One file, so the bot changes in one place. scripts/seo/add_chat.js puts the
// script tag on every page; run it again after any generator that rewrites pages.
// - Google's script loads only when someone reaches for the button, so it costs a visitor who never chats nothing.
// - The button can be dragged around the screen: a drag does not open the chat.
// - The older Tidio chat stays hidden: a tap here never reaches its handler, so two chats can't open at once.
// - If Google's panel can't load, the visitor goes to WhatsApp instead of a dead button.
(function () {
  if (window.__tapChat) return;
  window.__tapChat = true;

  var CONFIG_ID = 'e2fb1fc1-9e97-45f6-b7be-bc391794d452';
  var WIDGET = 'https://cloud.google.com/ai/gen-app-builder/client?hl=en_US';
  var WHATSAPP = 'https://wa.me/916282520339?text=' + encodeURIComponent('Hi TechAuditPros, I would like to talk about a project.');
  var TRIGGER = 'tapChatTrigger';
  var state = 'idle';      // idle, loading, ready, failed
  var wantOpen = false;

  function button() {
    return document.querySelector('.tidio-custom-float') || document.querySelector('.tap-chat-fab');
  }

  // pages without the floating buttons (the older posts, the quote page, 404) get the same button of their own
  function ensureButton() {
    if (button()) return;
    var style = document.createElement('style');
    style.textContent = '.tap-chat-fab{position:fixed;right:22px;bottom:22px;z-index:900;width:52px;height:52px;padding:0;border:none;border-radius:50%;'
      + 'display:flex;align-items:center;justify-content:center;background:#0B2036;box-shadow:0 6px 18px rgba(11,32,54,.32);cursor:pointer}'
      + '.tap-chat-fab svg{width:26px;height:26px;fill:#fff}.tap-chat-fab:active{transform:scale(.96)}';
    document.head.appendChild(style);
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'tap-chat-fab';
    b.setAttribute('aria-label', 'Chat with TAP Assistant');
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>';
    document.body.appendChild(b);
  }

  // Google's panel fills the screen by default. These rules make it a small round chat window at the bottom right.
  // They go inside the widget's shadow roots, because outside rules can't reach there.
  var FRAME = 'div:has(> .content){top:auto!important;left:auto!important;right:16px!important;bottom:16px!important;'
    + 'width:min(380px,calc(100vw - 24px))!important;height:min(600px,calc(100dvh - 24px))!important;border-radius:22px!important;overflow:hidden!important;'
    + 'background:#fff!important;box-shadow:0 18px 50px rgba(11,32,54,.34)!important}'
    + '.backdrop{height:54px!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;padding:0 16px!important;background:#0B2036!important;'
    + '-webkit-backdrop-filter:none!important;backdrop-filter:none!important}'
    + '.backdrop::before{content:"TAP Assistant";margin-right:auto;color:#fff;font:600 15px "IBM Plex Sans",-apple-system,"Segoe UI",sans-serif}'
    + '.backdrop button{position:static!important;margin:0!important;color:#fff!important}'
    + '.content{top:0!important;height:calc(100% - 54px)!important;border-radius:0!important}';
  var RESULTS = '.scroller,.conversation-and-results,.search-results-container,.search-bar-container{width:auto!important;max-width:none!important;margin-left:0!important;margin-right:0!important;box-sizing:border-box!important}'
    + '.conversation-and-results,.search-results-container{padding-left:14px!important;padding-right:14px!important}'
    + '.search-bar-container,.sticky,ucs-search-bar{padding-left:0!important;padding-right:0!important;margin-left:0!important;margin-right:0!important;width:auto!important;max-width:none!important}';
  var BAR = '.main{width:auto!important;max-width:none!important;margin:0!important;padding:12px!important;box-sizing:border-box!important}form{width:100%!important;max-width:none!important}';

  function addStyle(root, css) {
    if (!root || root.querySelector('style[data-tap-chat]')) return;
    var s = document.createElement('style');
    s.setAttribute('data-tap-chat', '');
    s.textContent = css;
    root.appendChild(s);
  }

  function skin() {
    var w = document.querySelector('gen-search-widget');
    if (!w || !w.shadowRoot) return;
    addStyle(w.shadowRoot, FRAME);
    var r = w.shadowRoot.querySelector('ucs-results');
    if (!r || !r.shadowRoot) return;
    addStyle(r.shadowRoot, RESULTS);
    var b = r.shadowRoot.querySelector('ucs-search-bar');
    if (b) addStyle(b.shadowRoot, BAR);
  }

  function openPanel() {
    skin();
    if (!window.__tapChatSkin) window.__tapChatSkin = setInterval(skin, 400);   // the panel builds its inner parts after it opens
    var t = document.getElementById(TRIGGER);
    if (t) t.click();
  }

  function fail() {
    if (state === 'ready') return;
    state = 'failed';
    if (wantOpen) { wantOpen = false; window.open(WHATSAPP, '_blank', 'noopener'); }
  }

  function load() {
    if (state !== 'idle') return;
    state = 'loading';
    // Google's widget finds its opener by id, so the hidden opener must be on the page before the widget starts
    var t = document.createElement('button');
    t.type = 'button'; t.id = TRIGGER; t.hidden = true; t.tabIndex = -1;
    document.body.appendChild(t);
    var w = document.createElement('gen-search-widget');
    w.setAttribute('configId', CONFIG_ID);
    w.setAttribute('triggerId', TRIGGER);
    document.body.appendChild(w);
    var s = document.createElement('script');
    s.src = WIDGET;
    s.async = true;
    s.onerror = fail;
    document.head.appendChild(s);
    var timer = setTimeout(fail, 12000);
    window.customElements.whenDefined('gen-search-widget').then(function () {
      clearTimeout(timer);
      // the widget connects to its opener just after the element is defined
      setTimeout(function () {
        state = 'ready';
        if (wantOpen) { wantOpen = false; openPanel(); }
      }, 400);
    });
  }

  function start() {
    ensureButton();
    var down = null;
    function isOurButton(e) { var b = button(); return !!(b && e.target && (e.target === b || b.contains(e.target))); }
    document.addEventListener('pointerdown', function (e) { down = isOurButton(e) ? { x: e.clientX, y: e.clientY } : null; if (down) load(); }, true);
    document.addEventListener('pointerover', function (e) { if (isOurButton(e)) load(); }, true);
    document.addEventListener('focusin', function (e) { if (isOurButton(e)) load(); }, true);
    document.addEventListener('click', function (e) {
      if (!isOurButton(e)) return;
      var moved = down && e.clientX && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6;
      down = null;
      if (moved) return;    // a drag: the page's own drag code handles it
      e.stopImmediatePropagation();
      e.preventDefault();
      if (state === 'ready') { openPanel(); return; }
      if (state === 'failed') { window.open(WHATSAPP, '_blank', 'noopener'); return; }
      wantOpen = true;
      load();
    }, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
