import React from "react";
import { StyleSheet, Text, View } from "react-native";

import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Screen from "./Components/Screen";
import ListItem from "./Components/ListItem";
import ListItemDeleteAction from "./Components/ListItemDeleteAction";

import OnBoardingScreen from "./Screens/OBS/OnBoardingScreen";
import TestScreen from "./Screens/TestScreen";
import AboutUsScreen from "./Screens/SettingsScreen/AboutUsScreen";

export default function App() {
  return (
    <>
      <Header title="test" />
      <Screen>
        <AboutUsScreen />
      </Screen>
      <NavBar />
    </>
  );
}

const styles = StyleSheet.create({});
