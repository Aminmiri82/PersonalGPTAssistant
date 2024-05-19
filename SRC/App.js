import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./Screens/SettingsScreen/SettingsScreen";
import NavBar from "./Components/NavBar";
import LanguagesPrompt from "./Components/SettingsComponents/LanguagesPrompt";
import AboutUsScreen from "./Screens/SettingsScreen/AboutUsScreen";
import TermsAndConditionsScreen from "./Screens/SettingsScreen/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "./Screens/SettingsScreen/PrivacyPolicyScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
        
        
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
