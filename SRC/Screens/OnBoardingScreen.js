import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../Components/AppButton";
import Screen from "../Components/Screen";
import LinearGradient from "react-native-linear-gradient";
import App from "../App";
import AppText from "../Components/AppText";
import OBST from "../Components/OBST";
// import { AntDesign } from "@expo/vector-icons";

function OnBoardingScreen(props) {
  return (
    <Screen style={styles.container}>
      <View style={styles.text}>
        <OBST
          title="Mimimalis is the maximum"
          subtitle="Get the house and building of your dreams with the people closest to you so that life is better."
        />
      </View>
      <View style={styles.AppContainer}>
        <AppButton
          style={styles.AppButton}
          color="blue"
          title="Next"
          icon="arrowright"
          iconStyle={styles.icon}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // top: 10,
    flex: 1,
  },
  AppContainer: {
    position: "absolute",
    bottom: 100,
    right: 0,
  },
  AppButton: {
    alignContent: "center",
    width: 140,
    height: 55,
    // position: "absolute",
  },
  icon: {
    left: 30,
  },
  text: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    top: 80,
  },
});

export default OnBoardingScreen;
