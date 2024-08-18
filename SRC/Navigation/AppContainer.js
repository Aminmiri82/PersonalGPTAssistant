import React, { useState, useEffect, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNav from "./BottomTabNav";
import OnBoardingScreen from "../Screens/OBS/OnBoardingScreen";

const Stack = createNativeStackNavigator();

export const AppContainer = ({ onboarded }) => {
  return (
    <>
      <Stack.Navigator initialRouteName={onboarded ? "Home" : "Home"}>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

// const onPressFinish = async () => {
//     await AsyncStorage.setItem("ONBOARDED", "true");
//     navigation.navigate("login");
//   };
