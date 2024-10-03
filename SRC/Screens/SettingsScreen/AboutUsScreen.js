import React from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import ScrollableAppText from "../../Components/SettingsComponents/ScrollableAppText";
import EmailLink from "../../Components/SettingsComponents/EmailLink";
import Materialcomunityicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import Screen from "../../Components/Screen";
import { useTheme } from "../../themes/ThemeProvidor";

function AboutUsScreen(props) {
  const { t } = useTranslation();
  const { colorsTh } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colorsTh.background }]}>
      <Text style={[styles.text, { color: colorsTh.text }]}>
        {t("AboutUsScreenScreenCredits")}
      </Text>
      <Text></Text>
      <Text style={[styles.text, { color: colorsTh.text }]}>
        {t("AboutUsScreenScreenOpenSource")}
      </Text>
      <Text
        style={{ color: colorsTh.blue }}
        onPress={() =>
          Linking.openURL("https://github.com/Aminmiri82/lawChatbot")
        }
      >
        {t("AboutUsScreenScreenGitHubLink")}
      </Text>
      <Text></Text>
      <Text style={[styles.text, { color: colorsTh.text }]}>
        {t("AboutUsScreenScreenSupport")}
      </Text>
      <Text
        style={{ color: colorsTh.blue }}
        onPress={() => Linking.openURL("mailto:miri.amin96@gmail.com")}
      >
        {t("AboutUsScreenScreenSupportLink")}
      </Text>
      <Text></Text>
      <Text style={[styles.text, { color: colorsTh.text }]}>
        {t("AboutUsScreenScreenFindUs")}
      </Text>
      <Text></Text>
      <Text
        style={{ color: colorsTh.blue }}
        onPress={() => Linking.openURL("mailto:miri.amin96@gmail.com")}
      >
        {t("AboutUsScreenScreenFindUsAmin")}
      </Text>

      <Text
        style={{ color: colorsTh.blue }}
        onPress={() => Linking.openURL("mailto:aliradmard5@gmail.com")}
      >
        {t("AboutUsScreenScreenFindUsAli")}
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
    // color: "#333", // A dark gray color for the text
  },
});

export default AboutUsScreen;
