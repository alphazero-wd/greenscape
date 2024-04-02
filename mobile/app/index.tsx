import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Green, Font } from "../types/theme";
import { Link } from "expo-router";

const App = () => {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/home.jpg")}
          style={styles.image}
        >
          <View style={styles.overlay} />
          <View style={styles.textbox}>
            <Text style={styles.heading}>
              Grow Your Life, One Plant at a Time
            </Text>
            <Text style={styles.subheading}>
              Transforming spaces, nurturing souls, one leaf at a time.
            </Text>
          </View>
          <Link asChild replace href="/products">
            <TouchableOpacity activeOpacity={0.8} style={styles.cta}>
              <Text style={styles.ctaText}>Start planting</Text>
            </TouchableOpacity>
          </Link>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  overlay: {
    height: "100%",
    width: "100%",
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
  },
  textbox: {
    maxWidth: 300,
  },
  heading: {
    lineHeight: 50,
    color: "white",
    fontSize: 40,
    fontFamily: Font.SemiBold,
    textAlign: "center",
  },
  subheading: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
    fontFamily: Font.Regular,
  },
  cta: {
    backgroundColor: Green.GREEN_500,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginHorizontal: 40,
    width: "90%",
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 60,
    justifyContent: "center",
    flexDirection: "row",
  },
  ctaText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    fontFamily: Font.SemiBold,
    width: "100%",
    textAlign: "center",
  },
});

export default App;
