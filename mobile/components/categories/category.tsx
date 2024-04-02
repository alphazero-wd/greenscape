import { Category } from "@/types/category";
import { Font, Gray } from "@/types/theme";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link asChild href={"/search?categoryIds=" + category.id}>
      <TouchableOpacity style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: category.products[0].images[0].url }}
        />
        <View style={styles.cardBody}>
          <Text style={styles.name}>{category.name}</Text>
          <Text style={styles.productsCount}>
            {category._count.products} plants
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Gray.GRAY_200,
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    minWidth: 150,
  },
  image: {
    objectFit: "cover",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    aspectRatio: 1,
    height: "100%",
  },
  cardBody: {
    padding: 8,
    rowGap: 4,
    flex: 2,
  },
  name: {
    fontFamily: Font.Medium,
  },
  productsCount: {
    color: Gray.GRAY_500,
    fontSize: 12,
  },
});
