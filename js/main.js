/* ============================================
   TECHNEST PC - MAIN JAVASCRIPT
   Cu sistem de temă Dark/Light Premium
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // 1. THEME SYSTEM
    // ============================================
    const themeSystem = {
        // Elemente
        toggleBtn: null,
        navToggle: null,
        currentTheme: 'light',
        
        // Inițializare
        init() {
            // Crează butonul de toggle (dacă nu există)
            this.createToggleButton();
            
            // Încarcă tema salvată
            this.loadTheme();
            
            // Adaugă event listeners
            this.bindEvents();
            
            // Aplică tema inițială
            this.applyTheme(this.currentTheme);
        },
        
        // Creează butonul flotant de toggle
        createToggleButton() {
            // Verifică dacă există deja
            if (document.querySelector('.theme-toggle')) return;
            
            const btn = document.createElement('button');
            btn.className = 'theme-toggle';
            btn.setAttribute('aria-label', 'Schimbă tema');
            btn.innerHTML = `
                <span class="icon-sun">☀️</span>
                <span class="icon-moon">🌙</span>
            `;
            document.body.appendChild(btn);
            this.toggleBtn = btn;
            
            // Adaugă și în meniul mobile
            this.addNavToggle();
        },
        
        // Adaugă toggle în meniul mobil
        addNavToggle() {
            const nav = document.getElementById('mainNav');
            if (!nav) return;
            
            const ul = nav.querySelector('ul');
            if (!ul) return;
            
            const li = document.createElement('li');
            li.style.listStyle = 'none';
            
            const btn = document.createElement('button');
            btn.className = 'nav-theme-toggle';
            btn.setAttribute('aria-label', 'Schimbă tema');
            btn.innerHTML = `
                <span class="icon-sun">☀️</span>
                <span class="icon-moon">🌙</span>
                <span style="margin-left:4px;">Temă</span>
            `;
            
            li.appendChild(btn);
            ul.appendChild(li);
            this.navToggle = btn;
        },
        
        // Încarcă tema salvată
        loadTheme() {
            const saved = localStorage.getItem('technest-theme');
            if (saved) {
                this.currentTheme = saved;
            } else {
                // Detectează preferința sistemului
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.currentTheme = prefersDark ? 'dark' : 'light';
            }
        },
        
        // Aplică tema
        applyTheme(theme) {
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            
            // Salvează preferința
            localStorage.setItem('technest-theme', theme);
            this.currentTheme = theme;
            
            // Actualizează butoanele
            this.updateButtons(theme);
        },
        
        // Toggle între teme
        toggleTheme() {
            const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
            
            // Adaugă animație la buton
            if (this.toggleBtn) {
                this.toggleBtn.classList.remove('pulse');
                // Force reflow
                void this.toggleBtn.offsetWidth;
                this.toggleBtn.classList.add('pulse');
            }
            
            // Emite eveniment pentru alte componente
            document.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: newTheme }
            }));
        },
        
        // Actualizează butoanele
        updateButtons(theme) {
            const isDark = theme === 'dark';
            
            // Actualizează toate butoanele de toggle
            document.querySelectorAll('.theme-toggle, .nav-theme-toggle').forEach(btn => {
                const sun = btn.querySelector('.icon-sun');
                const moon = btn.querySelector('.icon-moon');
                if (sun && moon) {
                    sun.style.display = isDark ? 'inline' : 'none';
                    moon.style.display = isDark ? 'none' : 'inline';
                }
            });
        },
        
        // Bind events
        bindEvents() {
            // Buton flotant
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', () => this.toggleTheme());
            }
            
            // Buton din meniu
            if (this.navToggle) {
                this.navToggle.addEventListener('click', () => this.toggleTheme());
            }
            
            // Ascultă schimbarea preferinței sistemului
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('technest-theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    };


    // ============================================
    // 2. MOBILE MENU TOGGLE
    // ============================================
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


    // ============================================
    // 3. HEADER SCROLL EFFECT
    // ============================================
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


    // ============================================
    // 4. ACTIVE NAV LINK
    // ============================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#mainNav a:not(.btn-nav)');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else if (currentPage === '' && href === 'index.html') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveNavLink();


    // ============================================
    // 5. ANIMATIONS WITH INTERSECTION OBSERVER
    // ============================================
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.animate');
        
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }


    // ============================================
    // 6. SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ============================================
    // 7. BACK TO TOP BUTTON
    // ============================================
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ============================================
    // 8. CONTACT FORM VALIDATION
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^(\+4|0)?7[0-9]{8}$/;
        return re.test(phone.replace(/\s/g, ''));
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
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification${type === 'error' ? ' notification-error' : ''}`;
        notification.innerHTML = message;
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
            const requiredFields = this.querySelectorAll('[required]');
            const errors = [];

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
                if (firstError) {
                    firstError.focus();
                }
                return;
            }

            errorContainer.style.display = 'none';
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Se trimite...';
            submitBtn.classList.add('loading');

            const formData = new FormData(this);

            fetch(this.action || 'send.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                
                if (data.success) {
                    showNotification('success', '✅ Mesajul a fost trimis cu succes! Vom reveni în 24h.');
                    this.reset();
                } else {
                    showNotification('error', '❌ A apărut o eroare. Încercați din nou sau contactați-ne direct.');
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
                showNotification('error', '❌ Eroare de conexiune. Verificați conexiunea la internet.');
                console.error('Form error:', error);
            });
        });
    }


    // ============================================
    // 9. DYNAMIC YEAR
    // ============================================
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });


    // ============================================
    // 10. INIT THEME
    // ============================================
    themeSystem.init();


    // ============================================
    // 11. CONSOLE BRANDING
    // ============================================
    console.log('%c🚀 TechNest PC - Service IT Profesional', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
    console.log('%c📞 07XX XXX XXX | ✉️ contact@technestpc.ro', 'font-size: 14px; color: #64748b;');
    console.log('%c📍 Călinești, Județul Argeș', 'font-size: 14px; color: #64748b;');
    console.log('%c🌓 Tema: ' + (document.documentElement.getAttribute('data-theme') || 'light'), 'font-size: 14px; color: #f59e0b;');

})();