<template>
  <main>
    <div>
      <nav>
        <NavigationBarComponent />
      </nav>
    </div>
    <div id="articles">
      <section ref="jsSection">
        <JavascriptComponent />
      </section>
      <section ref="asmjsSection">
        <ASMJSComponent />
      </section>
      <section ref="wasmSection">
        <WASMComponent />
      </section>
      <section ref="conclusionSection">
        <EndingComponent />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import JavascriptComponent from "@/components/presentation_content/JavascriptComponent.vue";
import ASMJSComponent from "@/components/presentation_content/ASMJSComponent.vue";
import WASMComponent from "@/components/presentation_content/WASMComponent.vue";
import EndingComponent from "@/components/presentation_content/EndingComponent.vue";
import NavigationBarComponent from "@/components/ui/NavigationBarComponent.vue";
import { ref, watch } from "vue";
import { useUiStore } from "@/stores/ui";

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