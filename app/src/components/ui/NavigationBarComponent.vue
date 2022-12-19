<template>
  <ul>
    <li class="js" v-bind:class="{active: ui.currentSectionIndex === 0}" @click="navigate(0)">Javascript</li>
    <li class="asmjs" v-bind:class="{active: ui.currentSectionIndex === 1}" @click="navigate(1)">ASM.js</li>
    <li class="wasm" v-bind:class="{active: ui.currentSectionIndex === 2}" @click="navigate(2)">WASM</li>
    <li class="conclusion" v-bind:class="{active: ui.currentSectionIndex === 3}" @click="navigate(3)">Conclusion</li>
  </ul>

</template>

<script setup lang="ts">
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
const navigate = (to: number) : void => {
  ui.currentSectionIndex = to;
}
</script>

<style scoped>
ul {
  display: flex;
  list-style-type: none;
  text-align: center;
  padding: 0;
  height: 100%;
}
li {
  width: 25vw;
  height: 100%;
  background-color: var(--vt-c-black-mute);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

li:hover {
  cursor: pointer;
}

li:hover, .active {
  color: var(--vt-c-black-mute);
}

.js:hover, .js.active {
  background-color: var(--js-color);
}

.asmjs:hover, .asmjs.active {
  background-color: var(--third-color);
}

.wasm:hover, .wasm.active {
  background-color: var(--wasm-color);
}

.conclusion:hover, .conclusion.active {
  background-color: var(--fifth-color);
}


</style>