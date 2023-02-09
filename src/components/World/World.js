import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createSphere } from './components/sphere';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';

import { createMeshGroup } from './components/meshGroup';
import { Train } from './components/Train/Train.js';


import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import {
  createAxesHelper,
  createGridHelper,
} from './components/helpers.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;

class World {
  // 1. Create an instance of the World app
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);

    const controls = createControls(camera, renderer.domElement);

    renderer.domElement.setAttribute('id', 'webgl-canvas');
    container.append(renderer.domElement);

    const cube = createCube();
    const sphere = createSphere();

    const { ambientLight, mainLight } = createLights();

    // loop.updatables.push(cube);
    loop.updatables.push(controls);

    camera.setCameraLight(mainLight);
    
    scene.add(cube, sphere, camera, ambientLight);

    const meshGroup = createMeshGroup();
    scene.add(meshGroup);
    loop.updatables.push(meshGroup);

    const resizer = new Resizer(container, camera, renderer);

    // 现在循环正在运行，每当我们调整窗口大小时，都会在循环的下一次迭代中生成一个新帧。这足够快，您不会注意到任何延迟，因此我们不再需要在调整大小时手动重绘场景。
    // resizer.onResize = () => {
    //   this.render();
    // };

    // add the helpers to the scene
    scene.add(createAxesHelper(), createGridHelper());

    const train = new Train();

    scene.add(train);
  }

  // 2. Render the scene
  render() {
    renderer.render(scene, camera);
    console.log(this);
    // requestAnimationFrame(this.render);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };