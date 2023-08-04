import { Category } from "@/features/categories/types";
import { Size } from "@/features/sizes/types";

export interface Store {
  id: number;
  name: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
  sizes: Size[];
}
