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

function AssistantMakerScreen2({ navigation }) {
  const [assistantName, setAssistantName] = useState("pick a model");
  const assistantList = [
    { label: "GPT-3", value: "gpt-3" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
  ];

  const [files, setFiles] = useState([]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (result.canceled === false) {
        console.log("Picked file:", result);
        // Use a placeholder image for the thumbnail
        const fileWithPlaceholder = {
          ...result,
          thumbnail: "https://via.placeholder.com/80",
        };
        setFiles((prevFiles) => [...prevFiles, fileWithPlaceholder]);
      }
    } catch (err) {
      console.error("Error picking document: ", err);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
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
        <FlatList
          data={files}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({ item, index }) => (
            <View style={styles.fileContainer}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
              <Text style={styles.fileName}>{item.name}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFile(index)}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity style={styles.addButton} onPress={pickDocument}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.popToTop("AssistantMenuScreen")}>
          <View style={styles.doneButtonContainer}>
            <AppText style={styles.doneButtonText}>done</AppText>
          </View>
        </TouchableOpacity>
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
  fileContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    position: "relative",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: 80,
    height: 80,
  },
  fileName: {
    textAlign: "center",
    marginTop: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
  },
});

export default AssistantMakerScreen2;
