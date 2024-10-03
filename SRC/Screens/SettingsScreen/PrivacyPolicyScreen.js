import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../../Components/Screen";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../themes/ThemeProvidor";

function PrivacyPolicyScreen(props) {
  const { t } = useTranslation();
  const { colorsTh } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colorsTh.background }]}>
      <Text style={[styles.text, { color: colorsTh.text }]}>
        {t("PrivacyPolicyText")}
      </Text>
    </View>
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
  },
});

export default PrivacyPolicyScreen;
