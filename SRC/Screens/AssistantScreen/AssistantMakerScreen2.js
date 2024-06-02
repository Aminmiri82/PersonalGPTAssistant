import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import Styles from "../../config/Styles";
import RNPickerSelect from "react-native-picker-select";
import * as DocumentPicker from "expo-document-picker";
import AppDocumentPicker from "../../Components/AssistantsComponents/AppDocumentPicker";

function AssistantMakerScreen2({ navigation }) {
  const [assistantName, setAssistantName] = useState("pick a model");
  const assistantList = [
    { label: "GPT-3", value: "gpt-3" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
  ];
  const [files, setFiles] = useState([]);

  const handleAddFile = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Screen>
      <View style={styles.topContainer}>
        <View style={styles.topTipContainer}>
          <AppText style={styles.topTip}>
            choose a model for your assistant
          </AppText>
        </View>
        <View style={styles.topPickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setAssistantName(value)}
            items={assistantList}
          />
        </View>
        <View style={styles.gp4TipContainer}>
          <AppText style={styles.middleTip}>
            if you want to upload files fro the knowedlge base you need to
            choose gpt 4 turbo preview
          </AppText>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomTipContainer}>
          <AppText style={styles.bottomTip}>
            upload .pdf .docx and .txt files to your assistant
          </AppText>
        </View>
        <AppDocumentPicker
          files={files}
          onAddFile={handleAddFile}
          onRemoveFile={handleRemoveFile}
        />
        <View style={styles.ButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.popToTop("AssistantMenuScreen")}
          style={styles.doneButton}
        >
          <AppText style={styles.doneButtonText}>Done</AppText>
        </TouchableOpacity>
      </View>
      </View>
      
    </Screen>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    borderColor: "blue",
    borderWidth: 1,
  },
  topTipContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  topTip: {
    color: colors.dark,
    fontSize: 30,
    textAlign: "center",
  },
  topPickerContainer: {
    width: "80%",
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },

  gp4TipContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  middleTip: {
    color: colors.dark,
    fontSize: 16,
    textAlign: "center",
  },

  bottomContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  bottomTipContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTip: {
    color: colors.dark,
    fontSize: 18,
    textAlign: "center",
  },
  doneButtonContainer: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  ButtonContainer: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  doneButton: {
    backgroundColor: colors.niceBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2, // For a slight shadow effect
    marginLeft: 10, // Add margin to the left for spacing
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AssistantMakerScreen2;
