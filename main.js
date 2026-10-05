/**
 * Main Controller: Navbar, Scroll Effects, Audio Atmosphere, Common Utilities
 * Pchum Ben Cultural Portal
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBackToTop();
  initTempleAudio();
  highlightActiveNav();
});

/* 1. Header scroll effect & mobile drawer */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Close when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }
}

/* 2. Back To Top */
function initBackToTop() {
  let btn = document.querySelector('.back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '&#8679;';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 3. Temple Atmosphere Sound (Web Audio API Synthesizer - Temple Bell / Tibetan Singing Bowl) */
function initTempleAudio() {
  const audioBtn = document.querySelector('.btn-audio');
  if (!audioBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let bellInterval = null;

  function playTempleGong() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      // Fundamental pitch ~216Hz (sacred meditative pitch)
      const freqs = [216, 432, 648, 864];
      const gains = [0.4, 0.25, 0.12, 0.05];

      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(gains[idx], now + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 4.8);
      });
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  }

  audioBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      audioBtn.classList.add('playing');
      audioBtn.setAttribute('title', 'Mute Temple Bell');
      playTempleGong();
      bellInterval = setInterval(playTempleGong, 6000);
      showAudioToast(true);
    } else {
      audioBtn.classList.remove('playing');
      audioBtn.setAttribute('title', 'Play Temple Bell Ambiance');
      if (bellInterval) clearInterval(bellInterval);
      showAudioToast(false);
    }
  });
}

/* Audio Status Toast */
function showAudioToast(isPlaying) {
  let toast = document.querySelector('.audio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'audio-toast';
    document.body.appendChild(toast);
  }

  const isKhmer = document.documentElement.lang === 'km';
  if (isPlaying) {
    toast.innerHTML = `
      <span class="audio-toast-pulse"></span>
      <span>${isKhmer ? '🔔 កំពុងចាក់សំឡេងគងវត្តបែបសមាធិ • សាធុ!' : '🔔 Meditative Temple Bell Playing • Peace & Merits Dedicated'}</span>
    `;
    toast.classList.add('active');
    setTimeout(() => { toast.classList.remove('active'); }, 4000);
  } else {
    toast.innerHTML = `
      <span>🔇 ${isKhmer ? 'បានបិទសំឡេងគងវត្ត' : 'Temple Sound Muted'}</span>
    `;
    toast.classList.add('active');
    setTimeout(() => { toast.classList.remove('active'); }, 2000);
  }
}

/* 4. Active Nav Link */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        parentDropdown.classList.add('active');
        const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
        if (parentToggle) parentToggle.classList.add('active');
      }
    }
  });
}

