import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Text,
} from "react-native";
import AppText from "../AppText";
import i18next, { languageResources } from "../../services/i18next";
import { useTranslation } from "react-i18next";
import languagesList from "../../services/languagesList.json";
import { SafeAreaView } from "react-native-safe-area-context";

function LanguagesPrompt({ visible, onClose, onSelectLanguage }) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
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
                <FlatList
                  data={Object.keys(languageResources)}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.languageButton}
                      onPress={() => onSelectLanguage(item)}
                    >
                      <Text style={styles.lngName}>
                        {languagesList[item]?.nativeName || item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                >
                  <Text style={styles.cancelText}>{t("Cancel")}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
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
  languageButton: {
    padding: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: "black",
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "#007BFF",
  },
});

export default LanguagesPrompt;
