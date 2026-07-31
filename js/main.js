// ============================================
// TECHNEST PC - MAIN JAVASCRIPT (SIMPLIFICAT)
// ============================================

(function() {
    'use strict';

    // ========== THEME TOGGLE ==========
    const btn = document.getElementById('themeToggle');
    
    if (btn) {
        // Încarcă tema salvată
        let theme = localStorage.getItem('technest-theme');
        if (!theme) {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        // Aplică tema
        function applyTheme(t) {
            if (t === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('technest-theme', t);
        }
        
        // Toggle
        btn.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            applyTheme(isDark ? 'light' : 'dark');
        });
        
        // Aplică tema inițială
        applyTheme(theme);
        console.log('✅ Tema inițializată:', theme);
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

        document.querySelectorAll('#mainNav a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('open')) toggleMenu();
            });
        });
    }

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('visible', window.pageYOffset > 400);
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== HEADER SCROLL ==========
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.pageYOffset > 50);
        });
    }

    // ========== DYNAMIC YEAR ==========
    const yearSpan = document.getElementById('currentYear') || document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ========== ACTIVE NAV LINK (CORECTAT PENTRU URL FĂRĂ .html) ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Elimină extensia .html din numele paginii curente
    const currentPageName = currentPage.replace(/\.html$/, '');
    
    document.querySelectorAll('#mainNav a:not(.btn-nav)').forEach(function(link) {
        let href = link.getAttribute('href');
        // Elimină extensia .html din href pentru comparație
        const hrefName = href.replace(/\.html$/, '');
        
        // Compară numele paginilor (fără extensie)
        if (hrefName === currentPageName) {
            link.classList.add('active');
        }
        
        // Caz special: pagina principală (index)
        if ((currentPageName === '' || currentPageName === 'index') && hrefName === 'index') {
            link.classList.add('active');
        }
    });

})();