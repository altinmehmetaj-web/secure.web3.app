// Enhanced interactive functionality for NBC Talk complete site
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll to features section
    window.scrollToFeatures = function() {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Apply animation to all main sections
    const animatedSections = document.querySelectorAll('.privacy-section, .mastercard-section, .crypto-section, .technology-section, .ease-section, .final-cta');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });
    
    // Enhanced hover effects for feature cards
    const allCards = document.querySelectorAll('.feature-card, .tech-card, .mastercard-feature, .ease-feature');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            if (this.classList.contains('mastercard-feature')) {
                this.style.transform = 'translateX(15px) scale(1.02)';
            }
            if (this.classList.contains('ease-feature')) {
                this.style.transform = 'translateY(-8px) scale(1.01)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('mastercard-feature')) {
                this.style.transform = 'translateX(0) scale(1)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // CTA button click tracking and effects
    const ctaButtons = document.querySelectorAll('a[href*="nbctalkpay.com"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track different CTA locations
            const buttonText = this.textContent.trim();
            console.log('CTA clicked:', buttonText, 'Location:', getButtonLocation(this));
            
            // Add ripple effect
            createRippleEffect(this, e);
        });
        
        // Enhanced hover effects for CTA buttons
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('glow')) {
                this.style.boxShadow = '0 0 50px rgba(16, 185, 129, 0.8), 0 0 80px rgba(16, 185, 129, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('glow')) {
                this.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.6)';
            }
        });
    });
    
    // Function to determine CTA button location
    function getButtonLocation(button) {
        const section = button.closest('section');
        if (section) {
            if (section.classList.contains('hero')) return 'Hero Section';
            if (section.classList.contains('final-cta')) return 'Final CTA';
            return 'Other Section';
        }
        return 'Unknown';
    }
    
    // Ripple effect for buttons
    function createRippleEffect(button, event) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Parallax effect for hero background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero::before');
        
        if (heroBackground) {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            document.querySelector('.hero').style.transform = `translateY(${yPos * 0.1}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxTick);
    
    // Enhanced glow animation for important elements
    const glowElements = document.querySelectorAll('.glow, .mastercard-image');
    setInterval(() => {
        glowElements.forEach((element, index) => {
            const baseIntensity = element.classList.contains('mastercard-image') ? 0.2 : 0.4;
            const randomIntensity = Math.random() * 0.3 + baseIntensity;
            const glowSize = Math.random() * 20 + 30;
            
            if (element.classList.contains('mastercard-image')) {
                element.style.filter = `drop-shadow(0 15px ${glowSize}px rgba(139, 92, 246, ${randomIntensity}))`;
            } else {
                element.style.boxShadow = `0 0 ${glowSize}px rgba(16, 185, 129, ${randomIntensity})`;
            }
        });
    }, 2000);
    
    // Crypto symbols enhanced animation
    const cryptoItems = document.querySelectorAll('.crypto-item');
    cryptoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease-out forwards';
        
        // Enhanced hover effect for crypto items
        item.addEventListener('mouseenter', function() {
            const symbol = this.querySelector('.crypto-symbol');
            const name = this.querySelector('.crypto-name');
            symbol.style.transform = 'scale(1.3) rotate(12deg)';
            symbol.style.transition = 'transform 0.3s ease';
            name.style.color = '#FFD700';
        });
        
        item.addEventListener('mouseleave', function() {
            const symbol = this.querySelector('.crypto-symbol');
            const name = this.querySelector('.crypto-name');
            symbol.style.transform = 'scale(1) rotate(0deg)';
            name.style.color = '';
        });
    });
    
    // Stats counter animation with enhanced effects
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                // Add completion glow
                element.parentElement.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.5)';
                setTimeout(() => {
                    element.parentElement.style.boxShadow = '';
                }, 1000);
            }
            
            const text = element.textContent;
            if (text.includes('€')) {
                element.textContent = Math.floor(current) + '€';
            } else if (text.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (text.includes('bit')) {
                element.textContent = Math.floor(current) + 'bit';
            } else if (text.includes('min')) {
                element.textContent = Math.floor(current) + 'min';
            } else if (text.includes('/')) {
                element.textContent = Math.floor(current) + '/7';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Enhanced stats observer with staggered animations
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const text = entry.target.textContent;
                    let targetValue = 0;
                    
                    if (text.includes('0€')) targetValue = 0;
                    else if (text.includes('195')) targetValue = 195;
                    else if (text.includes('2min')) targetValue = 2;
                    else if (text.includes('24/7')) targetValue = 24;
                    else if (text.includes('256')) targetValue = 256;
                    else if (text.includes('100')) targetValue = 100;
                    
                    animateCounter(entry.target, targetValue);
                }, index * 200);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Badge animations for mastercard and ease sections
    const badges = document.querySelectorAll('.card-badge, .ease-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(-2deg)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '';
        });
    });
    
    // Mastercard image special effects
    const mastercardImage = document.querySelector('.mastercard-image');
    if (mastercardImage) {
        mastercardImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(10deg) rotateX(5deg)';
            this.style.filter = 'drop-shadow(0 20px 40px rgba(139, 92, 246, 0.6)) brightness(1.1)';
        });
        
        mastercardImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
            this.style.filter = 'drop-shadow(0 15px 35px rgba(139, 92, 246, 0.4))';
        });
    }
    
    // Tech icons rotation effects
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            this.style.transition = 'transform 0.6s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Benefit items enhanced interactions
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1.3) rotate(10deg)';
            icon.style.filter = 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.8))';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.filter = '';
        });
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in';
        
        // Trigger hero animations after load
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-text > *');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 200);
    });
    
    // Initialize body opacity
    document.body.style.opacity = '0';
    
    // Enhanced mobile touch interactions
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.btn, .feature-card, .crypto-item, .tech-card, .mastercard-feature, .ease-feature, .benefit-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = '';
                }, 150);
            });
        });
    }
    
    // Scroll-triggered staggered animations
    const staggerElements = document.querySelectorAll('.mastercard-features, .crypto-features, .ease-features, .benefits-summary, .tech-grid');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) translateX(0)';
                    }, index * 150);
                });
            }
        });
    });
    
    staggerElements.forEach(element => {
        const children = element.children;
        Array.from(children).forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'all 0.6s ease-out';
        });
        staggerObserver.observe(element);
    });
    
    // Dynamic background color effects on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        document.body.style.transition = 'filter 0.3s ease';
        document.body.style.filter = 'brightness(0.95)';
        
        scrollTimeout = setTimeout(() => {
            document.body.style.filter = 'brightness(1)';
        }, 150);
    });
    
    // Easter egg: Enhanced konami code with visual effects
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Epic rainbow animation
            document.body.style.animation = 'rainbow 5s ease-in-out';
            
            // Add floating elements
            for (let i = 0; i < 20; i++) {
                createFloatingEmoji();
            }
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
    
    function createFloatingEmoji() {
        const emoji = document.createElement('div');
        const emojis = ['🚀', '💰', '🔐', '⚡', '🌟', '💎', '🎉', '🔥'];
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * window.innerWidth + 'px';
        emoji.style.top = window.innerHeight + 'px';
        emoji.style.fontSize = '2rem';
        emoji.style.zIndex = '9999';
        emoji.style.pointerEvents = 'none';
        emoji.style.animation = 'floatUp 3s ease-out forwards';
        
        document.body.appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, 3000);
    }
    
    // Footer link enhancements
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.textShadow = '0 2px 10px rgba(16, 185, 129, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.textShadow = '';
        });
    });
});

// Add enhanced animations CSS
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .in-view {
        animation: slideInFromBottom 0.8s ease-out;
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(enhancedStyle);