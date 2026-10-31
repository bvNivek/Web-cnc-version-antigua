// ========== CARRUSEL ==========
const track = document.querySelector('.maquinados-track');
const cards = document.querySelectorAll('.maquinado-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
let cardsPerView = 1;

function getCardsPerView() {
    const width = window.innerWidth;
    if (width >= 1100) return 3;
    if (width >= 768) return 2;
    return 1;
}

function getGap() {
    if (!track) return 24;
    const style = getComputedStyle(track);
    return parseFloat(style.gap) || 24;
}

function updateCarousel() {
    if (!track || !cards.length || !prevBtn || !nextBtn) return;

    cardsPerView = getCardsPerView();
    const gap = getGap();
    const cardWidth = cards[0].offsetWidth + gap;

    if (cardWidth <= 0) return;

    const maxIndex = Math.max(0, cards.length - cardsPerView);

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex -= cardsPerView;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex += cardsPerView;
        updateCarousel();
    });
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        currentIndex = 0;
        updateCarousel();
    }, 150);
});

updateCarousel();