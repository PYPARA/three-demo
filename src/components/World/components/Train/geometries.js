import { BoxBufferGeometry, CylinderBufferGeometry } from 'three';

function createGeometries() {
  const cabin = new BoxBufferGeometry(2, 2.25, 1.5);

  const nose = new CylinderBufferGeometry(0.75, 0.75, 3, 12);

  // we can reuse a single cylinder geometry for all 4 wheels
  const wheel = new CylinderBufferGeometry(0.4, 0.4, 1.75, 16);
}

export { createGeometries };