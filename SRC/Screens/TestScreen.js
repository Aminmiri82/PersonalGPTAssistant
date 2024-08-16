import React, { useState } from "react";
import { View, Button, Text, ActivityIndicator, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Upload from "react-native-background-upload";

const UploadScreen = () => {
  const [fileUri, setFileUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled && result.assets.length > 0) {
        const file = result.assets[0];
        setFileUri(file.uri);
      } else {
        Alert.alert("No file selected", "Please select a file.");
      }
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const uploadFile = async () => {
    if (!fileUri) {
      Alert.alert("No file selected", "Please select a file first.");
      return;
    }

    setUploading(true);

    const options = {
      url: "https://httpbin.org/post", // Test URL for uploading files
      path: fileUri,
      method: "POST",
      type: "multipart",
      field: "file", // Form field name for the file
      notification: {
        enabled: true, // Only Android
      },
      useUtf8Charset: true, // Only Android
    };

    try {
      const uploadId = await Upload.startUpload(options);
      console.log("Upload started with ID:", uploadId);

      Upload.addListener("progress", uploadId, (data) => {
        setUploadProgress(data.progress);
        console.log(`Progress: ${data.progress}%`);
      });

      Upload.addListener("error", uploadId, (data) => {
        console.error(`Error: ${data.error}`);
        Alert.alert("Upload failed", "An error occurred while uploading.");
        setUploading(false);
      });

      Upload.addListener("cancelled", uploadId, () => {
        console.log("Upload cancelled");
        Alert.alert("Upload cancelled", "The upload was cancelled.");
        setUploading(false);
      });

      Upload.addListener("completed", uploadId, (data) => {
        console.log("Upload completed:", data);
        Alert.alert("Upload successful", "Your file has been uploaded.");
        setUploading(false);
        setFileUri(null); // Reset file URI after successful upload
      });
    } catch (error) {
      console.error("Error starting upload:", error);
      Alert.alert(
        "Upload failed",
        "An error occurred while starting the upload."
      );
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pick a file" onPress={pickFile} />
      {fileUri && (
        <>
          <Text>Selected file: {fileUri}</Text>
          <Button title="Upload file" onPress={uploadFile} />
        </>
      )}
      {uploading && (
        <View style={{ marginTop: 20 }}>
          <Text>Uploading: {Math.round(uploadProgress)}%</Text>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default UploadScreen;
