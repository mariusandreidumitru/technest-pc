/* ============================================
   TECHNEST PC - MAIN JAVASCRIPT
   ============================================ */

(function() {
    'use strict';

    // ---------- THEME SYSTEM ----------
   // ---------- THEME SYSTEM ----------
const themeSystem = {
    toggleBtn: null,
    currentTheme: 'light',
    
    init() {
        this.toggleBtn = document.getElementById('themeToggle');
        if (!this.toggleBtn) {
            this.createToggleButton();
        }
        this.loadTheme();
        this.bindEvents();
        this.applyTheme(this.currentTheme);
    },
    
    createToggleButton() {
        const btn = document.createElement('button');
        btn.className = 'theme-toggle';
        btn.id = 'themeToggle';
        btn.setAttribute('aria-label', 'Schimbă tema');
        btn.innerHTML = `
            <span class="icon-sun">☀️</span>
            <span class="icon-moon">🌙</span>
        `;
        document.body.appendChild(btn);
        this.toggleBtn = btn;
    },
    
    loadTheme() {
        const saved = localStorage.getItem('technest-theme');
        if (saved) {
            this.currentTheme = saved;
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }
    },
    
    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('technest-theme', theme);
        this.currentTheme = theme;
        // NU mai apela updateButtons - CSS-ul face treaba
    },
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    },
    
    bindEvents() {
        if (this.toggleBtn) {
            // Elimină event listener-ii vechi
            const newBtn = this.toggleBtn.cloneNode(true);
            this.toggleBtn.parentNode.replaceChild(newBtn, this.toggleBtn);
            this.toggleBtn = document.getElementById('themeToggle');
            
            this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('technest-theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
};

    // ---------- MOBILE MENU ----------
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const navOverlay = document.getElementById('navOverlay');
    const body = document.body;

    function toggleMenu() {
        const isOpen = mainNav.classList.contains('open');
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('open');
        navOverlay.classList.toggle('active');
        body.style.overflow = isOpen ? '' : 'hidden';
        menuToggle.setAttribute('aria-expanded', !isOpen);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
            toggleMenu();
        }
    });

    // ---------- HEADER SCROLL ----------
    const header = document.getElementById('header');
    let ticking = false;

    function updateHeader() {
        const currentScroll = window.pageYOffset || window.scrollY;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ---------- ACTIVE NAV LINK ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#mainNav a:not(.btn-nav)').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ---------- ANIMATIONS ----------
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.animate').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ---------- BACK TO TOP ----------
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Înapoi sus');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- FORM VALIDATION ----------
    const contactForm = document.querySelector('.contact-form');
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^(\+4|0)?7[0-9]{8}$/.test(phone.replace(/\s/g, ''));
    }

    function createErrorContainer(form) {
        let container = document.getElementById('formErrors');
        if (!container) {
            container = document.createElement('div');
            container.id = 'formErrors';
            container.style.marginBottom = '20px';
            form.prepend(container);
        }
        return container;
    }

    function showNotification(type, message) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification${type === 'error' ? ' notification-error' : ''}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'var(--success, #10b981)' : 'var(--danger, #ef4444)'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 9999;
            font-weight: 500;
            animation: slideInRight 0.4s ease;
            cursor: pointer;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        }, 5000);

        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const errorFields = this.querySelectorAll('.error');
            errorFields.forEach(field => field.classList.remove('error'));
            
            let isValid = true;
            const errors = [];
            const requiredFields = this.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                const value = field.value.trim();
                const fieldName = field.getAttribute('name') || field.id || 'Câmp';
                
                if (!value) {
                    isValid = false;
                    field.classList.add('error');
                    errors.push(`- ${fieldName} este obligatoriu`);
                }
                
                if (field.type === 'email' && value && !isValidEmail(value)) {
                    isValid = false;
                    field.classList.add('error');
                    errors.push(`- Adresa de email nu este validă`);
                }
                
                if (field.type === 'tel' && value && !isValidPhone(value)) {
                    isValid = false;
                    field.classList.add('error');
                    errors.push(`- Numărul de telefon nu este valid`);
                }
            });

            const errorContainer = createErrorContainer(this);
            
            if (!isValid) {
                errorContainer.innerHTML = `
                    <div class="alert alert-error">
                        <strong>⚠️ Vă rugăm să corectați următoarele:</strong>
                        <ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>
                    </div>
                `;
                errorContainer.style.display = 'block';
                const firstError = this.querySelector('.error');
                if (firstError) firstError.focus();
                return;
            }

            errorContainer.style.display = 'none';
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Se trimite...';

            const formData = new FormData(this);

            fetch(this.action || 'send.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                if (data.success) {
                    showNotification('success', '✅ Mesajul a fost trimis cu succes! Vom reveni în 24h.');
                    this.reset();
                } else {
                    showNotification('error', '❌ A apărut o eroare. Încercați din nou.');
                }
            })
            .catch(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                showNotification('error', '❌ Eroare de conexiune. Verificați conexiunea la internet.');
            });
        });
    }

    // ---------- DYNAMIC YEAR ----------
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // ---------- INIT THEME ----------
    themeSystem.init();

    // ---------- CONSOLE ----------
    console.log('%c🚀 TechNest PC - Service IT Profesional', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
    console.log('%c📞 07XX XXX XXX | ✉️ contact@technestpc.ro', 'font-size: 14px; color: #64748b;');
    console.log('%c📍 Călinești, Județul Argeș', 'font-size: 14px; color: #64748b;');

})();