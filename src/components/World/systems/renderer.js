import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({
    // 抗锯齿，会损失性能
    // 抗锯齿是使用内置的WebGL方法执行的
    antialias: true,
  });

  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };

// 锯齿 aliasing
// 抗锯齿(AA) anti-aliasing
// 多重采样抗锯齿 (MSAA) Multisample anti-aliasing, GPU
// 其他抗锯齿技术（如SMAA和FXAA）, CPU

// frame budget - 帧预算