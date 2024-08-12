import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfflineSearchScreen from "../Screens/OfflineSearchScreen/OfflineSearchScreen";

import AppButton from "../Components/AppButton";

import { useTranslation } from "react-i18next";

const OfflineSearchNav = createNativeStackNavigator();

function OfflineSearchScreenNav() {
  const { t } = useTranslation();



  return (
    <OfflineSearchNav.Navigator>
      <OfflineSearchNav.Screen
        name="OfflineSearchScreen" // Use static names for screens
        component={OfflineSearchScreen}
        options={{ title: t("OfflineSearchScreenName") }} // Optional: Add translation if needed
      />
    </OfflineSearchNav.Navigator>
   
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OfflineSearchScreenNav;
