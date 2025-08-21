// Particle system for background effects
class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.particleCount = 50;
        this.mousePos = { x: 0, y: 0 };
        this.isRunning = false;
        this.isPaused = false;
        this.animationId = null;
        
        // Performance settings
        this.maxParticles = 100;
        this.minParticles = 20;
        this.connectionDistance = 120;
        this.mouseInteractionDistance = 150;
        
        // Visual settings
        this.particleColor = '#00d4ff';
        this.connectionColor = 'rgba(0, 212, 255, 0.2)';
        this.glowColor = 'rgba(0, 212, 255, 0.1)';
    }

    init() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) {
            console.warn('Particle canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.warn('Canvas context not available');
            return;
        }
        
        this.setupCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.start();
        
        console.log('Particle system initialized with', this.particleCount, 'particles');
    }

    setupCanvas() {
        this.resizeCanvas();
        
        // Set canvas styles for better performance
        this.canvas.style.imageRendering = 'pixelated';
        this.canvas.style.imageRendering = 'crisp-edges';
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Update particle boundaries
        this.width = rect.width;
        this.height = rect.height;
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
            originalOpacity: Math.random() * 0.5 + 0.5,
            pulsePhase: Math.random() * Math.PI * 2,
            connections: 0,
            life: 1.0
        };
    }

    setupEventListeners() {
        // Mouse/touch tracking
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mousePos.x = touch.clientX - rect.left;
            this.mousePos.y = touch.clientY - rect.top;
        }, { passive: false });

        // Mouse leave
        this.canvas.addEventListener('mouseleave', () => {
            this.mousePos.x = -1000;
            this.mousePos.y = -1000;
        });

        // Window resize
        window.addEventListener('resize', PerformanceUtils.debounce(() => {
            this.handleResize();
        }, 250));

        // Click effects
        this.canvas.addEventListener('click', (e) => {
            this.createClickEffect(e);
        });
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        this.animate();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    animate() {
        if (!this.isRunning) return;
        
        if (!this.isPaused) {
            this.update();
            this.render();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    update() {
        // Update particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
        });
        
        // Remove dead particles and add new ones
        this.particles = this.particles.filter(particle => particle.life > 0);
        
        while (this.particles.length < this.particleCount) {
            this.particles.push(this.createParticle());
        }
    }

    updateParticle(particle) {
        // Apply mouse interaction
        const dx = this.mousePos.x - particle.x;
        const dy = this.mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouseInteractionDistance) {
            const force = (this.mouseInteractionDistance - distance) / this.mouseInteractionDistance;
            const repelForce = force * 0.02;
            
            particle.vx -= (dx / distance) * repelForce;
            particle.vy -= (dy / distance) * repelForce;
            
            // Increase opacity near mouse
            particle.opacity = Math.min(1, particle.originalOpacity + force * 0.5);
        } else {
            particle.opacity = particle.originalOpacity;
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Apply gentle damping
        particle.vx *= 0.999;
        particle.vy *= 0.999;
        
        // Add small random movement
        particle.vx += (Math.random() - 0.5) * 0.001;
        particle.vy += (Math.random() - 0.5) * 0.001;
        
        // Boundary checking with wrapping
        if (particle.x < 0) particle.x = this.width;
        if (particle.x > this.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.height;
        if (particle.y > this.height) particle.y = 0;
        
        // Update pulse phase
        particle.pulsePhase += 0.02;
        
        // Slowly decay life for particle recycling
        particle.life -= 0.0001;
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Set composite operation for glow effects
        this.ctx.globalCompositeOperation = 'lighter';
        
        // Draw connections first
        this.drawConnections();
        
        // Draw particles
        this.drawParticles();
        
        // Reset composite operation
        this.ctx.globalCompositeOperation = 'source-over';
    }

    drawConnections() {
        this.ctx.strokeStyle = this.connectionColor;
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            const particleA = this.particles[i];
            particleA.connections = 0;
            
            for (let j = i + 1; j < this.particles.length; j++) {
                const particleB = this.particles[j];
                
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = 1 - (distance / this.connectionDistance);
                    
                    this.ctx.globalAlpha = opacity * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particleA.x, particleA.y);
                    this.ctx.lineTo(particleB.x, particleB.y);
                    this.ctx.stroke();
                    
                    particleA.connections++;
                    particleB.connections++;
                }
                
                // Limit connections per particle for performance
                if (particleA.connections >= 3) break;
            }
        }
        
        this.ctx.globalAlpha = 1;
    }

    drawParticles() {
        this.particles.forEach(particle => {
            const pulse = Math.sin(particle.pulsePhase) * 0.5 + 0.5;
            const size = particle.size + pulse * 0.5;
            const opacity = particle.opacity * (0.7 + pulse * 0.3);
            
            // Main particle
            this.ctx.globalAlpha = opacity;
            this.ctx.fillStyle = this.particleColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Glow effect
            this.ctx.globalAlpha = opacity * 0.3;
            this.ctx.fillStyle = this.glowColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    }

    createClickEffect(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Create burst of particles
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = Math.random() * 3 + 2;
            
            this.particles.push({
                x: clickX,
                y: clickY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                size: Math.random() * 3 + 2,
                opacity: 1,
                originalOpacity: 1,
                pulsePhase: 0,
                connections: 0,
                life: 0.5 // Shorter life for effect particles
            });
        }
        
        // Ripple effect
        this.createRipple(clickX, clickY);
    }

    createRipple(x, y) {
        const ripple = {
            x: x,
            y: y,
            radius: 0,
            maxRadius: 100,
            opacity: 1,
            growing: true
        };
        
        const animateRipple = () => {
            if (ripple.growing) {
                ripple.radius += 3;
                ripple.opacity -= 0.02;
                
                if (ripple.radius >= ripple.maxRadius || ripple.opacity <= 0) {
                    return;
                }
                
                // Draw ripple
                this.ctx.globalAlpha = ripple.opacity;
                this.ctx.strokeStyle = this.particleColor;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.globalAlpha = 1;
                
                requestAnimationFrame(animateRipple);
            }
        };
        
        animateRipple();
    }

    handleResize() {
        this.resizeCanvas();
        
        // Adjust particle positions to new canvas size
        this.particles.forEach(particle => {
            if (particle.x > this.width) particle.x = this.width;
            if (particle.y > this.height) particle.y = this.height;
        });
    }

    reduceParticles() {
        const newCount = Math.max(this.minParticles, Math.floor(this.particleCount * 0.7));
        this.particleCount = newCount;
        
        // Remove excess particles
        if (this.particles.length > newCount) {
            this.particles = this.particles.slice(0, newCount);
        }
        
        console.log('Reduced particles to', newCount, 'for better performance');
    }

    increaseParticles() {
        const newCount = Math.min(this.maxParticles, Math.floor(this.particleCount * 1.3));
        this.particleCount = newCount;
        console.log('Increased particles to', newCount);
    }

    setQuality(quality) {
        // quality: 'low', 'medium', 'high'
        switch (quality) {
            case 'low':
                this.particleCount = this.minParticles;
                this.connectionDistance = 80;
                break;
            case 'medium':
                this.particleCount = Math.floor((this.minParticles + this.maxParticles) / 2);
                this.connectionDistance = 100;
                break;
            case 'high':
                this.particleCount = this.maxParticles;
                this.connectionDistance = 120;
                break;
        }
        
        this.createParticles();
        console.log(`Particle quality set to ${quality}:`, this.particleCount, 'particles');
    }

    getStats() {
        return {
            particleCount: this.particles.length,
            targetCount: this.particleCount,
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            canvasSize: { width: this.width, height: this.height }
        };
    }
}

// Export for global use
if (typeof window !== 'undefined') {
    window.ParticleSystem = ParticleSystem;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParticleSystem;
}
