import { Product } from "@/types/product";
import { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Color } from "../../types/theme";

interface ProductImagesProps {
  images: Product["images"];
}

export const ProductImages = ({ images }: ProductImagesProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 16 }}
      data={images}
      style={{ paddingVertical: 16 }}
      ListHeaderComponent={<View style={{ width: 8 }} />}
      renderItem={({ item }) => (
        <Image style={styles.currentImage} source={{ uri: item.url }} />
      )}
      ListFooterComponent={<View style={{ width: 8 }} />}
    />
  );
};

const styles = StyleSheet.create({
  images: {
    borderRadius: 8,
    height: 64,
    aspectRatio: 1,
    flex: 1,
  },
  currentImage: {
    borderRadius: 16,
    paddingLeft: 16,
    width: Dimensions.get("window").width - 64,
    aspectRatio: 1,
  },
});
