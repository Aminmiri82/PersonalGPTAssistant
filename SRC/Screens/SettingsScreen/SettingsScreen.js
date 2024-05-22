import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../Components/AppText";
import LanguagesPrompt from "../../Components/SettingsComponents/LanguagesPrompt";
import OpenAIPrompt from "../../Components/SettingsComponents/OpenAIPrompt";
import SettingsItem from "../../Components/SettingsComponents/SettingsItem";
import Icon from "../../Components/Icon";

import Screen from "../../Components/Screen";


import { useState } from "react";

function SettingsScreen({navigation, route}) {
  const [isLanguagePromptVisible, setLanguagePromptVisible] = useState(false);
  const [isAPIPromptVisible, setAPIPromptVisible] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
  const [apiKey, setApiKey] = useState("Enter API Key");

  const toggleLanguagePrompt = () => {
    setLanguagePromptVisible(!isLanguagePromptVisible);
  };

  const toggleAPIPrompt = () => {
    setAPIPromptVisible(!isAPIPromptVisible);
  };

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setLanguagePromptVisible(false);
  };

  const handleSetAPIKey = (key) => {
    setApiKey(key);
    setAPIPromptVisible(false);
  };

  return (
    <>
      <Screen>
      <View style={styles.container}>
        <SettingsItem
          title="OpenAI API Key"
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
          title="Languages"
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
          title="Terms and Conditions"
          IconComponent={<Icon iconSet="MCI" name="file-document" />}
          onPress={() => navigation.navigate("TermsAndConditionsScreen")}
        />
        <SettingsItem
          title="Privacy Policy"
          IconComponent={<Icon iconSet="MCI" name="file-document" />}
          onPress={() => navigation.navigate("PrivacyPolicyScreen")}
        />
        <SettingsItem
          title="About Us"
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
    backgroundColor: "#f8f8f8"
  },
});

export default SettingsScreen;
