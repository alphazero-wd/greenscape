import { usePagination } from "@/hooks/use-pagination";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Font, Gray, Green } from "@/types/theme";
import { AntDesign } from "@expo/vector-icons";

interface ProductsPaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  setPage: (newPage: number) => void;
}

export const ProductsPagination = ({
  totalCount,
  currentPage,
  pageSize,
  setPage,
}: ProductsPaginationProps) => {
  const pages = usePagination({
    totalCount,
    currentPage,
    pageSize,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={currentPage === 0}
        style={[styles.button, styles.prevButton]}
      >
        <AntDesign name="left" color={Gray.GRAY_500} />
      </TouchableOpacity>
      {pages.map((page) =>
        typeof page === "number" ? (
          <TouchableOpacity
            onPress={() => setPage(page)}
            style={[
              styles.button,
              {
                backgroundColor:
                  currentPage === page ? Green.GREEN_500 : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.pageText,
                { color: currentPage === page ? "white" : Gray.GRAY_900 },
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.button}>
            <Text>{page}</Text>
          </View>
        )
      )}
      <TouchableOpacity
        disabled={currentPage === Math.ceil(totalCount / pageSize)}
        style={[styles.button, styles.nextButton]}
      >
        <AntDesign name="right" color={Gray.GRAY_500} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  prevButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderLeftWidth: 1,
  },
  nextButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRightWidth: 1,
  },
  pageText: {
    fontFamily: Font.Medium,
  },
  button: {
    justifyContent: "center",
    minWidth: 40,
    height: 40,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: Gray.GRAY_300,
  },
});
