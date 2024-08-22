import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WTBottomTabNav from "./WTBottomTabNav";
import WTMainScreen from "../../Screens/WTScreens/WTMainScreen";



const WTMNav = createNativeStackNavigator();

function WTMainNav() {
  

  return (
    <WTMNav.Navigator>
        <WTMNav.Screen
        name="WTMainScreen"
        component={WTMainScreen}
        options={{ headerShown: false }}
      />
      <WTMNav.Screen
        name="WTBottomTabNav"
        component={WTBottomTabNav}
        options={{ headerShown: false }}
      />
    </WTMNav.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WTMainNav;
