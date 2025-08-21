// Simple, Working 3D Cube Controller
class SimpleCubeController {
    constructor() {
        this.cube = null;
        this.currentFace = 'front';
        this.isTransitioning = false;
        
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
        
        console.log('Simple cube controller initialized');
        this.setupInitialState();
    }

    setupInitialState() {
        this.cube.style.transformStyle = 'preserve-3d';
        this.cube.classList.add('show-front');
        this.cube.style.transform = 'translateZ(-50vh) rotateY(0deg) rotateX(0deg)';
        
        console.log('Cube set to front face');
    }

    async rotateTo(face) {
        if (this.isTransitioning || face === this.currentFace) {
            return Promise.resolve();
        }
        
        this.isTransitioning = true;
        console.log(`Rotating to ${face}`);
        
        const targetRotation = this.faces[face];
        if (!targetRotation) {
            console.error('Invalid face:', face);
            this.isTransitioning = false;
            return Promise.resolve();
        }
        
        return new Promise((resolve) => {
            // Remove all show classes
            this.cube.classList.remove('show-front', 'show-back', 'show-left', 'show-right', 'show-top', 'show-bottom');
            
            // Add new show class
            this.cube.classList.add(`show-${face}`);
            
            // Update current face
            this.currentFace = face;
            
            // Wait for transition to complete
            setTimeout(() => {
                this.isTransitioning = false;
                console.log(`Transition to ${face} complete`);
                resolve();
            }, 1000);
        });
    }

    getCurrentFace() {
        return this.currentFace;
    }

    isTransitionInProgress() {
        return this.isTransitioning;
    }

    // Test function
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
}

// Export for global use
if (typeof window !== 'undefined') {
    window.SimpleCubeController = SimpleCubeController;
}
