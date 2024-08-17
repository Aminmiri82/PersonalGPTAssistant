import React, { useEffect, useState } from "react";
import { StyleSheet, AppRegistry, Text } from "react-native";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNav from "./Navigation/BottomTabNav";
import OnBoardingScreen from "./Screens/OBS/OnBoardingScreen";
import { DatabaseProvider } from "./DatabaseProvider"; // Adjust the import path
import i18next from "./services/i18next";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [onboarded, setOnboarded] = useState();

  useEffect(() => {
    getStorage();
  }, []);

  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem("ONBOARDED");
    setOnboarded(JSON.parse(onboarded));
  };

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
    <DatabaseProvider>
      <NavigationContainer>
        <AppContainer onboarded={onboarded} />
      </NavigationContainer>
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
