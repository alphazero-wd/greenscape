import { Product } from "@/types/product";
import { StyleSheet, Image, Dimensions, ScrollView, View } from "react-native";

interface ProductImagesProps {
  images: Product["images"];
}

export const ProductImages = ({ images }: ProductImagesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 16 }}
      style={{ height: "100%" }}
    >
      <View style={{ width: 4 }} />
      {images.map((image) => (
        <Image
          key={image.id}
          style={styles.currentImage}
          source={{ uri: image.url }}
        />
      ))}
      <View style={{ width: 4 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  currentImage: {
    borderRadius: 16,
    width: Dimensions.get("window").width - 72,
    aspectRatio: 1,
  },
});
