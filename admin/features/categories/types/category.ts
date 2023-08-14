export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number;
  subCategories: Category[];
  _count: {
    products: number;
    subCategories: number;
  };
}
