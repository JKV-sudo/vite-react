// Main application controller
class SplitVisionApp {
    constructor() {
        this.isLoading = true;
        this.currentFace = 'front';
        this.isTransitioning = false;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.swipeThreshold = 50;
        
        this.init();
    }

    async init() {
        // Show loading screen
        await this.showLoadingScreen();
        
        // Initialize components
        this.initCubeController();
        this.initEventListeners();
        this.initNavigation();
        this.initGestures();
        this.initIntersectionObserver();
        
        // Hide loading screen
        this.hideLoadingScreen();
        
        // Start performance monitoring
        if (window.PerformanceMonitor) {
            window.performanceMonitor = new PerformanceMonitor();
            window.performanceMonitor.start();
        }
        
        // Initialize particle system
        if (window.ParticleSystem) {
            window.particleSystem = new ParticleSystem();
            window.particleSystem.init();
        }
        
        console.log('Split-Vision Vanilla Demo initialized successfully!');
        
        // Emergency fallback - ensure everything is visible after 2 seconds
        setTimeout(() => {
            this.emergencyDisplayFix();
            this.debugCubeState();
            this.testNavigationSetup();
        }, 2000);
    }

    initCubeController() {
        // Initialize the simple 3D cube controller
        if (window.SimpleCubeController) {
            this.cubeController = new SimpleCubeController();
            console.log('Simple cube controller initialized');
        } else {
            console.error('SimpleCubeController class not found');
            return;
        }
        
        // Make it globally accessible for debugging
        window.cubeController = this.cubeController;
    }

    async showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.getElementById('loading-progress');
        
        // Simulate loading process
        const loadingSteps = [
            { progress: 20, text: 'Loading assets...' },
            { progress: 40, text: 'Initializing 3D cube...' },
            { progress: 60, text: 'Setting up particle system...' },
            { progress: 80, text: 'Optimizing performance...' },
            { progress: 100, text: 'Ready to launch!' }
        ];
        
        for (const step of loadingSteps) {
            progressBar.style.width = `${step.progress}%`;
            const textElement = document.querySelector('.loading-text');
            if (textElement) {
                textElement.textContent = step.text;
            }
            await this.delay(300 + Math.random() * 200);
        }
        
        await this.delay(500);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const appContainer = document.getElementById('app-container');
        
        console.log('Hiding loading screen...');
        
        loadingScreen.classList.add('hidden');
        
