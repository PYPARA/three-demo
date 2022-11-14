<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as spine from "@esotericsoftware/spine-threejs"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Creating a scene
// (function() {
// 	const scene = new THREE.Scene();
// 	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 	const renderer = new THREE.WebGLRenderer();
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	console.log(renderer);
// 	// document.getElementById('app').appendChild(renderer.domElement);
// 	document.body.appendChild(renderer.domElement);
// 	const geometry = new THREE.BoxGeometry(1, 1, 1);
// 	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 	const cube = new THREE.Mesh(geometry, material);
// 	scene.add(cube);

// 	camera.position.z = 5;

// 	function animate() {
// 		requestAnimationFrame(animate);

// 		cube.rotation.x += 0.01;
// 		cube.rotation.y += 0.01;

// 		renderer.render(scene, camera);
// 	}
// 	animate();
// })()

// spine test
// (function () {
// 	let scene, camera, renderer;
// 	let geometry, material, mesh, skeletonMesh;
// 	let assetManager;
// 	let canvas;
// 	let controls;
// 	let lastFrameTime = Date.now() / 1000;

// 	let baseUrl = "/assets/spine/";
// 	let skeletonFile = "naxitan_shouye.json";
// 	let atlasFile = "naxitan_shouye.atlas";
// 	let animation = "animation";

// 	function init() {
// 		// create the THREE.JS camera, scene and renderer (WebGL)
// 		let width = window.innerWidth, height = window.innerHeight;
// 		camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
// 		camera.position.y = 100;
// 		camera.position.z = 400;
// 		scene = new THREE.Scene();
// 		renderer = new THREE.WebGLRenderer();
// 		renderer.setSize(width, height);
// 		document.getElementById('app').appendChild(renderer.domElement);
//    document.body.appendChild(renderer.domElement);
// 		canvas = renderer.domElement;
// 		controls = new OrbitControls(camera, renderer.domElement);

// 		// load the assets required to display the Raptor model
// 		assetManager = new spine.AssetManager(baseUrl);
// 		assetManager.loadText(skeletonFile);
// 		assetManager.loadTextureAtlas(atlasFile);
// 		console.log(assetManager);
// 		requestAnimationFrame(load);
// 	}

// 	function load(name, scale) {
// 		if (assetManager.isLoadingComplete()) {
// 			console.log('isLoadingComplete');
// 			// Add a box to the scene to which we attach the skeleton mesh
// 			geometry = new THREE.BoxGeometry(200, 200, 200);
// 			material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
// 			mesh = new THREE.Mesh(geometry, material);
// 			scene.add(mesh);

// 			// Load the texture atlas using name.atlas and name.png from the AssetManager.
// 			// The function passed to TextureAtlas is used to resolve relative paths.
// 			let atlas = assetManager.require(atlasFile);
// 			console.log('atlas');
// 			console.log(atlas);
// 			// Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
// 			let atlasLoader = new spine.AtlasAttachmentLoader(atlas);
// 			console.log('atlasLoader');
// 			console.log(atlasLoader);

// 			// Create a SkeletonJson instance for parsing the .json file.
// 			let skeletonJson = new spine.SkeletonJson(atlasLoader);
// 			console.log('skeletonJson');
// 			console.log(skeletonJson);
// 			// Set the scale to apply during parsing, parse the file, and create a new skeleton.
// 			skeletonJson.scale = 0.4;
// 			let skeletonData = skeletonJson.readSkeletonData(assetManager.require(skeletonFile));
// 			console.log('skeletonData');
// 			console.log(skeletonData);

// 			// Create a SkeletonMesh from the data and attach it to the scene
// 			skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
// 				parameters.depthTest = true;
// 				parameters.depthWrite = true;
// 				parameters.alphaTest = 0.001;
// 			});
// 			skeletonMesh.state.setAnimation(0, animation, true);
// 			console.log('skeletonMesh');
// 			console.log(skeletonMesh);
// 			mesh.add(skeletonMesh);


// 			requestAnimationFrame(render);
// 		} else requestAnimationFrame(load);
// 	}

// 	let lastTime = Date.now();
// 	function render() {
// 		// calculate delta time for animation purposes
// 		let now = Date.now() / 1000;
// 		let delta = now - lastFrameTime;
// 		lastFrameTime = now;

// 		// resize canvas to use full page, adjust camera/renderer
// 		resize();

// 		// Update orbital controls
// 		controls.update();

// 		// update the animation
// 		skeletonMesh.update(delta);

// 		// render the scene
// 		renderer.render(scene, camera);

// 		requestAnimationFrame(render);
// 	}

// 	function resize() {
// 		let w = window.innerWidth;
// 		let h = window.innerHeight;
// 		if (canvas.width != w || canvas.height != h) {
// 			canvas.width = w;
// 			canvas.height = h;
// 		}

// 		camera.aspect = w / h;
// 		camera.updateProjectionMatrix();

// 		renderer.setSize(w, h);
// 	}

// 	init();
// }());

// Drawing lines
// (function () {
// 	const renderer = new THREE.WebGLRenderer();
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	document.body.appendChild(renderer.domElement);

// 	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// 	camera.position.set(0, 0, 100);
// 	camera.lookAt(0, 0, 0);

// 	const scene = new THREE.Scene();
// 	//create a blue LineBasicMaterial
// 	const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
// 	const points = [];
// 	points.push( new THREE.Vector3( - 10, 0, 0 ) );
// 	points.push( new THREE.Vector3( 0, 10, 0 ) );
// 	points.push( new THREE.Vector3( 10, 0, 0 ) );

// 	const geometry = new THREE.BufferGeometry().setFromPoints( points );

// 	const line = new THREE.Line( geometry, material );
// 	scene.add( line );
// 	renderer.render( scene, camera );
// })()

// Loading 3D models
// (function () {
// 	const loader = new GLTFLoader();
// 	const renderer = new THREE.WebGLRenderer();
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	renderer.setPixelRatio(window.devicePixelRatio);
// 	document.body.appendChild(renderer.domElement);

// 	const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
// 	camera.position.set(0, 0, 5);
// 	camera.lookAt(0, 0, 0);
// 	const scene = new THREE.Scene();
// 	loader.load('/assets/3D/shiba/scene.gltf', function (gltf) {
// 		scene.add(gltf.scene);
// 		renderer.render( scene, camera );
// 	}, undefined, function (error) {
// 		console.error(error);
// 	});
// })()
</script>

<style scoped>

</style>
