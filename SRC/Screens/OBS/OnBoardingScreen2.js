import React from "react";
import OnBoardingScreen from "./OnBoardingScreen";
import testOBS from "./testOBS";

function OnboardingScreen2({ navigation }) {
  return (
    <testOBS
      title="Mimimalis is the maximum"
      subtitle="Get the house and building of your dreams with the people closest to you so that life is better."
      color={colors.red}
      navigation={navigation}
    />
  );
}

export default OnboardingScreen2;
