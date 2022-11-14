import { SphereGeometry, MeshBasicMaterial, Mesh, MeshStandardMaterial } from 'three';

function createSphere() {
  const geometry = new SphereGeometry( 1, 32, 16 );
  // const material = new MeshBasicMaterial( { color: '#3498db' } );
  const material = new MeshStandardMaterial( { color: '#3498db' } );
  const sphere = new Mesh( geometry, material );
  sphere.position.set(2, 0, 0);
  return sphere;
}

export { createSphere };