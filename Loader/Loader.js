import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
const Loader = () => {
  const state = useSelector((state) => state.LoaderReducer);
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <LottieView
          height={200}
          source={require("../assets/Loader.json")}
          autoPlay
          loop
        />
        <Text
          style={{
            alignItems: "center",

            top: 40,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {state.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "space-around",
  },
  inner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Loader;
