import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuildScreen from "./Screens/AssistantScreen/BuildScreen";
import ChatMenuScreen from "./Screens/ChatScreen/ChatMenuScreen";
import AssistantMakerScreen from "./Screens/AssistantScreen/AssistantMakerScreen";
import Header from "./Components/Header";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator>
        
        <Stack.Screen
          name="AssistantMakerScreen"
          component={AssistantMakerScreen}
        />
        <Stack.Screen name="BuildScreen" component={BuildScreen} />
        <Stack.Screen name="ChatMenuScreen" component={ChatMenuScreen} />
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
