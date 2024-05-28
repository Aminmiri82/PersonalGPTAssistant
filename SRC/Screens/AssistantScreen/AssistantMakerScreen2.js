import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import Styles from "../../config/Styles";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import * as DocumentPicker from "expo-document-picker";

function AssistantMakerScreen2({ navigation }) {
  const [assistantName, setAssistantName] = useState("pick a model");
  const assistantList = [
    { label: "GPT-3", value: "gpt-3" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
  ];

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
  };
  return (
    <Screen>
      <View style={styles.topContainer}>
        <AppText style={Styles.topTip}>
          choose a model for your assistant
        </AppText>
        <RNPickerSelect
          onValueChange={(value) => setAssistantName(value)}
          items={assistantList}
        />

        <AppText>your assistant is: {assistantName}</AppText>
      </View>
      <View style={styles.middleContainer}>
        <AppText style={Styles.middleTip}>
          if you want to upload files fro the knowedlge base you need to choose
          gpt 4 turbo preview
        </AppText>
      </View>
      <View style={styles.bottomContainer}>
        <AppText style={Styles.bottomTip}>
          upload .pdf .docx and .txt files to your assistant
        </AppText>
      </View>
      <TouchableOpacity onPress={() => console.log("Next")}>
        <View style={styles.doneButtonContainer}>
          <AppText style={styles.doneButtonText}>done</AppText>
        </View>
      </TouchableOpacity>
      <Button title="Select Document" onPress={this._pickDocument} />
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

  middleContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },

  bottomContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
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
});

export default AssistantMakerScreen2;
