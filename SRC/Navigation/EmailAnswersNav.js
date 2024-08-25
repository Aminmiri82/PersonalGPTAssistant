import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmailAnswersScreen from "../Screens/OfflineSearchScreen/EmailAnswersScreen";

import { useTranslation } from "react-i18next";

const EmailAnswersNav = createNativeStackNavigator();

function EmailAnswersScreenNav() {
  const { t } = useTranslation();

  return (
    <EmailAnswersNav.Navigator>
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
