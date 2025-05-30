document.addEventListener('DOMContentLoaded', function () {

    // --- Search functionality ---
    const searchButton = document.getElementById("search-button");
    const searchKeywordsInput = document.getElementById("search-keywords");
    const dateInput = document.getElementById("date");
    const guestsInput = document.getElementById("guests");
    const durationInput = document.getElementById("duration");
    const resultsContainer = document.getElementById("search-results");

    function validateForm() {
        let isValid = true;
        [searchKeywordsInput, dateInput, guestsInput, durationInput].forEach(input => {
            input.style.border = "";
        });
        if (!searchKeywordsInput.value.trim()) {
            searchKeywordsInput.style.border = "2px solid red";
            isValid = false;
        }
        if (!dateInput.value) {
            dateInput.style.border = "2px solid red";
            isValid = false;
        }
        if (!guestsInput.value) {
            guestsInput.style.border = "2px solid red";
            isValid = false;
        }
        if (!durationInput.value) {
            durationInput.style.border = "2px solid red";
            isValid = false;
        }
        if (!isValid) {
            alert("Vui lòng điền đầy đủ thông tin tìm kiếm!");
        }
        return isValid;
    }

    if (searchButton) {
        searchButton.addEventListener("click", function (event) {
            event.preventDefault();
            if (!validateForm()) return;

            const keywords = searchKeywordsInput.value.trim().toLowerCase();
            const durationValue = durationInput.value;

            // Map từ khóa và thời gian sang file HTML
            const tourMap = [
                // Vịnh Hạ Long
                { keys: ["vịnh hạ long", "vinh ha long", "hạ long", "ha long"], d: "3n2d", file: "vinhhalong3ng2d.html" },
                { keys: ["vịnh hạ long", "vinh ha long", "hạ long", "ha long"], d: "4n3d", file: "vinhhalong4ng3d.html" },
                // Cát Bà
                { keys: ["cát bà", "cat ba"], d: "3n2d", file: "CatBa3ng2d.html" },
                { keys: ["cát bà", "cat ba"], d: "4n3d", file: "Catba4ng3d.html" },
                // Côn Đảo
                { keys: ["côn đảo", "con dao"], d: "3n2d", file: "Condao3ng2d.html" },
                { keys: ["côn đảo", "con dao"], d: "4n3d", file: "Condao4ng3d.html" },
                // Cù Lao Chàm
                { keys: ["cù lao chàm", "cu lao cham"], d: "3n2d", file: "Culaocham3ng2d.html" },
                { keys: ["cù lao chàm", "cu lao cham"], d: "4n3d", file: "Culaocham4ng3d.html" },
                // Lý Sơn
                { keys: ["lý sơn", "ly son"], d: "3n2d", file: "Lyson3ng2d.html" },
                { keys: ["lý sơn", "ly son"], d: "4n3d", file: "Lyson4ng3d.html" },
                // Nha Trang
                { keys: ["nha trang"], d: "3n2d", file: "Nhatrang3ng2d.html" },
                { keys: ["nha trang"], d: "4n3d", file: "Nhatrang4ng3d.html" },
                // Phú Quốc
                { keys: ["phú quốc", "phu quoc"], d: "3n2d", file: "Phuquoc3ng2d.html" },
                { keys: ["phú quốc", "phu quoc"], d: "4n3d", file: "Phuquoc4ng3d.html" },
                // Sầm Sơn
                { keys: ["sầm sơn", "sam son"], d: "3n2d", file: "Samson3ng2d.html" },
                { keys: ["sầm sơn", "sam son"], d: "4n3d", file: "Samson4ng3d.html" },
                // Vũng Tàu
                { keys: ["vũng tàu", "vung tau"], d: "3n2d", file: "Vungtau3ng2d.html" },
                { keys: ["vũng tàu", "vung tau"], d: "4n3d", file: "Vungtau4ng3d.html" }
            ];

            // Tìm tour phù hợp
            const found = tourMap.find(tour =>
                tour.d === durationValue &&
                tour.keys.some(key => keywords.includes(key))
            );

            if (found) {
                window.location.href = found.file;
                return;
            }

            // Nếu không đúng, báo không tìm thấy
            if (resultsContainer) {
                resultsContainer.innerHTML = `
                    <p style="font-size: 1.1em; color: #dc3545; font-weight: bold; text-align: center;">
                        Không tìm thấy tour phù hợp với tiêu chí của bạn.
                    </p>`;
            }
        });
    }

    // Bỏ viền đỏ khi nhập lại
    [searchKeywordsInput, dateInput, guestsInput, durationInput].forEach(input => {
        if (input) {
            input.addEventListener("input", function () {
                if (this.value) {
                    this.style.border = "";
                }
            });
        }
    });

    // Newsletter Signup
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            window.location.href = 'lienhe.html';
        });
    }

    // --- Đánh giá khách hàng: Kéo ngang slider ---
    const slider = document.querySelector('.reviews-slider');
    if (slider) {
        let isDown = false;
        let startX, scrollLeft;

        // Mouse events
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('dragging');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('dragging');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.2; // tốc độ kéo
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch events
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('touchend', () => {
            isDown = false;
        });
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // --- Nút prev/next cho slider ---
    window.prevSlide = function () {
        const slider = document.querySelector('.reviews-slider');
        const card = slider ? slider.querySelector('.review-card') : null;
        if (!slider || !card) return;
        const cardStyle = getComputedStyle(card);
        const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight);
        slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    };

    window.nextSlide = function () {
        const slider = document.querySelector('.reviews-slider');
        const card = slider ? slider.querySelector('.review-card') : null;
        if (!slider || !card) return;
        const cardStyle = getComputedStyle(card);
        const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight);
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    };

    // --- Navbar & Dropdown từ tong.js ---
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