import { Product } from "@/types/product";
import { useBagStore } from "@/hooks/use-bag-store";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Font, Green } from "@/types/theme";
import { useEffect, useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

interface AddToBagButton {
  product: Product;
}

export const AddToBagButton = ({ product }: AddToBagButton) => {
  const findBagItem = useBagStore((state) => state.findBagItem);
  const addToBag = useBagStore((state) => state.addToBag);
  const updateQty = useBagStore((state) => state.updateQty);
  const removeBagItem = useBagStore((state) => state.removeBagItem);
  const cartItem = useMemo(() => findBagItem(product.id), [product.id]);
  const [qty, setQty] = useState(0);

  const decrementQty = () => {
    if (qty === 1) removeBagItem(product.id);
    else {
      updateQty(product.id, qty - 1);
    }
    setQty((prev) => prev - 1);
  };
  const incrementQty = () => {
    updateQty(product.id, qty + 1);
    setQty((prev) => prev + 1);
  };

  const rem = useMemo(() => product.inStock - qty, [qty, product.inStock]);

  useEffect(() => {
    setQty(cartItem?.qty || 0);
  }, [cartItem]);

  if (!product.inStock) return null;
  if (qty > 0) {
    return (
      <TouchableOpacity
        style={[styles.button, styles.updateQtyButton]}
        activeOpacity={0.7}
      >
        <TouchableOpacity onPress={decrementQty} style={styles.roundButton}>
          <AntDesign name="minus" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>
          {rem > 0 ? `${qty} in bag` : `Max ${product.inStock}`}
        </Text>
        <TouchableOpacity
          onPress={incrementQty}
          disabled={rem === 0}
          style={[styles.roundButton, { opacity: rem === 0 ? 0.5 : 1 }]}
        >
          <AntDesign name="plus" size={18} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, styles.addToBagButton]}
      onPress={() => {
        addToBag({
          category: product.category,
          id: product.id,
          price: product.price,
          imageUrl: product.images[0].url,
          inStock: product.inStock,
          name: product.name,
          qty: 1,
        });
        setQty(1);
      }}
    >
      <Text style={styles.text}>Add to bag</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 12,
    backgroundColor: Green.GREEN_500,
    paddingHorizontal: 12,
    borderRadius: 9999,
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    fontFamily: Font.SemiBold,
    textAlign: "center",
  },
  addToBagButton: {
    paddingVertical: 18,
  },
  updateQtyButton: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roundButton: {
    padding: 12,
    backgroundColor: Green.GREEN_800,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
});
