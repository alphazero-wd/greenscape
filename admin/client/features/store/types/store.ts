import { Billboard } from "@/features/billboards/types";
import { Category } from "@/features/categories/types";
import { Color } from "@/features/colors/types";
import { Size } from "@/features/sizes/types";

export interface Store {
  id: number;
  name: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  billboards: Billboard[];
}
