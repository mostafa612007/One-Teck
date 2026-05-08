// ── Header search form behavior ───────────────────────────────────
(function () {
  const form = document.getElementById('headerSearchForm');
  const input = document.getElementById('headerSearchInput');
  const category = document.getElementById('headerCategorySelect');

  if (!form || !input || !category) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchValue = input.value.trim();
    const selectedCategory = category.value;
    console.log(`Search: "${searchValue}" | Category: ${selectedCategory}`);
  });
})();

function show_cards(category) {
    var cards = document.querySelector(`.${category}`);
    cards.style.display = "block";
}

//MacBook  Carousel
const track = document.getElementById("carouselTrack");
const dots = document.querySelectorAll(".dot");
const total = 3;
let current = 0;
let autoPlay;

function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

document.getElementById("prevBtn").addEventListener("click", () => {
    clearInterval(autoPlay);
    goTo(current - 1);
    startAuto();
});
document.getElementById("nextBtn").addEventListener("click", () => {
    clearInterval(autoPlay);
    goTo(current + 1);
    startAuto();
});
dots.forEach((d) =>
    d.addEventListener("click", () => {
        clearInterval(autoPlay);
        goTo(+d.dataset.index);
        startAuto();
    }),
);

function startAuto() {
    autoPlay = setInterval(() => goTo(current + 1), 4000);
}
startAuto();

//_______________________________________________________________________________________
// Tab switching logic
document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
        document
            .querySelectorAll(".nav-tab")
            .forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
    });
});

// ── Latest Reviews Carousel ──────────────────────────────────────
(function () {
    const track = document.getElementById("reviewsTrack");
    const leftBtn = document.getElementById("reviewsLeft");
    const rightBtn = document.getElementById("reviewsRight");

    if (!track || !leftBtn || !rightBtn) return;

    // Gap between cards (matches gap-3 = 1rem = 16px)
    const GAP = 16;
    let currentIndex = 0;
    const VISIBLE = 3; // cards visible at once

    function getCards() {
        return track.querySelectorAll(".review-card");
    }

    function getCardWidth() {
        const card = getCards()[0];
        return card ? card.offsetWidth + GAP : 0;
    }

    function update() {
        const cards = getCards();
        const maxIndex = Math.max(0, cards.length - VISIBLE);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
        track.style.transition = "transform 0.4s ease";
        // Dim arrows at boundaries
        leftBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
        rightBtn.style.opacity = currentIndex >= maxIndex ? "0.3" : "1";
    }

    leftBtn.addEventListener("click", () => {
        currentIndex = Math.max(0, currentIndex - 1);
        update();
    });

    rightBtn.addEventListener("click", () => {
        const maxIndex = Math.max(0, getCards().length - VISIBLE);
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        update();
    });

    // Set track to allow transform-based sliding
    track.style.overflow = "visible";

    update();
})();

// ── Recently Viewed Carousel ──────────────────────────────────────
(function () {
    const track = document.getElementById("carouselTrack2");
    const leftBtn = document.getElementById("leftArrow2");
    const rightBtn = document.getElementById("rightArrow2");

    if (!track || !leftBtn || !rightBtn) return;

    const CARD_WIDTH = 180;
    const GAP = 16;
    const SCROLL_AMOUNT = CARD_WIDTH + GAP;

    function scrollRight() {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 5) {
            track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            track.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
        }
    }

    function scrollLeft() {
        if (track.scrollLeft <= 5) {
            const maxScroll = track.scrollWidth - track.clientWidth;
            track.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
            track.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
        }
    }

    rightBtn.addEventListener("click", scrollRight);
    leftBtn.addEventListener("click", scrollLeft);
})();
