import React from "react";
import { StyleSheet, Text, View } from "react-native";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Screen from "./Components/Screen";
import ListItem from "./Components/ListItem";
import ListItemDeleteAction from "./Components/ListItemDeleteAction";

import TestScreen from "./Screens/TestScreen";
import AboutUsScreen from "./Screens/SettingsScreen/AboutUsScreen";
import OnBoardingScreen from "./Screens/OBS/OnBoardingScreen";
import BuildScreen from "./Screens/AssistantScreen/BuildScreen";
import ChatMenuScreen from "./Screens/ChatScreen/ChatMenuScreen";

export default function App() {
  return <ChatMenuScreen />;
}

const styles = StyleSheet.create({});
