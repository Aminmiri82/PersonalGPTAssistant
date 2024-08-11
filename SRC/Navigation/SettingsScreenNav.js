import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../Screens/SettingsScreen/SettingsScreen";
import AboutUsScreen from "../Screens/SettingsScreen/AboutUsScreen";
import TermsAndConditionsScreen from "../Screens/SettingsScreen/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../Screens/SettingsScreen/PrivacyPolicyScreen";
import { useTranslation } from "react-i18next";

const SettingsStack = createNativeStackNavigator();

export default function SettingsScreenNav() {
  const { t } = useTranslation();

  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsScreen" // Use static name for the screen
        component={SettingsScreen}
        options={{ title: t("SettingsScreen") }} // Set translated title
      />
      <SettingsStack.Screen
        name="AboutUsScreen" // Use static name for the screen
        component={AboutUsScreen}
        options={{ title: t("AboutUsScreen") }} // Set translated title
      />
      <SettingsStack.Screen
        name="TermsAndConditionsScreen" // Use static name for the screen
        component={TermsAndConditionsScreen}
        options={{ title: t("TermsAndConditionsScreen") }} // Set translated title
      />
      <SettingsStack.Screen
        name="PrivacyPolicyScreen" // Use static name for the screen
        component={PrivacyPolicyScreen}
        options={{ title: t("PrivacyPolicyScreen") }} // Set translated title
      />
    </SettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});
