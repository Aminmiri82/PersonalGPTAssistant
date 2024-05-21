import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import SettingsScreen from "./Screens/SettingsScreen/SettingsScreen";

import LanguagesPrompt from "./Components/SettingsComponents/LanguagesPrompt";
import AboutUsScreen from "./Screens/SettingsScreen/AboutUsScreen";
import TermsAndConditionsScreen from "./Screens/SettingsScreen/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "./Screens/SettingsScreen/PrivacyPolicyScreen";
import ChatMenuScreen from "./Screens/ChatScreen/ChatMenuScreen";
import BottomTab from "./Components/Navigation/BottomTab";
import OnBoardingScreen from "./Screens/OBS/OnBoardingScreen";


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="ChChatMenuScreenat" component={ChatMenuScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
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
