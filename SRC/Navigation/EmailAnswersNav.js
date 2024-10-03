import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmailAnswersScreen from "../Screens/EmailAnswersScreen/EmailAnswersScreen";

import { useTranslation } from "react-i18next";
import { useTheme } from "../themes/ThemeProvidor"; // Import useTheme

const EmailAnswersNav = createNativeStackNavigator();

function EmailAnswersScreenNav() {
  const { colorsTh } = useTheme(); // Get theme colors
  const { t } = useTranslation();

  return (
    <EmailAnswersNav.Navigator
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
      <EmailAnswersNav.Screen
        name="EmailAnswersScreen"
        component={EmailAnswersScreen}
        options={{ title: t("EmailAnswersScreen") }}
      />
    </EmailAnswersNav.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EmailAnswersScreenNav;
