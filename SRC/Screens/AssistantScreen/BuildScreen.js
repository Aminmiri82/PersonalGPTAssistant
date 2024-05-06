import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import AppText from "../../Components/AppText";
import AppButton from "../../Components/AppButton";
import Header from "../../Components/Header";
import Screen from "../../Components/Screen";
import NavBar from "../../Components/NavBar";

// Get the width and height of the device screen
const { width, height } = Dimensions.get("window");

function BuildScreen(props) {
  return (
    <>
      <Header title="Assistant" />
      <Screen style={styles.container}>
        <AppText style={styles.text}>
          Build a new personal Chat GPT Assistant
        </AppText>
        <AppButton
          title="Get Started"
          onPress={() => console.log("Get started")}
          style={styles.button}
          textStyle={styles.buttonText}
          color="blue"
        />
      </Screen>
      <NavBar />

    </>
  );
}

//Made the styles relative to the width and height of the screen
const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: height * 0.25,
    width: "auto",
    height: "auto",
    borderRadius: height * 0.03,
    borderTopRightRadius: height * 0.03,
    borderBottomRightRadius: height * 0.03,
    backgroundColor: "blue", // Specify background color directly here if needed
    justifyContent: "center", // Align button text vertically centered
    alignItems: "center", // Align button text horizontally centered
  },
  // Styling for the button text
  buttonText: {
    textAlign: "center",
    fontSize: 25,
  },
  // Styling for the main container
  container: {
    flex: 1,
    alignItems: "center",
  },
  // Styling for the descriptive text
  text: {
    textAlign: "center",
    width: "55%",
    fontSize: 25,
    top: height * 0.2,
    fontWeight: "bold",
  },
});

export default BuildScreen;
