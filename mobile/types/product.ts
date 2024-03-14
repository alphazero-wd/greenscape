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

interface ProductCategory {
  id: number;
  name: string;
}

export interface StatusGroup {
  _count: { id: number };
  status: "Active" | "Draft";
}

export interface InStockGroup {
  _count: { id: number };
  inStock: number;
}
export interface CategoryGroup {
  _count: { id: number };
  categoryId: number;
}
