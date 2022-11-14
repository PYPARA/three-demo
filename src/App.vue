<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { World } from './components/World/World.js';

const btnShow = ref(false);

function handleStart() {
  btnShow.value = false;

  nextTick(() => {
    startWorld();
  });
  
}

function startWorld() {
  // Get a reference to the container element
  const container = document.querySelector('#webgl-container');

  // 1. Create an instance of the World app
  const world = new World(container);

  // 2. Render the scene
  // produce a single frame (render on demand)
  // world.render();

  // start the animation loop (produce a stream of frames)
  world.start();

}

onMounted(() => {
  handleStart();
});


</script>

<template>
  <button class="start-btn" v-if="btnShow" @click="handleStart">Link start</button>
  <div v-if="!btnShow" id="webgl-container"></div>
</template>

<style scoped>
.start-btn {
  margin-top: 20px;
}
#webgl-container{
  /* tell our scene container to take up the full page */
  position: absolute;
  width: 100%;
  height: 100%;

  /*
    Set the container's background color to the same as the scene's
    background to prevent flashing on load
  */
  background-color: skyblue;
}
</style>
