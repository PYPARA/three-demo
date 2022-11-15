import { SphereGeometry, MeshBasicMaterial, Mesh, MeshStandardMaterial, TextureLoader } from 'three';
import { gsap } from "gsap";

function createMaterial() {

  // create a texture loader.
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load(
    '/assets/textures/uv-test-col.png',
  );

  // create a "standard" material
  const material = new MeshStandardMaterial({ 
    map: texture,
    // color: 'gray',
  });
  
  return material;
}

function createSphere() {
  const geometry = new SphereGeometry( 1, 32, 16 );
  // const material = new MeshBasicMaterial( { color: '#3498db' } );
  // const material = new MeshStandardMaterial( { color: '#3498db' } );
  const material = createMaterial();
  const sphere = new Mesh( geometry, material );
  sphere.position.set(2, 0, 0);

  // use gsap
  gsap.to(sphere.position, {
    x: 3,
    duration: 1,
    yoyo: true,
    repeat: -1,
  });
  return sphere;
}

export { createSphere };