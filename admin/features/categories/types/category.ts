export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number;
  parentCategory?: Category;
  _count: {
    subCategories: number;
  };
  subCategories: Category[];
}
