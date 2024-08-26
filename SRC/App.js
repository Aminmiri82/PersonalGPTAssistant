import React, { useEffect, useState } from "react";
import { StyleSheet, AppRegistry, Text, Platform } from "react-native";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNav from "./Navigation/BottomTabNav";

import { DatabaseProvider } from "./DatabaseProvider"; // Adjust the import path
import i18next from "./services/i18next";
import * as SecureStore from "expo-secure-store";
import { CopilotProvider } from "react-native-copilot";

import WTMainScreen from "./Screens/WTMainScreen";
import AssistantMenuScreen from "./Screens/AssistantScreen/AssistantMenuScreen";

const Stack = createNativeStackNavigator();
// Imporatnt : you can only have one walkthroug in the whole app, so if you want to go to another screen, you need to do what i did in TestScreen.js

export default function App() {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);

  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await SecureStore.getItemAsync("selectedLanguage");
      if (storedLanguage) {
        await i18next.changeLanguage(storedLanguage);
      }
    };

    const checkWalkthroughStatus = async () => {
      const walkthroughCompleted = await SecureStore.getItemAsync(
        "walkthroughCompleted"
      );
      if (walkthroughCompleted) {
        setInitialRoute("Home");
      } else {
        setInitialRoute("WTMainScreen");
      }
    };

    checkWalkthroughStatus();
    fetchLanguage();
  }, []);

  if (initialRoute === null) {
    // Return null or a loading screen while waiting for the initial route to be determined
    return null;
  }

  return (
    <DatabaseProvider>
      <CopilotProvider
        tooltipStyle={Platform.OS === "android" ? { top: 50 } : null}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name="WTMainScreen"
              component={WTMainScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Home"
              component={BottomTabNav}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CopilotProvider>
    </DatabaseProvider>
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
