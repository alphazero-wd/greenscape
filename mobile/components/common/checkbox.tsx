import { Green } from "@/types/theme";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface CheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ isChecked, onChange }: CheckboxProps) => {
  return (
    <Pressable
      onPress={onChange}
      style={[
        styles.border,
        { backgroundColor: isChecked ? Green.GREEN_500 : "transparent" },
      ]}
    >
      {isChecked && <FontAwesome name="check" size={16} color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  border: {
    borderRadius: 9999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Green.GREEN_500,
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
