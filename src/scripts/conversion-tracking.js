/**
 * Datanalytico — Comprehensive Conversion Tracking
 *
 * Tracks all key user actions via Google Analytics 4 events:
 *   - Form submissions (lead form, contact form)
 *   - Phone call clicks (tel: links)
 *   - CTA button clicks
 *   - Email link clicks
 *   - Service page engagement
 *   - FAQ accordion interactions
 *   - Scroll depth milestones
 *   - Outbound link clicks
 *   - Language toggle usage
 *   - Floating call button taps
 */

(function () {
  'use strict';

  // Helper: safe gtag call
  function track(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  // ------------------------------------------------------------------
  // 1. Form submission tracking
  // ------------------------------------------------------------------
  document.querySelectorAll('form[data-track-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var formName = form.getAttribute('data-track-form');
      var service = form.querySelector('select');
      var serviceValue = service ? service.value : '';

      track('generate_lead', {
        event_category: 'form',
        event_label: formName,
        form_name: formName,
        service_selected: serviceValue,
        page_path: window.location.pathname
      });

      // Also fire as a custom conversion event for easier GA4 goal setup
      track('form_submission', {
        form_name: formName,
        service_selected: serviceValue,
        page_path: window.location.pathname
      });
    });
  });

  // ------------------------------------------------------------------
  // 2. Phone call click tracking (all tel: links)
  // ------------------------------------------------------------------
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      var location = link.getAttribute('data-track-location') || 'unknown';
      track('phone_call_click', {
        event_category: 'contact',
        event_label: location,
        link_text: link.textContent.trim(),
        click_location: location,
        page_path: window.location.pathname
      });
    });
  });

  // ------------------------------------------------------------------
  // 3. CTA button click tracking
  // ------------------------------------------------------------------
  document.querySelectorAll('[data-track-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      var ctaName = el.getAttribute('data-track-cta');
      var ctaDest = el.getAttribute('href') || '';
      track('cta_click', {
        event_category: 'cta',
        event_label: ctaName,
        cta_name: ctaName,
        cta_destination: ctaDest,
        page_path: window.location.pathname
      });
    });
  });

  // ------------------------------------------------------------------
  // 4. Email link click tracking
  // ------------------------------------------------------------------
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      track('email_click', {
        event_category: 'contact',
        event_label: link.getAttribute('href').replace('mailto:', ''),
        page_path: window.location.pathname
      });
    });
  });

  // ------------------------------------------------------------------
  // 5. Service card / link click tracking
  // ------------------------------------------------------------------
  document.querySelectorAll('[data-track-service]').forEach(function (el) {
    el.addEventListener('click', function () {
      var serviceName = el.getAttribute('data-track-service');
      track('service_click', {
        event_category: 'engagement',
        event_label: serviceName,
        service_name: serviceName,
        page_path: window.location.pathname
      });
    });
  });

  // ------------------------------------------------------------------
  // 6. FAQ accordion interaction tracking
  // ------------------------------------------------------------------
  document.querySelectorAll('details[data-track-faq]').forEach(function (el) {
    el.addEventListener('toggle', function () {
      if (el.open) {
        var question = el.getAttribute('data-track-faq');
        track('faq_open', {
          event_category: 'engagement',
          event_label: question,
          faq_question: question,
          page_path: window.location.pathname
        });
      }
    });
  });

  // ------------------------------------------------------------------
  // 7. Scroll depth tracking (25%, 50%, 75%, 100%)
  // ------------------------------------------------------------------
  var scrollMarks = { 25: false, 50: false, 75: false, 100: false };
  var scrollTimeout;

  function checkScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) return;
    var pct = Math.round((scrollTop / docHeight) * 100);

    [25, 50, 75, 100].forEach(function (mark) {
      if (pct >= mark && !scrollMarks[mark]) {
        scrollMarks[mark] = true;
        track('scroll_depth', {
          event_category: 'engagement',
          event_label: mark + '%',
          percent_scrolled: mark,
          page_path: window.location.pathname
        });
      }
    });
  }

  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(checkScroll, 150);
  }, { passive: true });

  // ------------------------------------------------------------------
  // 8. Outbound link tracking
  // ------------------------------------------------------------------
  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href.indexOf(window.location.hostname) === -1) {
      link.addEventListener('click', function () {
        track('outbound_click', {
          event_category: 'outbound',
          event_label: href,
          outbound_url: href,
          page_path: window.location.pathname
        });
      });
    }
  });

  // ------------------------------------------------------------------
  // 9. Language toggle tracking
  // ------------------------------------------------------------------
  var langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var currentLang = localStorage.getItem('datanalytico-lang') || 'de';
      var newLang = currentLang === 'de' ? 'en' : 'de';
      track('language_toggle', {
        event_category: 'engagement',
        event_label: newLang,
        language_selected: newLang,
        page_path: window.location.pathname
      });
    });
  }

  // ------------------------------------------------------------------
  // 10. Floating call button tracking
  // ------------------------------------------------------------------
  var floatingBtn = document.querySelector('[data-track-location="floating_call_button"]');
  if (floatingBtn) {
    floatingBtn.addEventListener('click', function () {
      track('floating_cta_click', {
        event_category: 'contact',
        event_label: 'floating_call_button',
        page_path: window.location.pathname
      });
    });
  }

  // ------------------------------------------------------------------
  // 11. Area / city link tracking
  // ------------------------------------------------------------------
  document.querySelectorAll('[data-track-area]').forEach(function (el) {
    el.addEventListener('click', function () {
      var area = el.getAttribute('data-track-area');
      track('area_click', {
        event_category: 'engagement',
        event_label: area,
        area_name: area,
        page_path: window.location.pathname
      });
    });
  });

  // ------------------------------------------------------------------
  // 12. Blog post click tracking
  // ------------------------------------------------------------------
  document.querySelectorAll('[data-track-blog]').forEach(function (el) {
    el.addEventListener('click', function () {
      var postTitle = el.getAttribute('data-track-blog');
      track('blog_click', {
        event_category: 'engagement',
        event_label: postTitle,
        blog_post: postTitle,
        page_path: window.location.pathname
      });
    });
  });

  // ------------------------------------------------------------------
  // 13. Page-level virtual pageview with custom dimensions
  // ------------------------------------------------------------------
  var pageType = document.querySelector('meta[name="page-type"]');
  if (pageType) {
    track('page_view_custom', {
      page_type: pageType.getAttribute('content'),
      page_path: window.location.pathname,
      page_title: document.title
    });
  }
})();
