import { Category } from "@/types/category";
import { FlatList, View } from "react-native";
import { CategoryItem } from "./category";

interface CategoriesProps {
  categories: Category[];
}

export const Categories = ({ categories }: CategoriesProps) => {
  return (
    <FlatList
      style={{ paddingBottom: 16 }}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
      data={categories}
      renderItem={({ item }) => <CategoryItem category={item} key={item.id} />}
      ListHeaderComponent={<View style={{ width: 8 }}></View>}
      ListFooterComponent={<View style={{ width: 8 }}></View>}
    />
  );
};
