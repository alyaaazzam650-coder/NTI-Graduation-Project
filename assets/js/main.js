// Countdown Timer for Flash Sales
// Set the date we're counting down to (e.g., 3 days from now)
const now = new Date();
const countDownDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Pad with zeros
    days = days.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;

    // If the countdown is finished, display zeros
    if (distance < 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

document.addEventListener('DOMContentLoaded', function () {
    // Helper: make cloned product unique
    function makeCloneUnique(clone, idx) {
        try {
            // Title
            const title = clone.querySelector('.card-title');
            if (title) {
                title.textContent = title.textContent + ' (More ' + (idx + 1) + ')';
            }

            // Price - find first bold price element
            const priceEl = clone.querySelector('.fw-bold');
            if (priceEl) {
                const priceText = priceEl.textContent.replace(/[^0-9.]/g, '');
                const base = parseFloat(priceText) || 0;
                // increment price slightly for uniqueness
                const newPrice = (base + (idx * 5)).toFixed(0);
                priceEl.textContent = '$' + newPrice;
                // adjust strike-through if present
                const strike = clone.querySelector('.text-muted.text-decoration-line-through');
                if (strike) {
                    const orig = parseFloat(strike.textContent.replace(/[^0-9.]/g, '')) || (base + 20);
                    strike.textContent = '$' + (orig + (idx * 5));
                }
            }

            // Image - append query param to avoid caching (visual difference may not change image)
            const img = clone.querySelector('img');
            if (img && img.src) {
                try {
                    const url = new URL(img.src, window.location.href);
                    url.searchParams.set('v', idx + 1);
                    img.src = url.toString();
                } catch (e) {
                    // fallback: append simple suffix
                    img.src = img.src + '?v=' + (idx + 1);
                }
            }
        } catch (e) {
            // ignore
        }
    }

    // Flash Sales "View All" behavior (re-added)
    const flashBtn = document.getElementById('flashViewAllBtn');
    const flashSectionEl = document.getElementById('flashSalesSection');
    const flashCarouselEl = document.getElementById('flashSalesCarousel');
    const flashAllGridEl = document.getElementById('flashAllGrid');
    if (flashBtn && flashSectionEl && flashCarouselEl && flashAllGridEl) {
        let expandedFlash = false;
        flashBtn.addEventListener('click', function () {
            expandedFlash = !expandedFlash;
            // collect product columns from the first carousel slide
            const firstSlide = flashCarouselEl.querySelector('.carousel-item');
            let cols = [];
            if (firstSlide) {
                firstSlide.querySelectorAll('.col').forEach(c => cols.push(c));
            }
            if (expandedFlash) {
                flashAllGridEl.innerHTML = '';
                const grid = buildUniqueGrid(cols, 8);
                flashAllGridEl.appendChild(grid);
                // hide carousel
                flashCarouselEl.style.display = 'none';
                flashAllGridEl.style.display = 'block';
                flashSectionEl.style.minHeight = '720px';
                flashBtn.textContent = 'View Less';
            } else {
                flashCarouselEl.style.display = '';
                flashAllGridEl.style.display = 'none';
                flashSectionEl.style.minHeight = '';
                flashBtn.textContent = 'View All Products';
            }
        });
    }

    // Helper: build grid with unique clones
    function buildUniqueGrid(cols, total) {
        const gridRow = document.createElement('div');
        gridRow.className = 'row row-cols-1 row-cols-md-4 g-4 mb-4';
        const count = Math.max(1, cols.length);
        for (let i = 0; i < total; i++) {
            const src = cols[i % count] || cols[0];
            const cloneCol = src.cloneNode(true);
            makeCloneUnique(cloneCol, i);
            gridRow.appendChild(cloneCol);
        }
        return gridRow;
    }

    // Ensure the Flash Sales carousel has multiple slides so controls work
    const carouselInner = document.querySelector('#flashSalesCarousel .carousel-inner');
    if (carouselInner) {
        const originalItem = carouselInner.querySelector('.carousel-item');
        if (originalItem) {
            const items = carouselInner.querySelectorAll('.carousel-item');
            if (items.length < 2) {
                for (let i = 0; i < 2; i++) {
                    const clone = originalItem.cloneNode(true);
                    clone.classList.remove('active');
                    carouselInner.appendChild(clone);
                }
            }
        }
    }

    // Flash Sales and Best Selling "View All" features removed per user request.

    // Explore "View All" behavior for Explore Our Products section
    const exploreBtn = document.getElementById('exploreViewAllBtn');
    const exploreSection = document.getElementById('exploreSection');
    const exploreAllGrid = document.getElementById('exploreAllGrid');
    if (exploreBtn && exploreSection && exploreAllGrid) {
        let expandedExplore = false;
        exploreBtn.addEventListener('click', function () {
            expandedExplore = !expandedExplore;
            // gather all product columns from both rows in Explore section
            const rows = exploreSection.querySelectorAll('div.row.row-cols-md-4');
            let cols = [];
            rows.forEach(r => {
                r.querySelectorAll('.col').forEach(c => cols.push(c));
            });
            if (expandedExplore) {
                exploreAllGrid.innerHTML = '';
                const grid = buildUniqueGrid(cols, 8);
                exploreAllGrid.appendChild(grid);
                // hide the original rows
                rows.forEach(r => r.style.display = 'none');
                exploreAllGrid.style.display = 'block';
                exploreSection.style.minHeight = '720px';
                exploreBtn.textContent = 'View Less';
            } else {
                rows.forEach(r => r.style.display = '');
                exploreAllGrid.style.display = 'none';
                exploreSection.style.minHeight = '';
                exploreBtn.textContent = 'View All Products';
            }
        });
    }

    // Category click behavior: clicking a category makes it the active (red) one
    const categoryItems = document.querySelectorAll('.category-item');
    if (categoryItems.length) {
        categoryItems.forEach(item => {
            // make focusable for keyboard
            if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
            item.addEventListener('click', () => {categoryItems.forEach(i => i.classList.remove('category-active'));
                item.classList.add('category-active');
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });
    }

    // Account dropdown toggle and outside click close
    const accountBtn = document.getElementById('accountBtn');
    const accountDropdown = document.getElementById('accountDropdown');
    if (accountBtn && accountDropdown) {
        const avatarEl = accountBtn.querySelector('.avatar');
        accountBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const open = !accountDropdown.classList.contains('d-none');
            if (open) {
                accountDropdown.classList.add('d-none');
                accountBtn.setAttribute('aria-expanded', 'false');
                if (avatarEl) avatarEl.classList.remove('active');
            } else {
                accountDropdown.classList.remove('d-none');
                accountBtn.setAttribute('aria-expanded', 'true');
                if (avatarEl) avatarEl.classList.add('active');
            }
        });

        // close when clicking anywhere else
        document.addEventListener('click', function (ev) {
            if (!accountDropdown.classList.contains('d-none')) {
                // if click is outside the dropdown and button
                if (!accountDropdown.contains(ev.target) && !accountBtn.contains(ev.target)) {
                    accountDropdown.classList.add('d-none');
                    accountBtn.setAttribute('aria-expanded', 'false');
                    if (avatarEl) avatarEl.classList.remove('active');
                }
            }
        });
    }
});