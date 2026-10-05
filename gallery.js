/**
 * Gallery Controller: Lightbox viewer and category filtering
 * Pchum Ben Cultural Portal
 */

const galleryItems = [
  {
    id: 1,
    category: 'rituals',
    titleEn: 'Dawn Bos Bay Ben Circumambulation',
    titleKh: 'ពិធីបោះបាយបិណ្ឌនាពេលទៀបភ្លឺ',
    subEn: 'Devotees with candles at 4:00 AM walking 3 times around Vihear',
    subKh: 'ពុទ្ធបរិស័ទដើរប្រទក្សិណ ៣ ជុំជុំវិញព្រះវិហារ ម៉ោង ៤ ភ្លឺ',
    src: 'img/rituals/bos-bay-ben.jpg'
  },
  {
    id: 2,
    category: 'rituals',
    titleEn: 'Monks Chanting Bangskol',
    titleKh: 'ព្រះសង្ឃសូត្រធម៌បង្សុកូលឧទ្ទិសកុសល',
    subEn: 'Theravada Buddhist Sangha blessings for 7 generations',
    subKh: 'ការឧទ្ទិសបុណ្យជូនដល់បុព្វការីជន ៧ សន្តាន',
    src: 'img/rituals/bangskol.jpg'
  },
  {
    id: 3,
    category: 'pagodas',
    titleEn: 'Wat Ounalom Golden Spire',
    titleKh: 'វត្តឧណ្ណាលោម រាជធានីភ្នំពេញ',
    subEn: 'Historic Headquarters of Cambodian Buddhism founded in 1443',
    subKh: 'បេះដូងពុទ្ធសាសនានៅកម្ពុជា កសាងក្នុងឆ្នាំ ១៤៤៣',
    src: 'img/pagodas/wat-ounalom.jpg'
  },
  {
    id: 4,
    category: 'food',
    titleEn: 'Traditional Num Ansom Chek & Chrouk',
    titleKh: 'នំអន្សមចេក និងនំអន្សមជ្រូកខ្មែរ',
    subEn: 'Sticky rice wrapped tightly in fragrant banana leaves',
    subKh: 'នំប្រពៃណីខ្មែរវេចស្លឹកចេកដ៏ពិសិដ្ឋ',
    src: 'img/food/num-ansom.jpg'
  },
  {
    id: 5,
    category: 'food',
    titleEn: 'Kralan Roasted Bamboo Rice',
    titleKh: 'ក្រឡានដុតប្ញស្សីថ្មីៗ',
    subEn: 'Fragrant sticky rice with coconut milk & black beans',
    subKh: 'ក្រឡានឈ្ងុយឆ្ងាញ់ផ្សំពីខ្ទិះដូង និងសណ្តែកខ្មៅ',
    src: 'img/food/kralan.jpg'
  },
  {
    id: 6,
    category: 'pagodas',
    titleEn: 'Monks at Ancient Angkor Sanctuary',
    titleKh: 'ព្រះសង្ឃនិមន្តកាត់ប្រាសាទបុរាណ',
    subEn: 'Sacred stone causeway with lotus blossoms and saffron robes',
    subKh: 'ភាពស្ងប់ស្ងាត់ និងសោភ័ណភាពនៃវប្បធម៌ខ្មែរ',
    src: 'img/pagodas/angkor-pagoda.jpg'
  },
  {
    id: 7,
    category: 'rituals',
    titleEn: 'Grand Pchum Thom Alms Procession',
    titleKh: 'ក្បួនរាប់បាត្រថ្ងៃភ្ជុំធំ',
    subEn: 'Devotees offering food in silver bowls to hundreds of monastics',
    subKh: 'ការប្រគេនចង្ហាន់ដល់ព្រះសង្ឃរាប់រយអង្គ',
    src: 'img/hero/hero-banner.jpg'
  },
  {
    id: 8,
    category: 'pagodas',
    titleEn: 'Wat Phnom Hilltop Stupa',
    titleKh: 'វត្តភ្នំដូនពេញ រាត្រីសមោសរ',
    subEn: 'Historic birthplace of Phnom Penh founded by Lady Penh',
    subKh: 'ទីតាំងប្រវត្តិសាស្ត្ររាជធានីភ្នំពេញ កសាងដោយលោកយាយពេញ',
    src: 'img/pagodas/wat-phnom.jpg'
  }
];

let currentGalleryFilter = 'all';

function initGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  updateFilterButtonLabels();
  renderGallery();

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGalleryFilter = btn.getAttribute('data-filter') || 'all';
      renderGallery();
    });
  });

  document.addEventListener('languageChanged', () => {
    updateFilterButtonLabels();
    renderGallery();
  });
}

function updateFilterButtonLabels() {
  const isKhmer = document.documentElement.lang === 'km';
  const counts = {
    all: galleryItems.length,
    rituals: galleryItems.filter(i => i.category === 'rituals').length,
    pagodas: galleryItems.filter(i => i.category === 'pagodas').length,
    food: galleryItems.filter(i => i.category === 'food').length
  };

  const btnAll = document.querySelector('.gallery-filter-btn[data-filter="all"]');
  const btnRituals = document.querySelector('.gallery-filter-btn[data-filter="rituals"]');
  const btnPagodas = document.querySelector('.gallery-filter-btn[data-filter="pagodas"]');
  const btnFood = document.querySelector('.gallery-filter-btn[data-filter="food"]');

  if (btnAll) btnAll.innerHTML = isKhmer ? `ទាំងអស់ (${counts.all})` : `All Media (${counts.all})`;
  if (btnRituals) btnRituals.innerHTML = isKhmer ? `ពិធីសាសនា (${counts.rituals})` : `Rituals & Bos Bay Ben (${counts.rituals})`;
  if (btnPagodas) btnPagodas.innerHTML = isKhmer ? `វត្តអារាម (${counts.pagodas})` : `Sacred Pagodas (${counts.pagodas})`;
  if (btnFood) btnFood.innerHTML = isKhmer ? `ម្ហូប និងនំ (${counts.food})` : `Traditional Cuisine (${counts.food})`;
}

function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const isKhmer = document.documentElement.lang === 'km';
  const filtered = galleryItems.filter(item => {
    if (currentGalleryFilter === 'all') return true;
    return item.category === currentGalleryFilter;
  });

  container.innerHTML = filtered.map(item => `
    <div class="gallery-item zoom-in" onclick="openGalleryLightbox('${item.src}')" title="Click to view fullscreen">
      <img src="${item.src}" alt="${item.titleEn}" loading="lazy" onerror="this.onerror=null;this.src=this.src.split('/').pop();">
      <div class="gallery-overlay">
        <span class="badge badge-gold" style="align-self: flex-start; margin-bottom: 8px;">
          ${item.category.toUpperCase()}
        </span>
        <h4 class="gallery-caption-title">${isKhmer ? item.titleKh : item.titleEn}</h4>
        <p class="gallery-caption-sub">${isKhmer ? item.subKh : item.subEn}</p>
      </div>
    </div>
  `).join('');
}

function openGalleryLightbox(src) {
  const isKhmer = document.documentElement.lang === 'km';
  const group = galleryItems.map(item => ({
    src: item.src,
    caption: `<strong>${isKhmer ? item.titleKh : item.titleEn}</strong><br><span style="opacity: 0.88; font-size: 0.95em;">${isKhmer ? item.subKh : item.subEn}</span>`
  }));

  window.lightboxViewer.open(src, '', group);
}

window.openGalleryLightbox = openGalleryLightbox;

document.addEventListener('DOMContentLoaded', initGallery);
