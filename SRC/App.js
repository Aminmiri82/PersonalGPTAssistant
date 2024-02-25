import React from "react";
import { StyleSheet } from "react-native";
import NavBar from "./Components/NavBar";
import Header from "./Components/Header";
import Screen from "./Components/Screen";

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
