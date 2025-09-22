// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const betaForm = document.getElementById('beta-form');
const animateElements = document.querySelectorAll('[data-animate]');

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize animations
animateElements.forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('mobile-open')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Navbar scroll effects
function initNavbarEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional enhancement)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('mobile-open');
    mobileMenuBtn.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('mobile-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Initialize mobile menu
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('mobile-open')) {
            toggleMobileMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('mobile-open')) {
            toggleMobileMenu();
        }
    });
}

// Beta form handling
function initBetaForm() {
    betaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = betaForm.querySelector('input[type="email"]');
        const submitBtn = betaForm.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Per favore inserisci una email valida', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Per favore inserisci una email valida', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Registrazione...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Grazie! Ti abbiamo aggiunto alla lista beta 🚀', 'success');
            emailInput.value = '';
            submitBtn.textContent = 'Iscriviti alla Beta';
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                padding: 16px 20px;
                border-radius: 8px;
                color: white;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            .notification--success {
                background: linear-gradient(135deg, #6A279A, #8E44AD);
            }
            .notification--error {
                background: linear-gradient(135deg, #FF5459, #C0152F);
            }
            .notification--info {
                background: linear-gradient(135deg, #626C71, #334044);
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s ease;
            }
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            @media (max-width: 768px) {
                .notification {
                    right: 16px;
                    left: 16px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    const autoRemove = setTimeout(() => removeNotification(notification), 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Particle effect for hero section (optional enhancement)
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(155, 89, 182, 0.5);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Add animation keyframes
    if (!document.querySelector('#particle-styles')) {
        const styles = document.createElement('style');
        styles.id = 'particle-styles';
        styles.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); }
                33% { transform: translateY(-20px) translateX(10px); }
                66% { transform: translateY(10px) translateX(-10px); }
            }
        `;
        document.head.appendChild(styles);
    }
    
    hero.appendChild(particlesContainer);
}

// Typing effect for hero title (optional enhancement)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const gradientSpan = heroTitle.querySelector('.gradient-text');
    const gradientText = gradientSpan ? gradientSpan.textContent : '';
    
    // Only apply to desktop
    if (window.innerWidth > 768) {
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'fadeInUp 1s ease forwards';
        }, 500);
    }
}

// Statistics counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target, duration = 2000) => {
        const isNumber = /^\d+$/.test(target);
        
        if (!isNumber) {
            element.textContent = target;
            return;
        }
        
        const start = 0;
        const end = parseInt(target);
        const increment = end / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toString();
            }
        }, 16);
    };
    
    // Trigger counter when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const target = statNumber.textContent;
                countUp(statNumber, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat').forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Copy functionality for card number (if needed)
function initCardInteraction() {
    const cardNumber = document.querySelector('.card-number');
    if (cardNumber) {
        cardNumber.style.cursor = 'pointer';
        cardNumber.title = 'Numero carta nascosto per privacy';
        
        cardNumber.addEventListener('click', () => {
            showNotification('Numero carta protetto per la tua privacy 🔒', 'info');
        });
    }
}

// Handle CTA buttons
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Scarica')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('App in arrivo presto su App Store e Google Play! 📱', 'info');
            });
        }
        
        if (button.textContent.includes('iOS') || button.textContent.includes('Android')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = button.textContent.includes('iOS') ? 'iOS' : 'Android';
                showNotification(`App ${platform} in fase di sviluppo. Iscriviti alla beta per essere notificato! 🚀`, 'info');
            });
        }
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initNavbarEffects();
    initMobileMenu();
    initBetaForm();
    initParticleEffect();
    initTypingEffect();
    initStatsCounter();
    initCardInteraction();
    initCTAButtons();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize certain features if needed
    if (window.innerWidth > 768) {
        navMenu.classList.remove('mobile-open');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Add some CSS for mobile menu via JavaScript
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('#mobile-menu-styles')) {
        const styles = document.createElement('style');
        styles.id = 'mobile-menu-styles';
        styles.textContent = `
            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: rgba(15, 15, 35, 0.98);
                    backdrop-filter: blur(20px);
                    padding: 40px 20px;
                    border-top: 1px solid rgba(155, 89, 182, 0.2);
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }
                
                .nav-menu.mobile-open {
                    display: flex;
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
                
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
        `;
        document.head.appendChild(styles);
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential external use
window.CryptoSecure = {
    showNotification,
    toggleMobileMenu
};