// ========== THEME TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('themeToggle');
    if (!btn) {
        console.warn('Butonul themeToggle nu a fost gasit!');
        return;
    }
    
    console.log('Buton themeToggle gasit!');
    
    // Incarca tema salvata
    let savedTheme = localStorage.getItem('technest-theme');
    if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Aplica tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('technest-theme', theme);
        console.log('Tema aplicata:', theme);
    }
    
    // Toggle
    btn.addEventListener('click', function() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark');
    });
    
    // Aplica tema initiala
    applyTheme(savedTheme);
});

// ========== MOBILE MENU ==========
document.addEventListener('DOMContentLoaded', function() {
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
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('open')) toggleMenu();
            });
        });
    }
});

// ========== BACK TO TOP ==========
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        backToTop.classList.toggle('visible', window.pageYOffset > 400);
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ========== HEADER SCROLL ==========
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    });
});

// ========== ACTIVE NAV LINK ==========
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#mainNav a:not(.btn-nav)').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// ========== DYNAMIC YEAR ==========
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

console.log('%c🚀 TechNest PC - Service IT Profesional', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%c📍 Călinești, Județul Argeș', 'font-size: 14px; color: #64748b;');
console.log('%c✅ Toate funcționalitățile sunt active!', 'font-size: 14px; color: #10b981;');