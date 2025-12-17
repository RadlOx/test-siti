const rotateContainer = document.getElementById("rotate-container");
const h1_1 = document.getElementById("h1-1");
const h1_2 = document.getElementById("h1-2");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const container = document.getElementById("container");
const frutto1 = document.getElementById("frutto1");
const frutto2 = document.getElementById("frutto2");


// Transizioni fluide
rotateContainer.style.transition = "transform 0.8s cubic-bezier(.77,0,.18,1)";
rotateContainer.style.willChange = "transform";

h1_1.style.transition = "transform 0.9s cubic-bezier(.77,0,.18,1)";
h1_1.style.willChange = "transform";

h1_2.style.transition = "transform 0.9s cubic-bezier(.77,0,.18,1)";
h1_2.style.willChange = "transform";

let touchStartY = 0;
const THRESHOLD = 15;

function applyEffects(delta) {
  if (delta > THRESHOLD) {
    // SCROLL DOWN
    rotateContainer.style.transform = "rotate(180deg)";
    h1_1.style.transform = "translateX(-200%)";
    h1_2.style.transform = "translateX(0)";
    btn1.style.transform = "translateX(-400%)";
    btn2.style.transform = "translateY(0)";
    container.style.backgroundImage = "linear-gradient(45deg, #0baf99ff, #e26d2aff, rgba(202, 206, 1, 1))";
    frutto1.style.transform = "translateX(0) rotate(40deg)";
    frutto2.style.transform = "translateX(-300%) rotate(1deg)";

    
  } else if (delta < -THRESHOLD) {
    // SCROLL UP
    rotateContainer.style.transform = "rotate(0deg)";
    h1_1.style.transform = "translateX(0)";
    h1_2.style.transform = "translateX(-200%)";
    btn1.style.transform = "translateX(0%)";
    btn2.style.transform = "translateY(400%)";
    container.style.backgroundImage = "linear-gradient(45deg, #6e0606, #943636, #c1c278)";
    frutto1.style.transform = "translateX(-200%)";
    frutto2.style.transform = "translateX(0%) rotate(45deg)";

  }
}

// DESKTOP
window.addEventListener("wheel", (e) => {
  applyEffects(e.deltaY);
}, { passive: true });

// MOBILE
window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchmove", (e) => {
  const currentY = e.touches[0].clientY;
  const delta =- touchStartY - currentY;
  applyEffects(delta);
}, { passive: true });
