import { Color, Scene } from 'three';

function createScene() {
  const scene = new Scene();

  // scene.background = new Color('skyblue');
  scene.background = new Color("#2ed573");
  return scene;
}

export { createScene };