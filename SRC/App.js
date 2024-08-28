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
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [initialRoute, setInitialRoute] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await SecureStore.getItemAsync("selectedLanguage");
      if (storedLanguage) {
        await i18next.changeLanguage(storedLanguage);
      }
    };

    const checkWalkthroughStatus = async () => {
      const RealwalkthroughCompleted = await SecureStore.getItemAsync(
        "walkthroughCompleted"
      );
      console.log("RealwalkthroughCompleted", RealwalkthroughCompleted);
      const walkthroughCompleted = true; // it took me two hours to understand that changing this does not chnage the secure store value
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
      labels={{
        previous: t("wtPrevious"),
        next: t("wtNext"),
        skip: t("wtSkip"),
        finish: t("wtFinish"),
      }}
        
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name="Home"
              component={BottomTabNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WTMainScreen"
              component={WTMainScreen}
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
