import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Font, Gray } from "@/types/theme";
import React from "react";

interface SearchInputProps {
  q: string;
  setQ: (text: string) => void;
}

export const SearchInput = ({ q, setQ }: SearchInputProps) => {
  return (
    <View style={styles.searchContainer}>
      <AntDesign
        style={styles.searchIcon}
        name="search1"
        size={24}
        color={Gray.GRAY_400}
      />
      <TextInput
        value={q}
        onChangeText={(text) => setQ(text)}
        placeholder="Search"
        style={styles.searchBar}
      />
      {q && (
        <Pressable style={styles.clearSearchButton} onPress={() => setQ("")}>
          <AntDesign name="close" size={20} color={Gray.GRAY_400} />
        </Pressable>
      )}
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
  clearSearchButton: {
    position: "absolute",
    marginRight: 32,
    right: 0,
  },
});
