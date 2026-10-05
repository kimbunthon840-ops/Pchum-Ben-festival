/**
 * Interactive 15-Day Timeline Controller
 * Pchum Ben Cultural Portal
 */

let timelineData = [];
let activeDayIndex = 0;
let currentFilter = 'all';

async function initTimeline() {
  const container = document.getElementById('timeline-app');
  if (!container) return;

  try {
    if (window.DataStore) {
      timelineData = await window.DataStore.getTimeline();
    } else {
      try {
        const res = await fetch('data/timeline.json');
        if (res.ok) timelineData = await res.json();
      } catch (e) {}
      if (!timelineData || timelineData.length === 0) {
        try {
          const res = await fetch('timeline.json');
          if (res.ok) timelineData = await res.json();
        } catch (e) {}
      }
    }
    renderTimeline();
    bindKeyboardNav();
  } catch (err) {
    console.error('Failed to load timeline data:', err);
  }

  document.addEventListener('languageChanged', () => {
    if (timelineData.length > 0) renderTimeline();
  });
}

function bindKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft') {
      prevDay();
    } else if (e.key === 'ArrowRight') {
      nextDay();
    }
  });
}

function prevDay() {
  if (activeDayIndex > 0) {
    selectTimelineDay(activeDayIndex - 1);
  } else {
    selectTimelineDay(timelineData.length - 1);
  }
}

function nextDay() {
  if (activeDayIndex < timelineData.length - 1) {
    selectTimelineDay(activeDayIndex + 1);
  } else {
    selectTimelineDay(0);
  }
}

function scrollTimelinePills(delta) {
  const container = document.getElementById('timeline-pills-row');
  if (container) {
    container.scrollBy({ left: delta, behavior: 'smooth' });
  }
}

function getMoonEmoji(day) {
  if (day <= 3) return '🌘';
  if (day <= 7) return '🌒';
  if (day <= 10) return '🌓';
  if (day <= 14) return '🌔';
  return '🌑'; // Day 15 is the dark new moon of 15 Roch
}

function getDayImage(day) {
  if (day === 15) return 'img/hero/hero-banner.jpg';
  if (day === 1 || day === 7) return 'img/rituals/bos-bay-ben.jpg';
  if (day === 2 || day === 4 || day === 8) return 'img/rituals/tak-bat.jpg';
  if (day === 3 || day === 9 || day === 11) return 'img/rituals/bangskol.jpg';
  if (day === 10 || day === 12) return 'img/food/num-ansom.jpg';
  if (day === 13) return 'img/pagodas/wat-ounalom.jpg';
  if (day === 14) return 'img/rituals/candle-procession.jpg';
  if (day === 5 || day === 6) return 'img/pagodas/wat-phnom.jpg';
  return 'img/hero/hero-main.jpg';
}

function setTimelineFilter(filter) {
  currentFilter = filter;
  
  if (filter !== 'all') {
    const currentDay = timelineData[activeDayIndex];
    if (currentDay && currentDay.category !== filter) {
      const matchIdx = timelineData.findIndex(d => d.category === filter);
      if (matchIdx !== -1) {
        activeDayIndex = matchIdx;
      }
    }
  }
  
  renderTimeline();
}

function selectTimelineDay(idx) {
  activeDayIndex = idx;
  renderTimeline();

  // Scroll active pill into view smoothly
  setTimeout(() => {
    const activePill = document.querySelector('.timeline-pill.active');
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, 40);

  // Play subtle sacred bell chime on change
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, audioCtx.currentTime); // 528Hz harmonious frequency
    gain.gain.setValueAtTime(0.16, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.25);
  } catch (e) {}
}

function toggleRitualCheck(dayNumber, ritualIdx) {
  const key = `pchum_checklist_day_${dayNumber}`;
  let checked = [];
  try {
    checked = JSON.parse(localStorage.getItem(key) || '[]');
  } catch (e) {}

  if (checked.includes(ritualIdx)) {
    checked = checked.filter(i => i !== ritualIdx);
  } else {
    checked.push(ritualIdx);
  }

  localStorage.setItem(key, JSON.stringify(checked));
  renderTimeline();
}

