<template>
  <ul>
    <li
      v-for="(page, idx) in props.pages"
      :key="idx"
      v-bind:class="{active: ui.currentPage === idx}"
      @click="navigate(idx)"
      :ref="el => { pages[idx] = el }"
      :class="`nav-${idx}`"

      @mouseenter="(evt) => {if (isActive(idx)) return; evt.target.style.backgroundColor = page.backgroundColor}"
      @mouseleave="(evt) => {if (isActive(idx)) return;evt.target.style.backgroundColor = 'var(--vt-c-black-mute)'}"
    >{{page.title}}</li>
    <!--
    <li class="js" v-bind:class="{active: ui.currentPage === 0}" @click="navigate(0)">Javascript</li>
    <li class="asmjs" v-bind:class="{active: ui.currentPage === 1}" @click="navigate(1)">ASM.js</li>
    <li class="wasm" v-bind:class="{active: ui.currentPage === 2}" @click="navigate(2)">WASM</li>
    <li class="conclusion" v-bind:class="{active: ui.currentPage === 3}" @click="navigate(3)">Conclusion</li>
    -->
  </ul>

</template>

<script setup lang="ts">
import { useUiStore } from "@/stores/ui";
import { Slide } from "@/types";
import { computed, onMounted, ref, watch } from "vue";

const ui = useUiStore();

const props = defineProps({
  pages: {
    required: true,
    type: Array,
    elementType: Slide,
  }
});

const pages = ref<Array<HTMLElement>>([]);

const navigate = (to: number) : void => {
  ui.currentPage = to;
  setTimeout(() => ui.currentSlide[to] = 0, 1000)
}

onMounted(() => {
  pages.value[0].style.backgroundColor = props.pages[0].backgroundColor;
});

watch(() => ui.currentPage, (newP, oldP) => {
  pages.value[newP].style.backgroundColor = props.pages[newP].backgroundColor;
  pages.value[oldP].style.backgroundColor = "var(--vt-c-black-mute)";
})

const isActive = (idx: number) => {
  const active = document.getElementsByClassName("active")[0];
  return active === pages.value[idx];
}
</script>

<style scoped>
ul {
  display: flex;
  list-style-type: none;
  text-align: center;
  padding: 0;
  height: 100%;
  width: 100vw;
}
li {
  width: auto;
  height: 100%;
  background-color: var(--vt-c-black-mute);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
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