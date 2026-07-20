/* ============================================
   TECHNEST PC - MAIN JAVASCRIPT
   ============================================ */

// ==========================================
// PHONE DROPDOWN - FUNCȚIE GLOBALĂ
// ==========================================
function togglePhoneMenu() {
    const menu = document.getElementById('phoneMenu');
    if (!menu) return;
    
    // Toggle display
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

// Închide meniul la click în altă parte
document.addEventListener('click', function(event) {
    const wrapper = event.target.closest('.phone-dropdown-wrapper');
    if (!wrapper) {
        const menu = document.getElementById('phoneMenu');
        if (menu) menu.style.display = 'none';
    }
});

// Închide meniul cu Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const menu = document.getElementById('phoneMenu');
        if (menu) menu.style.display = 'none';
    }
});

// ==========================================
// TOATE FUNCȚIILE CÂND DOM-UL ESTE GATA
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. PHONE TOGGLE BUTTON
    const phoneToggleBtn = document.getElementById('phoneToggleBtn');
    if (phoneToggleBtn) {
        phoneToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            togglePhoneMenu();
        });
    }
    
    // 2. THEME TOGGLE
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
    
    // 3. MOBILE MENU
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
    
    // 4. BACK TO TOP
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('visible', window.pageYOffset > 400);
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // 5. HEADER SCROLL
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.pageYOffset > 50);
        });
    }
    
    // 6. ACTIVE NAV LINK
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#mainNav a:not(.btn-nav)').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // 7. DYNAMIC YEAR
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    console.log('✅ TechNest PC - Toate funcționalitățile sunt active!');
});