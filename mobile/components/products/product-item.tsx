import { Link } from "expo-router";
import { Product } from "@/types/product";
import { View, Image, Text, StyleSheet } from "react-native";
import { formatPrice } from "@/utils/format-price";
import { Font, Gray } from "@/types/theme";

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/products/${product.id}`} className="relative group h-full">
      <View style={styles.card}>
        <Image
          alt={product.name}
          width={640}
          height={640}
          style={styles.image}
          source={{ uri: product.images[0].url }}
        />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{product.name}</Text>
          <Text>{product.desc}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.category}>{product.category.name}</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Gray.GRAY_200,
  },
  image: {
    objectFit: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    aspectRatio: 1,
  },
  cardBody: {
    paddingTop: 16,
    rowGap: 4,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderTopColor: Gray.GRAY_200,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Font.SemiBold,
  },
  cardDescription: {
    color: Gray.GRAY_500,
  },
  cardFooter: {
    justifyContent: "flex-end",
    flex: 1,
  },
  category: {
    color: Gray.GRAY_500,
    fontFamily: Font.RegularItalic,
  },
  price: {
    fontFamily: Font.Medium,
    fontSize: 18,
    color: Gray.GRAY_900,
  },
});
