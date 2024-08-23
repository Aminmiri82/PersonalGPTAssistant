import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../Components/Icon";

import SettingsScreenNav from "./SettingsScreenNav";
import ChatScreenNav from "./ChatScreenNav";
import AssistantsScreenNav from "./AssistantsScreenNav";
import OfflineSearchNav from "./OfflineSearchNav";


import { useTranslation } from "react-i18next";
import { CopilotProvider } from "react-native-copilot";

const Tab = createBottomTabNavigator();
function BottomTabNav() {
  const { t } = useTranslation();
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
          } else if (route.name === "OfflineSearch") {
            iconName = focused ? "file-search" : "file-search-outline";
          }

          return (
            <Icon name={iconName} iconSet={iconSet} color={color} size={size} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Chat"
        component={ChatScreenNav}
        options={{ headerShown: false, title: t("ChatTab") }}
      />
      <Tab.Screen
        name="Assistants"
        component={AssistantsScreenNav}
        options={{ headerShown: false, title: t("AssistantsTab") }}
      />
      <Tab.Screen
        name="OfflineSearch"
        component={OfflineSearchNav}
        options={{ headerShown: false, title: t("OfflineSearchTabName") }}
      />
      <Tab.Screen name="Settings" component={SettingsScreenNav} options={{ headerShown: false, title: t("SettingTab") }} />
     
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BottomTabNav;
