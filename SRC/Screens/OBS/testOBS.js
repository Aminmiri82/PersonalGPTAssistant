import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import OnBoarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function OnBoarding() {
  const handleDone = () => {
    console.log("Done");
  };

  return (
    <View style={styles.container}>
      <OnBoarding
        onDone={handleDone}
        onSkip={handleDone}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  source={require("../../assets/animations/1.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "We make it easy for you to",
            subtitle: "You can avoid paying for lawyers and get help for free",
          },
          {
            backgroundColor: "#fef3c7",
            image: (
              <View>
                <Text>Hello</Text>
              </View>
            ),
            title: "second title",
            subtitle: "second sub",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  lottie: {
    width: width * 0.9,
    height: width,
  },
});
