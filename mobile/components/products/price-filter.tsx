import { Range } from "@/types/base";
import { Font, Gray, Green } from "@/types/theme";
import { formatPrice } from "@/utils/format-price";
import { StyleSheet, Text, View } from "react-native";
import { RangeSlider } from "../common/range-slider";

interface PriceFilterProps {
  priceRange: Range;
  currentPriceRange: Range;
  onChange: (range: Range) => void;
}

export const PriceFilter = ({
  priceRange,
  currentPriceRange: [startPrice, endPrice],
  onChange,
}: PriceFilterProps) => {
  return (
    <View style={{ width: "90%" }}>
      <Text style={styles.priceRangeText}>
        Price: {formatPrice(startPrice)} - {formatPrice(endPrice)}
      </Text>
      <RangeSlider
        minMaxRange={priceRange}
        currentRange={[startPrice, endPrice]}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  priceRangeText: {
    fontFamily: Font.Medium,
    color: Gray.GRAY_900,
    marginBottom: 16,
  },
});
