import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import Spinner from "react-native-loading-spinner-overlay";
import RNPickerSelect from "react-native-picker-select";
import AppDocumentPicker from "../../Components/AssistantsComponents/AppDocumentPicker";
import {
  initDB,
  fetchAssistantById,
  insertAssistant,
  deleteAssistantById,
  updateChatItemByAssistantId,
} from "../../database";
import {
  uploadIndividualFiles,
  initializeAssistant,
  addFilesToAssistant,
} from "../../openai-backend/ApiBackEnd";
import { useTranslation } from "react-i18next";

function AssistantEditorScreen2({ navigation, route }) {
  const { t } = useTranslation();
  const { id, name, instructions, imageUri } = route.params;
  const [files, setFiles] = useState([]);
  const [parsedFiles, setParsedFiles] = useState([]);
  const [fileIds, setFileIds] = useState([]);
  const [model, setModel] = useState("GPT-4o-mini");

  const [isInitializing, setIsInitializing] = useState(false);
  const [progressMap, setProgressMap] = useState({});
  const assistantList = [
    { label: "GPT-4o-mini", value: "gpt-4o-mini" },
    { label: "GPT-4o", value: "gpt-4o" },
    { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "GPT-3.5", value: "gpt-3.5-turbo" },
  ];
  const isUploadingRef = useRef(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB();
        const assistant = await fetchAssistantById(id);

        setModel(assistant.model);
        console.log("assistant.model", assistant.model);
        console.log("Raw assistant.files:", assistant.files);

        try {
          // Directly parse the JSON string assuming it's always in the correct format
          const filesArray = JSON.parse(assistant.files);

          console.log("Parsed files array:", filesArray);
          setParsedFiles(filesArray);
        } catch (error) {
          console.error("Error parsing assistant.files:", error.message);
        }
      } catch (error) {
        console.log(
          "Error initializing database or fetching Assistant: ",
          error
        );
      }
    };

    initialize();
  }, [id]);

  useEffect(() => {
    console.log("files given to usestate", files);

    isUploadingRef.current = true;
    console.log("uploading old files");

    // Function to handle file uploads
    const uploadFiles = async () => {
      try {
        await uploadOldFiles(parsedFiles);
      } finally {
        isUploadingRef.current = false;
      }
    };
    console.log("parsed files in second useeffect", parsedFiles);
    uploadFiles();
  }, [parsedFiles]);

  const handleSave = async () => {
    if (!name || !instructions) {
      console.log("Name or instructions are missing");
      return;
    }

    setIsInitializing(true);

    try {
      const assistant = await initializeAssistant({
        name,
        instructions,
        model,
      });

      if (fileIds.length > 0) {
        console.log("Adding files to assistant and creating vector store");
        await addFilesToAssistant(assistant.assistantId, fileIds);
      }

      if (assistant.error) {
        console.log("Error initializing assistant:", assistant.error);
        return;
      }
      console.log("Assistant successfully initialized");
      console.log("calling updateAssistant");
      await deleteAssistantById(id); //deletes old assistant
      await insertAssistant(
        assistant.assistantId,
        name,
        instructions,
        model,
        files,
        imageUri
      ); //inserts into assistant table
      await updateChatItemByAssistantId(id, assistant.assistantId); //updates assistantId in chatItems table
      navigation.navigate("AssistantMenuScreen");
    } catch (error) {
      console.log("Error saving assistant:", error);
    } finally {
      setIsInitializing(false);
    }
  };
  const uploadOldFiles = async (parsedFiles) => {
    console.log("uploading old files");

    try {
      const uploadPromises = parsedFiles.map((file) => {
        console.log("Uploading file:", file, "Files array:", files);
        return handleAddFile(file);
      });

      await Promise.all(uploadPromises);

      console.log("All files have been uploaded.");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  const handleAddFile = async (file) => {
    // Use a unique identifier such as file.uri or a timestamp
    const uniqueId = file.uri || Date.now().toString();
    setFiles((prevFiles) => [...prevFiles, { ...file, id: uniqueId }]);

    try {
      const uploadResponse = await uploadIndividualFiles(file, (progress) =>
        onProgress(uniqueId, progress)
      );
      console.log("Complete upload response:", uploadResponse);

      if (uploadResponse) {
        const fileId = uploadResponse;
        setFileIds((prevFileIds) => [...prevFileIds, fileId]);
        console.log("Upload Complete, File ID:", fileId);
      } else {
        console.error("Upload response is missing file ID:", uploadResponse);
        throw new Error("Upload response does not contain a valid file ID");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  //oh god oh fuck please fix this
  // LOG  Removing file at index: 0
  //LOG  Files: [{"id": "file:///Users/aminmiri/Library/Developer/CoreSimulator/Devices/9BCE7473-F759-42B1-BF12-17FEC2C55D9B/data/Containers/Data/Application/27B93F0C-CF67-4920-AC53-5FC9693895C1/tmp/com.amin04.SRC-Inbox/10MB-TESTFILE.ORG.pdf", "mimeType": "application/pdf", "name": "10MB-TESTFILE.ORG.pdf", "size": 10705702, "uri": "file:///Users/aminmiri/Library/Developer/CoreSimulator/Devices/9BCE7473-F759-42B1-BF12-17FEC2C55D9B/data/Containers/Data/Application/27B93F0C-CF67-4920-AC53-5FC9693895C1/tmp/com.amin04.SRC-Inbox/10MB-TESTFILE.ORG.pdf"}]
  //LOG  File IDs: ["file-NCsWm2Wc7XsgpM9oTFXc0WoX"]
  // it doesnt work when the files are finished uploading in diffrent order
  //oh god oh fuck
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFileIds((prevFileIds) => prevFileIds.filter((_, i) => i !== index));
  };

  const onProgress = (fileId, progress) => {
    setProgressMap((prevMap) => ({
      ...prevMap,
      [fileId]: progress,
    }));
    console.log(`File ID ${fileId}: Progress ${progress}%`);
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
      <Spinner
        visible={isInitializing}
        textContent={"Initializing assistant..."}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.topContainer}>
        <View style={styles.topTipContainer}>
          <AppText style={styles.topTip}>{t("chooseModel")}</AppText>
        </View>
        <View style={styles.topPickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setModel(value)}
            items={assistantList}
            value={model}
          />
        </View>
        <View style={styles.gp4TipContainer}>
          <AppText style={styles.middleTip}>{t("fileUploadReq")}</AppText>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomTipContainer}>
          <AppText style={styles.bottomTip}>{t("fileUpload")}</AppText>
        </View>
        <AppDocumentPicker
          files={files}
          onAddFile={handleAddFile}
          onRemoveFile={handleRemoveFile}
          progressMap={progressMap}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.deleteAssistantButton}
        >
          <AppText style={styles.deleteButtonText}>{t("delete")}</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.doneButton}>
          <AppText style={styles.doneButtonText}>{t("done")}</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    padding: 10,
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
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
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
