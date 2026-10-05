/**
 * Simple Lightweight Lightbox for Pchum Ben Cultural Portal
 */
class LightboxViewer {
  constructor() {
    this.images = [];
    this.currentIndex = 0;
    this.init();
  }

  init() {
    // Build modal DOM if not present
    if (!document.getElementById('lightbox-modal')) {
      const modal = document.createElement('div');
      modal.id = 'lightbox-modal';
      modal.className = 'lightbox-modal';
      modal.innerHTML = `
        <div class="lightbox-content-wrap">
          <button class="lightbox-close" aria-label="Close">&times;</button>
          <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#10094;</button>
          <img class="lightbox-img" src="" alt="Enlarged view">
          <button class="lightbox-nav lightbox-next" aria-label="Next">&#10095;</button>
          <div class="lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(modal);

      this.modal = modal;
      this.img = modal.querySelector('.lightbox-img');
      this.caption = modal.querySelector('.lightbox-caption');
      this.btnClose = modal.querySelector('.lightbox-close');
      this.btnPrev = modal.querySelector('.lightbox-prev');
      this.btnNext = modal.querySelector('.lightbox-next');

      this.bindEvents();
    }
  }

  bindEvents() {
    this.btnClose.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    this.btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      this.prev();
    });

    this.btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      this.next();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  open(src, captionText = '', group = []) {
    this.images = group.length > 0 ? group : [{ src, caption: captionText }];
    this.currentIndex = this.images.findIndex(item => item.src === src);
    if (this.currentIndex === -1) this.currentIndex = 0;

    this.updateContent();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  updateContent() {
    const item = this.images[this.currentIndex];
    if (!item) return;
    this.img.src = item.src;
    this.img.alt = item.caption || 'Pchum Ben Festival';
    this.caption.innerHTML = item.caption || '';
    
    // Toggle navigation buttons if single image
    if (this.images.length <= 1) {
      this.btnPrev.style.display = 'none';
      this.btnNext.style.display = 'none';
    } else {
      this.btnPrev.style.display = 'flex';
      this.btnNext.style.display = 'flex';
    }
  }

  next() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateContent();
  }

  prev() {
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateContent();
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global instance & helper function
window.lightboxViewer = new LightboxViewer();

/**
 * Universal Lightbox trigger available on any page
 * @param {string} src - Image path
 * @param {string} captionText - Optional caption
 * @param {Array} group - Optional array of items {src, caption}
 */
window.openGalleryLightbox = function(src, captionText = '', group = []) {
  if (!window.lightboxViewer) {
    window.lightboxViewer = new LightboxViewer();
  }
  window.lightboxViewer.open(src, captionText, group);
};

