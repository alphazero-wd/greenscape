import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Gray } from "../../types/theme";
import { useState } from "react";

interface SortSelectProps {
  sortBy: string;
  order: "asc" | "desc";
  onValueChange: (newValue: string) => void;
}

const sortOptions = {
  "id:asc": "None",
  "orders:desc": "Most popular",
  "createdAt:desc": "Newest",
  "price:asc": "Price: Low to high",
  "price:desc": "Price: High to low",
} as const;

export const SortSelect = ({
  sortBy,
  order,
  onValueChange,
}: SortSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // remember to add zIndex to parent as well
    <View style={{ zIndex: 20 }}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.trigger}
        activeOpacity={0.7}
      >
        <Text>Sort by</Text>
        <AntDesign
          name={isOpen ? "up" : "down"}
          size={16}
          color={Gray.GRAY_500}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          {Object.keys(sortOptions).map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => onValueChange(option)}
              style={styles.item}
            >
              {option === `${sortBy}:${order}` && (
                <AntDesign
                  style={styles.selected}
                  size={16}
                  name="check"
                  color={Gray.GRAY_500}
                />
              )}
              <Text>{sortOptions[option]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Gray.GRAY_200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-end",
    gap: 4,
  },
  content: {
    position: "absolute",
    right: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Gray.GRAY_200,
    borderRadius: 8,
    zIndex: 30,
    top: 48,
    backgroundColor: "white",
    minWidth: 128,
  },
  item: {
    position: "relative",
    flexDirection: "row",
    width: "100%",
    borderRadius: 2,
    paddingLeft: 32,
    paddingVertical: 6,
    paddingRight: 12,
  },
  selected: {
    position: "absolute",
    left: 6,
    alignSelf: "center",
    flexDirection: "row",
  },
});
