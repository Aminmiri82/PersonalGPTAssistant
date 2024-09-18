import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import OnBoarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import { useCopilot, CopilotStep, walkthroughable } from "react-native-copilot";
import RNRestart from 'react-native-restart';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableView = walkthroughable(View);

const { width, height } = Dimensions.get("window");

export default function TestOBS() {
  const { start, copilotEvents } = useCopilot();
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleStepChange = (step) => {
      console.log("Current Step:", step); // Debugging line
      if (step.order === 1) {
        navigation.navigate("Home", { screen: "ChatMenuScreen" });
      }
      // fuck me this is so dumb
      if (step.order === 3) {
        navigation.navigate("ChooseChatScreen");
      }
      if (step.order === 5) {
        navigation.navigate("EmptyCS", { isWalkthrough: true });
      }
      if (step.order === 7) {
        navigation.navigate("Home", { screen: "Assistants" });
      }
      if (step.order === 10) {
        navigation.navigate("AssistantMakerScreen1");
      }
      if (step.order === 14) {
        navigation.navigate("AssistantMakerScreen2", {
          name: "s",
          instructions: "s",
          imageUri: "s",
        });
      }
      if (step.order === 17) {
        navigation.navigate("Home", {
          screen: "EmailAnswers",
        });
      }
      if (step.order === 19) {
        navigation.navigate("Home", { screen: "Settings" });
      }
    };

    const saveWalkthroughCompletion = async () => {
      await SecureStore.setItemAsync("walkthroughCompleted", "true");
      RNRestart.Restart();
    };

    copilotEvents.on("stop", saveWalkthroughCompletion); // does this happen when you skip the walkthrough?
    const stepChangeSubscription = copilotEvents.on(
      "stepChange",
      handleStepChange
    );

    // Cleanup on component unmount
    return () => {
      stepChangeSubscription.remove();
      copilotEvents.off("stop", saveWalkthroughCompletion);
    };
  }, [copilotEvents, navigation]);

  const handleDone = async () => {
    await SecureStore.setItemAsync("onboardingCompleted", "true");
    start();
  };
  

  const donebutton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>{t("done")}</Text>
      </TouchableOpacity>
    );
  };
  const nextbutton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>{t("next")}</Text>
      </TouchableOpacity>
    );
  };
  const skipbutton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.skipButton} {...props}>
        <Text>{t("wtSkip")}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <OnBoarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={donebutton}
        SkipButtonComponent={skipbutton}
        NextButtonComponent={nextbutton}
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
            backgroundColor: "#fef3c7",//color not final
            image: (
              <View>
                <LottieView
                  source={require("../../assets/animations/shecan.json")}
                  autoPlay
                  loop
                  style={{ width: width * 0.9, height: width }}
                />
              </View>
            ),
            title: t("obs3Title"),
            subtitle: t("obs3Subtitle"),
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
            title: t("obs4Title"),
            subtitle: t("obs4Subtitle"),
          },
        ]}
      />
      <CopilotStep text={t("step1")} order={1} name="step1">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  lottie: {
    // where is this even used ? i gotta audit your code for real
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
    backgroundColor: "#00FF9D",
    borderTopLeftRadius: 500,
    borderBottomLeftRadius: 500,
  },
  skipButton: {
    padding: 20,
    backgroundColor: "#00FF9D",
    borderTopRightRadius: 500,
    borderBottomRightRadius: 500,
  },
});
