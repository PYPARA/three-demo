import { SphereBufferGeometry, TextureLoader, MathUtils, MeshStandardMaterial, Mesh, Group } from "three";
import { gsap } from "gsap";

function createMeshGroup() {
  // a group holds other objects
  // but cannot be seen itself
  const group = new Group();

  const geometry = new SphereBufferGeometry(0.25, 16, 16);

  const material = new MeshStandardMaterial({
    color: 'indigo',
  });

  const protoSphere = new Mesh(geometry, material);

  // add the protoSphere to the group
  group.add(protoSphere);

  // create twenty clones of the protoSphere
  // and add each to the group
  for (let i = 0; i < 1; i += 0.001) {
    const sphere = protoSphere.clone();

    // position the spheres on around a circle
    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);
    sphere.position.z = -i * 5;

    sphere.scale.multiplyScalar(0.01 + i);

    group.add(sphere);
  }

  // every sphere inside the group will be scaled
  group.scale.multiplyScalar(2);

  const radiansPerSecond = MathUtils.degToRad(30);

  // each frame, rotate the entire group of spheres
  group.tick = (delta) => {
    // group.rotation.z += delta * radiansPerSecond;
  };
  // group.rotation.z = MathUtils.degToRad(90);
  // // 利用 gsap 做出同样效果
  const tween = gsap.to(group.rotation, {
    z: group.rotation.z + (2 * Math.PI),
    ease: 'none',
    duration: 12,
    repeat: -1,
  });
  console.log(tween);
  // const array = [];
  // for(let i = 0; i <= 12; i += 1) {
  //   array.push(tween.seek(i)._targets[0].z);
  // }
  // console.log(array);
  return group;
}

export { createMeshGroup };