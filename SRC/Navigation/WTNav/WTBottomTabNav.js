import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../../Components/Icon";
import WTChatScreenNav from "./WTChatScreenNav";
import WTSettingsScreenNav from "./WTSettingsScreenNav";
import WTAssistantsScreenNav from "./WTAssistantsScreenNav";
import WTOfflineSearchScreenNav from "./WTOfflineSearchNav";


import { useTranslation } from "react-i18next";
import { CopilotProvider } from "react-native-copilot";

const Tab = createBottomTabNavigator();
function WTBottomTabNav() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSet = "MCI"; // Assuming you have different icon sets to choose from

          if (route.name === "WTChat") {
            iconName = focused ? "chat" : "chat-outline";
          } else if (route.name === "WTAssistants") {
            iconName = focused ? "robot" : "robot-outline";
          } else if (route.name === "WTSettings") {
            iconName = focused ? "cog" : "cog-outline";
          } else if (route.name === "WTOfflineSearch") {
            iconName = focused ? "file-search" : "file-search-outline";
          }

          return (
            <Icon name={iconName} iconSet={iconSet} color={color} size={size} />
          );
        },
      })}
    >
      <Tab.Screen name="WTChat" component={WTChatScreenNav} options={{ headerShown: false, title: t("ChatTab") }} />
      <Tab.Screen name="WTAssistants" component={WTAssistantsScreenNav} options={{ headerShown: false, title: t("AssistantTab") }} />
      <Tab.Screen name="WTOfflineSearch" component={WTOfflineSearchScreenNav} options={{ headerShown: false, title: t("OfflineSearchTab") }} />
      <Tab.Screen name="WTSettings" component={WTSettingsScreenNav} options={{ headerShown: false, title: t("SettingTab") }} />
      
     
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WTBottomTabNav;
