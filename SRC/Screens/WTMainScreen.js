import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useCopilot, CopilotStep, walkthroughable } from "react-native-copilot";
import Screen from "../Components/Screen";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import colors from "../config/colors";

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableView = walkthroughable(View);

function WTMainScreen({ navigation }) {
  const { start, copilotEvents } = useCopilot();
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

  return (
    <View style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title}>{t("WTWelcome")}</Text>
      <Text style={styles.subtitle}>
        {t("WTWelcomeSubtitle")}
      </Text>

      <View style={styles.featuresContainer}>
        <Text style={styles.feature}>{t("WTFeature1")}</Text>
        <Text style={styles.feature}>{t("WTFeature2")}</Text>
        <Text style={styles.feature}>{t("WTFeature3")}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => start()}>
        <Text style={styles.buttonText}>{t("StartWalkthrough")}</Text>
      </TouchableOpacity>
      <CopilotStep text={t("step1")} order={1} name="step1">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  logo: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6c757d",
    marginTop: 10,
    marginBottom: 20,
  },
  featuresContainer: {
    alignItems: "flex-start",
    marginVertical: 20,
  },
  feature: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    backgroundColor: colors.niceBlue,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WTMainScreen;
