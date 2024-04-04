export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  status: "Active" | "Draft";
  inStock: number;
  category: ProductCategory;
  images: { id: string; url: string }[];
}
export interface ProductsResponse {
  data: Product[];
  count: number;
}

interface ProductCategory {
  id: number;
  name: string;
}

export interface CategoryGroup {
  _count: { id: number };
  categoryId: number;
}
