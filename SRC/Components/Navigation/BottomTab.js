import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatMenuScreen from "../../Screens/ChatScreen/ChatMenuScreen";
import SettingsScreen from "../../Screens/SettingsScreen/SettingsScreen";
import AssistantMakerScreen from "../../Screens/AssistantScreen/AssistantMakerScreen";

import Icon from "../Icon";

const Tab = createBottomTabNavigator();
function BottomTab(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let iconSet = "MCI"; // Assuming you have different icon sets to choose from

          if (route.name === "Chat") {
            iconName = "chat";
          } else if (route.name === "Assistants") {
            iconName = "account-group";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }

          return (
            <Icon name={iconName} iconSet={iconSet} color={color} size={size} />
          );
        },
      })}
    >
      <Tab.Screen name="Chat" component={ChatMenuScreen} />
      <Tab.Screen name="Assistants" component={AssistantMakerScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BottomTab;
