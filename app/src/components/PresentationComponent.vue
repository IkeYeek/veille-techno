<template>
  <div id="mainContent" ref="mainContent">
    <div class="spacer"></div>
    <component v-bind:is="props.content" />
    <div class="spacer"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { useUiStore } from "@/stores/ui";

const props = defineProps(['content', 'index', 'bgc']);

const ui = useUiStore();
const mainContent: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  console.log(props.content)
  let lastScrollTop = 0;  // used to save the vertical delta of the main content element of the last scroll down
  let last0Hit = NaN;  // used to save the last ms timestamp the scroll hit the top of the main content
  let lastEndHit = NaN;  // used to save the last ms timestamp the scroll hit the bottom of the main content
  const element: HTMLElement | null = mainContent.value
  if (element === null)
    throw new Error("Missing main content");

  element.style.backgroundColor = `var(${props.bgc})`

  element.onwheel = (e) => {  // Binding the onwheel event to handle reaching top and bottom of the main content element
    // to trigger the page change.
    if (e.deltaY < 0 && element.scrollTop == 0) {
      // Hitting the top of the main content element. If it is the first time, we save the moment.
      // if it has been at least 250ms since the first time, we trigger the page up. Same algorithm applies for the page down
      lastEndHit = NaN;
      const currTime = Date.now();
      if (isNaN(last0Hit)) {
        last0Hit = Date.now();
      } else {
        if (currTime > last0Hit + 250) {
          if (props.index > 0)
            ui.goToLastSection(props.index)
        }
      }
    }
    else if(e.deltaY > 0) {
      if (element.scrollTop >= lastScrollTop){
        // Page down code
        last0Hit = NaN;
        lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
        if (element.scrollTop + element.offsetHeight + 1 /*don't ask me why this works but it does*/>= element.scrollHeight ){
          if (isNaN(lastEndHit))
            lastEndHit = Date.now();
          else if (Date.now() > lastEndHit + 250)
            ui.goToNextSection(props.index);
        }
      }
    }
  }
});
</script>

<style scoped>
.spacer {
  height: 8vh;
}
#mainContent {
  color: var(--vt-c-black-soft);
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  padding: 2rem;
}
</style>