import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, Button } from "react-native";
import {
  CopilotProvider,
  useCopilot,
  CopilotStep,
  walkthroughable,
} from "react-native-copilot";
import AppText from "../../Components/AppText";
import LanguagesPrompt from "../../Components/SettingsComponents/LanguagesPrompt";

import SettingsItem from "../../Components/SettingsComponents/SettingsItem";
import Icon from "../../Components/Icon";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next";

import { useTheme } from "../../themes/ThemeProvidor";

// Make SettingsItem walkthroughable
const WalkthroughableSettingsItem = walkthroughable(SettingsItem); // you'll need to make stuff walkthroughable, check out SettingsItem.js i had to add a forwardRef thingy to it. idk why vscode was just yelling at me
const WalkthroughableView = walkthroughable(View);

function SettingsScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { start } = useCopilot(); // Get the start function from useCopilot
  const [isLanguagePromptVisible, setLanguagePromptVisible] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");

  const { dark, colorsTh, setScheme } = useTheme();
  const toggleTheme = () => {
    dark ? setScheme("light") : setScheme("dark");
  };

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        let storedLanguage = await SecureStore.getItemAsync("selectedLanguage");

        setSelectedLanguage(storedLanguage);
      } catch (error) {
        console.error("Error retrieving language", error);
      }
    };

    fetchLanguage();
  }, []);

  const toggleLanguagePrompt = () => {
    setLanguagePromptVisible(!isLanguagePromptVisible);
  };

  const handleSelectLanguage = async (lng) => {
    await i18next.changeLanguage(lng);
    await SecureStore.setItemAsync("selectedLanguage", lng);
    setLanguagePromptVisible(false);
    setSelectedLanguage(lng);
  };

  return (
    <View style={[styles.container, { backgroundColor: colorsTh.light }]}>
      <CopilotStep text={t("step20")} order={20} name="step20">
        <WalkthroughableSettingsItem
          title={t("Languages")}
          subTitle={selectedLanguage}
          IconComponent={<Icon iconSet="MCI" name="translate" />}
          onPress={toggleLanguagePrompt}
        />
      </CopilotStep>

      <LanguagesPrompt
        visible={isLanguagePromptVisible}
        onClose={toggleLanguagePrompt}
        onSelectLanguage={handleSelectLanguage}
      />
      <CopilotStep text={t("step21")} order={21} name="step21">
        <WalkthroughableSettingsItem
          title={t("PriPol")}
          IconComponent={<Icon iconSet="MCI" name="file-document" />}
          onPress={() => navigation.navigate("PrivacyPolicyScreen")}
        />
      </CopilotStep>
      <CopilotStep text={t("step22")} order={22} name="step22">
        <WalkthroughableSettingsItem
          title={t("aboutUs")}
          IconComponent={<Icon iconSet="MCI" name="information" />}
          onPress={() => navigation.navigate("AboutUsScreen")}
        />
      </CopilotStep>
      <CopilotStep text="23" order={23} name="step23">
        {/* i'd fix this 23 thing but we're gonna be removing this shit fot the actual release anyways*/}
        <WalkthroughableSettingsItem
          title={t("theme")}
          IconComponent={<Icon iconSet="MCI" name="theme-light-dark" />}
          onPress={toggleTheme}
        />
      </CopilotStep>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorsTh.light,
  },
});

export default SettingsScreen;
