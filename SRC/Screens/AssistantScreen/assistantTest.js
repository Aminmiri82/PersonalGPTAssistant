import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";


// dont delete without my permission

const FilePickerComponent = () => {
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
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Upload .pdf .docx and .txt files to your assistant
      </Text>
      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item, index }) => (
          <View style={styles.fileContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
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
    </View>
  );
};

const styles = StyleSheet.create({
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

export default FilePickerComponent;
