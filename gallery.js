"use strict";

/** Gallery container */
const galleryContainer = document.getElementById("gallery");
let memes = [];
let currentIndex = 0;

/** Load memes from JSON */
fetch("memes.json")
  .then(response => response.json())
  .then(data => {
    memes = data;
    renderGallery();
  })
  .catch(err => console.error("Error loading memes:", err));

/** Render gallery */
function renderGallery() {
  galleryContainer.innerHTML = ""; // skeleton গুলো clear করার জন্য
  memes.forEach((src, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `<img src="${src}" alt="Meme ${index + 1}" loading="lazy">`;
    galleryContainer.appendChild(item);

    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });
}

/** Lightbox structure */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lb-image");
const closeBtn = document.getElementById("lb-close");
const nextBtn = document.getElementById("lb-next");
const prevBtn = document.getElementById("lb-prev");

/** Open lightbox at given index */
function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = memes[currentIndex];
}

/** Navigation */
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % memes.length;
  lightboxImg.src = memes[currentIndex];
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + memes.length) % memes.length;
  lightboxImg.src = memes[currentIndex];
};

/** Close lightbox */
closeBtn.onclick = () => {
  lightbox.style.display = "none";
};

lightbox.onclick = (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};

/** Keyboard support */
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextBtn.onclick();
    if (e.key === "ArrowLeft") prevBtn.onclick();
    if (e.key === "Escape") closeBtn.onclick();
  }
});
