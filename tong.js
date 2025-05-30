document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Hiện/ẩn menu mobile
    if (menuIcon && menu) {
        menuIcon.addEventListener('click', function () {
            menu.classList.toggle('show');
        });
    }

    // Xử lý dropdown: cả desktop và mobile
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
                } else {
                    // Desktop: cho dropdown hiển thị nhưng không ngăn chặn hành vi mặc định
                    dropdowns.forEach(d => d.classList.remove('active'));
                    dropdown.classList.add('active');
                }
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
