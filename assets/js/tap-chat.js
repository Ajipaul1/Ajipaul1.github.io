// TAP Assistant on every page: the TechAuditPros logo button (bottom right) opens Google's chat panel (the agent
// "TAP Assistant" in the Google Cloud project techauditpros-leadmagnet), restyled as a small round chat window.
// One file, so the bot changes in one place. scripts/seo/add_chat.js puts the script tag on every page; run it again
// after any generator that rewrites pages.
// - Google's script loads only when someone reaches for the button, so it costs a visitor who never chats nothing.
// - The button can be dragged around the screen (the pages' own code): a drag does not open the chat.
// - The older Tidio chat stays hidden: a tap here never reaches its handler, so two chats can't open at once.
// - If Google's panel can't load, the visitor goes to WhatsApp instead of a dead button.
// - The window's look is CSS put INSIDE Google's shadow roots (outside rules can't reach there). Google's answer box
//   takes the width of its 32px avatar by default, which squeezed every word onto its own line; .summary-container
//   below gives it the whole window. A change of Google's inner class names could undo these rules: look at the
//   panel after any widget change.
(function () {
  if (window.__tapChat) return;
  window.__tapChat = true;

  var CONFIG_ID = 'e2fb1fc1-9e97-45f6-b7be-bc391794d452';
  var WIDGET = 'https://cloud.google.com/ai/gen-app-builder/client?hl=en_US';
  var WHATSAPP = 'https://wa.me/916282520339?text=' + encodeURIComponent('Hi TechAuditPros, I would like to talk about a project.');
  var LOGO = '/assets/logoonly.svg?v=2';
  var FONT = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  var TRIGGER = 'tapChatTrigger';
  var state = 'idle';      // idle, loading, ready, failed
  var wantOpen = false;

  // ---------- the button: the logo in a white round button with an orange highlight ----------
  var PAGE_CSS = ''
    + '.tidio-custom-float,.tap-chat-fab{position:fixed;right:22px;z-index:900;width:56px!important;height:56px!important;padding:0!important;border:2px solid #D9531E!important;border-radius:50%!important;'
    + 'display:flex!important;align-items:center;justify-content:center;background:#fff!important;box-shadow:0 8px 24px rgba(11,32,54,.28)!important;cursor:pointer;overflow:visible!important;transition:transform .15s ease}'
    + '.tidio-custom-float{bottom:146px}.tap-chat-fab{bottom:22px;border:2px solid #D9531E}'
    + '.tidio-custom-float:hover,.tap-chat-fab:hover{transform:scale(1.06)}'
    + '.tidio-custom-float img,.tap-chat-fab img{width:38px;height:38px;display:block;pointer-events:none}'
    + '.tap-chat-pulse::after{content:"";position:absolute;inset:-3px;border-radius:50%;border:2px solid rgba(217,83,30,.85);animation:tapChatPulse 2.4s ease-out infinite;pointer-events:none}'
    + '@keyframes tapChatPulse{0%{transform:scale(1);opacity:.9}70%{transform:scale(1.5);opacity:0}100%{transform:scale(1.5);opacity:0}}'
    + '.tap-chat-tip{position:absolute;right:calc(100% + 12px);top:50%;transform:translateY(-50%);white-space:nowrap;background:#0B2036;color:#fff;font:600 13px/1 ' + FONT + ';padding:10px 13px;border-radius:999px;'
    + 'box-shadow:0 6px 18px rgba(11,32,54,.25);pointer-events:none;opacity:0;animation:tapChatTip .4s ease 2.5s forwards}'
    + '.tap-chat-tip::after{content:"";position:absolute;left:100%;top:50%;margin-top:-6px;border:6px solid transparent;border-left-color:#0B2036}'
    + '@keyframes tapChatTip{to{opacity:1}}'
    + 'body.tap-chat-open .tap-chat-pulse::after,body.tap-chat-open .tap-chat-tip{display:none}'
    + '@media (prefers-reduced-motion: reduce){.tap-chat-pulse::after{display:none}.tap-chat-tip{animation:none;opacity:1}}';

  // ---------- the window: put into every shadow root of Google's widget ----------
  var SHADOW_CSS = ''
    // the frame: a small round window at the bottom right instead of the whole screen
    + 'div:has(> .content){top:auto!important;left:auto!important;right:16px!important;bottom:16px!important;width:min(390px,calc(100vw - 24px))!important;height:min(640px,calc(100dvh - 24px))!important;'
    + 'border-radius:22px!important;overflow:hidden!important;background:#fff!important;box-shadow:0 18px 50px rgba(11,32,54,.34)!important}'
    // the header: logo, name, one line about it, Close
    + '.backdrop{height:60px!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;gap:10px!important;padding:0 12px 0 16px!important;background:#0B2036!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important}'
    + '.backdrop::before{content:"TAP Assistant";order:0;flex:none;padding-left:40px;background:url("' + LOGO + '") no-repeat left center / 32px 32px;color:#fff;font:700 15px/32px ' + FONT + '}'
    + '.backdrop::after{content:"TechAuditPros";order:1;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:rgba(255,255,255,.62);font:500 12px/1 ' + FONT + '}'
    + '.backdrop button{order:2;position:static!important;margin:0!important;color:#fff!important;background:rgba(255,255,255,.14)!important;border-radius:999px!important;padding:7px 12px!important;font:600 13px/1 ' + FONT + '!important}'
    + '.content{top:0!important;height:calc(100% - 60px)!important;border-radius:0!important;background:#F7F9F8!important}'
    // the results area fills the window
    + '.scroller,.conversation-and-results,.search-results-container,.search-bar-container,.sticky,ucs-search-bar{width:auto!important;max-width:none!important;margin-left:0!important;margin-right:0!important;padding-left:0!important;padding-right:0!important;box-sizing:border-box!important}'
    + '.conversation-and-results,.search-results-container{padding-left:14px!important;padding-right:14px!important}'
    // THE SQUEEZE: the answer box took the width of its 32px avatar; give it the whole window
    + '.summary-container,.summary-contents,.summary{width:100%!important;max-width:none!important;min-width:0!important;margin:0!important;box-sizing:border-box!important;display:block!important}'
    + '.summary-container{padding-left:0!important;padding-right:0!important}'
    + '.summary-avatar{display:none!important}'
    + '.summary{font-family:' + FONT + '!important;font-size:14.5px!important;line-height:1.55!important;color:#0E2A3E!important}'
    + '.summary a{color:#B84313!important}'
    + '.header.disclaimer{display:block!important;width:auto!important;font:400 11px/1.35 ' + FONT + '!important;color:#8595A0!important;padding:0 0 8px!important}'
    // the question bar
    // (Google uses the class "main" in three different parts: only the question bar keeps a padding; the answer's two
    // wrappers lose theirs, so the text gets the window)
    + ':host(ucs-search-bar) .main{width:auto!important;max-width:none!important;margin:0!important;padding:12px 14px!important;box-sizing:border-box!important}'
    + ':host(ucs-conversation) .main,:host(ucs-summary) .main{padding-left:0!important;padding-right:0!important}'
    + 'form{width:100%!important;max-width:none!important}'
    + 'input{font-family:' + FONT + '!important}';

  function addStyle(root, css) {
    if (!root || root.querySelector(':scope > style[data-tap-chat]')) return;
    var s = document.createElement('style');
    s.setAttribute('data-tap-chat', '');
    s.textContent = css;
    root.appendChild(s);
  }
  // every shadow root under the widget gets the rules (the answer box appears only after a question); icon fonts
  // (md-icon) are left alone
  function skin() {
    var w = document.querySelector('gen-search-widget');
    if (!w || !w.shadowRoot) return;
    (function walk(root) {
      addStyle(root, SHADOW_CSS);
      root.querySelectorAll('*').forEach(function (el) { if (el.shadowRoot && !/^MD-/.test(el.tagName)) walk(el.shadowRoot); });
    })(w.shadowRoot);
  }

  function button() {
    return document.querySelector('.tidio-custom-float') || document.querySelector('.tap-chat-fab');
  }
  // pages without the floating buttons (the older posts, the quote page, 404) get the same button of their own
  function ensureButton() {
    if (button()) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'tap-chat-fab';
    document.body.appendChild(b);
  }
  // the logo, the highlight ring, and a small label that appears after a moment
  function dressButton() {
    var b = button();
    if (!b || b.getAttribute('data-tap-dressed')) return;
    b.setAttribute('data-tap-dressed', '1');
    b.setAttribute('aria-label', 'Chat with TAP Assistant');
    b.innerHTML = '<img src="' + LOGO + '" alt="" width="38" height="38"><span class="tap-chat-tip" aria-hidden="true">Ask TAP Assistant</span>';
    b.classList.add('tap-chat-pulse');
  }

  function openPanel() {
    skin();
    if (!window.__tapChatSkin) window.__tapChatSkin = setInterval(skin, 500);   // the panel builds its inner parts after it opens and after each answer
    document.body.classList.add('tap-chat-open');
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
    var st = document.createElement('style');
    st.setAttribute('data-tap-chat', '');
    st.textContent = PAGE_CSS;
    document.head.appendChild(st);
    ensureButton();
    dressButton();
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
