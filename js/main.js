/* ============================================
   TECHNEST PC - MAIN JAVASCRIPT
   ============================================ */

// Când se încarcă pagina
document.addEventListener('DOMContentLoaded', function() {
    
    const phoneBtn = document.getElementById('phoneToggleBtn');
const phoneMenu = document.getElementById('phoneMenu');

if (phoneBtn && phoneMenu) {
    // Click pe buton
    phoneBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Alternativ: dacă e ascuns, arată-l; dacă e vizibil, ascunde-l
        if (phoneMenu.style.display === 'block') {
            phoneMenu.style.display = 'none';
            phoneBtn.classList.remove('active'); // Adaugă asta
        } else {
            phoneMenu.style.display = 'block';
            phoneBtn.classList.add('active'); // Adaugă asta
        }
    });
    
    // Click în altă parte - închide meniul
    document.addEventListener('click', function(e) {
        const wrapper = e.target.closest('.phone-dropdown-wrapper');
        if (!wrapper) {
            phoneMenu.style.display = 'none';
            phoneBtn.classList.remove('active'); // Adaugă asta
        }
    });
    
    // Tasta Escape - închide meniul
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            phoneMenu.style.display = 'none';
            phoneBtn.classList.remove('active'); // Adaugă asta
        }
    });

    }
    
    // ---------- SCHIMBARE TEMĂ ----------
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
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
        
        themeBtn.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            applyTheme(isDark ? 'light' : 'dark');
        });
        
        applyTheme(savedTheme);
    }
    
    // ---------- MENIU MOBIL ----------
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
                if (mainNav.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }
    
    // ---------- BACK TO TOP ----------
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ---------- HEADER SCROLL ----------
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ---------- LINK ACTIV ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#mainNav a:not(.btn-nav)').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ---------- AN CURENT ----------
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    console.log('✅ TechNest PC - Toate funcționalitățile sunt active!');
});