document.addEventListener('DOMContentLoaded', function() {

  // --- Modal đặt tour ---
  const openBtns = document.querySelectorAll('#open-booking');
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.querySelector('.close-modal');
  const bookingForm = document.getElementById('booking-form');

  openBtns.forEach(openBtn => {
    openBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('show-thank-you');
        document.body.style.overflow = 'hidden';
        if (bookingForm) bookingForm.reset();
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      modal.classList.add('show-thank-you');
      // (nếu cần gửi AJAX thì xử lý ở đây)
    });
  }

  // --- Bắt buộc số điện thoại bắt đầu 0 ---
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
      let v = phoneInput.value.trim();
      if (v && !/^0/.test(v)) {
        phoneInput.value = '0' + v;
      }
    });
  }

  // --- Tự động thêm/chỉnh @gmail.com ---
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      let v = emailInput.value.trim().replace(/\s+/g,'');
      if (!v) return;
      let local = v.split('@')[0];
      emailInput.value = local + '@gmail.com';
    });
  }

  // --- Dropdown & Navbar (từ tong.js) ---
  const menuIcon = document.querySelector('.menu-icon');
  const menu = document.querySelector('.menu');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Hiện/ẩn menu mobile
  if (menuIcon && menu) {
    menuIcon.addEventListener('click', function () {
      menu.classList.toggle('show');
    });
  }

  // Xử lý dropdown: mobile xổ lần đầu, lần 2 chuyển trang; desktop chuyển trang luôn
  dropdowns.forEach(function (dropdown) {
    const dropBtn = dropdown.querySelector('.dropbtn');
    if (dropBtn) {
      dropBtn.addEventListener('click', function (e) {
        const isMobile = window.innerWidth < 992;
        if (isMobile) {
          e.preventDefault();
          e.stopPropagation();
          if (!dropdown.classList.contains('active')) {
            // Mở dropdown
            dropdowns.forEach(d => d.classList.remove('active'));
            dropdown.classList.add('active');
          } else {
            // Đã mở → chuyển trang
            window.location.href = this.getAttribute('href');
          }
        }
        // Desktop: không ngăn chặn hành vi mặc định, sẽ chuyển trang luôn
      });
    }
  });

  // Đóng menu và dropdown khi click ngoài
  document.addEventListener('click', function (e) {
    if (
      (menu && menu.contains(e.target)) ||
      (menuIcon && menuIcon.contains(e.target)) ||
      e.target.classList.contains('dropbtn') ||
      e.target.closest('.dropdown-content')
    ) {
      return;
    }
    if (menu) menu.classList.remove('show');
    dropdowns.forEach(d => d.classList.remove('active'));
  });

  // Đảm bảo menu đóng khi resize về desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991.98 && menu) {
      menu.classList.remove('show');
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });

  // Đóng dropdown khi click vào mục con
  document.querySelectorAll('.dropdown-content a').forEach(function(link) {
    link.addEventListener('click', function() {
      dropdowns.forEach(d => d.classList.remove('active'));
      if (menu) menu.classList.remove('show');
    });
  });

  // Reset dropdown trạng thái sau khi chuyển trang
  window.addEventListener('pageshow', function () {
    dropdowns.forEach(d => d.classList.remove('active'));
  });

});