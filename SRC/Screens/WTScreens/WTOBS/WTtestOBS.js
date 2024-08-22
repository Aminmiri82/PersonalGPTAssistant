import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../../Components/AppButton";
import Screen from "../../Components/Screen";
import OBST from "../../Components/OBST";
import colors from "../../config/colors";
import NavBar from "../../Components/NavBar";

function testOBS({ title, subtitle, color, navigation }) {
  return (
    <Screen style={styles.container}>
      <View>
        <AppButton
          title="Skip"
          color="transparent"
          onPress={() => console.log("Skip pressed")}
        />
      </View>
      <View style={styles.middle}>
        <View style={styles.text}>
          <OBST title={title} subtitle={subtitle} />
        </View>
        <View style={styles.circleContainer}>
          <View style={styles.circleFull} />
          <View style={[styles.circle, { backgroundColor: color }]} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
      </View>
      <View style={styles.AppContainer}>
        <AppButton
          style={styles.AppButton}
          title="Next"
          icon="arrowright"
          onPress={() => navigation.navigate("NextScreen")} // Adjust the navigation logic
        />
      </View>
      {/* <NavBar /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: colors.blue,
  },
  text: {
    alignItems: "center",
  },
  skip: {
    color: colors.grey,
    position: "absolute",
    right: 10,
    top: 10,
    padding: 0,
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.light,
    marginHorizontal: 5,
  },
  circleFull: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.blue,
    marginHorizontal: 5,
  },
  middle: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 200,
  },
});

export default testOBS;
