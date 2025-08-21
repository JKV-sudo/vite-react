// 3D Cube navigation controller with GSAP animations
class CubeController {
    constructor() {
        this.cube = null;
        this.currentFace = 'front';
        this.isTransitioning = false;
        this.rotationX = 0;
        this.rotationY = 0;
        this.transitionDuration = 1.2; // Seconds for GSAP
        
        // Face mapping
        this.faces = {
            'front': { rotateX: 0, rotateY: 0 },
            'right': { rotateX: 0, rotateY: -90 },
            'back': { rotateX: 0, rotateY: -180 },
            'left': { rotateX: 0, rotateY: 90 },
            'top': { rotateX: -90, rotateY: 0 },
            'bottom': { rotateX: 90, rotateY: 0 }
        };
        
        this.init();
    }

    init() {
        this.cube = document.getElementById('cube');
        if (!this.cube) {
            console.error('Cube element not found');
            return;
        }
        
        this.setupInitialState();
        this.preloadFaceContent();
        console.log('Cube controller with GSAP transitions initialized');
    }

    setupInitialState() {
        this.cube.style.transformStyle = 'preserve-3d';
        
        // Set initial front face
        this.cube.classList.add('show-front');
        
        // Set initial transform
        this.cube.style.transform = 'translateZ(-50vh) rotateX(0deg) rotateY(0deg)';
        
        this.updateCubeTransform();
        this.activateFace('front');
        
        console.log('Initial cube state set to front face');
    }

    preloadFaceContent() {
        // Ensure all face content is ready
        const faces = this.cube.querySelectorAll('.cube-face');
        faces.forEach(face => {
            const page = face.dataset.page;
            this.prepFaceContent(face, page);
        });
    }

    prepFaceContent(faceElement, page) {
        // Add lazy loading for heavy content
        const images = faceElement.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
        
        // Initialize page-specific features
        switch(page) {
            case 'contact':
                this.initContactForm(faceElement);
                break;
            case 'portfolio':
                this.initPortfolioInteractions(faceElement);
                break;
            case 'services':
                this.initServiceCards(faceElement);
                break;
        }
    }

    initContactForm(faceElement) {
        const form = faceElement.querySelector('#contact-form');
        if (!form) return;
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    initPortfolioInteractions(faceElement) {
        const portfolioItems = faceElement.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            // Stagger animation delays
            item.style.animationDelay = `${index * 0.1}s`;
            
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                this.animatePortfolioItem(item, 'enter');
            });
            
