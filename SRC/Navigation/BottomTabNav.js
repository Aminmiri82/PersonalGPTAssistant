import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SettingsScreenNav from "./SettingsScreenNav";
import Icon from "../Components/Icon";
import ChatScreenNav from "./ChatScreenNav";
import AssistantsScreenNav from "./AssistantsScreenNav";

const Tab = createBottomTabNavigator();
function BottomTabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSet = "MCI"; // Assuming you have different icon sets to choose from

          if (route.name === "Chat") {
            iconName = focused ? "chat" : "chat-outline";
          } else if (route.name === "Assistants") {
            iconName = focused ? "robot" : "robot-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "cog" : "cog-outline";
          }

          return (
            <Icon name={iconName} iconSet={iconSet} color={color} size={size} />
          );
        },
      })}
    >
      <Tab.Screen name="Chat" component={ChatScreenNav} />
      <Tab.Screen name="Assistants" component={AssistantsScreenNav} />
      <Tab.Screen name="Settings" component={SettingsScreenNav} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BottomTabNav;
