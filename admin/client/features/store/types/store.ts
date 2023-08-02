import { Category } from "@/features/categories/types";

export interface Store {
  id: number;
  name: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
}
