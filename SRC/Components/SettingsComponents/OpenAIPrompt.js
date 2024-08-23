import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next";

function OpenAIPrompt({ visible, onClose, onSumbit }) {
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    onSumbit(inputValue);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalBackground}>
        <TouchableWithoutFeedback>
        <View style={styles.menuContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("enterAPIKey")}
            onChangeText={(text) => setInputValue(text)}
            onSubmitEditing={handleSubmit}
          />
          <Button title={t("Save")} onPress={handleSubmit} />
        </View>
        </TouchableWithoutFeedback>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default OpenAIPrompt;
