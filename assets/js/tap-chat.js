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

  // ---------- the brain: our own chat window, used when the server's AI (api/tap-chat.js) is switched on ----------
  var BRAIN_CSS = ''
    + '.tb-panel{position:fixed;right:16px;bottom:16px;z-index:1000;width:min(380px,calc(100vw - 32px));height:min(580px,calc(100dvh - 32px));display:none;flex-direction:column;background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 18px 50px rgba(11,32,54,.34);font:400 15px/1.45 ' + FONT + ';color:#0B2036}'
    + '.tb-panel.on{display:flex}'
    + '.tb-head{flex:none;display:flex;align-items:center;gap:10px;height:60px;padding:0 12px 0 16px;background:#0B2036;color:#fff}'
    + '.tb-head img{width:30px;height:30px;display:block}.tb-head b{font-size:15px;font-weight:600}.tb-head span{flex:1;min-width:0;font-size:12px;color:#B8C4D0}'
    + '.tb-head button{min-height:40px;padding:0 14px;font:600 13px ' + FONT + ';color:#fff;background:rgba(255,255,255,.14);border:0;border-radius:20px;cursor:pointer}'
    + '.tb-log{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:14px;background:#F7F4F1;overscroll-behavior:contain}'
    + '.tb-m{max-width:86%;padding:10px 13px;border-radius:16px;white-space:pre-wrap;overflow-wrap:anywhere}'
    + '.tb-m.u{align-self:flex-end;background:#0B2036;color:#fff;border-bottom-right-radius:5px}'
    + '.tb-m.a{align-self:flex-start;background:#fff;border:1px solid #E7E0DA;border-bottom-left-radius:5px}'
    + '.tb-m.w{color:#6B7785}'
    + '.tb-links{display:flex;flex-direction:column;gap:4px;margin-top:8px}.tb-links a{color:#C2410C;font-size:13px;font-weight:600}'
    + '.tb-wa{display:inline-block;margin-top:8px;padding:9px 14px;background:#128C4B;color:#fff!important;border-radius:18px;font-size:14px;font-weight:600;text-decoration:none}'
    + '.tb-form{flex:none;display:flex;gap:8px;align-items:flex-end;padding:10px;border-top:1px solid #E7E0DA;background:#fff}'
    + '.tb-form textarea{flex:1;min-width:0;height:46px;max-height:110px;padding:11px 12px;font:400 16px/1.35 ' + FONT + ';color:#0B2036;border:1px solid #D5CCC4;border-radius:14px;resize:none;outline-color:#D9531E}'
    + '.tb-form button{flex:none;height:46px;padding:0 16px;font:600 14px ' + FONT + ';color:#fff;background:#D9531E;border:0;border-radius:14px;cursor:pointer}.tb-form button[disabled]{opacity:.55}'
    + '.tb-note{flex:none;padding:0 12px 8px;font-size:11px;color:#6B7785;background:#fff;text-align:center}'
    + '@media(max-width:480px){.tb-panel{right:8px;bottom:8px;width:calc(100vw - 16px);height:calc(100dvh - 16px)}}';
  var brain = null;

  function buildBrain() {
    var st = document.createElement('style');
    st.textContent = BRAIN_CSS;
    document.head.appendChild(st);
    var p = document.createElement('div');
    p.className = 'tb-panel';
    p.setAttribute('role', 'dialog');
    p.setAttribute('aria-label', 'Chat with TAP Assistant');
    p.innerHTML = '<div class="tb-head"><img src="' + LOGO + '" alt=""><b>TAP Assistant</b><span>TechAuditPros</span><button type="button" data-close>Close</button></div>'
      + '<div class="tb-log" aria-live="polite"></div>'
      + '<form class="tb-form"><textarea rows="1" maxlength="500" placeholder="Type your message" aria-label="Your message"></textarea><button type="submit">Send</button></form>'
      + '<div class="tb-note">AI can make mistakes. Please don\'t share passwords or card details.</div>';
    document.body.appendChild(p);
    var log = p.querySelector('.tb-log'), box = p.querySelector('textarea'), send = p.querySelector('.tb-form button'), talk = [], busy = false;

    // text is always placed as text; only **bold** becomes an element, so nothing typed or returned can run as code
    function fill(el, text) {
      String(text).split(/\*\*([^*\n]+)\*\*/).forEach(function (part, i) {
        if (i % 2) { var b = document.createElement('b'); b.textContent = part; el.appendChild(b); }
        else if (part) el.appendChild(document.createTextNode(part));
      });
    }
    function add(kind, text, d) {
      var m = document.createElement('div');
      m.className = 'tb-m ' + kind;
      fill(m, text);
      if (d && d.links && d.links.length) {
        var w = document.createElement('div');
        w.className = 'tb-links';
        d.links.forEach(function (l) { if (!/^\/(?!\/)/.test(l.url)) return; var a = document.createElement('a'); a.href = l.url; a.textContent = l.title; w.appendChild(a); });
        m.appendChild(w);
      }
      if (d && d.fallback) {
        var wa = document.createElement('a');
        wa.className = 'tb-wa'; wa.href = WHATSAPP; wa.target = '_blank'; wa.rel = 'noopener'; wa.textContent = 'Message us on WhatsApp';
        m.appendChild(document.createElement('br')); m.appendChild(wa);
      }
      log.appendChild(m);
      log.scrollTop = log.scrollHeight;
      return m;
    }
    function ask(text) {
      if (busy) return;
      busy = true; send.disabled = true;
      add('u', text);
      var wait = add('a w', 'Typing…'), past = talk.slice(-6);
      var stop = new AbortController(), timer = setTimeout(function () { stop.abort(); }, 22000);
      fetch('/api/tap-chat', { method: 'POST', signal: stop.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, history: past }) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          wait.remove();
          if (!d.reply) throw new Error('no reply');
          add('a', d.reply, d);
          if (!d.fallback) talk.push({ role: 'user', text: text }, { role: 'model', text: d.reply });
        })
        .catch(function () { if (wait.parentNode) wait.remove(); add('a', "I can't answer just now, but the team can. Message us on WhatsApp and we'll help you directly.", { fallback: true }); })
        .then(function () { clearTimeout(timer); busy = false; send.disabled = false; });
    }
    p.querySelector('.tb-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var t = box.value.trim();
      if (!t || busy) return;
      box.value = ''; box.style.height = '';
      ask(t);
    });
    box.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); p.querySelector('.tb-form').requestSubmit(); } });
    box.addEventListener('input', function () { box.style.height = 'auto'; box.style.height = Math.min(box.scrollHeight, 110) + 'px'; });
    function close() { p.classList.remove('on'); document.body.classList.remove('tap-chat-open'); }
    p.querySelector('[data-close]').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && p.classList.contains('on')) close(); });
    add('a', "Hi, I'm TAP Assistant. Ask me anything about websites, SEO or custom ERP software.");
    return { open: function () { p.classList.add('on'); document.body.classList.add('tap-chat-open'); box.focus({ preventScroll: true }); } };
  }

  function openPanel() {
    if (brain) { brain.open(); return; }
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
    // the brain when the server's AI is on; Google's search panel until then (and if the check fails)
    var ask = new AbortController(), giveUp = setTimeout(function () { ask.abort(); }, 3000);
    fetch('/api/tap-chat', { signal: ask.signal, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; })
      .then(function (d) {
        clearTimeout(giveUp);
        if (!d.ready) { loadGoogle(); return; }
        brain = buildBrain();
        state = 'ready';
        if (wantOpen) { wantOpen = false; openPanel(); }
      });
  }

  function loadGoogle() {
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
