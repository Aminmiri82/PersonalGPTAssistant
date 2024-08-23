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
          <WalkthroughableText></WalkthroughableText>
        </CopilotStep>

        

        <Button title="Start Walkthrough" onPress={() => start()} />
      </View>
    </Screen>
  );
}

export default WTMainScreen;
