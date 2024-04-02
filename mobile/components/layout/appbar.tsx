import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Logo } from "@/components/common/logo";
import { Ionicons } from "@expo/vector-icons";
import { Gray } from "@/types/theme";

export const AppBar = () => {
  return (
    <View style={styles.appBar}>
      <Logo />
      <TouchableOpacity activeOpacity={0.6}>
        <Ionicons name="bag-handle-outline" size={28} color={Gray.GRAY_700} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    paddingRight: 16,
    paddingLeft: 8,
    paddingBottom: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
});
