import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../../Components/AppButton";
import Screen from "../../Components/Screen";
import OBST from "../../Components/OBST";
import colors from "../../config/colors";

function OnBoardingScreen({ back, next }) {
  return (
    <Screen style={styles.container}>
      <View>
        <AppButton
          style={styles.skip}
          title="Skip"
          color="trasparent"
          onPress={() => console.log("Skip pressed")}
        ></AppButton>
      </View>
      <View style={styles.middle}>
        <View style={styles.text}>
          <OBST
            title="Mimimalis is the maximum"
            subtitle="Get the house and building of your dreams with the people closest to you so that life is better."
          />
        </View>
        <View style={styles.circleContainer}>
          <View style={styles.circleFull} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
      </View>
      <View style={styles.AppContainer}>
        {back && (
          <AppButton
            style={styles.AppButtonBack}
            color="blue"
            title={back}
            icon="arrowleft"
            iconStyle={styles.iconBack}
            textStyle={{ flex: 1, left: 50 }}
          />
        )}
        <View style={{ width: 132 }} />
        {next && (
          <AppButton
            style={styles.AppButton}
            color="blue"
            title={next}
            icon="arrowright"
            iconStyle={styles.iconNext}
          />
        )}
      </View>
      {/* <NavBar /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  AppButton: {
    alignContent: "center",
    width: 140,
    height: 55,
    backgroundColor: colors.blue,
  },
  AppButtonBack: {
    alignContent: "center",
    width: 140,
    height: 55,
    backgroundColor: colors.blue,
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  AppContainer: {
    position: "absolute",
    bottom: 100,
    right: 0,
    flexDirection: "row",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.light,
    marginHorizontal: 5,
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  circleFull: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.blue,
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
  },
  iconNext: {
    left: 30,
  },
  iconBack: {
    right: 70,
  },
  middle: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 200,
  },
  skip: {
    color: colors.grey,
    position: "absolute",
    right: 5,
    top: 15,
    padding: 0,
  },
  text: {
    alignItems: "center",
  },
});

export default OnBoardingScreen;
