import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuildScreen from "./Screens/AssistantScreen/BuildScreen";

import ChatMenuScreen from "./Screens/ChatScreen/ChatMenuScreen";
import AboutUsScreen from "./Screens/SettingsScreen/AboutUsScreen";
import NavBar from "./Components/NavBar";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ChatMenuScreen">
          <Stack.Screen
            name="ChatMenuScreen"
            component={ChatMenuScreen}
          />
          <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
          <Stack.Screen name="BuildScreen" component={BuildScreen} />
        
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