function renderTimeline() {
  const container = document.getElementById('timeline-app');
  if (!container || timelineData.length === 0) return;

  const isKhmer = document.documentElement.lang === 'km';
  const activeDay = timelineData[activeDayIndex] || timelineData[0];
  const progressPercent = Math.round((activeDay.day / 15) * 100);

  // Load user checked rituals from localStorage
  const checklistKey = `pchum_checklist_day_${activeDay.day}`;
  let checkedItems = [];
  try {
    checkedItems = JSON.parse(localStorage.getItem(checklistKey) || '[]');
  } catch (e) {}

  const dayIcons = {
    1: '🪔', 2: '🌿', 3: '📜', 4: '🪷', 5: '🤱', 6: '👨‍👧', 7: '⚖️',
    8: '🕊️', 9: '👑', 10: '🌾', 11: '🧵', 12: '🍌', 13: '🏡', 14: '🕯️', 15: '🌟'
  };

  const categories = [
    { id: 'all', icon: '✨', en: 'All 15 Days', kh: 'ទាំងអស់ (១៥ ថ្ងៃ)' },
    { id: 'ritual', icon: '🪔', en: 'Rituals & Bos Bay Ben', kh: 'ពិធីបោះបាយបិណ្ឌ' },
    { id: 'offerings', icon: '🍌', en: 'Offerings & Num Ansom', kh: 'ការវេចនំ និងទេយ្យទាន' },
    { id: 'chanting', icon: '📜', en: 'Sermons & Chanting', kh: 'ការសូត្រធម៌បង្សុកូល' },
    { id: 'culmination', icon: '🌟', en: 'Pchum Thom (Day 15)', kh: 'ថ្ងៃភ្ជុំធំ (Day 15)' }
  ];

  const visibleDays = currentFilter === 'all'
    ? timelineData.map((d, i) => ({ ...d, originalIndex: i }))
    : timelineData.map((d, i) => ({ ...d, originalIndex: i })).filter(d => d.category === currentFilter);

  const dayImg = getDayImage(activeDay.day);
  const moonIcon = getMoonEmoji(activeDay.day);
  const totalRituals = activeDay.rituals.length;
  const completedRituals = checkedItems.length;
  const isAllCompleted = totalRituals > 0 && completedRituals === totalRituals;

  container.innerHTML = `
    <!-- Category Filter Bar -->
    <div class="filter-bar">
      <div class="filter-group">
        ${categories.map(c => `
          <button class="filter-btn ${currentFilter === c.id ? 'active' : ''}" onclick="setTimelineFilter('${c.id}')">
            <span>${c.icon}</span> <span>${isKhmer ? c.kh : c.en}</span>
          </button>
        `).join('')}
      </div>
      <div class="timeline-kbd-hint">
        <kbd>◀</kbd> <kbd>▶</kbd>
        <span>${isKhmer ? 'ប្រើព្រួញក្តារចុចប្តូរថ្ងៃ' : 'Arrow keys to browse'}</span>
      </div>
    </div>

    <!-- Festival 15-Day Progress Bar Card -->
    <div class="festival-progress-card">
      <div class="progress-info-row">
        <div class="progress-title-block">
          <span class="progress-icon">🌟</span>
          <span class="progress-title">
            ${isKhmer ? `វឌ្ឍនភាពបុណ្យ៖ ថ្ងៃទី ${activeDay.day} នៃ ១៥ ថ្ងៃ` : `Festival Progression: Day ${activeDay.day} of 15`}
          </span>
          <span class="progress-pct-badge">${progressPercent}%</span>
        </div>
        <div class="progress-moon-badge">
          <span>${moonIcon}</span>
          <span>${isKhmer ? activeDay.lunarDateKh : activeDay.lunarDateEn}</span>
        </div>
      </div>
      <div class="progress-track-wrapper">
        <div class="progress-track-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <!-- Day Selector Pills Carousel with Horizontal Arrow Controls -->
    <div class="timeline-carousel-container">
      <button class="carousel-arrow-btn" onclick="scrollTimelinePills(-280)" title="Scroll Left" aria-label="Previous Days">‹</button>
      <div class="timeline-nav-pills" id="timeline-pills-row">
        ${visibleDays.map(d => {
          const isSelected = d.originalIndex === activeDayIndex;
          const icon = dayIcons[d.day] || '☸️';
          const titleShort = isKhmer
            ? (d.day === 15 ? '🌟 ថ្ងៃភ្ជុំធំ (១៥ រោច)' : `${icon} កាន់បិណ្ឌ ${d.day} · ${d.titleKh.split('៖')[1]?.trim() || d.khmerDay}`)
            : (d.day === 15 ? '🌟 Day 15 · Pchum Thom' : `${icon} Day ${d.day} · ${d.titleEn.split(':')[1]?.trim() || 'Kann Ben'}`);

          return `
            <button class="timeline-pill ${isSelected ? 'active' : ''} ${d.day === 15 ? 'pill-day-15' : ''}" 
                    onclick="selectTimelineDay(${d.originalIndex})"
                    title="${isKhmer ? d.titleKh : d.titleEn}">
              <span>${titleShort}</span>
            </button>
          `;
        }).join('')}
      </div>
      <button class="carousel-arrow-btn" onclick="scrollTimelinePills(280)" title="Scroll Right" aria-label="Next Days">›</button>
    </div>

    <!-- Active Day Detail Card -->
    <div class="timeline-card fade-in-up">
      <div class="row align-items-center g-5">
        <div class="col-lg-7">
          <div class="d-flex align-items-center gap-2 mb-3">
            <span class="badge ${activeDay.category === 'culmination' ? 'badge-pink' : 'badge-gold'}">
              ${activeDay.category.toUpperCase()}
            </span>
            <span style="color: var(--gold-400); font-size: 0.9rem; font-weight: 600;">
              ${moonIcon} ${isKhmer ? activeDay.lunarDateKh : activeDay.lunarDateEn}
            </span>
          </div>

          <h2 style="color: #FFF; font-size: clamp(1.8rem, 2.5vw, 2.2rem); margin-bottom: 14px; line-height: 1.3;">
            ${isKhmer ? activeDay.titleKh : activeDay.titleEn}
          </h2>

          <p style="color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8; margin-bottom: 26px;">
            ${isKhmer ? activeDay.summaryKh : activeDay.summaryEn}
          </p>

          <!-- Daily Schedule with Interactive Merit Checkboxes -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 style="color: var(--gold-300); font-size: 0.96rem; text-transform: uppercase; letter-spacing: 0.08em; margin: 0;">
              ⏰ ${isKhmer ? 'កាលវិភាគពិធីបុណ្យ និងការចូលរួម' : 'Daily Rituals & Merit Checklist'}
            </h4>
            <span class="badge ${isAllCompleted ? 'badge-gold' : 'badge-pink'}" style="font-size: 0.78rem;">
              ${isAllCompleted ? '🏆 ALL MERITS COMPLETED' : `${completedRituals}/${totalRituals} COMPLETED`}
            </span>
          </div>

          <div>
            ${activeDay.rituals.map((r, rIdx) => {
              const isChecked = checkedItems.includes(rIdx);
              return `
                <div class="timeline-ritual-step" onclick="toggleRitualCheck(${activeDay.day}, ${rIdx})" style="cursor: pointer;" title="Click to dedicate merit">
                  <input type="checkbox" ${isChecked ? 'checked' : ''} style="cursor: pointer; width: 20px; height: 20px; accent-color: var(--gold-500); margin-top: 3px;" onclick="event.stopPropagation(); toggleRitualCheck(${activeDay.day}, ${rIdx})">
                  <span class="timeline-step-time">${r.time}</span>
                  <div style="flex-grow: 1;">
                    <strong style="color: ${isChecked ? 'var(--gold-400)' : '#FFF'}; font-size: 0.96rem; ${isChecked ? 'text-decoration: line-through; opacity: 0.85;' : ''}">
                      ${isKhmer ? r.nameKh : r.nameEn}
                    </strong>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Spiritual Significance Callout -->
          <div style="margin-top: 26px; padding: 20px; background: rgba(245, 158, 11, 0.08); border-left: 4px solid var(--gold-400); border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.2);">
            <strong style="color: var(--gold-300); display: block; font-size: 0.94rem; margin-bottom: 6px;">
              🕉️ ${isKhmer ? 'អត្ថន័យខាងផ្លូវចិត្ត និងព្រលឹង' : 'Spiritual Significance'}
            </strong>
            <span style="color: var(--text-secondary); font-size: 0.96rem; line-height: 1.75; display: block;">
              ${isKhmer ? activeDay.spiritualMeaningKh : activeDay.spiritualMeaningEn}
            </span>
          </div>

          <!-- Day Navigation Controls -->
          <div class="d-flex justify-content-between align-items-center mt-4 pt-3" style="border-top: 1px solid rgba(255,255,255,0.08);">
            <button class="btn-outline" onclick="prevDay()" style="padding: 10px 20px; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px;">
              &larr; ${isKhmer ? 'ថ្ងៃមុន' : 'Previous Day'}
            </button>
            <span style="color: var(--gold-400); font-weight: 700; font-size: 0.95rem;">
              ${isKhmer ? activeDay.khmerDay : `Day ${activeDay.day} of 15`}
            </span>
            <button class="btn-primary" onclick="nextDay()" style="padding: 10px 20px; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px;">
              ${isKhmer ? 'ថ្ងៃបន្ទាប់' : 'Next Day'} &rarr;
            </button>
          </div>
        </div>

        <div class="col-lg-5">
          <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-gold); box-shadow: var(--shadow-gold-lg); position: relative; cursor: pointer;" 
               onclick="openGalleryLightbox('${dayImg}')"
               title="Click to view full image">
            <img src="${dayImg}" 
                 alt="${activeDay.titleEn}" 
                 style="width: 100%; height: 440px; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);">
            <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; background: rgba(7, 10, 18, 0.85); backdrop-filter: blur(8px); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;">
              <span style="color: #FFF; font-size: 0.88rem; font-weight: 600;">
                ${dayIcons[activeDay.day] || '☸️'} ${isKhmer ? activeDay.khmerDay : `Day ${activeDay.day}`}
              </span>
              <span style="color: var(--gold-400); font-size: 0.8rem; font-weight: 600;">🔍 Click to Expand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.selectTimelineDay = selectTimelineDay;
window.setTimelineFilter = setTimelineFilter;
window.prevDay = prevDay;
window.nextDay = nextDay;
window.toggleRitualCheck = toggleRitualCheck;
window.scrollTimelinePills = scrollTimelinePills;

document.addEventListener('DOMContentLoaded', initTimeline);