            item.addEventListener('mouseleave', () => {
                this.animatePortfolioItem(item, 'leave');
            });
        });
    }

    initServiceCards(faceElement) {
        const serviceCards = faceElement.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            // Stagger animation
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Add interactive effects
            card.addEventListener('mouseenter', () => {
                this.animateServiceCard(card, 'hover');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateServiceCard(card, 'normal');
            });
        });
    }

    async rotateTo(face) {
        if (this.isTransitioning || face === this.currentFace) {
            return Promise.resolve();
        }
        
        this.isTransitioning = true;
        
        const targetRotation = this.faces[face];
        if (!targetRotation) {
            console.error('Invalid face:', face);
            this.isTransitioning = false;
            return Promise.resolve();
        }
        
        console.log(`Rotating to ${face}`);
        
        // Use simple CSS transition with optional GSAP effects
        await this.performRotation(face, targetRotation);
        
        // Update state
        this.rotationX = targetRotation.rotateX;
        this.rotationY = targetRotation.rotateY;
        this.currentFace = face;
        
        // Update cube classes and activate face
        this.updateCubeTransform();
        this.activateFace(face);
        
        this.isTransitioning = false;
    }

    async performRotation(face, targetRotation) {
        return new Promise((resolve) => {
            // Simple, reliable CSS transition
            const transform = `translateZ(-50vh) rotateX(${targetRotation.rotateX}deg) rotateY(${targetRotation.rotateY}deg)`;
            
            // Set transition
            this.cube.style.transition = `transform ${this.transitionDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            
            // Apply transform
            this.cube.style.transform = transform;
            
            // Add simple effects if GSAP is available
            if (typeof gsap !== 'undefined') {
                this.addSimpleEffects();
            }
            
            // Wait for transition to complete
            setTimeout(() => {
                this.cube.style.transition = '';
                resolve();
            }, this.transitionDuration * 1000);
        });
    }

    addSimpleEffects() {
        // Simple screen flash
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                rgba(0, 212, 255, 0.1), 
                rgba(57, 255, 20, 0.1));
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
        `;
        
        document.body.appendChild(flash);
        
        // Animate with GSAP
        gsap.to(flash, {
            opacity: 1,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => flash.remove()
        });
    }





    // Test function to manually rotate cube
    testRotation() {
        console.log('Testing cube rotation...');
        const faces = ['front', 'right', 'back', 'left', 'top', 'bottom'];
        let index = 0;
        
        const rotate = () => {
            const face = faces[index % faces.length];
            console.log(`Testing rotation to: ${face}`);
            this.rotateTo(face);
            index++;
            
            if (index < faces.length) {
                setTimeout(rotate, 2000);
            }
        };
        
        rotate();
    }

    createTransitionEffect() {
        // Add haptic feedback for mobile devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        
        // Play transition sound effect
        this.playTransitionSound();
        
        // Create particle burst at cube center
        const cubeContainer = document.getElementById('cube-container');
        const burst = document.createElement('div');
        burst.className = 'cube-particle-burst';
        burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Create multiple particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            const angle = (i / 12) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${this.getRandomCyberColor()};
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: cubeParticleBurst 0.8s ease-out forwards;
                animation-delay: ${i * 0.02}s;
            `;
            
            // Set particle direction
            setTimeout(() => {
                particle.style.transform = `translate(-50%, -50%) 
                    translateX(${Math.cos(angle) * distance}px) 
                    translateY(${Math.sin(angle) * distance}px)`;
            }, 10);
            
            burst.appendChild(particle);
        }
        
        cubeContainer.appendChild(burst);
        
        // Clean up particles
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 1000);
    }

    createScreenFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            animation: screenFlash 0.3s ease-out;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
        }, 300);
    }

    getRandomCyberColor() {
        const colors = [
            '#00d4ff', // Blue
            '#39ff14', // Green
            '#ff0040', // Pink
            '#9d4edd', // Purple
            '#ffff00', // Yellow
            '#ff6600'  // Orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    playTransitionSound() {
        // Create a synthetic cyberpunk sound effect using Web Audio API
        if (!('AudioContext' in window)) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create oscillators for a futuristic sound
            const oscillator1 = audioContext.createOscillator();
            const oscillator2 = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            // Configure sound
            oscillator1.type = 'square';
            oscillator1.frequency.setValueAtTime(220, audioContext.currentTime);
            oscillator1.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
            
            oscillator2.type = 'sawtooth';
            oscillator2.frequency.setValueAtTime(110, audioContext.currentTime);
            oscillator2.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.15);
            
            // Volume envelope
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            // Connect and play
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator1.start(audioContext.currentTime);
            oscillator2.start(audioContext.currentTime);
            
            oscillator1.stop(audioContext.currentTime + 0.2);
            oscillator2.stop(audioContext.currentTime + 0.2);
            
        } catch (error) {
            // Silently fail if audio context isn't available
            console.debug('Audio not available:', error);
        }
    }

    calculateRotationDelta(current, target) {
        // Calculate shortest rotation path
        let delta = target - current;
        
        // Normalize to -180 to 180 range
        while (delta > 180) delta -= 360;
        while (delta < -180) delta += 360;
        
        return delta;
    }

    updateCubeTransform() {
        // Remove all show classes
        this.cube.classList.remove('show-front', 'show-back', 'show-left', 'show-right', 'show-top', 'show-bottom');
        
        // Add the appropriate show class for enhanced effects
        this.cube.classList.add(`show-${this.currentFace}`);
    }

    activateFace(face) {
        // Remove active class from all faces
        const faces = this.cube.querySelectorAll('.cube-face');
        faces.forEach(faceEl => {
            faceEl.classList.remove('active');
        });
        
        // Add active class to current face
        const activeFace = this.cube.querySelector(`.cube-face.${face}`);
        if (activeFace) {
            activeFace.classList.add('active');
            
            // Force visibility for the active face
            activeFace.style.opacity = '1';
            activeFace.style.visibility = 'visible';
            
            console.log(`Activated face: ${face}`);
            
            // Trigger enter animations for the active face
            this.triggerFaceAnimations(activeFace);
        }
    }

    triggerFaceAnimations(faceElement) {
        // Add reveal animations to elements
        const animatedElements = faceElement.querySelectorAll('.reveal-fade-up, .reveal-scale, .stagger-item');
        
        animatedElements.forEach((element, index) => {
            element.classList.remove('revealed');
            
            setTimeout(() => {
                element.classList.add('revealed');
            }, index * 100);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type || field.tagName.toLowerCase();
        let isValid = true;
        let errorMessage = '';
        
        // Basic validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Dieses Feld ist erforderlich';
        } else if (fieldType === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Ungültige E-Mail-Adresse';
        }
        
        // Update field appearance
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
        }
        
        // Show/hide error message
        this.showFieldError(field, errorMessage);
        
        return isValid;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        this.showFieldError(field, '');
    }

    showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.field-error');
        
        if (message) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    animatePortfolioItem(item, type) {
        const placeholder = item.querySelector('.portfolio-placeholder');
        const info = item.querySelector('.portfolio-info');
        
        if (type === 'enter') {
            item.style.transform = 'translateY(-10px) scale(1.02)';
            if (placeholder) {
                placeholder.style.transform = 'scale(1.1) rotate(5deg)';
            }
            if (info) {
                info.style.transform = 'translateY(-5px)';
            }
        } else {
            item.style.transform = '';
            if (placeholder) {
                placeholder.style.transform = '';
            }
            if (info) {
                info.style.transform = '';
            }
        }
    }

    animateServiceCard(card, type) {
        const icon = card.querySelector('.service-icon');
        const features = card.querySelector('.service-features');
        
        if (type === 'hover') {
            card.style.transform = 'translateY(-15px) rotateX(5deg)';
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
            if (features) {
                features.style.opacity = '1';
                features.style.transform = 'translateY(0)';
            }
        } else {
            card.style.transform = '';
            if (icon) {
                icon.style.transform = '';
            }
            if (features) {
                features.style.opacity = '';
                features.style.transform = '';
            }
        }
    }

    // Animation sequences for different transitions
    getTransitionAnimation(fromFace, toFace) {
        const horizontal = ['front', 'right', 'back', 'left'];
        const vertical = ['top', 'bottom'];
        
        if (horizontal.includes(fromFace) && horizontal.includes(toFace)) {
            return this.getHorizontalAnimation(fromFace, toFace);
        } else if (vertical.includes(fromFace) || vertical.includes(toFace)) {
            return this.getVerticalAnimation(fromFace, toFace);
        }
        
        return 'default';
    }

    getHorizontalAnimation(fromFace, toFace) {
        const sequence = ['front', 'right', 'back', 'left'];
        const fromIndex = sequence.indexOf(fromFace);
        const toIndex = sequence.indexOf(toFace);
        
        if (fromIndex === -1 || toIndex === -1) return 'default';
        
        const delta = toIndex - fromIndex;
        
        if (delta === 1 || delta === -3) {
            return 'slide-left';
        } else if (delta === -1 || delta === 3) {
            return 'slide-right';
        } else if (Math.abs(delta) === 2) {
            return 'flip-horizontal';
        }
        
        return 'default';
    }

    getVerticalAnimation(fromFace, toFace) {
        if ((fromFace === 'front' && toFace === 'top') || 
            (fromFace === 'bottom' && toFace === 'front')) {
            return 'slide-up';
        } else if ((fromFace === 'front' && toFace === 'bottom') || 
                   (fromFace === 'top' && toFace === 'front')) {
            return 'slide-down';
        }
        
        return 'flip-vertical';
    }

    // Performance optimization methods
    optimizeForDevice(deviceCapabilities) {
        if (deviceCapabilities.tier === 'low') {
            this.transitionDuration = 600;
            this.cube.style.willChange = 'auto';
        } else if (deviceCapabilities.tier === 'medium') {
            this.transitionDuration = 800;
            this.cube.style.willChange = 'transform';
        } else {
            this.transitionDuration = 1000;
            this.cube.style.willChange = 'transform';
        }
    }

    // Public API methods
    getCurrentFace() {
        return this.currentFace;
    }

    getAllFaces() {
        return Object.keys(this.faces);
    }

    isTransitionInProgress() {
        return this.isTransitioning;
    }

    // Demo function to showcase transitions
    async demoTransitions() {
        const faces = ['front', 'right', 'back', 'left', 'top', 'bottom'];
        let currentIndex = faces.indexOf(this.currentFace);
        
        console.log('🎬 Starting GSAP transition demo!');
        
        const cycle = async () => {
            if (this.isTransitioning) return;
            
            currentIndex = (currentIndex + 1) % faces.length;
            const nextFace = faces[currentIndex];
            
            console.log(`✨ Transitioning to ${nextFace} with GSAP effects`);
            await this.rotateTo(nextFace);
            
            // Continue demo every 3 seconds
            setTimeout(cycle, 3000);
        };
        
        cycle();
    }

    // Debug methods
    getDebugInfo() {
        return {
            currentFace: this.currentFace,
            rotationX: this.rotationX,
            rotationY: this.rotationY,
            isTransitioning: this.isTransitioning,
            transitionDuration: this.transitionDuration,
            gsapAvailable: typeof gsap !== 'undefined'
        };
    }
}

// Export for global use
if (typeof window !== 'undefined') {
    window.CubeController = CubeController;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CubeController;
}
