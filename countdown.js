/**
 * Pchum Ben Live Countdown Timer & Status
 * Supports both English and Khmer numeral conversion
 */

const KhmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

function toKhmerDigits(num) {
  return String(num).split('').map(d => (d >= '0' && d <= '9' ? KhmerNumerals[parseInt(d)] : d)).join('');
}

async function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');
  const statusEl = document.getElementById('cd-status-text');

  if (!daysEl) return;

  let targetDate = new Date('2026-10-10T00:00:00+07:00'); // Default 2026 Pchum Ben Day
  let startDate = new Date('2026-09-26T00:00:00+07:00'); // Kann Ben 1

  try {
    let data = null;
    if (window.DataStore) {
      data = await window.DataStore.getDates();
    } else {
      try {
        const res = await fetch('data/dates.json');
        if (res.ok) data = await res.json();
      } catch (e) {}
      if (!data) {
        try {
          const res = await fetch('dates.json');
          if (res.ok) data = await res.json();
        } catch (e) {}
      }
    }

    if (data && data.years) {
      const now = new Date();
      // Find the relevant year
      const currentYearData = data.years.find(y => new Date(y.pchumBenDay + 'T23:59:59+07:00') >= now) || data.years[data.years.length - 1];
      if (currentYearData) {
        targetDate = new Date(currentYearData.pchumBenDay + 'T00:00:00+07:00');
        startDate = new Date(currentYearData.kannBenStart + 'T00:00:00+07:00');
      }
    }
  } catch (err) {
    console.warn('Using default countdown date:', err);
  }

  function update() {
    const now = new Date();
    const isKhmer = document.documentElement.lang === 'km';
    const totalDiff = targetDate - now;

    if (now >= startDate && now <= targetDate) {
      if (statusEl) {
        statusEl.innerHTML = isKhmer 
          ? '🌟 បច្ចុប្បន្នជាពេលវេលានៃពិធីបុណ្យកាន់បិណ្ឌ! សូមជ្រះថ្លាទាំងអស់គ្នា'
          : '🌟 Kann Ben is currently underway! Celebrate and make merit';
      }
    } else if (totalDiff <= 0) {
      if (statusEl) {
        statusEl.innerHTML = isKhmer 
          ? '🎉 ថ្ងៃភ្ជុំបិណ្ឌបានឈានចូលមកដល់ហើយ! សូមអនុមោទនា'
          : '🎉 Pchum Ben Day is here! Happy Ancestors\' Day';
      }
    }

    if (totalDiff <= 0) {
      daysEl.textContent = isKhmer ? '០០' : '00';
      hoursEl.textContent = isKhmer ? '០០' : '00';
      minsEl.textContent = isKhmer ? '០០' : '00';
      secsEl.textContent = isKhmer ? '០០' : '00';
      return;
    }

    const d = Math.floor(totalDiff / (1000 * 60 * 60 * 24));
    const h = Math.floor((totalDiff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((totalDiff / 1000 / 60) % 60);
    const s = Math.floor((totalDiff / 1000) % 60);

    const pad = n => String(n).padStart(2, '0');

    if (isKhmer) {
      daysEl.textContent = toKhmerDigits(pad(d));
      hoursEl.textContent = toKhmerDigits(pad(h));
      minsEl.textContent = toKhmerDigits(pad(m));
      secsEl.textContent = toKhmerDigits(pad(s));
    } else {
      daysEl.textContent = pad(d);
      hoursEl.textContent = pad(h);
      minsEl.textContent = pad(m);
      secsEl.textContent = pad(s);
    }
  }

  update();
  setInterval(update, 1000);

  document.addEventListener('languageChanged', update);
}

document.addEventListener('DOMContentLoaded', initCountdown);
