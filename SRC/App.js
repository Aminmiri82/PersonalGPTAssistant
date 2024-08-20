import React, { useEffect } from "react";
import { StyleSheet, AppRegistry, Text } from "react-native";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNav from "./Navigation/BottomTabNav";
import OnBoardingScreen from "./Screens/OBS/OnBoardingScreen";
import { DatabaseProvider } from "./DatabaseProvider"; // Adjust the import path
import i18next from "./services/i18next";
import * as SecureStore from "expo-secure-store";
import { CopilotProvider } from "react-native-copilot";
import TestScreen from "./Screens/TestScreen";

const Stack = createNativeStackNavigator();
// Imporatnt : you can only have one walkthroug in the whole app, so if you want to go to another screen, you need to do what i did in TestScreen.js

export default function App() {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await SecureStore.getItemAsync("selectedLanguage");
      if (storedLanguage) {
        await i18next.changeLanguage(storedLanguage);
      }
    };

    fetchLanguage();
  }, []);
  return (
    <CopilotProvider>
      <DatabaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Test"
              component={TestScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={BottomTabNav}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="OnBoarding"
              component={OnBoardingScreen}
              options={{ headerShown: false }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </DatabaseProvider>
    </CopilotProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

AppRegistry.registerComponent(appName, () => App);
