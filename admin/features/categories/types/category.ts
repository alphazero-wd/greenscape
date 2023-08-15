export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number;
  parentCategory?: Category;
  _count: {
    products: number;
    subCategories: number;
  };
}
