// ==========================================
// DEKLARASI FUNGSI GLOBAL MODAL & ACTION
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
    element.innerHTML = '&#9829;'; // Heart Terisi
  } else {
    element.innerHTML = '&#9825;'; // Heart Kosong
  }
};

// ==========================================
// HANDLER FORM SUBMIT -> DIRECT TO WHATSAPP
// ==========================================
window.handleFormSubmit = function(event) {
  event.preventDefault();

  // 1. Ambil data dari form input
  const inputs = event.target.querySelectorAll('input, select');
  const nama = inputs[0].value;
  const nimProdi = inputs[1].value;
  const noWA = inputs[2].value;
  const divisi = inputs[3].options[inputs[3].selectedIndex].text;

  // 2. Ganti dengan nomor WhatsApp aktif pengurus/kamu (format: 628xxx)
  const nomorWAAdmin = '6285867431371'; 

  // 3. Susun isi pesan WhatsApp
  const pesan = `Halo Pengurus UKM Futsal PNC,%0A%0ASaya ingin mendaftar sebagai anggota baru UKM Futsal. Berikut data diri saya:%0A%0A` +
    `• *Nama Lengkap:* ${encodeURIComponent(nama)}%0A` +
    `• *NIM & Prodi:* ${encodeURIComponent(nimProdi)}%0A` +
    `• *No. WhatsApp:* ${encodeURIComponent(noWA)}%0A` +
    `• *Pilihan Divisi:* ${encodeURIComponent(divisi)}%0A%0A` +
    `Mohon informasi mengenai jadwal latihan selanjutnya. Terima kasih!`;

  // 4. Buka tautan WhatsApp di tab baru
  const urlWA = `https://wa.me/${nomorWAAdmin}?text=${pesan}`;
  window.open(urlWA, '_blank');

  // 5. Tutup modal & bersihkan form
  closeJoinModal();
  event.target.reset();
};

// ==========================================
// EVENT LISTENERS SAAT DOM SIAP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Listener tombol Gabung UKM
  const joinBtns = document.querySelectorAll('.btn-open-join');
  joinBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openJoinModal();
    });
  });

  // Filter Kategori Divisi
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

  // Close Modal saat klik area luar backdrop
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