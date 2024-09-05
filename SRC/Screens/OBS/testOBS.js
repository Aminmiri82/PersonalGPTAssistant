import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import OnBoarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

export default function TestOBS() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleDone = async () => {
    await SecureStore.setItemAsync("onboardingCompleted", "true");
    navigation.navigate("WTMainScreen");
  };

  const donebutton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <OnBoarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={donebutton}
        bottomBarHighlight={false}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/chatbot.json")}
                  autoPlay
                  loop
                  style={{ width: width * 0.9, height: width }}
                />
              </View>
            ),
            title: t("obs1Title"),
            subtitle: t("obs1Subtitle"),
          },
          {
            backgroundColor: "#fef3c7",
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/judge.json")}
                  autoPlay
                  loop
                  style={{ width: width * 0.9, height: width }}
                />
              </View>
            ),
            title: t("obs2Title"),
            subtitle: t("obs2Subtitle"),
          },
          {
            backgroundColor: "#a7f3d0",
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/phone.json")}
                  autoPlay
                  loop
                  style={{ width: width * 0.9, height: width }}
                />
              </View>
            ),
            title: t("obs3Title"),
            subtitle: t("obs3Subtitle"),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    backgroundColor: "#00FF9D",
    borderTopLeftRadius: 500,
    borderBottomLeftRadius: 500,
  },
});
