document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       MENU TOGGLE + ICONA
    ========================= */
    const icon = document.getElementById('menuIcon');
    const menuUp = document.getElementById('menu-up');

    if (icon && menuUp) {
        icon.addEventListener('click', () => {

            const isBurger =
                icon.classList.contains('fa-burger') ||
                icon.classList.contains('fa-hamburger');

            const isX = icon.classList.contains('fa-xmark');

            // Cambio icona
            if (isX) {
                icon.classList.remove('fa-xmark');
                icon.classList.remove('fa-burger', 'fa-hamburger');
                icon.classList.add('fa-hamburger');
            } else {
                icon.classList.remove('fa-burger', 'fa-hamburger');
                icon.classList.add('fa-xmark');
            }

            // Toggle menu
            menuUp.classList.toggle('open');
        });
    }

    /* =========================
       OVERLAY POP-IN ANIMATION
    ========================= */
    const overlay = document.getElementById('overlay');
    if (!overlay) return;

    // Inserisce la keyframe animation nel DOM
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            70% {
                opacity: 1;
                transform: scale(1.15);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Stato iniziale
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(0.5)';

    // Avvia animazione
    setTimeout(() => {
        overlay.style.animation = 'popIn 0.6s ease-out forwards';
    }, 100);

});
