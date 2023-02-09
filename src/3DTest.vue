<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Loading 3D models
(function () {
  const loader = new GLTFLoader();
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);
  const scene = new THREE.Scene();
  loader.load('/assets/3D/shiba/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
    renderer.render( scene, camera );
  }, undefined, function (error) {
    console.error(error);
  });
})();
</script>

<style scoped>

</style>
