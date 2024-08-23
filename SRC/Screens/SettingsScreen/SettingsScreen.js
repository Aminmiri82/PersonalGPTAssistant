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
import OpenAIPrompt from "../../Components/SettingsComponents/OpenAIPrompt";
import SettingsItem from "../../Components/SettingsComponents/SettingsItem";
import Icon from "../../Components/Icon";
import { OPENAI_API_KEY } from "@env";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next";
import Screen from "../../Components/Screen";

// Make SettingsItem walkthroughable
const WalkthroughableSettingsItem = walkthroughable(SettingsItem); // you'll need to make stuff walkthroughable, check out SettingsItem.js i had to add a forwardRef thingy to it. idk why vscode was just yelling at me

function SettingsScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { start } = useCopilot(); // Get the start function from useCopilot
  const [isLanguagePromptVisible, setLanguagePromptVisible] = useState(false);
  const [isAPIPromptVisible, setAPIPromptVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
  const [apiKey, setApiKey] = useState("Enter API Key");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        let storedKey = await SecureStore.getItemAsync("apiKey");
        let storedLanguage = await SecureStore.getItemAsync("selectedLanguage");

        if (storedKey) {
          setApiKey(storedKey.slice(7, 14));
        } else if (OPENAI_API_KEY) {
          setApiKey(OPENAI_API_KEY.slice(7, 14));
        }
        setSelectedLanguage(storedLanguage);
      } catch (error) {
        console.error("Error retrieving API key", error);
      }
    };

    fetchApiKey();
  }, []);

  const toggleLanguagePrompt = () => {
    setLanguagePromptVisible(!isLanguagePromptVisible);
  };

  const toggleAPIPrompt = () => {
    setAPIPromptVisible(!isAPIPromptVisible);
  };

  const handleSelectLanguage = async (lng) => {
    await i18next.changeLanguage(lng);
    await SecureStore.setItemAsync("selectedLanguage", lng);
    setLanguagePromptVisible(false);
    setSelectedLanguage(lng);
  };

  const saveApiKey = async (key) => {
    try {
      await SecureStore.setItemAsync("apiKey", key);
      console.log("API key saved successfully");
      console.log(key);
      console.log(await SecureStore.getItemAsync("apiKey"));
    } catch (error) {
      console.error("Error saving API key", error);
      Alert.alert("Error", "Failed to save API key");
    }
  };

  const handleSetAPIKey = (key) => {
    if (key.length === 56) {
      setApiKey(key.slice(7, 14));
      saveApiKey(key);
      console.log(key);
    } else {
      Alert.alert(t("error"), t("invalidAPIKey"));
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <CopilotStep text="Set your API Key here" order={7} name="apiKey">
          <WalkthroughableSettingsItem
            title={t("apikey")}
            subTitle={apiKey}
            IconComponent={<Icon iconSet="MCI" name="key" />}
            onPress={toggleAPIPrompt}
          />
        </CopilotStep>

        <OpenAIPrompt
          visible={isAPIPromptVisible}
          onClose={toggleAPIPrompt}
          onSumbit={handleSetAPIKey}
        />

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
