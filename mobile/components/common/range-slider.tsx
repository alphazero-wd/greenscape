import { Gray, Green } from "@/types/theme";
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
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

interface RangeSliderProps {
  currentRange: [number, number];
  minMaxRange: [number, number];
  onChange: (range: [number, number]) => void;
  step?: number;
}

export const RangeSlider = ({
  currentRange: [start, end],
  minMaxRange: [min, max],
  onChange,
  step = 1,
}: RangeSliderProps) => {
  const sliderWidth = useSharedValue(0);
  const startPosition = useSharedValue(
    interpolate(start, [min, max], [0, sliderWidth.value])
  );
  const endPosition = useSharedValue(
    interpolate(end, [min, max], [0, sliderWidth.value])
  );

  const onLayout = (event: LayoutChangeEvent) => {
    sliderWidth.value = event.nativeEvent.layout.width;
  };

  const onDragStart = Gesture.Pan()
    .onChange((event) => {
      const newStartPosition = startPosition.value + event.changeX;
      if (newStartPosition >= 0 && newStartPosition <= endPosition.value) {
        startPosition.value = newStartPosition;
      }
    })
    .onEnd(() => {
      runOnJS(onChange)([
        min +
          Math.floor(
            startPosition.value / (sliderWidth.value / ((max - min) / step))
          ) *
            step,
        end,
      ]);
    });

  const onDragEnd = Gesture.Pan()
    .onChange((event) => {
      const newEndPosition = endPosition.value + event.changeX;
      if (newEndPosition >= 0 && newEndPosition >= startPosition.value) {
        endPosition.value = newEndPosition;
      }
    })
    .onEnd(() => {
      runOnJS(onChange)([
        start,
        min +
          Math.floor(
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

  return (
    <GestureHandlerRootView>
      <View onLayout={onLayout} style={styles.slider}>
        <GestureDetector gesture={onDragStart}>
          <Animated.View style={[styles.thumb, startThumbStyle]} />
        </GestureDetector>
        <Animated.View style={[styles.selectedRange, sliderStyle]} />
        <GestureDetector gesture={onDragEnd}>
          <Animated.View style={[styles.thumb, endThumbStyle]} />
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
    height: 32,
    width: 32,
    borderRadius: 9999,
    backgroundColor: "#fff",
    zIndex: 2,
    shadowColor: Gray.GRAY_400,
    shadowOffset: { width: 2, height: 2 },
  },
});
