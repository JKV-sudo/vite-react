// Animation controller for smooth transitions and effects
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isHighPerformance = true;
        
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupReducedMotionListener();
        this.setupPerformanceOptimizations();
        
        console.log('Animation controller initialized');
    }

    setupIntersectionObservers() {
        // Fade up animation observer
        const fadeUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerFadeUpAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Scale animation observer
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerScaleAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        });

        // Stagger animation observer
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerStaggerAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        this.observers.set('fadeUp', fadeUpObserver);
        this.observers.set('scale', scaleObserver);
        this.observers.set('stagger', staggerObserver);

        // Observe elements
        this.observeElements();
    }

    observeElements() {
        document.querySelectorAll('.reveal-fade-up').forEach(el => {
            this.observers.get('fadeUp').observe(el);
        });

        document.querySelectorAll('.reveal-scale').forEach(el => {
            this.observers.get('scale').observe(el);
        });

        document.querySelectorAll('.stagger-container').forEach(el => {
            this.observers.get('stagger').observe(el);
        });
    }

    setupScrollAnimations() {
        // Parallax scroll effects
        this.setupParallaxScrolling();
        
        // Header scroll effects
        this.setupHeaderScrollEffects();
        
        // Progress indicators
        this.setupScrollProgress();
    }

    setupParallaxScrolling() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0 || this.reducedMotion) return;
        
        const handleScroll = PerformanceUtils.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupHeaderScrollEffects() {
        const header = document.getElementById('nav-bar');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        
        const handleScroll = PerformanceUtils.throttle(() => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header based on scroll direction
            if (scrollY > lastScrollY && scrollY > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScrollY = scrollY;
        }, 16);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupScrollProgress() {
        // Create progress indicator if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
            document.body.appendChild(progressBar);
        }
        
        const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
        
        const updateProgress = PerformanceUtils.throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBarFill.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
        }, 16);
        
        window.addEventListener('scroll', updateProgress, { passive: true });
    }

    setupHoverEffects() {
        // Magnetic hover effects for buttons
        this.setupMagneticButtons();
        
        // Ripple effects
        this.setupRippleEffects();
        
        // Cursor trail effects
        this.setupCursorTrail();
    }

    setupMagneticButtons() {
        const magneticElements = document.querySelectorAll('.magnetic, .cta-primary, .cta-secondary');
        
        magneticElements.forEach(element => {
            let isHovering = false;
            
            element.addEventListener('mouseenter', () => {
                isHovering = true;
                element.style.transition = 'transform 0.3s ease-out';
            });
            
            element.addEventListener('mouseleave', () => {
                isHovering = false;
                element.style.transform = '';
                element.style.transition = 'transform 0.6s ease-out';
            });
            
            element.addEventListener('mousemove', (e) => {
                if (!isHovering || this.reducedMotion) return;
                
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        });
    }

    setupRippleEffects() {
        const rippleElements = document.querySelectorAll('.ripple, .nav-btn, .service-card');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e, element);
            });
        });
    }

    createRipple(event, element) {
        if (this.reducedMotion) return;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(0, 212, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Ensure element has relative positioning
        const originalPosition = element.style.position;
        if (!originalPosition || originalPosition === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupCursorTrail() {
        if (this.reducedMotion || 'ontouchstart' in window) return;
        
        const trail = [];
        const trailLength = 10;
        let mouseX = 0;
        let mouseY = 0;
        
        // Create trail elements
        for (let i = 0; i < trailLength; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail-dot';
            dot.style.cssText = `
                position: fixed;
                width: ${6 - i * 0.3}px;
                height: ${6 - i * 0.3}px;
                background: rgba(0, 212, 255, ${(trailLength - i) / trailLength * 0.5});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: none;
            `;
            document.body.appendChild(dot);
            trail.push({ element: dot, x: 0, y: 0 });
        }
        
        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animate trail
        const animateTrail = () => {
            trail.forEach((dot, index) => {
                if (index === 0) {
                    dot.x = mouseX;
                    dot.y = mouseY;
                } else {
                    const prevDot = trail[index - 1];
                    dot.x += (prevDot.x - dot.x) * 0.3;
                    dot.y += (prevDot.y - dot.y) * 0.3;
                }
                
                dot.element.style.left = `${dot.x}px`;
                dot.element.style.top = `${dot.y}px`;
            });
            
            requestAnimationFrame(animateTrail);
        };
        
        animateTrail();
    }

    setupReducedMotionListener() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        mediaQuery.addEventListener('change', () => {
            this.reducedMotion = mediaQuery.matches;
            this.handleReducedMotionChange();
        });
    }

    handleReducedMotionChange() {
        if (this.reducedMotion) {
            document.body.classList.add('reduced-motion');
            this.disableAnimations();
        } else {
            document.body.classList.remove('reduced-motion');
            this.enableAnimations();
        }
    }

    disableAnimations() {
        // Disable CSS animations
        const style = document.createElement('style');
        style.id = 'reduced-motion-style';
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
        
        // Stop JS animations
        this.stopAllAnimations();
    }

    enableAnimations() {
        const style = document.getElementById('reduced-motion-style');
        if (style) {
            style.remove();
        }
        
        this.startAllAnimations();
    }

    triggerFadeUpAnimation(element) {
        if (this.reducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    triggerScaleAnimation(element) {
        if (this.reducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            return;
        }
        
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    triggerStaggerAnimation(container) {
        const items = container.querySelectorAll('.stagger-item');
        
        items.forEach((item, index) => {
            if (this.reducedMotion) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                return;
            }
            
            setTimeout(() => {
                this.triggerFadeUpAnimation(item);
            }, index * 100);
        });
    }

    setupPerformanceOptimizations() {
        // Monitor performance and adjust animations accordingly
        if (window.performanceMonitor) {
            setInterval(() => {
                const avgFPS = window.performanceMonitor.getAverageFPS();
                
                if (avgFPS < 30 && this.isHighPerformance) {
                    this.reduceAnimationQuality();
                    this.isHighPerformance = false;
                } else if (avgFPS > 50 && !this.isHighPerformance) {
                    this.restoreAnimationQuality();
                    this.isHighPerformance = true;
                }
            }, 5000);
        }
    }

    reduceAnimationQuality() {
        document.body.classList.add('low-animation-quality');
        console.log('Animation quality reduced for better performance');
    }

    restoreAnimationQuality() {
        document.body.classList.remove('low-animation-quality');
        console.log('Animation quality restored');
    }

    // Public API methods
    animate(element, animation, options = {}) {
        if (this.reducedMotion && !options.forceAnimation) return Promise.resolve();
        
        return new Promise((resolve) => {
            const animationName = `custom-${Date.now()}`;
            const keyframes = this.getAnimationKeyframes(animation);
            const duration = options.duration || 600;
            const easing = options.easing || 'ease-out';
            
            const animationRule = `
                @keyframes ${animationName} {
                    ${keyframes}
                }
            `;
            
            // Add keyframes to stylesheet
            const style = document.createElement('style');
            style.textContent = animationRule;
            document.head.appendChild(style);
            
            // Apply animation
            element.style.animation = `${animationName} ${duration}ms ${easing}`;
            
            // Cleanup after animation
            setTimeout(() => {
                element.style.animation = '';
                style.remove();
                resolve();
            }, duration);
        });
    }

    getAnimationKeyframes(animation) {
        const keyframes = {
            fadeIn: '0% { opacity: 0; } 100% { opacity: 1; }',
            fadeOut: '0% { opacity: 1; } 100% { opacity: 0; }',
            slideUp: '0% { transform: translateY(30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; }',
            slideDown: '0% { transform: translateY(-30px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; }',
            scaleIn: '0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; }',
            bounceIn: '0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); opacity: 1; }'
        };
        
        return keyframes[animation] || keyframes.fadeIn;
    }

    stopAllAnimations() {
        this.animations.forEach(animation => {
            if (animation.cancel) {
                animation.cancel();
            }
        });
        this.animations.clear();
    }

    startAllAnimations() {
        // Re-observe elements for animations
        this.observeElements();
    }

    destroy() {
        // Clean up observers and animations
        this.observers.forEach(observer => observer.disconnect());
        this.stopAllAnimations();
        
        // Remove cursor trail
        document.querySelectorAll('.cursor-trail-dot').forEach(dot => dot.remove());
    }
}

// CSS for ripple animation
const rippleCSS = `
    @keyframes ripple-animation {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
    }
`;

// Add CSS to document
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Export for global use
if (typeof window !== 'undefined') {
    window.AnimationController = AnimationController;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
