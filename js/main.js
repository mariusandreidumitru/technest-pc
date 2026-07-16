/* ============================================
   TECHNEST PC - MAIN JAVASCRIPT
   Functionalități complete pentru site
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // 1. MOBILE MENU TOGGLE
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
        
        // Aria accessibility
        menuToggle.setAttribute('aria-expanded', !isOpen);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu on link click (mobile)
    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
            toggleMenu();
        }
    });


    // ============================================
    // 2. HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
        const currentScroll = window.pageYOffset || window.scrollY;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional - pentru ascundere)
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down - hide header (opțional)
            // header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up - show header
            // header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
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
    // 3. ACTIVE NAV LINK HIGHLIGHT
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
    // 4. INTERSECTION OBSERVER - ANIMATIONS
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
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }


    // ============================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
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
    // 6. CONTACT FORM VALIDATION & SUBMIT
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset errors
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
                
                // Email validation
                if (field.type === 'email' && value && !isValidEmail(value)) {
                    isValid = false;
                    field.classList.add('error');
                    errors.push(`- Adresa de email nu este validă`);
                }
                
                // Phone validation (optional)
                if (field.type === 'tel' && value && !isValidPhone(value)) {
                    isValid = false;
                    field.classList.add('error');
                    errors.push(`- Numărul de telefon nu este valid`);
                }
            });

            // Show errors
            const errorContainer = document.getElementById('formErrors') || createErrorContainer(this);
            
            if (!isValid) {
                errorContainer.innerHTML = `
                    <div class="alert alert-error">
                        <strong>⚠️ Vă rugăm să corectați următoarele:</strong>
                        <ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>
                    </div>
                `;
                errorContainer.style.display = 'block';
                
                // Scroll to first error
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
                return;
            }

            // If valid - submit via AJAX
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
                    showNotification('error', '❌ A apărut o eroare. Încercați din nou sau contactați-ne direct.');
                }
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                showNotification('error', '❌ Eroare de conexiune. Verificați conexiunea la internet.');
                console.error('Form error:', error);
            });
        });
    }


    // ============================================
    // 7. HELPER FUNCTIONS
    // ============================================

    // Validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validate phone (Romanian format)
    function isValidPhone(phone) {
        const re = /^(\+4|0)?7[0-9]{8}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    // Create error container
    function createErrorContainer(form) {
        const container = document.createElement('div');
        container.id = 'formErrors';
        container.style.marginBottom = '20px';
        form.prepend(container);
        return container;
    }

    // Show notification
    function showNotification(type, message) {
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
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

        // Auto dismiss after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        }, 5000);

        // Dismiss on click
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        });
    }


    // ============================================
    // 8. DYNAMIC YEAR IN FOOTER
    // ============================================
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });


    // ============================================
    // 9. SMOOTH PAGE TRANSITIONS (optional)
    // ============================================
    document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.includes('javascript:') && !href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                // Small delay for smooth transition
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.2s ease';
            });
        }
    });


    // ============================================
    // 10. LOADING SCREEN (optional)
    // ============================================
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        
        // Reveal content
        document.body.style.opacity = '1';
    });

    // Initial body state
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);


    // ============================================
    // 11. BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--secondary, #3b82f6);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.35);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        z-index: 999;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ============================================
    // 12. CONSOLE BRANDING (pentru identitate)
    // ============================================
    console.log('%c🚀 TechNest PC - Service IT Profesional', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
    console.log('%c📞 07XX XXX XXX | ✉️ contact@technestpc.ro', 'font-size: 14px; color: #64748b;');
    console.log('%c📍 Călinești, Județul Argeș', 'font-size: 14px; color: #64748b;');

})();


// ============================================
// EXTRA: CSS pentru notificări (adaugă în style.css)
// ============================================
/*
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100px);
    }
}

.alert {
    padding: 16px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.95rem;
}

.alert-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
}

.alert-error ul {
    margin: 8px 0 0 20px;
    padding: 0;
}

.alert-error li {
    margin-bottom: 4px;
}

.contact-form .error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
}
*/