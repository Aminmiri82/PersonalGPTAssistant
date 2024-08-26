import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Button } from "react-native";
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
import Screen from "../../Components/Screen";

// Make SettingsItem walkthroughable
const WalkthroughableSettingsItem = walkthroughable(SettingsItem); // you'll need to make stuff walkthroughable, check out SettingsItem.js i had to add a forwardRef thingy to it. idk why vscode was just yelling at me
const WalkthroughableView = walkthroughable(View);

function SettingsScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { start } = useCopilot(); // Get the start function from useCopilot
  const [isLanguagePromptVisible, setLanguagePromptVisible] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");

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
    <Screen>
      <View style={styles.container}>
        <CopilotStep text="Set your API Key here" order={7} name="apiKey">
          <WalkthroughableView></WalkthroughableView>
        </CopilotStep>

        <CopilotStep text="Choose your language" order={8} name="language">
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
        <WalkthroughableSettingsItem
          title={t("TC")}
          IconComponent={<Icon iconSet="MCI" name="file-document" />}
          onPress={() => navigation.navigate("TermsAndConditionsScreen")}
        />
        <WalkthroughableSettingsItem
          title={t("PriPol")}
          IconComponent={<Icon iconSet="MCI" name="file-document" />}
          onPress={() => navigation.navigate("PrivacyPolicyScreen")}
        />
        <WalkthroughableSettingsItem
          title={t("aboutUs")}
          IconComponent={<Icon iconSet="MCI" name="information" />}
          onPress={() => navigation.navigate("AboutUsScreen")}
        />
        <Button title="Start tutorial" onPress={() => start()} />
        <CopilotStep text="This is it" order={9} name="step7">
          <View></View>
        </CopilotStep>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});

export default SettingsScreen;
