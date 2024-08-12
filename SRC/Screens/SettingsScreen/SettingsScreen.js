import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
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

function SettingsScreen({ navigation, route }) {
  const { t } = useTranslation();

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
    setApiKey(key.slice(7, 14));
    saveApiKey(key);
    console.log(key);
  };

  return (
    <>
      <Screen>
        <View style={styles.container}>
          <SettingsItem
            title={t("apikey")}
            subTitle={apiKey}
            IconComponent={<Icon iconSet="MCI" name="key" />}
            onPress={toggleAPIPrompt}
          />
          <OpenAIPrompt
            visible={isAPIPromptVisible}
            onClose={toggleAPIPrompt}
            onSumbit={handleSetAPIKey}
          />
          <SettingsItem
            title={t("Languages")}
            subTitle={selectedLanguage}
            IconComponent={<Icon iconSet="MCI" name="translate" />}
            onPress={toggleLanguagePrompt}
          />
          <LanguagesPrompt
            visible={isLanguagePromptVisible}
            onClose={toggleLanguagePrompt}
            onSelectLanguage={handleSelectLanguage}
          />
          <SettingsItem
            title={t("PriPol")}
            IconComponent={<Icon iconSet="MCI" name="file-document" />}
            onPress={() => navigation.navigate("PrivacyPolicyScreen")}
          />
          <SettingsItem
            title={t("aboutUs")}
            IconComponent={<Icon iconSet="MCI" name="information" />}
            onPress={() => navigation.navigate("AboutUsScreen")}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});

export default SettingsScreen;
