import React from "react";
import { View, Button, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const UPLOAD_URL = "https://api.openai.com/v1/uploads";
const COMPLETE_UPLOAD_URL =
  "https://api.openai.com/v1/uploads/{upload_id}/complete";
const API_KEY = "fuck no";

const createUpload = async (filename, fileSize, mimeType) => {
  const response = await fetch(UPLOAD_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filename,
      purpose: "fine-tune",
      bytes: fileSize,
      mime_type: mimeType,
    }),
  });
  return response.json();
};

const uploadFile = async (uploadId, fileUri, mimeType, filename) => {
  const formData = new FormData();
  formData.append("data", {
    uri: fileUri,
    type: mimeType,
    name: filename,
  });

  const response = await fetch(`${UPLOAD_URL}/${uploadId}/parts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  return response.json();
};

const completeUpload = async (uploadId, partIds) => {
  const response = await fetch(
    COMPLETE_UPLOAD_URL.replace("{upload_id}", uploadId),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ part_ids: partIds }),
    }
  );
  return response.json();
};

export default function App() {
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (
        result.type === "cancel" ||
        !result.assets ||
        result.assets.length === 0
      )
        return;

      const { name, size, mimeType, uri } = result.assets[0];
      const upload = await createUpload(name, size, mimeType);

      if (!upload.id) {
        throw new Error("Failed to create upload");
      }

      const partResponse = await uploadFile(upload.id, uri, mimeType, name);
      const partIds = [partResponse.id];

      if (!partResponse.id) {
        throw new Error("Failed to upload part");
      }

      const completion = await completeUpload(upload.id, partIds);
      Alert.alert("Upload Complete", `File ID: ${completion.file.id}`);
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
    }
  };

  return (
    <View>
      <Button title="Upload File" onPress={handleFileUpload} />
    </View>
  );
}
