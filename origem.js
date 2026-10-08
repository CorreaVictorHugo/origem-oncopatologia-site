(() => {
  'use strict';
  // Preencher somente após confirmação do número oficial, com DDI e DDD.
  const whatsappNumber = null;
  const whatsappMessage = 'Olá! Gostaria de informações sobre os exames da Origem.';
  const whatsapp = document.querySelector('[data-whatsapp]');
  if (whatsappNumber && /^\d{10,15}$/.test(whatsappNumber)) {
    whatsapp.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    whatsapp.setAttribute('aria-label', 'Falar com a Origem pelo WhatsApp');
    whatsapp.querySelector('span').textContent = 'WhatsApp';
  }
  const toggle = document.querySelector('.menu-toggle, .nav-toggle');
  const menu = document.getElementById('mobile-menu');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    menu.classList.toggle('is-open', open);
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && menu) {
    setMenu(false);
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
      if (e.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true') {
        const elements = [toggle, ...menu.querySelectorAll('a')];
        const first = elements[0], last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    matchMedia('(min-width: 1025px)').addEventListener('change', e => { if(e.matches) setMenu(false); });
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    if (menu && toggle) setMenu(false);
    const offset = document.querySelector('.site-header').getBoundingClientRect().height + 24;
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: reduced.matches ? 'auto' : 'smooth' });
    target.setAttribute('tabindex', '-1');
    target.focus({preventScroll:true});
  }));
  const elements = document.querySelectorAll('.reveal, .image-reveal');
  if ('IntersectionObserver' in window && !reduced.matches) {
    document.querySelectorAll('.exam-row, .exam-grid li, .diff-item, .step, .process-item')
      .forEach(el => el.classList.add('scroll-card'));
    const observers = [];
    elements.forEach(el => {
      // A abertura permanece visível; os demais elementos entram uma única vez.
      if (el.closest('.hero')) {
        el.classList.add('is-visible', 'visible');
        return;
      }
      // Ajusta o limiar em blocos altos para não ocultar conteúdo no celular.
      const height = el.getBoundingClientRect().height;
      const threshold = Math.min(.3, Math.max(.01, (innerHeight - 100) * .3 / Math.max(height, 1)));
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'visible');
          observer.unobserve(entry.target);
        }
      }), {threshold, rootMargin: '0px 0px -50px 0px'});
      observer.observe(el);
      observers.push(observer);
    });
    document.documentElement.classList.add('motion-ready');
    reduced.addEventListener('change', e => {
      if (e.matches) {
        document.documentElement.classList.remove('motion-ready');
        observers.forEach(observer => observer.disconnect());
      }
    });
  }
  const header = document.querySelector('.site-header');
  const updateHeader = () => header.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', updateHeader, {passive:true});
  updateHeader();
  document.querySelector('.lab-timeline')?.classList.add('is-animated');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
