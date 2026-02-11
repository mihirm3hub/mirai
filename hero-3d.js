/* ═══════════════════════════════════════════════════
   MIRAI — Hero 3D Composition
   Twisted Torus, Cubes, and Spheres
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';

    function initHero3D() {
        const container = document.getElementById('hero-3d-container');
        if (!container || typeof THREE === 'undefined') return;

        // Performance check: Disable on mobile or reduced-motion
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobile || prefersReducedMotion) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // ── Post Processing (AlphaUnrealBloomPass) ──
        const renderTarget = new THREE.WebGLRenderTarget(container.clientWidth, container.clientHeight, {
            format: THREE.RGBAFormat,
            stencilBuffer: false
        });

        const composer = new THREE.EffectComposer(renderer, renderTarget);

        const renderScene = new THREE.RenderPass(scene, camera);
        renderScene.clearColor = new THREE.Color(0x000000);
        renderScene.clearAlpha = 0;

        const bloomPass = new THREE.AlphaUnrealBloomPass(
            new THREE.Vector2(container.clientWidth, container.clientHeight),
            1, // strength
            0.3,   // radius
            0.0  // threshold
        );

        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // ── SMAA Pass (Anti-Aliasing) ──
        const smaaPass = new THREE.SMAAPass(
            container.clientWidth * window.devicePixelRatio,
            container.clientHeight * window.devicePixelRatio
        );
        smaaPass.renderToScreen = true;
        composer.addPass(smaaPass);

        // ── Geometry Composition ──
        const group = new THREE.Group();
        scene.add(group);

        // Custom ShaderMaterial to create horizontal scan-lines
        const material = new THREE.ShaderMaterial({
            uniforms: {
                lineColor: { value: new THREE.Color(0xE6119D) }, // Brand Primary
                lineFreq: { value: 22.0 }, // User preferred density
                baseLineWidth: { value: 0.8 } // User preferred thickness
            },
            vertexShader: `
                varying vec3 vLocalPosition;
                varying vec3 vNormal;
                void main() {
                    vLocalPosition = position;
                    vNormal = normalize(normalMatrix * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 lineColor;
                uniform float lineFreq;
                uniform float baseLineWidth;
                varying vec3 vLocalPosition;
                varying vec3 vNormal;
                void main() {
                    // Fix for flat surfaces: thin the lines based on surface tilt
                    float dotUp = abs(vNormal.y);
                    
                    // Decrease width sharply on horizontal surfaces to avoid solid fills
                    float widthFactor = pow(1.0 - dotUp, 3.0); 
                    float lineWidth = baseLineWidth * widthFactor;

                    // Use Local Y to keep lines fixed to the model during movement
                    float lines = step(1.0 - lineWidth, fract(vLocalPosition.y * lineFreq));
                    
                    if (lines < 0.5) discard;
                    // Boost intensity for bloom
                    gl_FragColor = vec4(lineColor * 3.0, 1.0);
                }
            `,
            transparent: true,
            side: THREE.FrontSide
        });

        // Load GLB Model
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/');

        const loader = new THREE.GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        loader.load('assets/untitled.glb', function (gltf) {
            const model = gltf.scene;

            model.traverse((node) => {
                if (node.isMesh) {
                    node.material = material;
                }
            });

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            model.position.x -= center.x;
            model.position.y -= center.y;
            model.position.z -= center.z;

            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 5 / (maxDim || 1);
            model.scale.set(scale, scale, scale);
            model.updateMatrixWorld(true);

            group.add(model);
        }, undefined, function (error) {
            console.error('Error loading GLB:', error);
        });

        // Mouse parallax variables
        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) - 0.5;
            mouseY = (event.clientY / window.innerHeight) - 0.5;
        });

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        });

        // 30 FPS cap logic
        let lastTime = 0;
        const fpsInterval = 1000 / 30;

        function animate(time) {
            requestAnimationFrame(animate);

            const deltaTime = time - lastTime;
            if (deltaTime < fpsInterval) return;
            lastTime = time - (deltaTime % fpsInterval);

            // Ambient turntable rotation
            group.rotation.y += 0.005;

            // Parallax effect
            group.position.x += (mouseX * 1.2 - group.position.x) * 0.05;
            group.position.y += (-mouseY * 1.2 - group.position.y) * 0.05;

            composer.render();
        }

        // Load after a small delay to ensure hero text renders first
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 500);
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHero3D);
    } else {
        initHero3D();
    }
})();
