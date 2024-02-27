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

export default function App() {
  return (
    <>
      
      <Screen>
        <OnBoardingScreen back="back" next="next"/>
      </Screen>
      
    </>
  );
}

const styles = StyleSheet.create({});