        // Ensure app container is visible
        if (appContainer) {
            appContainer.style.display = 'flex';
            appContainer.style.visibility = 'visible';
            appContainer.style.opacity = '1';
            console.log('App container made visible');
        }
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            this.isLoading = false;
            console.log('Loading complete - app should be visible');
        }, 600);
    }

    initEventListeners() {
        // Navigation button clicks
        const navButtons = document.querySelectorAll('.nav-btn');
        console.log(`Found ${navButtons.length} navigation buttons`);
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const face = e.currentTarget.dataset.face;
                console.log(`Navigation button clicked: ${face}`);
                this.navigateToFace(face);
            });
        });

        // Action button clicks
        const actionButtons = document.querySelectorAll('.nav-action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const icon = btn.querySelector('.action-icon');
                if (icon.textContent === '⚙️') {
                    console.log('Settings button clicked');
                    // Add settings functionality here
                } else if (icon.textContent === '🔍') {
                    console.log('Search button clicked');
                    // Add search functionality here
                }
            });
        });

        // Contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));

        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));

        // Visibility change for performance optimization
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    initNavigation() {
        // Update active nav button
        this.updateActiveNav();
        
        // Set initial cube position
        const cube = document.getElementById('cube');
        cube.className = `cube show-${this.currentFace}`;
        
        // Initialize mobile menu
        this.initMobileMenu();
    }

    initGestures() {
        const cubeContainer = document.getElementById('cube-container');
        
        // Touch events for mobile
        cubeContainer.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        cubeContainer.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
        
        // Mouse events for desktop
        cubeContainer.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
        
        // Prevent context menu on long press
        cubeContainer.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    initIntersectionObserver() {
        // Animate elements when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements that should animate on scroll
        document.querySelectorAll('.reveal-fade-up, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    }

    navigateToFace(face) {
        console.log(`navigateToFace called with: ${face}`);
        console.log(`Current face: ${this.currentFace}`);
        console.log(`Is transitioning: ${this.isTransitioning}`);
        console.log(`Cube controller available: ${!!this.cubeController}`);
        
        if (this.isTransitioning || face === this.currentFace) {
            console.log('Navigation blocked - transitioning or same face');
            return;
        }
        
        // Use cube controller if available
        if (this.cubeController) {
            console.log('Using cube controller for navigation');
            this.cubeController.rotateTo(face).then(() => {
                console.log(`Navigation to ${face} completed`);
                this.currentFace = face;
                this.updateActiveNav();
                // Update URL hash
                window.location.hash = face === 'front' ? '' : face;
                // Analytics tracking
                this.trackPageView(face);
            });
        } else {
            // Fallback to basic navigation
            this.isTransitioning = true;
            const cube = document.getElementById('cube');
            
            // Update cube rotation
            cube.className = `cube show-${face}`;
            
            // Update current face
            this.currentFace = face;
            
            // Update navigation
            this.updateActiveNav();
            
            // Reset transition state
            setTimeout(() => {
                this.isTransitioning = false;
            }, 1200);

            // Update URL hash
            window.location.hash = face === 'front' ? '' : face;
            
            // Analytics tracking
            this.trackPageView(face);
        }
    }

    getTransitionType(from, to) {
        const horizontal = ['front', 'right', 'back', 'left'];
        const vertical = ['top', 'bottom'];
        
        if (horizontal.includes(from) && horizontal.includes(to)) {
            return 'horizontal';
        } else if (vertical.includes(from) || vertical.includes(to)) {
            return 'vertical';
        }
        return 'horizontal';
    }

    updateActiveNav() {
        document.querySelectorAll('.nav-btn, .mobile-menu-item').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.face === this.currentFace) {
                btn.classList.add('active');
            }
        });
    }

    initMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileOverlay = document.getElementById('mobile-menu-overlay');
        const mobileCloseBtn = document.getElementById('mobile-close-btn');
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

        // Toggle mobile menu
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        // Close mobile menu
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', () => {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close mobile menu when clicking outside
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', (e) => {
                if (e.target === mobileOverlay) {
                    mobileOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Handle mobile menu item clicks
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                const face = item.dataset.face;
                this.navigateToFace(face);
                
                // Close mobile menu after navigation
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchEnd(e) {
        if (!this.touchStartX || !this.touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - this.touchStartX;
        const deltaY = touchEndY - this.touchStartY;
        
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        
        if (Math.max(absDeltaX, absDeltaY) < this.swipeThreshold) return;
        
        if (absDeltaX > absDeltaY) {
            // Horizontal swipe
            if (deltaX > 0) {
                this.swipeRight();
            } else {
                this.swipeLeft();
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                this.swipeDown();
            } else {
                this.swipeUp();
            }
        }
        
        this.touchStartX = 0;
        this.touchStartY = 0;
    }

    handleWheel(e) {
        e.preventDefault();
        
        if (this.isTransitioning) return;
        
        const delta = e.deltaY;
        
        if (delta > 0) {
            this.swipeDown();
        } else {
            this.swipeUp();
        }
    }

    swipeLeft() {
        const sequence = ['front', 'right', 'back', 'left'];
        const currentIndex = sequence.indexOf(this.currentFace);
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % sequence.length;
            this.navigateToFace(sequence[nextIndex]);
        }
    }

    swipeRight() {
        const sequence = ['front', 'right', 'back', 'left'];
        const currentIndex = sequence.indexOf(this.currentFace);
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex - 1 + sequence.length) % sequence.length;
            this.navigateToFace(sequence[nextIndex]);
        }
    }

    swipeUp() {
        if (this.currentFace === 'front') {
            this.navigateToFace('top');
        } else if (this.currentFace === 'bottom') {
            this.navigateToFace('front');
        }
    }

    swipeDown() {
        if (this.currentFace === 'front') {
            this.navigateToFace('bottom');
        } else if (this.currentFace === 'top') {
            this.navigateToFace('front');
        }
    }

    handleKeyboard(e) {
        if (this.isTransitioning) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.swipeRight();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.swipeLeft();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.swipeUp();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.swipeDown();
                break;
            case '1':
                this.navigateToFace('front');
                break;
            case '2':
                this.navigateToFace('right');
                break;
            case '3':
                this.navigateToFace('back');
                break;
            case '4':
                this.navigateToFace('left');
                break;
            case '5':
                this.navigateToFace('top');
                break;
            case '6':
                this.navigateToFace('bottom');
                break;
        }
    }

    handleContactForm(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Senden...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Gesendet! ✓';
            submitBtn.style.background = 'linear-gradient(45deg, #39ff14, #00d4ff)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                e.target.reset();
            }, 2000);
        }, 1500);
    }

    handleResize() {
        // Update particle system on resize
        if (window.particleSystem) {
            window.particleSystem.handleResize();
        }
        
        // Update performance monitoring
        if (window.performanceMonitor) {
            window.performanceMonitor.checkPerformance();
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            if (window.particleSystem) {
                window.particleSystem.pause();
            }
        } else {
            // Resume animations
            if (window.particleSystem) {
                window.particleSystem.resume();
            }
        }
    }

    trackPageView(page) {
        // Simulate analytics tracking
        console.log(`Page view: ${page}`);
        
        // In a real app, you would send this to your analytics service
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_TRACKING_ID', {
                page_title: `Split-Vision - ${page}`,
                page_location: window.location.href
            });
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Emergency display fix - ensures cube is always visible
    emergencyDisplayFix() {
        console.log('Running emergency display fix...');
        
        // Force hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            loadingScreen.style.visibility = 'hidden';
            loadingScreen.style.opacity = '0';
        }
        
        // Force show app container
        const appContainer = document.getElementById('app-container');
        if (appContainer) {
            appContainer.style.display = 'flex';
            appContainer.style.visibility = 'visible';
            appContainer.style.opacity = '1';
            appContainer.style.zIndex = '1';
        }
        
        // Force show cube container
        const cubeContainer = document.getElementById('cube-container');
        if (cubeContainer) {
            cubeContainer.style.display = 'flex';
            cubeContainer.style.visibility = 'visible';
            cubeContainer.style.opacity = '1';
        }
        
        // Force show cube
        const cube = document.getElementById('cube');
        if (cube) {
            cube.style.display = 'block';
            cube.style.visibility = 'visible';
            cube.style.opacity = '1';
            cube.classList.add('show-front');
        }
        
        // Force show nav
        const nav = document.getElementById('nav-bar');
        if (nav) {
            nav.style.display = 'block';
            nav.style.visibility = 'visible';
            nav.style.opacity = '1';
        }
        
        console.log('Emergency display fix completed');
        
        // Also fix cube face visibility
        this.fixCubeFaceVisibility();
    }

    fixCubeFaceVisibility() {
        console.log('Fixing cube face visibility...');
        
        // Hide all faces first
        const allFaces = document.querySelectorAll('.cube-face');
        allFaces.forEach(face => {
            face.style.opacity = '0';
            face.style.visibility = 'hidden';
        });
        
        // Show only the front face
        const frontFace = document.querySelector('.cube-face.front');
        if (frontFace) {
            frontFace.style.opacity = '1';
            frontFace.style.visibility = 'visible';
            frontFace.classList.add('active');
            console.log('Front face made visible');
        }
        
        // Ensure cube shows front
        const cube = document.getElementById('cube');
        if (cube) {
            cube.className = 'cube show-front';
            console.log('Cube set to show front');
        }
    }

    // Debug function to test cube visibility
    debugCube() {
        console.log('=== CUBE DEBUG INFO ===');
        
        const cube = document.getElementById('cube');
        const cubeContainer = document.getElementById('cube-container');
        const faces = document.querySelectorAll('.cube-face');
        
        console.log('Cube element:', cube);
        console.log('Cube container:', cubeContainer);
        console.log('Number of faces found:', faces.length);
        
        faces.forEach((face, index) => {
            const page = face.getAttribute('data-page');
            const computedStyle = window.getComputedStyle(face);
            console.log(`Face ${index} (${page}):`, {
                display: computedStyle.display,
                visibility: computedStyle.visibility,
                opacity: computedStyle.opacity,
                transform: computedStyle.transform,
                zIndex: computedStyle.zIndex
            });
        });
        
        // Force show front face
        const frontFace = document.querySelector('.cube-face.front');
        if (frontFace) {
            frontFace.style.opacity = '1';
            frontFace.style.visibility = 'visible';
            frontFace.style.display = 'flex';
            frontFace.classList.add('active');
            console.log('Front face forced visible');
        }
        
        // Make sure cube is showing front
        if (cube) {
            cube.className = 'cube show-front';
            cube.style.transform = 'translateZ(-50vh) rotateY(0deg) rotateX(0deg)';
            console.log('Cube forced to show front');
        }
    }

    debugCubeState() {
        console.log('=== CUBE STATE DEBUG ===');
        const cube = document.getElementById('cube');
        const container = document.getElementById('cube-container');
        const faces = document.querySelectorAll('.cube-face');
        
        console.log('Cube element:', cube);
        console.log('Cube classes:', cube ? cube.className : 'not found');
        console.log('Cube transform:', cube ? cube.style.transform : 'not found');
        console.log('Container:', container);
        console.log('Number of faces:', faces.length);
        
        faces.forEach((face, i) => {
            const page = face.getAttribute('data-page');
            const computed = window.getComputedStyle(face);
            console.log(`Face ${i} (${page}):`, {
                classes: face.className,
                display: computed.display,
                opacity: computed.opacity,
                visibility: computed.visibility,
                transform: computed.transform
            });
        });
    }

    testNavigationSetup() {
        console.log('=== TESTING NAVIGATION SETUP ===');
        
        // Check if navigation buttons exist
        const navButtons = document.querySelectorAll('.nav-btn');
        console.log(`Navigation buttons found: ${navButtons.length}`);
        
        // Check if cube controller exists
        console.log(`Cube controller: ${!!this.cubeController}`);
        console.log(`Cube controller type: ${this.cubeController?.constructor?.name}`);
        
        // Test navigation manually
        if (this.cubeController && navButtons.length > 0) {
            console.log('Testing navigation to right face...');
            this.navigateToFace('right');
        } else {
            console.log('Navigation setup incomplete - missing components');
        }
    }
}

// Global navigation function for HTML onclick
function navigateToFace(face) {
    if (window.app) {
        window.app.navigateToFace(face);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SplitVisionApp();
});

// Handle URL hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    const validFaces = ['front', 'right', 'back', 'left', 'top', 'bottom'];
    const face = validFaces.includes(hash) ? hash : 'front';
    
    if (window.app && face !== window.app.currentFace) {
        window.app.navigateToFace(face);
    }
});

// Handle initial URL hash
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1);
    const validFaces = ['front', 'right', 'back', 'left', 'top', 'bottom'];
    const face = validFaces.includes(hash) ? hash : 'front';
    
    if (window.app && face !== 'front') {
        setTimeout(() => {
            window.app.navigateToFace(face);
        }, 100);
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SplitVisionApp;
}
