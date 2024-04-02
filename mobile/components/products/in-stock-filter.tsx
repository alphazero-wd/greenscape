import { View, StyleSheet, Text } from "react-native";
import { Checkbox } from "@/components/common/checkbox";
import { Font } from "@/types/theme";

interface InStockFilterProps {
  isOutOfStockIncluded: boolean;
  onChange: () => void;
}

export const InStockFilter = ({
  onChange,
  isOutOfStockIncluded,
}: InStockFilterProps) => {
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox isChecked={isOutOfStockIncluded} onChange={onChange} />
      <Text style={styles.checkboxLabel}>Include out of stock</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  checkboxLabel: {
    fontFamily: Font.Regular,
  },
});
