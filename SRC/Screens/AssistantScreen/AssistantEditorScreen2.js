import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  ScrollView,
} from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import Styles from "../../config/Styles";
import RNPickerSelect from "react-native-picker-select";
import * as DocumentPicker from "expo-document-picker";
import AppDocumentPicker from "../../Components/AssistantsComponents/AppDocumentPicker";
import {
  fetchAssistantById,
  updateAssistant,
  deleteAssistantById,
} from "../../database";

//info is the stuff that is saved in the database and you edit it here
function AssistantEditorScreen2({ navigation, info, route }) {
  const { id } = route.params;
  const { name } = route.params;
  const { instructions } = route.params;
  // console.log(id);
  // console.log(name);
  const [model, setModel] = useState("pick a model");
  const [files, setFiles] = useState([]);
  const assistantList = [
    { label: "GPT-4o-mini", value: "gpt-4o-mini" },
    { label: "GPT-4o", value: "gpt-4o" },
    { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "GPT-3.5", value: "gpt-3.5-turbo" },
  ];

  useEffect(() => {
    fetchAssistantById(id)
      .then((assistant) => {
        setModel(assistant.model);
        console.log(assistant.model);
        setFiles(JSON.parse(assistant.files));
      })
      .catch((error) => {
        console.log("Error fetching Assistant: ", error);
      });
  }, [id]);

  const handleSave = () => {
    updateAssistant(id, name, instructions, model, files)
      .then(() => {
        navigation.navigate("AssistantMenuScreen");
      })
      .catch((error) => {
        console.log("Error updating assistant: ", error);
      });
  };

  const handleAddFile = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDelete = () => {
    deleteAssistantById(id)
      .then(() => {
        navigation.navigate("AssistantMenuScreen"); // Navigate back to the assistant menu
      })
      .catch((error) => {
        console.log("Error deleting assistant: ", error);
      });
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
            onValueChange={(value) => setModel(value)}
            items={assistantList}
            value={model}
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
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.deleteAssistantButton}
        >
          <AppText style={styles.deleteButtonText}>delete</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.doneButton}>
          <AppText style={styles.doneButtonText}>Done</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    padding: 10,
    // borderColor: "blue",
    // borderWidth: 1,
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
    width: "100%",
    marginTop: 10,
    height: "50%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
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
    marginTop: 10,
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
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  deleteAssistantButton: {
    backgroundColor: colors.deleteRed,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2, // For a slight shadow effect
    marginRight: 10, // Add margin to the right for spacing
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  doneButton: {
    backgroundColor: colors.niceBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    marginLeft: 10,
  },
  doneButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AssistantEditorScreen2;
