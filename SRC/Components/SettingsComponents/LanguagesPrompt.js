import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";

import AppText from "../AppText";

function LanguagesPrompt({ visible, onClose, onSelectLanguage }) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onSelectLanguage("English");
            }}
          >
            <AppText style={styles.menuItemAppText}>Java</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onSelectLanguage("Persian");
            }}
          >
            <AppText style={styles.menuItemAppText}>JavaScript</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onSelectLanguage("French");
            }}
          >
            <AppText style={styles.menuItemAppText}>Python</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={onClose}>
            <AppText style={styles.menuItemAppText}>Cancel</AppText>
          </TouchableOpacity>
        </View>
      </View>
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
  menuItem: {
    padding: 15,
  },
  menuItemAppText: {
    fontSize: 18,
  },
});
export default LanguagesPrompt;
