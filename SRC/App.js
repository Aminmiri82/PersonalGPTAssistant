import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Screen from "./Components/Screen";

import BuildScreen from "./Screens/AssistantScreen/BuildScreen";
import LanguagesPrompt from "./Components/SettingsComponents/LanguagesPrompt";
import ChatTextInput from "./Components/ChatTextInput";
import AssistantMakerScreen from "./Screens/AssistantScreen/AssistantMakerScreen";
import AboutUsScreen from "./Screens/SettingsScreen/AboutUsScreen";
import PrivacyPolicyScreen from "./Screens/SettingsScreen/PrivacyPolicyScreen";
import OnBoardingScreen from "./Screens/OBS/OnBoardingScreen";
import BuildScreen from "./Screens/AssistantScreen/BuildScreen";
import ChatMenuScreen from "./Screens/ChatScreen/ChatMenuScreen";

export default function App() {
  return <ChatMenuScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
