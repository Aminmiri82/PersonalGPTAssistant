import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WTSearchScreen from "../../Screens/WTScreens/WTOfflineSearchScreen/WTOfflineSearchScreen";

import AppButton from "../../Components/AppButton";

import { useTranslation } from "react-i18next";

const OfflineSearchNav = createNativeStackNavigator();

function WTOfflineSearchScreenNav() {
  const { t } = useTranslation();



  return (
    <OfflineSearchNav.Navigator>
      <OfflineSearchNav.Screen
        name="WTOfflineSearchScreen" // Use static names for screens
        component={WTSearchScreen}
        options={{ title: t("OfflineSearchScreenName") }} // Optional: Add translation if needed
      />
    </OfflineSearchNav.Navigator>
   
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WTOfflineSearchScreenNav;
