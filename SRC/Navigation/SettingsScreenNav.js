import { View, Text } from "react-native";
import React from "react";

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
        name={t("SettingsScreen")}
        component={SettingsScreen}
        options={{}}
      />
      <SettingsStack.Screen
        name={t("AboutUsScreen")}
        component={AboutUsScreen}
      />
      <SettingsStack.Screen
        name={t("TermsAndConditionsScreen")}
        component={TermsAndConditionsScreen}
      />
      <SettingsStack.Screen
        name={t("PrivacyPolicyScreen")}
        component={PrivacyPolicyScreen}
      />
    </SettingsStack.Navigator>
  );
}
