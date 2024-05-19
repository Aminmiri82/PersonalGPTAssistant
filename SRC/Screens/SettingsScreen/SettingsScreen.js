import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../Components/AppText";
import LanguagesPrompt from "../../Components/SettingsComponents/LanguagesPrompt";
import SettingsItem from "../../Components/SettingsComponents/SettingsItem";
import Icon from "../../Components/Icon";
import { useState } from "react";

function SettingsScreen(props) {
  const [isLanguagePromptVisible, setLanguagePromptVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");

  const toggleLanguagePrompt = () => {
    setLanguagePromptVisible(!isLanguagePromptVisible);
  };
  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setLanguagePromptVisible(false); //it makes SURE the prompt is closed
  };

  return (
    <View style={styles.container}>
      <AppText>Settings</AppText>
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
