export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number;
  parentCategory?: Category
  subCategories: Category[];
  _count: {
    products: number;
    subCategories: number;
  };
}
