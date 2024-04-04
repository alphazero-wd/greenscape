import { Product } from "@/types/product";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { formatPrice } from "@/utils/format-price";
import { Font, Gray } from "@/types/theme";
import { Link } from "expo-router";

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link
      href={{
        pathname: "/product/[id]",
        params: { id: product.id.toString() },
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image
          alt={product.name}
          style={styles.image}
          source={{ uri: product.images[0].url }}
        />
        <View style={styles.cardBody}>
          <Text numberOfLines={1} style={styles.cardTitle}>
            {product.name}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.category}>{product.category.name}</Text>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>
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
    width: Dimensions.get("window").width / 2,
    elevation: 4,
    flex: 1,
  },
  image: {
    objectFit: "cover",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    aspectRatio: 1,
    width: "100%",
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    rowGap: 4,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderTopColor: Gray.GRAY_200,
  },
  cardTitle: {
    fontFamily: Font.Medium,
  },
  cardFooter: {
    flex: 1,
  },
  category: {
    color: Gray.GRAY_500,
    fontFamily: Font.Regular,
  },
  price: {
    fontFamily: Font.SemiBold,
    fontSize: 18,
    color: Gray.GRAY_900,
  },
});
