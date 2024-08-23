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
      if (step.order === 4) {
        navigation.navigate("Home", { screen: "ChatMenuScreen" });
      }
      // fuck me this is so dumb
      if (step.order === 6) {
        navigation.navigate("Settings");
      }
      if (step.order === 9) {
        navigation.navigate("ChatMenuScreen");
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
          <WalkthroughableText>Step 1</WalkthroughableText>
        </CopilotStep>

        <CopilotStep text="This is step 2" order={2} name="step2">
          <WalkthroughableText>Step 2</WalkthroughableText>
        </CopilotStep>

        <CopilotStep text="This is step 3" order={3} name="step3">
          <WalkthroughableText>Step 3</WalkthroughableText>
        </CopilotStep>
        <CopilotStep text="This is chats screen" order={4} name="step4">
          <View></View>
        </CopilotStep>

        <Button title="Start Walkthrough" onPress={() => start()} />
      </View>
    </Screen>
  );
}

export default WTMainScreen;
