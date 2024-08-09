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
import languagesList from "../../services/languagesList.json";
import { SafeAreaView } from "react-native-safe-area-context";

function LanguagesPrompt({ visible, onClose, onSelectLanguage }) {
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
              {/* <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onSelectLanguage("en");
                }}
              >
                <AppText style={styles.menuItemAppText}>English</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onSelectLanguage("fa");
                }}
              >
                <AppText style={styles.menuItemAppText}>Persian</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onSelectLanguage("fr");
                }}
              >
                <AppText style={styles.menuItemAppText}>French</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                <AppText style={styles.menuItemAppText}>Cancel</AppText>
              </TouchableOpacity>
            </View> */}
              <View style={styles.languagesList}>
                <FlatList
                  data={Object.keys(languageResources)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.languageButton}
                      onPress={() => onSelectLanguage(item)}
                    >
                      <Text style={styles.lngName}>
                        {languagesList[item].nativeName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
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
    // justifyContent: "center",
    // alignItems: "center",
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
  menuItem: {
    padding: 15,
  },
  menuItemAppText: {
    fontSize: 18,
  },
  languagesList: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#6258e8",
  },
  languageButton: {
    padding: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  lngName: {
    fontSize: 16,
    color: "white",
  },
});
export default LanguagesPrompt;
