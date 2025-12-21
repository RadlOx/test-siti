// ELEMENTI
const container = document.getElementById("container");
const rotateContainer = document.getElementById("rotate-container");
const h1_1 = document.getElementById("h1-1");
const h1_2 = document.getElementById("h1-2");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const infoCont = document.getElementById("info-container");
const coverInfo = document.getElementById("cover-info");
const frutto1 = document.getElementById("fico1");
const frutto2 = document.getElementById("fico2");
const frutto3 = document.getElementById("foglia1");
const frutto4 = document.getElementById("foglia2");
const fragola1 = document.getElementById("fragola1");
const img1 = document.getElementById("img1");

const btnIcon = btn1.querySelector("i");
const btnText = btn1.querySelector(".btn-text");
const originalBtnText = btnText.textContent;

let currentSlide = 0;
let isAnimating = false;
let isReadingMode = false;
let isBtnBlocked = false;

// TRANSIZIONI
[h1_1,h1_2,btn1,btn2,frutto1,frutto2,frutto3,frutto4,fragola1,rotateContainer, infoCont].forEach(el=>{
  if(!el) return;
  el.style.transition = "transform 0.9s cubic-bezier(.77,0,.18,1)";
});
if(img1){
  img1.style.transition = "transform 1s ease";
  img1.style.transformOrigin = "center center";
}
if(btnIcon){
  btnIcon.style.transition = "transform 0.4s ease";
  btnIcon.style.display="inline-block";
}

// FUNZIONI SLIDE
function goDown(){
  if(currentSlide===1||isAnimating||isReadingMode) return; 
  isAnimating=true; 
  currentSlide=1;
  rotateContainer.style.transform="rotate(180deg)";
  h1_1.style.transform="translateX(-200%)";
  h1_2.style.transform="translateX(0)";
  btn1.style.transform="translateX(-400%)";
  btn2.style.transform="translateY(0)";
  container.style.backgroundImage="linear-gradient(45deg, #0baf99, #e26d2a, #cace01)";
  frutto1.style.transform="translateX(0) rotate(40deg)";
  frutto2.style.transform="translateX(300%) rotate(71deg)";
  frutto3.style.transform="translateX(-300%) rotate(1deg)";
  frutto4.style.transform="translateX(300%) rotate(0deg)";
  fragola1.style.transform="translateX(500%) rotate(0deg)";
  setTimeout(()=>isAnimating=false,900);
}
function goUp(){
  if(currentSlide===0||isAnimating||isReadingMode) return; 
  isAnimating=true; 
  currentSlide=0;
  rotateContainer.style.transform="rotate(0deg)";
  h1_1.style.transform="translateX(0)";
  h1_2.style.transform="translateX(-200%)";
  btn1.style.transform="translateX(0)";
  btn2.style.transform="translateY(400%)";
  container.style.backgroundImage="linear-gradient(45deg, #c20e0e, #943636, #dfe236)";
  frutto1.style.transform="translateX(-200%)";
  frutto2.style.transform="translateX(0) rotate(1deg)";
  frutto3.style.transform="translateX(0) rotate(40deg)";
  frutto4.style.transform="translateX(0%) rotate(310deg)";
  fragola1.style.transform="translateX(0%) rotate(-25deg)";
  setTimeout(()=>isAnimating=false,900);
}

// TOGGLE LETTURA / SCOPRI
function toggleReadingMode(){
  if(isBtnBlocked) return;
  isBtnBlocked=true;
  setTimeout(()=>{isBtnBlocked=false},1000);

  const toHide=[frutto1,frutto2,fragola1];

  if(!isReadingMode){
    // entra in modalità lettura
    isReadingMode=true;
    toHide.forEach(el=>{
      if(!el) return;
      el.style.transition+=" , opacity 0.4s ease";
      el.style.opacity="0";
      setTimeout(()=>el.style.display="none",400);
    });
    if(img1){
      img1.style.animation = "none";
      img1.style.filter = "drop-shadow(0px -30px 28px #00000086)";
   
      img1.style.transform = "scale(0.7)translateY(-10%)";
    }
    if(btn1){
      btn1.style.display = "none";
    }
    // Mostra info-container
    if(infoCont){
      infoCont.style.display = "block";
      requestAnimationFrame(()=>{
        infoCont.style.transform = "translateY(0)";
        coverInfo.style.transform = "translateY(0)";
      });
    }

  } else {
    // torna ai prodotti
    isReadingMode=false;
    toHide.forEach(el=>{
      if(!el) return;
      el.style.display="flex";
      requestAnimationFrame(()=>el.style.opacity="1");
    });
    if(img1){
      img1.style.transform = "scale(1)";
      img1.style.animation = "floated 2s infinite ease-in-out";
    }
    if(btnText) btnText.textContent=originalBtnText;
    if(btnIcon) btnIcon.style.transform="rotate(0deg)";

    // Nascondi info-container in modo fluido
    if(infoCont){
      const hideContainer = () => {
        infoCont.style.display = "none";
        infoCont.removeEventListener("transitionend", hideContainer);
      }
      infoCont.addEventListener("transitionend", hideContainer);
      infoCont.style.transform = "translateY(100%)";
    }
  }
}

// CLICK BUTTON
[btn1, btn2].forEach(btn=>{
  btn.addEventListener("click", e=>{
    e.preventDefault();
    toggleReadingMode();
  });
});

// SCROLL
container.addEventListener("wheel",e=>{
  if(isAnimating||isReadingMode) return;
  if(e.deltaY>20) goDown();
  if(e.deltaY<-20) goUp();
},{passive:true});

// TOUCH SWIPE
let startY=0;
container.addEventListener("touchstart",e=>{startY=e.touches[0].clientY},{passive:false});
container.addEventListener("touchmove",e=>{if(isReadingMode)e.preventDefault()},{passive:false});
container.addEventListener("touchend",e=>{
  if(isAnimating||isReadingMode) return;
  const endY=e.changedTouches[0].clientY;
  const delta=startY-endY;
  if(delta>50) goDown();
  if(delta<-50) goUp();
},{passive:false});
