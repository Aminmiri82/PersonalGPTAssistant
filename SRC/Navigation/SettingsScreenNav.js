import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../Screens/SettingsScreen/SettingsScreen";
import AboutUsScreen from "../Screens/SettingsScreen/AboutUsScreen";
import TermsAndConditionsScreen from "../Screens/SettingsScreen/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../Screens/SettingsScreen/PrivacyPolicyScreen";
import { useTranslation } from "react-i18next";
import { useTheme } from "../themes/ThemeProvidor"; // Import useTheme

const SettingsStack = createNativeStackNavigator();

export default function SettingsScreenNav() {
  const { t } = useTranslation();
  const { colorsTh } = useTheme(); // Get theme colors

  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorsTh.background, // Set header background based on theme
        },
        headerTintColor: colorsTh.text, // Set header text color based on theme
        headerTitleStyle: {
          fontWeight: "bold", // Optional: Customize the title style
        },
      }}
    >
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: t("SettingsScreen") }}
      />
      <SettingsStack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{ title: t("AboutUsScreen") }}
      />
      <SettingsStack.Screen
        name="TermsAndConditionsScreen"
        component={TermsAndConditionsScreen}
        options={{ title: t("TermsAndConditionsScreen") }}
      />
      <SettingsStack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{ title: t("PrivacyPolicyScreen") }}
      />
    </SettingsStack.Navigator>
  );
}
