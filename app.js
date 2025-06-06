// YouMat Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Handle email signup form
    handleEmailSignup();
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add intersection observer for animations
    addScrollAnimations();
    
    // Add enhanced gradient effects
    addInteractiveEffects();
    
    // Initialize loading animations
    initializeLoadingAnimations();
}

// Email Signup Form Handler
function handleEmailSignup() {
    const signupForm = document.getElementById('signupForm');
    
    if (!signupForm) {
        console.warn('Signup form not found');
        return;
    }
    
    const emailInput = signupForm.querySelector('input[type="email"]');
    const submitButton = signupForm.querySelector('button[type="submit"]');

    if (!emailInput || !submitButton) {
        console.warn('Form elements not found');
        return;
    }

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Update button state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Thank you! We\'ll notify you when YouMat launches.', 'success');
            emailInput.value = '';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Add success animation to form
            signupForm.style.transform = 'scale(1.02)';
            setTimeout(() => {
                signupForm.style.transform = 'scale(1)';
            }, 200);
        }, 1000);
    });

    // Add real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        if (email && !isValidEmail(email)) {
            this.style.borderColor = '#ff4757';
        } else {
            this.style.borderColor = '';
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Set base styles
    const baseStyles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        maxWidth: '400px',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        fontFamily: 'var(--font-family-base)',
        fontSize: '14px',
        fontWeight: '500'
    };
    
    // Type-specific styles
    const typeStyles = {
        success: {
            background: 'linear-gradient(135deg, #00BFFF, #1E90FF)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.2)'
        },
        error: {
            background: 'linear-gradient(135deg, #ff4757, #ff3742)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.2)'
        },
        info: {
            background: 'linear-gradient(135deg, #87CEEB, #00BFFF)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.2)'
        }
    };
    
    // Apply styles
    Object.assign(notification.style, baseStyles, typeStyles[type]);
    
    // Create content
    notification.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
            <span style="flex: 1;">${message}</span>
            <button style="
                background: none;
                border: none;
                color: inherit;
                font-size: 18px;
                cursor: pointer;
                padding: 4px;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.2)'" 
               onmouseout="this.style.backgroundColor='transparent'"
               onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Only observe once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.about, .signup, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(section);
    });
    
    // Add animation styles
    if (!document.querySelector('#scroll-animations-style')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations-style';
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Interactive effects for enhanced user experience
function addInteractiveEffects() {
    // Add hover effect to device mockups
    const deviceMockups = document.querySelectorAll('.device-mockup');
    
    deviceMockups.forEach(mockup => {
        mockup.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05) rotateY(5deg)';
            this.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            this.style.zIndex = '10';
        });
        
        mockup.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = '';
            this.style.zIndex = '';
        });
    });
    
    // Add interactive gradient following mouse movement on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const gradientOverlay = document.querySelector('.hero-gradient-overlay') || (() => {
                const overlay = document.createElement('div');
                overlay.className = 'hero-gradient-overlay';
                overlay.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    z-index: 0;
                `;
                this.style.position = 'relative';
                this.appendChild(overlay);
                return overlay;
            })();
            
            gradientOverlay.style.background = `
                radial-gradient(circle 400px at ${x}% ${y}%, rgba(0, 191, 255, 0.08) 0%, transparent 60%)
            `;
        });
        
        hero.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.hero-gradient-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    }
    
    // Add click ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .gradient-button, .coming-soon-badge');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentElement) {
                    ripple.remove();
                }
            }, 600);
        });
    });
    
    // Add ripple animation keyframes if not exists
    if (!document.querySelector('#ripple-animation-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-animation-style';
        rippleStyle.textContent = `
            @keyframes ripple-effect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

// Enhanced parallax effect for background elements
function addParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-background, .particle-effects');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.2);
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Initialize loading animations
function initializeLoadingAnimations() {
    const heroHeading = document.querySelector('.hero-heading');
    const heroText = document.querySelector('.hero-text');
    const deviceMockups = document.querySelectorAll('.device-mockup');
    
    // Initial state
    if (heroHeading) {
        heroHeading.style.opacity = '0';
        heroHeading.style.transform = 'translateY(30px)';
    }
    
    if (heroText) {
        const textElements = heroText.querySelectorAll('.hero-tagline, .hero-subtext, .coming-soon-badge');
        textElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
    }
    
    deviceMockups.forEach(mockup => {
        mockup.style.opacity = '0';
        mockup.style.transform = 'translateY(50px) scale(0.8)';
    });
    
    // Animate on load
    window.addEventListener('load', function() {
        // Animate hero heading
        setTimeout(() => {
            if (heroHeading) {
                heroHeading.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
                heroHeading.style.opacity = '1';
                heroHeading.style.transform = 'translateY(0)';
            }
        }, 200);
        
        // Animate other hero text elements
        if (heroText) {
            const textElements = heroText.querySelectorAll('.hero-tagline, .hero-subtext, .coming-soon-badge');
            textElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 500 + (index * 150));
            });
        }
        
        // Animate device mockups
        deviceMockups.forEach((mockup, index) => {
            setTimeout(() => {
                mockup.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
                mockup.style.opacity = '1';
                mockup.style.transform = 'translateY(0) scale(1)';
            }, 800 + (index * 200));
        });
    });
}

// Add performance optimization for animations
function optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--duration-fast', '100ms');
        document.documentElement.style.setProperty('--duration-normal', '200ms');
    }
    
    // Respect user's preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all effects
addParallaxEffect();
optimizeAnimations();