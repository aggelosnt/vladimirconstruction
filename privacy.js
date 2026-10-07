document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const langButtons = document.querySelectorAll('[data-lang-toggle]');
  const langSections = document.querySelectorAll('[data-lang]');

  const setLang = (lang) => {
    body.setAttribute('lang', lang);
    langButtons.forEach((btn) => {
      const active = btn.dataset.langToggle === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    langSections.forEach((section) => {
      section.hidden = section.dataset.lang !== lang;
    });
  };

  const initialLang = body.dataset.defaultLang || 'en';
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.langToggle));
  });

  setLang(initialLang);
});
