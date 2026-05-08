/* =========================
   SELECT ELEMENTS
========================= */

const cards = document.querySelectorAll(".card");

const filterBtns = document.querySelectorAll(".filter-btn");

const lightbox = document.querySelector(".lightbox");

const lightboxImg = document.querySelector(".lightbox-img");

const closeBtn = document.querySelector(".close");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

const loader = document.querySelector(".loader-wrapper");

/* =========================
   VARIABLES
========================= */

let currentImage = 0;

let visibleCards = [...cards];

/* =========================
   OPEN LIGHTBOX
========================= */

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    const visibleImages = visibleCards.map((card) => card.querySelector("img"));

    currentImage = visibleImages.indexOf(card.querySelector("img"));

    showImage();

    lightbox.style.display = "flex";

    document.body.style.overflow = "hidden";
  });
});

/* =========================
   SHOW IMAGE
========================= */

function showImage() {
  const visibleImages = visibleCards.map((card) => card.querySelector("img"));

  lightboxImg.src = visibleImages[currentImage].src;
}

/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {
  lightbox.style.display = "none";

  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeLightbox);

/* =========================
   NEXT IMAGE
========================= */

function nextImage() {
  currentImage++;

  if (currentImage >= visibleCards.length) {
    currentImage = 0;
  }

  showImage();
}

nextBtn.addEventListener("click", nextImage);

/* =========================
   PREVIOUS IMAGE
========================= */

function prevImage() {
  currentImage--;

  if (currentImage < 0) {
    currentImage = visibleCards.length - 1;
  }

  showImage();
}

prevBtn.addEventListener("click", prevImage);

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") {
      closeLightbox();
    }

    if (e.key === "ArrowRight") {
      nextImage();
    }

    if (e.key === "ArrowLeft") {
      prevImage();
    }
  }
});

/* =========================
   CLOSE WHEN CLICKING
   OUTSIDE IMAGE
========================= */

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

/* =========================
   FILTER SYSTEM
========================= */

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".active").classList.remove("active");

    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    visibleCards = [];

    cards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";

        visibleCards.push(card);
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {
  loader.style.opacity = "0";

  loader.style.visibility = "hidden";
});

/* =========================
   OPTIONAL:
   PRELOAD IMAGES
========================= */

window.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    const image = new Image();

    image.src = img.src;
  });
});
