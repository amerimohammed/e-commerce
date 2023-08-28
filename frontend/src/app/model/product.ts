export interface Product {
  productId: number;
  title: string;
  code: string;
  price: number;
  currentQuantity: number;
  soldQuantity: number;
  description: string;
  productImages: ProductImage[];
}

export interface ProductImage {
  imageId: number;
  imageUrl: string;
}
