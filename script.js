(() => {
  const cfg = window.BACKBEAT_CONFIG || {};
  const header = document.querySelector('[data-header]');
  const menuBtn = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const form = document.querySelector('[data-booking-form]');
  const status = document.querySelector('[data-form-status]');

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded','false');
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelector('[data-year]').textContent = new Date().getFullYear();

  // Direct booking details
  const direct = document.querySelector('[data-booking-direct]');
  if (cfg.bookingEmail || cfg.bookingPhone) {
    direct.hidden = false;
    const emailLink = document.querySelector('[data-email-link]');
    const emailText = document.querySelector('[data-email-text]');
    if (cfg.bookingEmail) {
      emailLink.href = `mailto:${cfg.bookingEmail}`;
      emailText.textContent = cfg.bookingEmail;
    } else emailLink.hidden = true;
    const phoneLink = document.querySelector('[data-phone-link]');
    const phoneText = document.querySelector('[data-phone-text]');
    if (cfg.bookingPhone) {
      phoneLink.href = `tel:${cfg.bookingPhone.replace(/[^+\d]/g,'')}`;
      phoneText.textContent = cfg.bookingPhone;
    } else phoneLink.hidden = true;
  }

  // Social links
  const socialWrap = document.querySelector('[data-socials]');
  const socials = [
    ['Instagram', cfg.instagram], ['Facebook', cfg.facebook], ['YouTube', cfg.youtube]
  ].filter(([,url]) => url);
  socials.forEach(([name,url]) => {
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noreferrer'; a.textContent = name;
    socialWrap.append(a);
  });
  if (!socials.length) socialWrap.hidden = true;

  const requestText = () => {
    const fd = new FormData(form);
    return [
      'BACKBEAT HIGHWAY — BOOKING REQUEST',
      '',
      `Name / Organization: ${fd.get('name') || ''}`,
      `Email: ${fd.get('email') || ''}`,
      `Event date: ${fd.get('date') || ''}`,
      `Venue / City: ${fd.get('venue') || ''}`,
      `Event type: ${fd.get('type') || ''}`,
      '',
      'Details:',
      fd.get('message') || ''
    ].join('\n');
  };

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    if (!cfg.bookingEmail) {
      status.textContent = 'Add your booking email in site-config.js before launch. For now, use “Copy request.”';
      return;
    }
    const subject = encodeURIComponent('Backbeat Highway booking inquiry');
    const body = encodeURIComponent(requestText());
    location.href = `mailto:${cfg.bookingEmail}?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your email app…';
  });

  document.querySelector('[data-copy-request]')?.addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    try {
      await navigator.clipboard.writeText(requestText());
      status.textContent = 'Booking request copied to your clipboard.';
    } catch {
      status.textContent = 'Could not copy automatically. Select the form details and copy them manually.';
    }
  });

  // Gallery lightbox
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImg = document.querySelector('[data-lightbox-image]');
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      lightboxImg.src = button.dataset.image;
      lightboxImg.alt = button.querySelector('img')?.alt || 'Backbeat Highway gallery image';
      lightbox.showModal();
    });
  });
  document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
})();
