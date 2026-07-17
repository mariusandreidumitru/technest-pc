(function() {
    'use strict';

    // ========== FUNCȚIA PRINCIPALĂ ==========
    function init() {
        console.log('🚀 Inițializare TechNest PC...');

        // ========== THEME TOGGLE ==========
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeToggle) {
            console.log('✅ Buton themeToggle găsit');
            
            // Încarcă tema salvată
            let currentTheme = localStorage.getItem('technest-theme');
            
            if (!currentTheme) {
                currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            
            // Aplică tema
            function applyTheme(theme) {
                if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                }
                localStorage.setItem('technest-theme', theme);
                currentTheme = theme;
                console.log('✅ Tema aplicată:', theme);
            }
            
            // Toggle temă
            function toggleTheme() {
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                applyTheme(newTheme);
            }
            
            // Elimină event listener-ii vechi (prevenim dublarea)
            const newToggle = themeToggle.cloneNode(true);
            themeToggle.parentNode.replaceChild(newToggle, themeToggle);
            const freshToggle = document.getElementById('themeToggle');
            
            // Adaugă event listener
            freshToggle.addEventListener('click', toggleTheme);
            
            // Aplică tema inițială
            applyTheme(currentTheme);
        } else {
            console.warn('⚠️ Butonul themeToggle nu a fost găsit!');
        }

        // ========== MOBILE MENU ==========
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        const navOverlay = document.getElementById('navOverlay');

        if (menuToggle && mainNav && navOverlay) {
            function toggleMenu() {
                const isOpen = mainNav.classList.contains('open');
                menuToggle.classList.toggle('active');
                mainNav.classList.toggle('open');
                navOverlay.classList.toggle('active');
                document.body.style.overflow = isOpen ? '' : 'hidden';
                menuToggle.setAttribute('aria-expanded', !isOpen);
            }

            menuToggle.addEventListener('click', toggleMenu);
            navOverlay.addEventListener('click', toggleMenu);

            document.querySelectorAll('#mainNav a').forEach(link => {
                link.addEventListener('click', () => {
                    if (mainNav.classList.contains('open')) toggleMenu();
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mainNav.classList.contains('open')) toggleMenu();
            });
        }

        // ========== BACK TO TOP ==========
        const backToTop = document.getElementById('backToTop');
        
        if (backToTop) {
            window.addEventListener('scroll', () => {
                backToTop.classList.toggle('visible', window.pageYOffset > 400);
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // ========== HEADER SCROLL ==========
        const header = document.getElementById('header');
        let ticking = false;

        if (header) {
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        header.classList.toggle('scrolled', window.pageYOffset > 50);
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }

        // ========== ACTIVE NAV LINK ==========
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('#mainNav a:not(.btn-nav)').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });

        // ========== DYNAMIC YEAR ==========
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        console.log('✅ TechNest PC - Toate funcționalitățile sunt active!');
    }

    // ========== RULEAZĂ CÂND DOM-UL ESTE GATA ==========
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM-ul este deja încărcat
        init();
    }

    console.log('%c🚀 TechNest PC - Service IT Profesional', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
    console.log('%c📍 Călinești, Județul Argeș', 'font-size: 14px; color: #64748b;');

})();