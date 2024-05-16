export interface Category {
  id: number;
  name: string;
  slug: string;
  parentCategory: Category | null;
  subCategories: Category[];
}
