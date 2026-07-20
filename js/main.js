/* ============================================
   TECHNEST PC - MAIN JAVASCRIPT (UNIVERSAL)
   ============================================ */

// ==========================================
// PHONE DROPDOWN MENU - FUNCȚIE GLOBALĂ
// ==========================================
function togglePhoneMenu(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const menu = document.getElementById('phoneMenu');
    if (!menu) return;
    
    const isVisible = menu.style.display === 'block';
    
    // Închide toate meniurile deschise
    document.querySelectorAll('.phone-menu').forEach(m => {
        if (m !== menu) {
            m.style.display = 'none';
        }
    });
    
    // Deschide sau închide meniul curent
    menu.style.display = isVisible ? 'none' : 'block';
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
document.addEventListener('scroll', function() {
    document.querySelectorAll('.phone-menu').forEach(menu => {
        menu.style.display = 'none';
    });
}, { passive: true });

// Închide meniul la redimensionare
window.addEventListener('resize', function() {
    document.querySelectorAll('.phone-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});

// ==========================================
// RESTUL FUNCȚIILOR
// ==========================================
(function() {
    'use strict';

    // 1. THEME TOGGLE
    function initTheme() {
        const btn = document.getElementById('themeToggle');
        if (!btn) {
            console.warn('⚠️ Butonul themeToggle nu a fost gasit pe aceasta pagina');
            return;
        }
        
        let savedTheme = localStorage.getItem('technest-theme');
        if (!savedTheme) {
            savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        function applyTheme(theme) {
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('technest-theme', theme);
        }
        
        btn.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            applyTheme(isDark ? 'light' : 'dark');
        });
        
        applyTheme(savedTheme);
    }

    // 2. MOBILE MENU
    function initMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const mainNav = document.getElementById('mainNav');
        const navOverlay = document.getElementById('navOverlay');

        if (!menuToggle || !mainNav || !navOverlay) {
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
    }

    // 3. BACK TO TOP
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('visible', window.pageYOffset > 400);
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. HEADER SCROLL
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.pageYOffset > 50);
        });
    }

    // 5. ACTIVE NAV LINK
    function initActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('#mainNav a:not(.btn-nav)').forEach(function(link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // 6. DYNAMIC YEAR
    function initYear() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }

    // 7. ANIMATE ON SCROLL
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.animate');
        
        if ('IntersectionObserver' in window && animateElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }
                });
            }, { threshold: 0.1 });
            
            animateElements.forEach(el => observer.observe(el));
        } else {
            animateElements.forEach(el => {
                el.style.opacity = '1';
            });
        }
    }

    // 8. INITIALIZE
    function init() {
        console.log('🚀 Initializare TechNest PC...');
        initTheme();
        initMobileMenu();
        initBackToTop();
        initHeaderScroll();
        initActiveNav();
        initYear();
        initScrollAnimations();
        console.log('%c✅ Toate funcționalitățile sunt active!', 'color: #10b981; font-weight: bold;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    console.log('%c🚀 TechNest PC - Service IT Profesional', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
    console.log('%c📍 Călinești, Județul Argeș', 'font-size: 14px; color: #64748b;');

})();

// Phone Dropdown - cu addEventListener
document.addEventListener('DOMContentLoaded', function() {
    const phoneToggle = document.getElementById('phoneToggleBtn');
    const phoneMenu = document.getElementById('phoneMenu');
    
    if (phoneToggle && phoneMenu) {
        phoneToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isVisible = phoneMenu.style.display === 'block';
            phoneMenu.style.display = isVisible ? 'none' : 'block';
        });
    }
});