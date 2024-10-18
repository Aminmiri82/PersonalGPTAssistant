import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../Components/Icon";

import SettingsScreenNav from "./SettingsScreenNav";
import ChatScreenNav from "./ChatScreenNav";
import AssistantsScreenNav from "./AssistantsScreenNav";
import EmailAnswersNav from "./EmailAnswersNav";
import TestScreen from "../Screens/TestScreen";

import { useTranslation } from "react-i18next";
import { CopilotProvider } from "react-native-copilot";
import { useTheme } from "../themes/ThemeProvidor";

const Tab = createBottomTabNavigator();
function BottomTabNav(route) {
  const { dark, colorsTh, setScheme } = useTheme();
  const { t } = useTranslation();
  const startWalkthrough = route.params?.startWalkthrough;

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
          } else if (route.name === "EmailAnswers") {
            iconName = focused ? "file-search" : "file-search-outline";
          }

          return (
            <Icon name={iconName} iconSet={iconSet} color={color} size={size} />
          );
        },
        tabBarActiveTintColor: colorsTh.blue, // Colors for focused icons
        tabBarInactiveTintColor: colorsTh.icon, // Colors for unfocused icons
        tabBarStyle: {
          backgroundColor: colorsTh.background, // Themed background for the tab bar
        },
      })}
    >
      
      <Tab.Screen
        name="EmailAnswers"
        component={EmailAnswersNav}
        options={{ headerShown: false, title: t("OfflineSearchTabName") }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreenNav}
        options={{ headerShown: false, title: t("SettingTab") }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BottomTabNav;
