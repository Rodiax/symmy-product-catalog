import { URL } from "./url";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Array<{
    width: number;
    height: number;
    depth: number;
  }>;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: URL;
  };
  images: URL[];
  thumbnail: URL;
};

export type Products = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type NoProduct = {
  message: string;
};
