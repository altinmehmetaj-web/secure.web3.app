// Smooth scrolling and interactive functionality
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
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to sections
    const animatedSections = document.querySelectorAll('.privacy-section, .crypto-section, .final-cta');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click tracking for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href*="nbctalkpay.com"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a small delay for visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track button clicks (could be used for analytics)
            console.log('CTA button clicked:', this.textContent);
        });
    });
    
    // Parallax effect for hero section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxTick);
    
    // Add glow animation to important elements
    const glowElements = document.querySelectorAll('.glow');
    setInterval(() => {
        glowElements.forEach(element => {
            element.style.boxShadow = `0 0 ${Math.random() * 20 + 30}px rgba(16, 185, 129, ${Math.random() * 0.4 + 0.4})`;
        });
    }, 2000);
    
    // Crypto symbols animation
    const cryptoItems = document.querySelectorAll('.crypto-item');
    cryptoItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease-out forwards';
        
        // Add hover effect for crypto items
        item.addEventListener('mouseenter', function() {
            const symbol = this.querySelector('.crypto-symbol');
            symbol.style.transform = 'scale(1.2) rotate(10deg)';
            symbol.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const symbol = this.querySelector('.crypto-symbol');
            symbol.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Stats counter animation
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
            }
            
            if (element.textContent.includes('€')) {
                element.textContent = Math.floor(current) + '€';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('bit')) {
                element.textContent = Math.floor(current) + 'bit';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Trigger counter animation when stats are visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                let targetValue = 0;
                
                if (text.includes('0€')) targetValue = 0;
                else if (text.includes('0')) targetValue = 0;
                else if (text.includes('256bit')) targetValue = 256;
                else if (text.includes('100%')) targetValue = 100;
                
                if (targetValue > 0) {
                    animateCounter(entry.target, targetValue);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in';
    });
    
    // Initialize body opacity
    document.body.style.opacity = '0';
    
    // Easter egg: Konami code for special animation
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Special animation when konami code is entered
            document.body.style.animation = 'rainbow 3s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
        }
    });
    
    // Mobile touch interactions
    if ('ontouchstart' in window) {
        // Add touch feedback for mobile devices
        const touchElements = document.querySelectorAll('.btn, .feature-card, .crypto-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    // Scroll-triggered animations for better UX
    const scrollElements = document.querySelectorAll('.crypto-features, .benefits-row');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    });
    
    scrollElements.forEach(element => {
        const children = element.children;
        Array.from(children).forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateX(-20px)';
            child.style.transition = 'all 0.6s ease-out';
        });
        scrollObserver.observe(element);
    });
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);