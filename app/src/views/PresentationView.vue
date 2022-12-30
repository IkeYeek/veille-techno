<template>
  <nav>
    <NavigationBarComponent :pages="prez" />
  </nav>
  <main>
    <div v-for="(page, idx) in prez" :ref="el => {sliders[idx] = el}">
      <SliderComponent class="sliderComponent" :slides="page.slides" :background-color="page.backgroundColor" :idx="idx" />
    </div>
  </main>
</template>

<script setup lang="ts">
import NavigationBarComponent from "@/components/ui/NavigationBarComponent.vue"
import SliderComponent from "@/components/slides/SliderComponent.vue";
import { onMounted, ref, watch } from "vue";
import { useUiStore } from "@/stores/ui";

import { SlideJS1, SlideJS2 } from "@/components/slides/js/SlideJS"
import { SlideASMJS1 } from "@/components/slides/asmjs/SlideASMJS"
import type { ISlide } from "@/types";

const ui = useUiStore();

const slider0 = ref<HTMLDivElement | null>(null);
const slider1 = ref<HTMLDivElement | null>(null);
const slider2 = ref<HTMLDivElement | null>(null);
const slider3 = ref<HTMLDivElement | null>(null);

const sliders = ref<Array<HTMLDivElement>>([]);

const firstPrezSlides = [SlideJS1, SlideJS2, SlideASMJS1, SlideJS1, SlideASMJS1]
const secondPrezSlides = [SlideASMJS1]
const thirdPrezSlides = [SlideASMJS1]
const fourthPrezSlides = [SlideASMJS1]

const prez: Array<ISlide> = [
  {
    backgroundColor: "var(--js-color)",
    slides: firstPrezSlides,
    title: "Javascript",
  },
  {
    backgroundColor: "var(--third-color)",
    slides: secondPrezSlides,
    title: "ASM.js"
  },
  {
    backgroundColor: "var(--wasm-color)",
    slides: thirdPrezSlides,
    title: "WASM"
  },
  {
    backgroundColor: "var(--fifth-color)",
    slides: fourthPrezSlides,
    title: "Conclusion"
  }
]

watch(() => ui.currentPage, (value, oldValue) => {
  if (value >= 0 && value < 4 && oldValue !== value) {
    sliders.value[value].scrollIntoView({
      behavior: "smooth"
    })
  }
});

onMounted(() => {
  document.addEventListener("keyup", (keyevt) => {
    keyevt.preventDefault();
    switch (keyevt.key) {
      case "ArrowUp":
        ui.lastPage();
        break;
      case "ArrowDown":
        ui.nextPage();
        break;
      case "ArrowLeft":
        ui.lastSlide();
        break;
      case "ArrowRight":
        ui.nextSlide();
        break;
    }
  }, { passive: false });

  document.addEventListener("wheel", (wheelevt) => {
    wheelevt.preventDefault();
    if (Math.abs(wheelevt.deltaX) > 50) {
      if (wheelevt.deltaX > 0) {
        ui.nextSlide(true);
      } else {
        ui.lastSlide(true);
      }
    }
  }, { passive: false });

})
</script>

<style scoped>
main {
  width: 100vw;
}
nav {
  position: fixed;
  top: 0;
  height: 9vh;
  width: 100vw;
  z-index: 1;

  background-color: green;

  display: flex;
  align-items: center;
  justify-content: center;
}

main {
  margin-top: 9vh;
}
/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.sliderComponent {
  width: 100vw;
  height: 100vh;
}
</style>