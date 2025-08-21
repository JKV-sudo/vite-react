// Performance monitoring and optimization
class PerformanceMonitor {
    constructor() {
        this.fps = 60;
        this.frameTime = 16;
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.isMonitoring = false;
        this.performanceData = [];
        
        // Performance thresholds
        this.goodFPS = 55;
        this.okFPS = 30;
        this.badFrameTime = 25;
        
        // DOM elements
        this.fpsElement = null;
        this.frameTimeElement = null;
        this.monitorElement = null;
        
        this.init();
    }

    init() {
        this.fpsElement = document.getElementById('fps-value');
        this.frameTimeElement = document.getElementById('frame-time');
        this.monitorElement = document.getElementById('performance-monitor');
        
        // Check if we should show performance monitor
        this.shouldShowMonitor = this.checkShowMonitor();
        
        if (!this.shouldShowMonitor && this.monitorElement) {
            this.monitorElement.style.display = 'none';
        }
        
        // Device capability detection
        this.deviceCapabilities = this.detectDeviceCapabilities();
        this.applyPerformanceOptimizations();
        
        console.log('Performance Monitor initialized', this.deviceCapabilities);
    }

    start() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.monitorFrame();
        
        // Periodic performance checks
        setInterval(() => {
            this.checkPerformance();
        }, 5000);
    }

    stop() {
        this.isMonitoring = false;
    }

    monitorFrame() {
        if (!this.isMonitoring) return;
        
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        
        this.frameTime = deltaTime;
        this.frameCount++;
        
        // Calculate FPS every second
        if (this.frameCount >= 60) {
            this.fps = Math.round(1000 / (deltaTime / this.frameCount));
            this.frameCount = 0;
            this.updateDisplay();
            this.logPerformanceData();
        }
        
        this.lastTime = currentTime;
        requestAnimationFrame(() => this.monitorFrame());
    }

    updateDisplay() {
        if (!this.shouldShowMonitor) return;
        
        if (this.fpsElement) {
            this.fpsElement.textContent = this.fps;
            
            // Color coding for FPS
            if (this.fps >= this.goodFPS) {
                this.fpsElement.style.color = '#39ff14';
            } else if (this.fps >= this.okFPS) {
                this.fpsElement.style.color = '#ffff00';
            } else {
                this.fpsElement.style.color = '#ff0040';
            }
        }
        
        if (this.frameTimeElement) {
            this.frameTimeElement.textContent = Math.round(this.frameTime);
            
            // Color coding for frame time
            if (this.frameTime <= 16) {
                this.frameTimeElement.style.color = '#39ff14';
            } else if (this.frameTime <= this.badFrameTime) {
                this.frameTimeElement.style.color = '#ffff00';
            } else {
                this.frameTimeElement.style.color = '#ff0040';
            }
        }
    }

    logPerformanceData() {
        const data = {
            timestamp: Date.now(),
            fps: this.fps,
            frameTime: this.frameTime,
            memoryUsage: this.getMemoryUsage(),
            batteryLevel: this.getBatteryLevel()
        };
        
        this.performanceData.push(data);
        
        // Keep only last 100 data points
        if (this.performanceData.length > 100) {
            this.performanceData.shift();
        }
        
        // Check for performance issues
        if (this.fps < this.okFPS || this.frameTime > this.badFrameTime) {
            this.handlePerformanceIssue();
        }
    }

    detectDeviceCapabilities() {
        const capabilities = {
            cores: navigator.hardwareConcurrency || 2,
            memory: navigator.deviceMemory || 2,
            connection: this.getConnectionSpeed(),
            gpu: this.detectGPU(),
            mobile: this.isMobile(),
            batteryAPI: 'getBattery' in navigator,
            webGL: this.hasWebGL(),
            performanceAPI: 'performance' in window,
            intersectionObserver: 'IntersectionObserver' in window
        };
        
        // Determine performance tier
        if (capabilities.cores >= 6 && capabilities.memory >= 4) {
            capabilities.tier = 'high';
        } else if (capabilities.cores >= 4 && capabilities.memory >= 2) {
            capabilities.tier = 'medium';
        } else {
            capabilities.tier = 'low';
        }
        
        return capabilities;
    }

    applyPerformanceOptimizations() {
        const { tier, mobile, webGL } = this.deviceCapabilities;
        
        // Adjust animation quality based on device capabilities
        document.documentElement.style.setProperty('--animation-quality', 
            tier === 'high' ? '1' : tier === 'medium' ? '0.7' : '0.5'
        );
        
        // Disable heavy effects on low-end devices
        if (tier === 'low' || mobile) {
            this.disableHeavyEffects();
        }
        
        // Disable WebGL particles if not supported
        if (!webGL) {
            this.disableWebGLEffects();
        }
        
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.enableReducedMotion();
        }
    }

    disableHeavyEffects() {
        document.body.classList.add('low-performance');
        
        // Reduce particle count
        document.documentElement.style.setProperty('--particle-count', '10');
        
        // Disable expensive filters
        const expensiveElements = document.querySelectorAll('.scanlines, .matrix-rain');
        expensiveElements.forEach(el => {
            el.style.display = 'none';
        });
        
        console.log('Heavy effects disabled for better performance');
    }

    disableWebGLEffects() {
        document.body.classList.add('no-webgl');
        console.log('WebGL effects disabled');
    }

    enableReducedMotion() {
        document.body.classList.add('reduced-motion');
        console.log('Reduced motion enabled');
    }

    handlePerformanceIssue() {
        console.warn('Performance issue detected', {
            fps: this.fps,
            frameTime: this.frameTime
        });
        
        // Automatically reduce quality if performance is poor
        this.autoOptimize();
    }

    autoOptimize() {
        // Reduce particle count
        if (window.particleSystem) {
            window.particleSystem.reduceParticles();
        }
        
        // Disable some animations
        const animatedElements = document.querySelectorAll('.floating-shapes .shape');
        animatedElements.forEach((el, index) => {
            if (index > 1) {
                el.style.display = 'none';
            }
        });
        
        console.log('Auto-optimization applied');
    }

    checkPerformance() {
        const avgFPS = this.getAverageFPS();
        const avgFrameTime = this.getAverageFrameTime();
        
        if (avgFPS < this.okFPS) {
            this.handlePerformanceIssue();
        }
        
        // Memory pressure check
        const memoryUsage = this.getMemoryUsage();
        if (memoryUsage && memoryUsage.percent > 80) {
            console.warn('High memory usage detected:', memoryUsage);
            this.cleanupMemory();
        }
    }

    getAverageFPS() {
        if (this.performanceData.length < 10) return 60;
        
        const recent = this.performanceData.slice(-10);
        const sum = recent.reduce((acc, data) => acc + data.fps, 0);
        return sum / recent.length;
    }

    getAverageFrameTime() {
        if (this.performanceData.length < 10) return 16;
        
        const recent = this.performanceData.slice(-10);
        const sum = recent.reduce((acc, data) => acc + data.frameTime, 0);
        return sum / recent.length;
    }

    getMemoryUsage() {
        if ('memory' in performance) {
            const memory = performance.memory;
            return {
                used: Math.round(memory.usedJSHeapSize / 1048576), // MB
                total: Math.round(memory.totalJSHeapSize / 1048576), // MB
                limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
                percent: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
            };
        }
        return null;
    }

    async getBatteryLevel() {
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                return {
                    level: Math.round(battery.level * 100),
                    charging: battery.charging,
                    dischargingTime: battery.dischargingTime,
                    chargingTime: battery.chargingTime
                };
            } catch (error) {
                return null;
            }
        }
        return null;
    }

    getConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }
        return null;
    }

    detectGPU() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return null;
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            return {
                vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
            };
        }
        
        return { vendor: 'Unknown', renderer: 'Unknown' };
    }

    hasWebGL() {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    checkShowMonitor() {
        // Show monitor in development or if performance query param is present
        return window.location.hostname === 'localhost' || 
               window.location.search.includes('performance=true') ||
               window.location.search.includes('debug=true');
    }

    cleanupMemory() {
        // Force garbage collection if available
        if ('gc' in window) {
            window.gc();
        }
        
        // Clean up old performance data
        this.performanceData = this.performanceData.slice(-50);
        
        console.log('Memory cleanup performed');
    }

    getPerformanceReport() {
        return {
            deviceCapabilities: this.deviceCapabilities,
            averageFPS: this.getAverageFPS(),
            averageFrameTime: this.getAverageFrameTime(),
            memoryUsage: this.getMemoryUsage(),
            performanceData: this.performanceData.slice(-10)
        };
    }
}

// Utility functions for performance optimization
const PerformanceUtils = {
    // Debounce function for event handlers
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for high-frequency events
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Request idle callback with fallback
    requestIdleCallback(callback, options = {}) {
        if ('requestIdleCallback' in window) {
            return window.requestIdleCallback(callback, options);
        } else {
            return setTimeout(callback, 1);
        }
    },

    // Cancel idle callback with fallback
    cancelIdleCallback(id) {
        if ('cancelIdleCallback' in window) {
            window.cancelIdleCallback(id);
        } else {
            clearTimeout(id);
        }
    },

    // Preload critical resources
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for global use
if (typeof window !== 'undefined') {
    window.PerformanceMonitor = PerformanceMonitor;
    window.PerformanceUtils = PerformanceUtils;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PerformanceMonitor, PerformanceUtils };
}
