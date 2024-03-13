import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { Font, Gray } from "@/types/theme";
import React from "react";

export const SearchInput = () => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        style={styles.searchIcon}
        name="search"
        size={24}
        color={Gray.GRAY_400}
      />
      <TextInput placeholder="Search" style={styles.searchBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: "relative",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  searchIcon: {
    position: "absolute",
    marginLeft: 32,
  },
  searchBar: {
    borderRadius: 999,
    borderWidth: 1,
    fontFamily: Font.Regular,
    borderStyle: "solid",
    borderColor: Gray.GRAY_300,
    paddingLeft: 48,
    paddingRight: 28,
    paddingVertical: 12,
    width: "100%",
  },
});
