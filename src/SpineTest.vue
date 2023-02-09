<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as spine from "@esotericsoftware/spine-threejs";

// spine test
(function () {
  let scene, camera, renderer;
  let geometry, material, mesh, skeletonMesh;
  let assetManager;
  let canvas;
  let controls;
  let lastFrameTime = Date.now() / 1000;

  let baseUrl = "/assets/spine/";
  let skeletonFile = "naxitan_shouye.json";
  let atlasFile = "naxitan_shouye.atlas";
  let animation = "animation";

  function init() {
    // create the THREE.JS camera, scene and renderer (WebGL)
    let width = window.innerWidth, height = window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
    camera.position.y = 100;
    camera.position.z = 400;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById('app').appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);
    canvas = renderer.domElement;
    controls = new OrbitControls(camera, renderer.domElement);
    console.log(scene);

    // load the assets required to display the Raptor model
    assetManager = new spine.AssetManager(baseUrl);    
    assetManager.loadText(skeletonFile);
    assetManager.loadTextureAtlas(atlasFile);
    console.log(assetManager);
    requestAnimationFrame(load);
  }

  function load(name, scale) {
    if (assetManager.isLoadingComplete()) {
      console.log('isLoadingComplete');
      // Add a box to the scene to which we attach the skeleton mesh
      geometry = new THREE.BoxGeometry(200, 200, 200);
      material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      console.log(assetManager);
      // Load the texture atlas using name.atlas and name.png from the AssetManager.
      // The function passed to TextureAtlas is used to resolve relative paths.
      let atlas = assetManager.require(atlasFile);
      console.log('atlas');
      console.log(atlas);
      // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
      let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
      console.log('atlasLoader');
      console.log(atlasLoader);

      // Create a SkeletonJson instance for parsing the .json file.
      let skeletonJson = new spine.SkeletonJson(atlasLoader);
      console.log('skeletonJson');
      console.log(skeletonJson);
      // Set the scale to apply during parsing, parse the file, and create a new skeleton.
      skeletonJson.scale = 0.4;
      let skeleton = JSON.parse(assetManager.require(skeletonFile));
      console.log('skeleton ----------');
      console.log(skeleton);
      let skeletonData = skeletonJson.readSkeletonData(skeleton);
      skeletonData.extra = skeleton.extra || {};
      skeletonData.extraConfig = skeleton.extraConfig || {};
      console.log('skeletonData');
      console.log(skeletonData);
      // new SkeletonJson(atlasLoader).readSkeletonData(json);

      // Create a SkeletonMesh from the data and attach it to the scene
      skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
        console.log(parameters);
        parameters.depthTest = true;
        parameters.depthWrite = true;
        parameters.alphaTest = 0.001;
      });
      skeletonMesh.state.setAnimation(0, animation, true);
      console.log('skeletonMesh');
      console.log(skeletonMesh);
      mesh.add(skeletonMesh);


      requestAnimationFrame(render);
    } else requestAnimationFrame(load);
  }

  let lastTime = Date.now();
  function render() {
    // calculate delta time for animation purposes
    let now = Date.now() / 1000;
    let delta = now - lastFrameTime;
    lastFrameTime = now;

    // resize canvas to use full page, adjust camera/renderer
    resize();

    // Update orbital controls
    controls.update();

    // update the animation
    skeletonMesh.update(delta);

    // render the scene
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (canvas.width != w || canvas.height != h) {
      canvas.width = w;
      canvas.height = h;
    }

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
  }

  init();
}());

</script>

<style scoped>

</style>
