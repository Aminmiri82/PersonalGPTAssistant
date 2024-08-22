import React from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import { useTranslation } from "react-i18next";
import Screen from "../../../Components/Screen";

function AboutUsScreen(props) {
  const { t } = useTranslation();
  return (
    <Screen>
      <View style={styles.container}>
        <Text>{t("AboutUsScreenScreenCredits")}</Text>
        <Text></Text>
        <Text>{t("AboutUsScreenScreenOpenSource")}</Text>
        <Text
          style={styles.hlink}
          onPress={() =>
            Linking.openURL("https://github.com/Aminmiri82/lawChatbot")
          }
        >
          {t("AboutUsScreenScreenGitHubLink")}
        </Text>
        <Text></Text>
        <Text>{t("AboutUsScreenScreenSupport")}</Text>
        <Text
          style={styles.hlink}
          onPress={() => Linking.openURL("mailto:miri.amin96@gmail.com")}
        >
          {t("AboutUsScreenScreenSupportLink")}
        </Text>
        <Text></Text>
        <Text>{t("AboutUsScreenScreenFindUs")}</Text>
        <Text></Text>
        <Text
          style={styles.hlink}
          onPress={() => Linking.openURL("mailto:miri.amin96@gmail.com")}
        >
          {t("AboutUsScreenScreenFindUsAmin")}
        </Text>

        <Text
          style={styles.hlink}
          onPress={() => Linking.openURL("mailto:aliradmard5@gmail.com")}
        >
          {t("AboutUsScreenScreenFindUsAli")}
        </Text>
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
  hlink: {
    color: "blue",
  },
});

export default AboutUsScreen;
