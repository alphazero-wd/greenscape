import { Category } from "@/features/categories/types";

export const displayHierarchy = (category: Category, title = "") => {
  if (category.parentCategory?.parentCategory)
    title += category.parentCategory.parentCategory.name + " / ";
  if (category.parentCategory) title += category.parentCategory.name + " / ";
  title += category.name;
  return title;
};
