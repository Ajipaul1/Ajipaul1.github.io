/* ==========================================================================
   HOMEPAGE INTERACTIVE & CINEMATIC MOTION SCRIPT
   TechAuditPros - Multi-Timezone Clocks, Accordion, Mobile Nav, Telemetry
   Zero external dependencies. Pure vanilla JS. 60fps compositor performance.
   ========================================================================== */

(function() {
  'use strict';

  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function() {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    });
  }

  function dismissDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  if (closeDrawer) closeDrawer.addEventListener('click', dismissDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', dismissDrawer);

  // Close drawer on link click
  const drawerLinks = document.querySelectorAll('.drawer-nav a');
  drawerLinks.forEach(function(l) {
    l.addEventListener('click', dismissDrawer);
  });

  // 2. FAQ Accordion Interactivity
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(function(row) {
    const btn = row.querySelector('.faq-toggle');
    const answer = row.querySelector('.faq-answer');
    const plus = row.querySelector('.faq-plus');

    if (btn && answer) {
      btn.addEventListener('click', function() {
        const isOpen = row.classList.contains('active');

        // Close all other rows
        faqRows.forEach(function(r) {
          r.classList.remove('active');
          const a = r.querySelector('.faq-answer');
          const p = r.querySelector('.faq-plus');
          const b = r.querySelector('.faq-toggle');
          if (a) a.style.maxHeight = '0';
          if (p) p.textContent = '+';
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          row.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          if (plus) plus.textContent = '−';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 3. Live World Clocks (Sydney, London, New York, Toronto, Dubai, Kochi)
  function updateWorldClocks() {
    const clockElements = document.querySelectorAll('.market-clock');
    clockElements.forEach(function(el) {
      const tz = el.getAttribute('data-tz');
      if (!tz) return;

      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        const valSpan = el.querySelector('.clock-val');
        if (valSpan) {
          valSpan.textContent = formatter.format(now);
        }
      } catch (e) {}
    });
  }

  updateWorldClocks();
  setInterval(updateWorldClocks, 30000); // update every 30s

  // 4. Subtle In-View Reveal Observer (Scroll trigger)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const animatedElements = document.querySelectorAll('.discipline-card, .market-card, .proof-card, .dial-card');
    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  }

})();
