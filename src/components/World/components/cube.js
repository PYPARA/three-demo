import { BoxBufferGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, MathUtils } from 'three';

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2);

  // create a default (white) Basic material
  // const material = new MeshBasicMaterial({ color: '#d35400' });
  const material = new MeshStandardMaterial({ color: '#d35400' });

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  cube.position.set(-2, 0, 0);
  cube.rotation.set(-0.5, -0.1, 0.8);
  cube.scale.set(1.2, 1.2, 1.2);

  const radiansPerSecond = MathUtils.degToRad(10);
  // this method will be called once per frame
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  const cubeB = new Mesh(geometry, material);
  cubeB.position.set(3, 0, 0);
  cube.add(cubeB); 

  return cube;
}

export { createCube };