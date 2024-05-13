import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { ReactNode } from "react";
import { Category } from "../types";
import { CategorySubmenu } from "./submenu";

type CategoryRadioOption = `${number}|${string}`;

interface CategoriesRadioMenuProps {
  categories: Category[];
  trigger: ReactNode;
  selectedCategory: CategoryRadioOption;
  onChange: (selectedCategory: string) => void;
  field: "id" | "slug";
}

export const CategoriesRadioMenu = ({
  categories,
  trigger,
  selectedCategory,
  onChange,
  field,
}: CategoriesRadioMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={selectedCategory}
          onValueChange={onChange}
        >
          {categories.map((c) => (
            <CategorySubmenu
              category={c}
              key={c.id}
              render={(category) => (
                <DropdownMenuRadioItem
                  value={`${category[field]}|${category.name}`}
                >
                  {category.name}
                </DropdownMenuRadioItem>
              )}
            />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
