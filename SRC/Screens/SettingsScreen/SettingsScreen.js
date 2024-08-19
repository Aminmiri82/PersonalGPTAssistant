import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { AppTour, AppTourSequence, AppTourView } from "react-native-app-tour";
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

  // Refs to hold the components to be highlighted
  const apiKeyRef = useRef();
  const languageRef = useRef();

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
    } catch (error) {
      console.error("Error saving API key", error);
      Alert.alert("Error", "Failed to save API key");
    }
  };

  const handleSetAPIKey = (key) => {
    setApiKey(key.slice(7, 14));
    saveApiKey(key);
  };

  // Start the tour
  const startTour = () => {
    const appTourTargets = [];

    if (apiKeyRef.current) {
      appTourTargets.push(
        AppTourView.for(apiKeyRef.current, {
          hintText: "Set your API key here",
        })
      );
    }

    if (languageRef.current) {
      appTourTargets.push(
        AppTourView.for(languageRef.current, {
          hintText: "Choose your language here",
        })
      );
    }

    const sequence = new AppTourSequence();

    appTourTargets.forEach((target) => {
      sequence.add(target);
    });

    AppTour.ShowSequence(sequence);
  };

  useEffect(() => {
    startTour();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <AppTourView ref={apiKeyRef} style={{ padding: 10 }}>
          <SettingsItem
            title={t("apikey")}
            subTitle={apiKey}
            IconComponent={<Icon iconSet="MCI" name="key" />}
            onPress={toggleAPIPrompt}
          />
        </AppTourView>
        <OpenAIPrompt
          visible={isAPIPromptVisible}
          onClose={toggleAPIPrompt}
          onSumbit={handleSetAPIKey}
        />
        <AppTourView ref={languageRef} style={{ padding: 10 }}>
          <SettingsItem
            title={t("Languages")}
            subTitle={selectedLanguage}
            IconComponent={<Icon iconSet="MCI" name="translate" />}
            onPress={toggleLanguagePrompt}
          />
        </AppTourView>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
});

export default SettingsScreen;
