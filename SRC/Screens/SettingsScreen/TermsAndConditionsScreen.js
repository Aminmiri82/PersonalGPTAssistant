import React from 'react';
import { View, StyleSheet,Text } from 'react-native';

import AppText from '../../Components/AppText';
import ScrollableAppText from '../../Components/SettingsComponents/ScrollableAppText';
import Screen from "../../Components/Screen";
import { useTranslation } from "react-i18next";
function TermsAndConditionsScreen(props) {
  const { t } = useTranslation();
  return (
    <Screen>
    <View style={styles.container}>
      <Text style={styles.text}>{t("PrivacyPolicyText")}</Text>
    </View>
    </Screen> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen height
    padding: 16, // Adds padding around the container to avoid hugging the sides
    // Optional: a light background color for better readability
  },
  text: {
    fontSize: 16, // Adjusts the font size for readability
    lineHeight: 24, // Increases the space between lines of text
     // Aligns text to the left; change to 'justify' if needed
    color: "#333", // A dark gray color for the text
  },
});

export default TermsAndConditionsScreen;