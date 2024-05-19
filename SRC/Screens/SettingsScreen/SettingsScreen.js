import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../Components/AppText";
import LanguagesPrompt from "../../Components/SettingsComponents/LanguagesPrompt";
import OpenAIPrompt from "../../Components/SettingsComponents/OpenAIPrompt";
import SettingsItem from "../../Components/SettingsComponents/SettingsItem";
import Icon from "../../Components/Icon";
import { useState } from "react";

function SettingsScreen(props) {
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
    <View style={styles.container}>
      <SettingsItem
        title="OpenAI API Key"
        subTitle={apiKey}
        IconComponent={<Icon iconSet="MCI" name="key"/>}
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
        IconComponent={<Icon iconSet="MCI" name="translate"/>}
        onPress={toggleLanguagePrompt}
      />
      <LanguagesPrompt
        visible={isLanguagePromptVisible}
        onClose={toggleLanguagePrompt}
        onSelectLanguage={handleSelectLanguage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SettingsScreen;
