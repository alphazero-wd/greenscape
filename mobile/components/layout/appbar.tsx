import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Logo } from "@/components/common/logo";
import { Ionicons } from "@expo/vector-icons";
import { Font, Gray, Green } from "@/types/theme";
import { useBagStore } from "@/hooks/use-bag-store";
import { Link } from "expo-router";

export const AppBar = () => {
  const bag = useBagStore((state) => state.bag);
  return (
    <View style={styles.appBar}>
      <Logo />
      <Link asChild href="/bag">
        <TouchableOpacity activeOpacity={0.6}>
          <Ionicons name="bag-handle-outline" size={28} color={Gray.GRAY_700} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{bag.length}</Text>
          </View>
        </TouchableOpacity>
      </Link>
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
  badge: {
    backgroundColor: Green.GREEN_500,
    borderRadius: 9999,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -8,
    right: -8,
  },
  badgeText: {
    color: "white",
    fontFamily: Font.Medium,
  },
});
