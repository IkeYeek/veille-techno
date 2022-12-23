import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const currentSectionIndex = ref(0);
  const isTransitioning = ref(true);
  function goToNextSection(origin: number) {
    currentSectionIndex.value = origin + 1;
  }

  function goToLastSection(origin: number) {
    currentSectionIndex.value = origin - 1;
  }

  return { currentSectionIndex, isTransitioning, goToNextSection, goToLastSection }
})
