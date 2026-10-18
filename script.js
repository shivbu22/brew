// Enhanced 3D animation system for luxury perfume website
let scene, camera, renderer;
let bottleMesh = null;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Initialize enhanced 3D effects
function init3DEffects() {
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: '#a0a0ff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.05,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    
    // Initialize 3D bottle rotation
    init3DBottle();
}

// Initialize 3D bottle effect using CSS transforms
function init3DBottle() {
    const bottleElements = document.querySelectorAll('.bottle-placeholder, .bottle-placeholder-large, .product-bottle');
    
    bottleElements.forEach(bottle => {
        // Add 3D rotation capability
        bottle.style.transformStyle = 'preserve-3d';
        bottle.style.transition = 'transform 0.5s ease';
        
        // Mouse move effect for 3D perspective
        bottle.addEventListener('mousemove', (e) => {
            const rect = bottle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            bottle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        bottle.addEventListener('mouseleave', () => {
            bottle.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Auto-rotation for the large bottle in notes section
    const largeBottle = document.querySelector('.bottle-placeholder-large');
    if (largeBottle) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            largeBottle.style.transform = `perspective(1000px) rotateY(${rotation}deg)`;
        }, 50);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    init3DEffects();

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add glow effect when elements come into view
                if (entry.target.classList.contains('note-card')) {
                    entry.target.style.boxShadow = '0 0 30px rgba(160, 160, 255, 0.3)';
                    setTimeout(() => {
                        entry.target.style.boxShadow = '';
                    }, 2000);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.note-card, .product-card').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for story section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.story-line');
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * 0.3;
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Product card hover effects with enhanced 3D
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px) translateZ(20px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            
            // Enhance the glow effect
            const bottle = this.querySelector('.product-bottle');
            if (bottle) {
                bottle.style.boxShadow = '0 0 30px rgba(160, 160, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0) translateZ(0)';
            this.style.boxShadow = '';
            
            const bottle = this.querySelector('.product-bottle');
            if (bottle) {
                bottle.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.1)';
            }
        });
    });

    // Handle CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-secondary, .cta-button-tertiary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = event.clientY - rect.top - size / 2 + 'px';
            ripple.classList.add('ripple');
            
            const rippleContainer = this.querySelector('.ripple') || this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for fade-in animations with glow effects
    const fadeElements = document.querySelectorAll('.note-card, .product-card, .story-line');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add subtle glow for note cards
                if (entry.target.classList.contains('note-card')) {
                    entry.target.style.transition = 'all 0.6s ease, box-shadow 0.3s ease';
                    setTimeout(() => {
                        entry.target.style.boxShadow = '0 0 20px rgba(160, 160, 255, 0.2)';
                        setTimeout(() => {
                            entry.target.style.boxShadow = '';
                        }, 1000);
                    }, 300);
                }
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // Initialize the first story line immediately
    const firstStoryLine = document.querySelector('.story-line');
    if (firstStoryLine) {
        setTimeout(() => {
            firstStoryLine.style.opacity = '1';
            firstStoryLine.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add subtle grain effect to body for luxury texture
    const grainEffect = document.createElement('div');
    grainEffect.id = 'grain-effect';
    grainEffect.style.position = 'fixed';
    grainEffect.style.top = '0';
    grainEffect.style.left = '0';
    grainEffect.style.width = '100%';
    grainEffect.style.height = '100%';
    grainEffect.style.pointerEvents = 'none';
    grainEffect.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.15\'/%3E%3C/svg%3E")';
    grainEffect.style.zIndex = '9999';
    grainEffect.style.mixBlendMode = 'overlay';
    document.body.appendChild(grainEffect);
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}