/* 5. Floating Embers / Fireflies Canvas in Hero */
function initEmbersCanvas() {
  const canvas = document.getElementById('embers-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      fadeSpeed: Math.random() * 0.01 + 0.005,
      color: Math.random() > 0.3 ? '245, 158, 11' : '251, 113, 133' // Gold & Lotus Pink
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.opacity -= p.fadeSpeed;

      if (p.opacity <= 0 || p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
        p.opacity = Math.random() * 0.8 + 0.3;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${p.color}, 0.8)`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* 6. Strike the Merit Gong Button */
function initMeritGong() {
  const gongBtn = document.getElementById('btn-merit-gong');
  const countEl = document.getElementById('merit-count');
  if (!gongBtn) return;

  let localCount = parseInt(localStorage.getItem('pchum_ben_merits') || '1248', 10);
  if (countEl) countEl.textContent = localCount.toLocaleString();

  gongBtn.addEventListener('click', () => {
    localCount++;
    localStorage.setItem('pchum_ben_merits', localCount);
    if (countEl) {
      countEl.textContent = localCount.toLocaleString();
      countEl.style.color = '#FDE68A';
      setTimeout(() => { countEl.style.color = '#FFF'; }, 400);
    }

    // Play resonant strike sound
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(144, now); // Deep temple gong tone
      osc.frequency.exponentialRampToValueAtTime(108, now + 3);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 4);
    } catch (e) {}

    // Button animation
    gongBtn.style.transform = 'scale(1.3) rotate(20deg)';
    setTimeout(() => { gongBtn.style.transform = ''; }, 300);
  });
}

/* ==========================================================================
   7. GLOBAL QUICK SEARCH ENGINE (CTRL + K)
   ========================================================================== */

const SEARCH_DATABASE = [
  { title: 'Origins & Legend of King Pingala', kh: 'ប្រវត្តិ និងរឿងព្រេងស្តេចពិង្គល', url: 'history.html', category: 'History', icon: '📜', snippet: 'How ancient kings instituted merit-making for departed souls.' },
  { title: 'Bos Bay Ben (Dawn Rice Casting)', kh: 'ពិធីបោះបាយបិណ្ឌទៀបភ្លឺ', url: 'traditions.html#bos-bay-ben', category: 'Ritual', icon: '🍚', snippet: 'Walking circumambulation at 4:00 AM to feed wandering spirits (Preta).' },
  { title: 'Bangskol & Merit Transfer', kh: 'ពិធីបង្សុកូល និងឧទ្ទិសកុសល', url: 'traditions.html#bangskol', category: 'Ritual', icon: '☸️', snippet: 'Monk chanting over sacred white cloth dedicating spiritual merits.' },
  { title: 'Sand Mountain Ritual (Phnum Khsach)', kh: 'ពិធីពូនភ្នំខ្សាច់', url: 'traditions.html#sand-mountain', category: 'Ritual', icon: '⛰️', snippet: 'Building sand stupas to cleanse past misdeeds and gain longevity.' },
  { title: 'Praphel (Flower Boat Release)', kh: 'ពិធីបណ្តែតប្រទីប ឬសំពៅ', url: 'traditions.html#praphel', category: 'Ritual', icon: '⛵', snippet: 'Farewell ritual sending ancestors back with floating flower lanterns.' },
  { title: 'Num Ansom Chek (Banana Sticky Rice)', kh: 'នំអន្សមចេក', url: 'food.html#num-ansom', category: 'Cuisine', icon: '🍌', snippet: 'Cylindrical sticky rice cake wrapped in banana leaves with sweet banana filling.' },
  { title: 'Num Ansom Chrouk (Pork Sticky Rice)', kh: 'នំអន្សមជ្រូក', url: 'food.html#num-ansom', category: 'Cuisine', icon: '🥓', snippet: 'Savory sticky rice wrapped with mung bean and spiced pork belly.' },
  { title: 'Num Kom (Pyramid Sticky Rice)', kh: 'នំគម', url: 'food.html#num-kom', category: 'Cuisine', icon: '🔺', snippet: 'Pyramid-shaped glutinous rice symbolizing feminine cosmic energy.' },
  { title: 'Kralan (Sticky Rice in Bamboo)', kh: 'ក្រឡានដុតបំពង់ឫស្សី', url: 'food.html#kralan', category: 'Cuisine', icon: '🎋', snippet: 'Fragrant sticky rice, coconut milk, and black beans roasted in bamboo.' },
  { title: 'Virtual Offering Tray Masterclass', kh: 'ថាសគ្រឿងសក្ការបូជាអន្តរកម្ម', url: 'food.html#virtual-tray-section', category: 'Interactive', icon: '🍱', snippet: 'Assemble a sacred ceremonial tray and calculate your merit score.' },
  { title: '15-Day Kann Ben Timeline', kh: 'កាលវិភាគ ១៥ ថ្ងៃកាន់បិណ្ឌ', url: 'timeline.html', category: 'Timeline', icon: '📅', snippet: 'Day-by-day ritual schedule from Kann Ben 1 to Kann Ben 14.' },
  { title: 'Pchum Thom (Day 15 Grand Celebration)', kh: 'ថ្ងៃភ្ជុំធំ (១៥ រោច)', url: 'timeline.html#day-15', category: 'Timeline', icon: '🌟', snippet: 'The climactic day of nationwide family gatherings and grand alms.' },
  { title: 'Pagodas & Monasteries in Cambodia', kh: 'បញ្ជីវត្តអារាមល្បីៗទូទាំងប្រទេស', url: 'pagodas.html', category: 'Pagodas', icon: '🏛️', snippet: 'Search featured pagodas by province with direction guides and bookmarks.' },
  { title: 'Visitor Etiquette & Dress Code', kh: 'ការណែនាំ និងក្រមសីលធម៌អ្នកទស្សនា', url: 'guide.html', category: 'Guide', icon: '🙏', snippet: 'Dos and don’ts for respectful temple visits: attire, photography, and gestures.' },
  { title: 'Pchum Ben Dates by Year (2024–2030)', kh: 'កាលបរិច្ឆេទបុណ្យភ្ជុំបិណ្ឌតាមឆ្នាំ', url: 'calendar.html', category: 'Calendar', icon: '🗓️', snippet: 'Verified lunisolar calendar dates, public holidays, and 2026 Spotlight.' },
  { title: 'The Hungry Ghosts (Preta) Cosmology', kh: 'ពួកប្រេត និងអបាយភូមិ', url: 'about.html', category: 'Cosmology', icon: '👻', snippet: 'Learn why spirits wander and how living relatives alleviate their torment.' },
  { title: 'Seven Generations of Relatives', kh: 'ញាតិទាំង ៧ សន្តាន', url: 'about.html', category: 'Lineage', icon: '🌳', snippet: 'The genealogical hierarchy of 4 ascending and 3 descending generations.' },
  { title: 'Photo & Video Gallery', kh: 'កម្រងរូបភាពពិធីបុណ្យ', url: 'gallery.html', category: 'Gallery', icon: '📸', snippet: 'High-definition photo collection and cultural documentary footage.' },
  { title: 'Contact & Share Ancestor Stories', kh: 'ទំនាក់ទំនង និងចែករំលែករឿងរ៉ាវ', url: 'contact.html', category: 'Contact', icon: '💌', snippet: 'Get in touch with cultural curators or submit your festival memories.' }
];

function initQuickSearch() {
  // Create search modal HTML if not already in DOM
  let modalBackdrop = document.querySelector('.search-modal-backdrop');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'search-modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="search-modal-card">
        <div class="search-input-header">
          <span class="search-icon">🔍</span>
          <input type="text" id="quick-search-input" placeholder="Search rituals, food, pagodas, dates, timeline... (Esc to close)" autocomplete="off">
          <button class="search-close-btn" id="search-close-btn" aria-label="Close search">&times;</button>
        </div>
        <div class="search-results-list" id="search-results-list"></div>
        <div class="search-modal-footer">
          <div class="search-keyboard-hint">
            Navigate: <kbd>↑</kbd> <kbd>↓</kbd> &bull; Open: <kbd>Enter</kbd> &bull; Close: <kbd>Esc</kbd>
          </div>
          <span style="color: var(--gold-400);">☸️ Cultural Search Engine</span>
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);
  }

  const input = document.getElementById('quick-search-input');
  const resultsContainer = document.getElementById('search-results-list');
  const closeBtn = document.getElementById('search-close-btn');

  function openSearch() {
    modalBackdrop.classList.add('open');
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    modalBackdrop.classList.remove('open');
  }

  function renderResults(query) {
    const isKhmer = document.documentElement.lang === 'km';
    const q = query.trim().toLowerCase();
    
    const filtered = SEARCH_DATABASE.filter(item => {
      if (!q) return true;
      return item.title.toLowerCase().includes(q) ||
             item.kh.toLowerCase().includes(q) ||
             item.snippet.toLowerCase().includes(q) ||
             item.category.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 36px 20px; color: var(--text-muted);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🕊️</div>
          <div>${isKhmer ? 'រកមិនឃើញលទ្ធផលត្រូវគ្នានឹង' : 'No topics found matching'} &ldquo;${query}&rdquo;</div>
          <small style="color: var(--gold-400); margin-top: 6px; display: block;">Try: Ansom, Pagoda, Bos Bay Ben, 2026, Preta</small>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map((item, index) => `
      <a href="${item.url}" class="search-result-item ${index === 0 ? 'highlighted' : ''}">
        <div class="search-item-left">
          <div class="search-item-icon">${item.icon}</div>
          <div class="search-item-info">
            <strong>${isKhmer ? item.kh : item.title}</strong>
            <small>${item.snippet}</small>
          </div>
        </div>
        <span class="badge badge-gold" style="font-size: 0.72rem;">${item.category}</span>
      </a>
    `).join('');
  }

  input.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  // Keyboard navigation inside search
  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    let currentIndex = -1;
    items.forEach((item, idx) => {
      if (item.classList.contains('highlighted')) currentIndex = idx;
    });

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) {
        if (currentIndex >= 0) items[currentIndex].classList.remove('highlighted');
        const nextIdx = (currentIndex + 1) % items.length;
        items[nextIdx].classList.add('highlighted');
        items[nextIdx].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0) {
        if (currentIndex >= 0) items[currentIndex].classList.remove('highlighted');
        const prevIdx = (currentIndex - 1 + items.length) % items.length;
        items[prevIdx].classList.add('highlighted');
        items[prevIdx].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter') {
      if (currentIndex >= 0 && items[currentIndex]) {
        e.preventDefault();
        items[currentIndex].click();
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  closeBtn?.addEventListener('click', closeSearch);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeSearch();
  });

  // Global Ctrl + K / Cmd + K shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modalBackdrop.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

  // Search trigger buttons in navbar
  document.querySelectorAll('.btn-search-trigger').forEach(btn => {
    btn.addEventListener('click', openSearch);
  });
}

/* 8. Interactive 4-Dimension Exploration Tabs */
function initDimensionTabs() {
  const tabs = document.querySelectorAll('#dimension-tabs .dimension-tab-btn');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      // Active state on buttons
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Switch pane
      document.querySelectorAll('.dimension-content-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initEmbersCanvas();
  initMeritGong();
  initQuickSearch();
  initDimensionTabs();
});



