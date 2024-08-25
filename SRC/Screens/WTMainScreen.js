import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useCopilot, CopilotStep, walkthroughable } from "react-native-copilot";
import Screen from "../Components/Screen";

const WalkthroughableText = walkthroughable(Text);

function WTMainScreen({ navigation }) {
  const { start, copilotEvents } = useCopilot();

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
      if (step.order === 6) {
        navigation.navigate("EmptyCS", { isWalkthrough: true });
      }
      if (step.order === 8) {
        navigation.navigate("Home", { screen: "Assistants" });
      }
      if (step.order === 10) {
        navigation.navigate("AssistantMakerScreen1");
      }
      if (step.order === 14) {
        navigation.navigate("AssistantMakerScreen2");
      }
      if (step.order === 17) {
        navigation.navigate("Home", { screen: "OfflineSearch" });
      }
      if (step.order === 19) {
        navigation.navigate("Home", { screen: "Settings" });
      }
    };
    const stepChangeSubscription = copilotEvents.on(
      "stepChange",
      handleStepChange
    );

    // Cleanup on component unmount
    return () => {
      stepChangeSubscription.remove();
    };
  }, [copilotEvents, navigation]);

  return (
    <Screen>
      <View>
        <CopilotStep text="This is step 1" order={1} name="step1">
          <WalkthroughableText></WalkthroughableText>
        </CopilotStep>

        <Button title="Start Walkthrough" onPress={() => start()} />
      </View>
    </Screen>
  );
}

export default WTMainScreen;
