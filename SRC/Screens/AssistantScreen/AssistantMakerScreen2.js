import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import RNPickerSelect from "react-native-picker-select";
import AppDocumentPicker from "../../Components/AssistantsComponents/AppDocumentPicker";
import {
  uploadIndividualFiles,
  initializeAssistant,
  addFilesToAssistant,
} from "../../openai-backend/ApiBackEnd";
import AppButton from "../../Components/AppButton";
import { insertAssistant, initDB } from "../../database";
import Spinner from "react-native-loading-spinner-overlay";
import { useTranslation } from "react-i18next";
import { CopilotStep, useCopilot, walkthroughable } from "react-native-copilot";

const WalkthroughableView = walkthroughable(View);

function AssistantMakerScreen2({ navigation, route }) {
  const { t } = useTranslation();
  const { name, instructions, imageUri } = route.params;
  const [files, setFiles] = useState([]);
  const [fileIds, setFileIds] = useState([]);
  const [model, setModel] = useState("GPT-4o-mini");
  const [isUploading, setIsUploading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [progressMap, setProgressMap] = useState({});
  const [uploadCount, setUploadCount] = useState(0);

  const assistantList = [
    { label: "GPT-4o-mini", value: "gpt-4o-mini" },
    { label: "GPT-4o", value: "gpt-4" },
    { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "GPT-3.5", value: "gpt-3.5-turbo" },
  ];

  useEffect(() => {
    initDB().catch((error) => {
      console.log("Error initializing database: ", error);
    });
  }, []);

  const handleAddFile = async (file) => {
    console.log("File URI:", file);
    const uniqueId = file.uri || Date.now().toString();
    console.log("Unique ID:", uniqueId);
    setFiles((prevFiles) => [...prevFiles, { ...file, id: uniqueId }]);
    setUploadCount((prev) => prev + 1);
    setIsUploading(true);

    try {
      const fileId = await uploadIndividualFiles(
        file,
        (progress) => onProgress(uniqueId, progress),
        reportError
      );

      // Update fileIds state with the returned fileId
      setFileIds((prevFileIds) => [...prevFileIds, fileId]);
    } catch (error) {
      console.error("Error in handleAddFile:", error);
    } finally {
      setUploadCount((prev) => prev - 1);
    }
  };

  const reportError = (fileId, errorMessage) => {
    Alert.alert(
      "Upload Failed",
      `File upload failed: ${errorMessage}`,
      [
        {
          text: "Retry",
          onPress: () => {
            const failedFile = files.find((file) => file.id === fileId);
            if (failedFile) {
              handleAddFile(failedFile); // Retry the failed upload
            }
          },
        },
        {
          text: "Delete",
          onPress: () => handleRemoveFile(fileId),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFileIds((prevFileIds) => prevFileIds.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (uploadCount === 0) {
      setIsUploading(false);
    }
  }, [uploadCount]);

  const onProgress = (fileId, progress) => {
    setProgressMap((prevMap) => ({
      ...prevMap,
      [fileId]: progress,
    }));
    console.log(`Progress ${progress}%`);
  };

  const handleSave = async () => {
    if (isUploading) {
      Alert.alert(t("uploadInProgress"), t("pleaseWait"));
      return;
    }

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

      await insertAssistant(
        assistant.assistantId,
        name,
        instructions,
        model,
        files,
        imageUri
      );
      navigation.navigate("AssistantMenuScreen");
    } catch (error) {
      console.log("Error saving assistant:", error);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <Screen>
      <Spinner
        visible={isInitializing}
        textContent="Initializing assistant..."
        textStyle={styles.spinnerTextStyle}
      />
      <CopilotStep
        text="You can choose the model you want to use for your assistant."
        order={15}
        name="step15"
      >
        <WalkthroughableView style={styles.topContainer}>
          <View style={styles.topTipContainer}>
            <AppText style={styles.topTip}>{t("chooseModel")}</AppText>
          </View>
          <View style={styles.topPickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => setModel(value)}
              items={assistantList}
            />
          </View>
          <View style={styles.gp4TipContainer}>
            <AppText style={styles.middleTip}>{t("fileUploadReq")}</AppText>
          </View>
        </WalkthroughableView>
      </CopilotStep>
      <CopilotStep
        text="You can upload files to your assistant."
        order={16}
        name="step16"
      >
        <WalkthroughableView style={styles.bottomContainer}>
          <View style={styles.bottomTipContainer}>
            <AppText style={styles.bottomTip}>{t("fileUpload")}</AppText>
          </View>
          <AppDocumentPicker
            files={files}
            onAddFile={handleAddFile}
            onRemoveFile={handleRemoveFile}
            progressMap={progressMap}
          />
        </WalkthroughableView>
      </CopilotStep>
      <AppButton
        title={t("saveAssistant")}
        onPress={handleSave}
        style={styles.nextButton}
        textStyle={styles.nextButtonText}
      />
      <Text>{fileIds}</Text>
      <CopilotStep text="This is the settings tab" order={17} name="step17">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>
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
  nextButton: {
    backgroundColor: colors.niceBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    marginLeft: "auto",
    marginRight: 20,
    width: "30%",
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default AssistantMakerScreen2;
