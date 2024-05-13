import { Category } from "../types";

export const generatePaths = (parents: Category | null): Category[] => {
  if (parents === null) return [];
  return [...generatePaths(parents.parentCategory), parents];
};
