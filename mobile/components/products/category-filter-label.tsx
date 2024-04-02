import { AntDesign } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Gray, Green } from "@/types/theme";

interface CategoryFilterLabelProps {
  categoryName: string;
  clearCategory: () => void;
}

export const CategoryFilterLabel = ({
  categoryName,
  clearCategory,
}: CategoryFilterLabelProps) => {
  return (
    <View style={styles.categoryLabel}>
      <Text numberOfLines={1} style={styles.categoryLabelText}>
        {categoryName}
      </Text>
      <Pressable onPress={clearCategory}>
        <AntDesign name="close" size={16} color={Green.GREEN_600} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryLabel: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: Green.GREEN_700,
    borderStyle: "solid",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    backgroundColor: Green.GREEN_100,
  },
  categoryLabelText: {
    fontSize: 14,
    color: Green.GREEN_900,
  },
});
