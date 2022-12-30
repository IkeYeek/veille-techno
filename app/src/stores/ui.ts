import { reactive, ref } from "vue";
import { defineStore } from 'pinia'

const NBPAGES = 4;

export const useUiStore = defineStore('ui', () => {
  const currentPage = ref(0);
  const currentSlide = reactive([0, 0, 0, 0]);

  const horizontalMutex = ref(false);
  const verticalMutex = ref(false);

  const lock = () => {
    lockVertically();
  }

  const lockHorizontally = () => {
    horizontalMutex.value = true;
    setTimeout(() => {
      horizontalMutex.value = false;
    }, 500);
  }

  const lockVertically = () => {
    verticalMutex.value = true;
    setTimeout(() => {
      verticalMutex.value = false;
    }, 500);
  }

  const lastSlide = (lock = false) => {
    if (!lock || !horizontalMutex.value) {
      lockHorizontally();
      if (currentSlide[currentPage.value] > 0) {
        currentSlide[currentPage.value] -= 1;
      } else {
        lastPage();
      }
    }
  }
  const nextSlide = (lock = false) => {
    if (!lock || !horizontalMutex.value) {
      lockHorizontally();
      currentSlide[currentPage.value] += 1;
    }
  }
  const lastPage = (lock = false) => {
    if (currentPage.value > 0 && (!lock || verticalMutex.value)) {
      lockVertically();
      currentPage.value -= 1;
    }
  };

  const nextPage = (lock = false) => {
    if (currentPage.value < NBPAGES-1 && (!lock || verticalMutex.value)) {
      lockVertically();
      currentPage.value += 1;
    }
  };

  return { currentPage, currentSlide, lastPage, lastSlide, nextSlide, nextPage }
})
