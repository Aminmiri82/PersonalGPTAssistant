import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "../Components/Icon";
import { useCopilot, CopilotStep, walkthroughable } from "react-native-copilot";

import TestScreen from "../Screens/TestScreen";
import AppButton from "../Components/AppButton";
import { useTranslation } from "react-i18next";
import ChatScreenNav from "./ChatScreenNav";
import BottomTabNav from "./BottomTabNav";
import ChatMenuScreen from "../Screens/ChatScreen/ChatMenuScreen";

const TestStack = createNativeStackNavigator();

function TestNav(props, route) {
  const { t } = useTranslation();
  const startWalkthrough = route.params?.startWalkthrough;

  return (
    <TestStack.Navigator>
      <TestStack.Screen
        name="TestScreen" // Use a static name for referencing the screen
        component={TestScreen}
        options={{
          title: "TestScreen", // Translated title for this screen
        }}
      />
      <TestStack.Screen
        name="ChatMenuScreen" // Use a static name for referencing the screen
        component={ChatMenuScreen}
        options={{
          title: t("ChatMenuScreen"), // Translated title for this screen
        }}
        initialParams={{ startWalkthrough }}
      />
    </TestStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TestNav;
