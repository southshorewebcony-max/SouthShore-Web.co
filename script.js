/* =========================================================
   SouthShore Web Co. — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------
       Mobile Navigation
    ----------------------------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {

        const closeMenu = () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        };

        const openMenu = () => {
            navLinks.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', 'Close navigation menu');
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('active');
            isOpen ? closeMenu() : openMenu();
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    /* -----------------------------
       Scroll Reveal
    ----------------------------- */
    const revealEls = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (revealEls.length) {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealEls.forEach((el) => el.classList.add('is-visible'));
        } else {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            revealEls.forEach((el) => observer.observe(el));
        }
    }

    /* -----------------------------
       Contact Form Feedback
    ----------------------------- */
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.querySelector('.form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (event) => {
            const action = contactForm.getAttribute('action') || '';
            if (!action || action.includes('YOUR-FORM-SERVICE-URL')) {
                event.preventDefault();
                formStatus.textContent = 'Form service not yet connected — see setup notes below.';
            }
        });
    }

});