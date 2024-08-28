import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useCopilot, CopilotStep, walkthroughable } from "react-native-copilot";
import Screen from "../Components/Screen";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";

const WalkthroughableText = walkthroughable(Text);

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
      if (step.order === 8) {
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

    copilotEvents.on("stop", saveWalkthroughCompletion);
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
    <Screen>
      <View>
        <CopilotStep text={t("step1")} order={1} name="step1">
          <WalkthroughableText></WalkthroughableText>
        </CopilotStep>

        <Button title={t("StartWalkthrough")} onPress={() => start()} />
      </View>
    </Screen>
  );
}

export default WTMainScreen;
