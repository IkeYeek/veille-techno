import type { Component } from "vue";

interface ISlide {
  backgroundColor: string;
  slides: Array<Component>;
  title: string;
}

class Slide implements ISlide {
  backgroundColor: string;
  slides: Array<Component>;
  title: string;

  constructor(backgroundColor: string, slides: Array<Component>, title: string) {
    this.backgroundColor = backgroundColor;
    this.slides = slides;
    this.title = title;
  }


}



export type {
  ISlide
}

export {
  Slide
}