<template>
  <div ref="slider" class="slider">
    <div v-for="(slide, idx) in props.slides" :key="idx" class="slide" :ref="el => { htmlElements[idx] = el }">
       <component :is="slide" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { defineComponent, onMounted, ref, watch } from "vue";
import { useUiStore } from "@/stores/ui";

import type { Component} from "vue";

const props = defineProps({
  backgroundColor: {
    required: true,
    type: String,
  },
  idx: {
    required: true,
    type: Number,
  },
  slides: {
    required: true,
    type: Array,
    elementType: defineComponent({}),
  }
});

const htmlElements = ref<Array<HTMLDivElement>>([]);
const ui = useUiStore();

const slider = ref<HTMLDivElement | null>(null);

watch(() => ui.currentSlide[props.idx], (value, oldValue) => {
  if (value >= props.slides.length) {
   ui.currentSlide[props.idx] = props.slides.length - 1;
    return;
  } else if (value === props.slides.length - 1 && oldValue > value) {
    ui.nextPage();
    return;
  }


  htmlElements.value[value].scrollIntoView({
    behavior: "smooth",
    block: 'nearest',
    inline: 'center'
  });
});

onMounted(() => {
  slider.value!.style.backgroundColor = props.backgroundColor;
});
</script>

<style scoped>
.slider {
  height: 91vh;
  overflow: auto;

  display: flex;
  align-items: center;
}
.slide {
  color: var(--vt-c-black-mute);
  min-width: 100vw;
  padding: 2rem;
  text-align: justify;
}
</style>