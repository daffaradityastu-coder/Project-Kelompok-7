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
    bodyEl.innerText = description;
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
// FORM SUBMIT -> TERHUBUNG WA
// ==========================================
window.handleFormSubmit = function(event) {
  event.preventDefault();

  const inputs = event.target.querySelectorAll('input, select');
  const nama = inputs[0].value;
  const nimProdi = inputs[1].value;
  const noWA = inputs[2].value;
  const divisi = inputs[3].options[inputs[3].selectedIndex].text;

  // Ganti nomor WA aktif pengurus di sini (format 628xxx)
  const nomorWAAdmin = '6285867431371'; 

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
  const cards = document.querySelectorAll('.divisi-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
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
