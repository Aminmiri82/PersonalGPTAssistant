import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "../Components/Icon";
import { useCopilot, CopilotStep, walkthroughable } from "react-native-copilot";

import TestScreen from "../Screens/TestScreen";
import AppButton from "../Components/AppButton";
import { useTranslation } from "react-i18next";
import ChatMenuScreenNav from "./ChatMenuScreenNav";
import BottomTabNav from "./BottomTabNav";
import ChatMenuScreen from "../Screens/ChatScreen/ChatMenuScreen";

const TestStack = createNativeStackNavigator();

function testNav(props) {
  const { t } = useTranslation();

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
      />
    </TestStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default testNav;
