export interface Slide {
  imageId: number;
  imageUrl: string;
  productId: number;
}

export type SlideType = {
  slide: Slide;
};

export type SlidesType = {
  slides: Slide[];
};

export type SlideDeleteType = {
  deleted: boolean;
};
