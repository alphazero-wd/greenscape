export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number;
  _count: {
    products: number;
    subCategories: number;
  };
}
