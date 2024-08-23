import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WTBottomTabNav from "./WTBottomTabNav";
import WTMainScreen from "../../Screens/WTScreens/WTMainScreen";


const WTMNav = createNativeStackNavigator();
function WTMainNav() {
  return (
    
    
      <WTMNav.Navigator>
        {/* main screen is for all the explainations you might wanna give before you start the walk through */}
        <WTMNav.Screen
          name="WTMainScreen"
          component={WTMainScreen}
          options={{ headerShown: false }}
        />
        {/* after you're done with the explaination, you can go to the actual app stuff */}
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
