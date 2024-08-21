import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import DocumentPicker from "react-native-document-picker";
import { uploadIndividualFiles } from "../openai-backend/ApiBackEnd";

const DocumentPickerScreen = () => {
  const [fileInfo, setFileInfo] = useState(null);
  const uploadDocument = async (file) => {
    try {
      const { name, size, type, uri } = file;

      // Start the upload process
      const fileId = await uploadIndividualFiles(
        { name, size, mimeType: type, uri },
        (progress) => console.log(`Upload progress: ${progress}%`),
        (fileId, errorMessage) =>
          console.log(`Error uploading file ${fileId}: ${errorMessage}`)
      );

      console.log("File uploaded successfully, ID:", fileId);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log("Document selected:", res);
      setFileInfo(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.log("Unknown error:", err);
        throw err;
      }
    }
  };
  const doTheThing = () => {
    uploadDocument({
      name: "10MB-TESTFILE.ORG.pdf",
      size: 10705702,
      type: "application/pdf",
      uri: "file:///Users/aminmiri/Library/Developer/CoreSimulator/Devices/9BCE7473-F759-42B1-BF12-17FEC2C55D9B/data/Containers/Data/Application/27B93F0C-CF67-4920-AC53-5FC9693895C1/tmp/com.amin04.SRC-Inbox/10MB-TESTFILE.ORG.pdf",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Document Picker Example</Text>
      <Button title="Pick a Document" onPress={pickDocument} />
      {fileInfo && (
        <View style={styles.fileInfo}>
          <Text style={styles.label}>File Name:</Text>
          <Text>{fileInfo[0].name}</Text>
          <Text style={styles.label}>File URI:</Text>
          <Text>{fileInfo[0].uri}</Text>
          <Text style={styles.label}>File Type:</Text>
          <Text>{fileInfo[0].type}</Text>
          <Text style={styles.label}>File Size:</Text>
          <Text>{fileInfo[0].size} bytes</Text>
        </View>
      )}
      <Button title="Upload File" onPress={doTheThing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fileInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default DocumentPickerScreen;
