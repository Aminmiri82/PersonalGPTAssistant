import React from "react";
import { StyleSheet, AppRegistry, Text } from "react-native";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNav from "./Navigation/BottomTabNav";
import OnBoardingScreen from "./Screens/OBS/OnBoardingScreen";
import { DatabaseProvider } from "./DatabaseProvider"; // Adjust the import path

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DatabaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={BottomTabNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnBoarding"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
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
