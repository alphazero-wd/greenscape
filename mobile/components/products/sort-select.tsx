import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Font, Gray } from "../../types/theme";
import { useState } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

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

const AnimatedChevron = Animated.createAnimatedComponent(AntDesign);

export const SortSelect = ({
  sortBy,
  order,
  onValueChange,
}: SortSelectProps) => {
  const scale = useSharedValue(0);
  const rotateChevron = useSharedValue(0);

  const triggerScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const chevronRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotateX: rotateChevron.value.toString() + "deg" }],
  }));

  return (
    // remember to add zIndex to parent as well
    <View style={{ zIndex: 20 }}>
      <TouchableOpacity
        onPress={() => {
          scale.value = withTiming(scale.value ? 0 : 1);
          rotateChevron.value = withTiming(rotateChevron.value === 0 ? 180 : 0);
        }}
        style={styles.trigger}
        activeOpacity={0.7}
      >
        <Text style={styles.label}>Sort by</Text>
        <AnimatedChevron
          style={chevronRotateStyle}
          name="down"
          size={16}
          color={Gray.GRAY_500}
        />
      </TouchableOpacity>
      <Animated.View style={[styles.content, triggerScaleStyle]}>
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
            <Text style={styles.option}>{sortOptions[option]}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
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
  label: {
    fontFamily: Font.Medium,
  },
  option: {
    fontFamily: Font.Regular,
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
