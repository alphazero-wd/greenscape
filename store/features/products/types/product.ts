export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  status: "Active" | "Draft";
  inStock: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  images: { id: string; url: string }[];
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

export interface Category {
  id: number;
  name: string;
}
