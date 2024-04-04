import { Gray, Green } from "@/types/theme";
import { useMemo } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface RangeSliderProps {
  currentRange: [number, number];
  minMaxRange: [number, number];
  onChange: (range: [number, number]) => void;
  step?: number;
  thumbSize?: number;
}

export const RangeSlider = ({
  currentRange: [start, end],
  minMaxRange: [min, max],
  onChange,
  step = 1,
  thumbSize = 32,
}: RangeSliderProps) => {
  const sliderWidth = useSharedValue(0);
  const startPosition = useSharedValue(0);
  const endPosition = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    sliderWidth.value = width;
    startPosition.value = interpolate(start, [min, max], [0, width]);
    endPosition.value = interpolate(end, [min, max], [0, width]);
  };

  const onDragStart = Gesture.Pan()
    .onChange((event) => {
      const newStartPosition = Math.min(
        Math.max(startPosition.value + event.changeX, 0),
        endPosition.value
      );
      startPosition.value = newStartPosition;
    })
    .onEnd(() => {
      runOnJS(onChange)([
        min +
          Math.round(
            startPosition.value / (sliderWidth.value / ((max - min) / step))
          ) *
            step,
        end,
      ]);
    });

  const onDragEnd = Gesture.Pan()
    .onChange((event) => {
      const newEndPosition = Math.min(
        Math.max(endPosition.value + event.changeX, startPosition.value),
        sliderWidth.value
      );

      endPosition.value = newEndPosition;
    })
    .onEnd(() => {
      runOnJS(onChange)([
        start,
        min +
          Math.round(
            endPosition.value / (sliderWidth.value / ((max - min) / step))
          ) *
            step,
      ]);
    });

  const startThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: startPosition.value }],
  }));

  const endThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: endPosition.value }],
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: startPosition.value }],
    width: endPosition.value - startPosition.value,
  }));

  const thumbSizeStyles = useMemo(
    () =>
      ({
        width: thumbSize,
        height: thumbSize,
      } as const),
    [thumbSize]
  );

  return (
    <GestureHandlerRootView>
      <View onLayout={onLayout} style={styles.slider}>
        <GestureDetector gesture={onDragStart}>
          <Animated.View
            style={[styles.thumb, thumbSizeStyles, startThumbStyle]}
          />
        </GestureDetector>
        <Animated.View style={[styles.selectedRange, sliderStyle]} />
        <GestureDetector gesture={onDragEnd}>
          <Animated.View
            style={[styles.thumb, thumbSizeStyles, endThumbStyle]}
          />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Green.GREEN_500,
    borderRadius: 9999,
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    borderRadius: 9999,
    backgroundColor: "#fff",
    zIndex: 2,
    elevation: 4,
  },
});
