/* ============================================
   TECHNEST PC - MAIN JAVASCRIPT (UNIVERSAL)
   ============================================ */

(function() {
    'use strict';

    // ==========================================
    // 1. THEME TOGGLE
    // ==========================================
    function initTheme() {
        const btn = document.getElementById('themeToggle');
        if (!btn) {
            console.warn('⚠️ Butonul themeToggle nu a fost gasit pe aceasta pagina');
            return;
        }
        
        console.log('✅ Buton themeToggle gasit!');
        
        // Încarcă tema salvată
        let savedTheme = localStorage.getItem('technest-theme');
        if (!savedTheme) {
            savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        // Aplică tema
        function applyTheme(theme) {
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('technest-theme', theme);
            console.log('✅ Tema aplicata:', theme);
        }
        
        // Toggle
        btn.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            applyTheme(isDark ? 'light' : 'dark');
        });
        
        // Aplică tema inițială
        applyTheme(savedTheme);
    }

    // ==========================================
    // 2. MOBILE MENU
    // ==========================================
    function initMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        const navOverlay = document.getElementById('navOverlay');

        if (!menuToggle || !mainNav || !navOverlay) {
            console.warn('⚠️ Elemente meniu mobil nu gasite');
            return;
        }

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

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) toggleMenu();
        });
        
        console.log('✅ Meniu mobil initializat');
    }

    // ==========================================
    // 3. BACK TO TOP
    // ==========================================
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) {
            console.warn('⚠️ Buton back-to-top nu gasit');
            return;
        }

        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('visible', window.pageYOffset > 400);
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        console.log('✅ Back to top initializat');
    }

    // ==========================================
    // 4. HEADER SCROLL
    // ==========================================
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) {
            console.warn('⚠️ Header nu gasit');
            return;
        }

        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.pageYOffset > 50);
        });
        
        console.log('✅ Header scroll initializat');
    }

    // ==========================================
    // 5. ACTIVE NAV LINK
    // ==========================================
    function initActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('#mainNav a:not(.btn-nav)').forEach(function(link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
        console.log('✅ Active nav link initializat');
    }

    // ==========================================
    // 6. DYNAMIC YEAR
    // ==========================================
    function initYear() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
        console.log('✅ An dinamic initializat');
    }

    // ==========================================
    // 7. INITIALIZE EVERYTHING
    // ==========================================
    function init() {
        console.log('🚀 Initializare TechNest PC...');
        initTheme();
        initMobileMenu();
        initBackToTop();
        initHeaderScroll();
        initActiveNav();
        initYear();
        console.log('%c✅ Toate funcționalitățile sunt active!', 'color: #10b981; font-weight: bold;');
    }

    // Rulează când DOM-ul este gata
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('%c🚀 TechNest PC - Service IT Profesional', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
    console.log('%c📍 Călinești, Județul Argeș', 'font-size: 14px; color: #64748b;');

})();

// Toggle phone menu
function togglePhoneMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const menu = document.getElementById('phoneMenu');
    const isVisible = menu.style.display === 'block';
    
    // Închide toate meniurile deschise
    document.querySelectorAll('.phone-menu').forEach(m => {
        m.style.display = 'none';
    });
    
    // Deschide meniul curent dacă era închis
    if (!isVisible) {
        menu.style.display = 'block';
    }
}

// Închide meniul la click în altă parte
document.addEventListener('click', function(event) {
    const wrapper = event.target.closest('.phone-dropdown-wrapper');
    if (!wrapper) {
        document.querySelectorAll('.phone-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// Închide meniul cu tasta Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.phone-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// Închide meniul la scroll
window.addEventListener('scroll', function() {
    document.querySelectorAll('.phone-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});