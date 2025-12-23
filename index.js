document.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('menuIcon');
    const menuUp = document.getElementById('menu-up');

    icon.addEventListener('click', () => {

        // --- CAMBIO ICONA ---
        const isBurger = icon.classList.contains('fa-burger') || icon.classList.contains('fa-hamburger');
        const isX = icon.classList.contains('fa-xmark');

        if (isX) {
            icon.classList.remove('fa-xmark');
            icon.classList.remove('fa-burger', 'fa-hamburger');
            icon.classList.add('fa-hamburger');
        } else if (isBurger) {
            icon.classList.remove('fa-burger', 'fa-hamburger');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.add('fa-xmark');
        }

        // --- SLIDE MENU ---
        menuUp.classList.toggle('open');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');

    if (!overlay) return; // se non esiste, non fa nulla

    // crea animazione
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes popIn {
            0%   { opacity: 0; transform: scale(0.5); }
            70%  { opacity: 1; transform: scale(1.15); }
            100% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // stato iniziale
    overlay.style.opacity = "0";
    overlay.style.transform = "scale(0.5)";

    // dopo 1s esegue effetto
    setTimeout(() => {
        overlay.style.animation = "popIn 0.6s ease-out forwards";
    }, 100);
});
