import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.153.0/build/three.module.js';

let renderer, scene, camera, material, uniforms;

function init() {
  const canvas = document.getElementById('shaderCanvas');
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  camera = new THREE.Camera();
  camera.position.z = 1;

  uniforms = {
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iTime: { value: 0 },
    iMouse: { value: new THREE.Vector2(0, 0) },
  };

  const texture = new THREE.TextureLoader().load('./book.jpg');
  uniforms.iChannel0 = { value: texture };

  material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      void main() {
          vec2 uv = gl_FragCoord.xy / iResolution.xy;
          vec3 color = vec3(uv.x, uv.y, 0.5 + 0.5 * sin(iTime));
          gl_FragColor = vec4(color, 1.0);
      }
    `,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  uniforms.iTime.value += 0.05;

  renderer.render(scene, camera);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  uniforms.iMouse.value.set(event.clientX, window.innerHeight - event.clientY);
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('mousemove', onMouseMove);

init();