const container = document.getElementById("container");
const rotateContainer = document.getElementById("rotate-container");
const h1_1 = document.getElementById("h1-1");
const h1_2 = document.getElementById("h1-2");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const frutto1 = document.getElementById("frutto1");
const frutto2 = document.getElementById("frutto2");

// ==========================
// TRANSIZIONI
// ==========================
const ease = "cubic-bezier(.77,0,.18,1)";
[
  rotateContainer,
  h1_1,
  h1_2,
  btn1,
  btn2,
  frutto1,
  frutto2
].forEach(el => {
  el.style.transition = `transform 0.9s ${ease}`;
});

// ==========================
// STATO
// ==========================
let currentSlide = 0;
let isAnimating = false;

// ==========================
// FUNZIONI
// ==========================
function goDown() {
  if (currentSlide === 1 || isAnimating) return;
  isAnimating = true;
  currentSlide = 1;

  rotateContainer.style.transform = "rotate(180deg)";
  h1_1.style.transform = "translateX(-200%)";
  h1_2.style.transform = "translateX(0)";
  btn1.style.transform = "translateX(-400%)";
  btn2.style.transform = "translateY(0)";
  container.style.backgroundImage =
    "linear-gradient(45deg, #0baf99, #e26d2a, #cace01)";
  frutto1.style.transform = "translateX(0) rotate(40deg)";
  frutto2.style.transform = "translateX(300%) rotate(1deg)";

  setTimeout(() => (isAnimating = false), 900);
}

function goUp() {
  if (currentSlide === 0 || isAnimating) return;
  isAnimating = true;
  currentSlide = 0;

  rotateContainer.style.transform = "rotate(0deg)";
  h1_1.style.transform = "translateX(0)";
  h1_2.style.transform = "translateX(-200%)";
  btn1.style.transform = "translateX(0)";
  btn2.style.transform = "translateY(400%)";
  container.style.backgroundImage =
    "linear-gradient(45deg, #6e0606, #943636, #c1c278)";
  frutto1.style.transform = "translateX(-200%)";
  frutto2.style.transform = "translateX(0) rotate(45deg)";

  setTimeout(() => (isAnimating = false), 900);
}

// ==========================
// DESKTOP
// ==========================
container.addEventListener("wheel", e => {
  if (isAnimating) return;
  if (e.deltaY > 20) goDown();
  if (e.deltaY < -20) goUp();
}, { passive: true });

// ==========================
// MOBILE – SWIPE MANUALE
// ==========================
let startY = 0;

container.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
}, { passive: false });

container.addEventListener("touchmove", e => {
  e.preventDefault(); // 🔥 CHIAVE ASSOLUTA
}, { passive: false });

container.addEventListener("touchend", e => {
  if (isAnimating) return;

  const endY = e.changedTouches[0].clientY;
  const delta = startY - endY;

  if (delta > 50) goDown();
  if (delta < -50) goUp();
}, { passive: false });
