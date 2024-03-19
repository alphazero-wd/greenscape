import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Color, Font, Gray } from "@/types/theme";
import { useMemo, useState } from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { formatPrice } from "@/utils/format-price";
import { lerp } from "@/utils/lerp";

const MAX_WIDTH = Dimensions.get("window").width - 32;

interface PriceFilterProps {
  priceRange: [number, number];
}

export const PriceFilter = ({
  priceRange: [minPrice, maxPrice],
}: PriceFilterProps) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const dragstart = Gesture.Pan().onChange((event) => {
    const newStart = start + event.changeX;
    if (newStart >= 0 && newStart <= MAX_WIDTH + end) setStart(newStart);
  });

  const dragend = Gesture.Pan().onChange((event) => {
    const newEnd = end + event.changeX;
    if (newEnd <= 0 && MAX_WIDTH + newEnd >= start) setEnd(newEnd);
  });

  const [startPrice, endPrice] = useMemo(
    () => [
      lerp(0, MAX_WIDTH, minPrice, maxPrice, start),
      lerp(0, MAX_WIDTH, minPrice, maxPrice, MAX_WIDTH + end),
    ],
    [minPrice, maxPrice, start, end]
  );

  return (
    <GestureHandlerRootView>
      <Text style={styles.priceRangeText}>
        Price: {formatPrice(startPrice)} - {formatPrice(endPrice)}
      </Text>
      <View style={styles.slider}>
        <GestureDetector gesture={dragstart}>
          <View style={[styles.thumb, { left: start }]} />
        </GestureDetector>
        <View
          style={[
            styles.selectedRange,
            { left: start, width: MAX_WIDTH + end - start },
          ]}
        />
        <GestureDetector gesture={dragend}>
          <View style={[styles.thumb, { right: -end }]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  priceRangeText: {
    fontFamily: Font.Medium,
    color: Gray.GRAY_900,
    marginBottom: 16,
  },
  slider: {
    width: "100%",
    height: 4,
    backgroundColor: Gray.GRAY_200,
    borderRadius: 9999,
    justifyContent: "center",
    position: "relative",
  },
  selectedRange: {
    height: 4,
    backgroundColor: Color.Primary,
    borderRadius: 9999,
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    height: 32,
    width: 32,
    borderRadius: 9999,
    backgroundColor: "#fff",
    zIndex: 2,
    shadowColor: Gray.GRAY_400,
    shadowOffset: { width: 2, height: 2 },
  },
});
