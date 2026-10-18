// ==========================================
// FUNGSI MODAL & AKSI GLOBAL
// ==========================================
window.openJoinModal = function() {
  const modal = document.getElementById('joinModal');
  if (modal) {
    modal.classList.add('active');
  }
};

window.closeJoinModal = function() {
  const modal = document.getElementById('joinModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

window.openDetail = function(title, description) {
  const titleEl = document.getElementById('detailTitle');
  const bodyEl = document.getElementById('detailBody');
  const modal = document.getElementById('detailModal');
  
  if (titleEl && bodyEl && modal) {
    titleEl.innerText = title;
    bodyEl.innerHTML = description; 
    modal.classList.add('active');
  }
};

window.closeDetailModal = function() {
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.remove('active');
  }
};

window.toggleLike = function(element) {
  element.classList.toggle('liked');
  if (element.classList.contains('liked')) {
    element.innerHTML = '&#9829;'; 
  } else {
    element.innerHTML = '&#9825;'; 
  }
};

// ==========================================
// FUNGSI FILTER UNIVERSAL (PROFIL & DIVISI)
// ==========================================
window.filterProfil = function(category, btnElement) {
  const currentSection = btnElement.closest('section');
  if (!currentSection) return;

  const filterBtns = currentSection.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  const cards = currentSection.querySelectorAll('.divisi-card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
};

// ==========================================
// FORM SUBMIT -> TERHUBUNG WA
// ==========================================
window.handleFormSubmit = function(event) {
  event.preventDefault();

  const inputs = event.target.querySelectorAll('input, select');
  const nama = inputs[0].value;
  const nimProdi = inputs[1].value;
  const noWA = inputs[2].value;
  const divisi = inputs[3].options[inputs[3].selectedIndex].text;

  const nomorWAAdmin = '6281234567890'; 

  const pesan = `Halo Pengurus UKM Futsal PNC,%0A%0ASaya ingin mendaftar sebagai anggota baru UKM Futsal. Berikut data diri saya:%0A%0A` +
    `• *Nama Lengkap:* ${encodeURIComponent(nama)}%0A` +
    `• *NIM & Prodi:* ${encodeURIComponent(nimProdi)}%0A` +
    `• *No. WhatsApp:* ${encodeURIComponent(noWA)}%0A` +
    `• *Pilihan Divisi:* ${encodeURIComponent(divisi)}%0A%0A` +
    `Mohon informasi mengenai jadwal latihan selanjutnya. Terima kasih!`;

  const urlWA = `https://wa.me/${nomorWAAdmin}?text=${pesan}`;
  window.open(urlWA, '_blank');

  closeJoinModal();
  event.target.reset();
};

// ==========================================
// DOM EVENT LISTENERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const joinBtns = document.querySelectorAll('.btn-open-join');
  joinBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openJoinModal();
    });
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      if (category) {
        filterProfil(category, this);
      }
    });
  });

  window.addEventListener('click', (event) => {
    const joinModal = document.getElementById('joinModal');
    const detailModal = document.getElementById('detailModal');
    
    if (event.target === joinModal) {
      closeJoinModal();
    }
    if (event.target === detailModal) {
      closeDetailModal();
    }
  });
});