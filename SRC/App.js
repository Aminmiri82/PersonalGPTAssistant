import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuildScreen from "./Screens/AssistantScreen/BuildScreen";

import ChatMenuScreen from "./Screens/ChatScreen/ChatMenuScreen";
import AboutUsScreen from "./Screens/SettingsScreen/AboutUsScreen";
import AssistantMakerScreen from "./Screens/AssistantScreen/AssistantMakerScreen";
import NavBar from "./Components/NavBar";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        
        
        <Stack.Screen name="AssistantMaker" component={AssistantMakerScreen} />
        <Stack.Screen name="Build" component={BuildScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <NavBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
