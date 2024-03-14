export interface Category {
  id: number;
  name: string;
  products: [{ images: [{ id: string; url: string }] }];
  _count: { products: number };
}
