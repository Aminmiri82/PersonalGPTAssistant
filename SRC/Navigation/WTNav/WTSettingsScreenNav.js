import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../../Screens/WTScreens/WTSettingsScreen/WTSettingsScreen";
import AboutUsScreen from "../../Screens/WTScreens/WTSettingsScreen/WTAboutUsScreen";
import TermsAndConditionsScreen from "../../Screens/WTScreens/WTSettingsScreen/WTTermsAndConditionsScreen";
import PrivacyPolicyScreen from "../../Screens/WTScreens/WTSettingsScreen/WTPrivacyPolicyScreen";
import { useTranslation } from "react-i18next";

const SettingsStack = createNativeStackNavigator();

export default function WTSettingsScreenNav() {
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
