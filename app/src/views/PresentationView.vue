<template>
  <main>
    <div>
      <nav>
        <NavigationBarComponent />
      </nav>
    </div>
    <div id="articles">
      <section ref="jsSection">
        <PresentationComponent
          :content="JavascriptContentComponent"
          :index="0"
          bgc="--js-color"
        />
      </section>
      <section ref="asmjsSection">
        <PresentationComponent
          :content="ASMJSContentComponent"
          :index="1"
          bgc="--third-color"
        />
      </section>
      <section ref="wasmSection">
        <PresentationComponent
          :content="WASMContentComponent"
          :index="2"
          bgc="--wasm-color"
        />
      </section>
      <section ref="conclusionSection">
        <PresentationComponent
          :content="EndingContentComponent"
          :index="3"
          bgc="--fifth-color"
        />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import JavascriptContentComponent from "@/components/presentation_content/JavascriptContentComponent.vue";
import ASMJSContentComponent from "@/components/presentation_content/ASMJSContentComponent.vue";
import WASMContentComponent from "@/components/presentation_content/WASMContentComponent.vue";
import EndingContentComponent from "@/components/presentation_content/EndingContentComponent.vue";

import NavigationBarComponent from "@/components/ui/NavigationBarComponent.vue";
import { ref, watch } from "vue";
import { useUiStore } from "@/stores/ui";
import PresentationComponent from "@/components/PresentationComponent.vue";

const jsSection = ref(null);
const asmjsSection = ref(null);
const wasmSection = ref(null);
const conclusionSection = ref(null);

const sections = [
  jsSection, asmjsSection, wasmSection, conclusionSection
]

const ui = useUiStore();



watch(() => ui.currentSectionIndex, (v, ov) => {
  if (v < sections.length) {
    sections[v].value.scrollIntoView({
      behavior: "smooth"
    });
  }
})



</script>

<style scoped>
#articles {
  display: flex;
  flex-direction: column;
}
section {
  display: flex;
  align-items: center;
  justify-content: center;
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
/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>