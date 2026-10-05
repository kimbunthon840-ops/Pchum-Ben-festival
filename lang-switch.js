/**
 * Dual Language Switcher: Khmer (ខ្មែរ) & English (EN)
 * Pchum Ben Cultural Portal
 */

const LangManager = {
  currentLang: localStorage.getItem('pchum_ben_lang') || 'en',

  init() {
    this.applyLanguage(this.currentLang);
    this.bindButtons();
  },

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('pchum_ben_lang', lang);
    this.applyLanguage(lang);
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  },

  toggle() {
    const nextLang = this.currentLang === 'en' ? 'km' : 'en';
    this.setLanguage(nextLang);
  },

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    if (lang === 'km') {
      document.body.classList.add('khmer-mode');
    } else {
      document.body.classList.remove('khmer-mode');
    }

    // Update all elements with data-en and data-kh
    const translatables = document.querySelectorAll('[data-en][data-kh]');
    translatables.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.innerHTML = text;
        }
      }
    });

    // Update toggle button text
    const langBtns = document.querySelectorAll('.btn-lang-toggle');
    langBtns.forEach(btn => {
      if (lang === 'km') {
        btn.innerHTML = `<span class="flag">🇰🇭</span> ភាសាខ្មែរ`;
      } else {
        btn.innerHTML = `<span class="flag">🌐</span> English`;
      }
    });
  },

  bindButtons() {
    const langBtns = document.querySelectorAll('.btn-lang-toggle');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  LangManager.init();
});

window.LangManager = LangManager;
