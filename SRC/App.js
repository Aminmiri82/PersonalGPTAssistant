import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatMenuScreen from "./Screens/ChatScreen/ChatMenuScreen";
import BottomTabNav from "./Navigation/BottomTabNav";

import AssistantMakerScreen from "./Screens/AssistantScreen/AssistantMakerScreen";

import SettingsScreenNav from "./Navigation/SettingsScreenNav";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AssistantMakerScreen" component={AssistantMakerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
