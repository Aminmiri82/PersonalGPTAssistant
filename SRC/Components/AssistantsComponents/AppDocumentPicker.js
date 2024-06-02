import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import * as DocumentPicker from "expo-document-picker";

function AppDocumentPicker(props) {
  const [files, setFiles] = useState([]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (!result.canceled) {
        console.log("Picked file:", result);
        // Extracting the file information from the assets array
        const pickedFile = result.assets[0];

        setFiles((prevFiles) => [...prevFiles, pickedFile]);
      }
    } catch (err) {
      console.error("Error picking document: ", err);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };
  const renderThumbnail = (file) => {
    console.log("File MIME Type:", file.mimeType);
    console.log("File URI:", file.uri);

    if (file.mimeType && file.mimeType.startsWith("image/")) {
      return <Image source={{ uri: file.uri }} style={styles.thumbnail} />;
    } else {
      return <AppText style={styles.fileIcon}>📄 FILE</AppText>;
    }
  };
  return (
    <>
      <View style={styles.generalFileContainer}>
        <FlatList
          data={files}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({ item, index }) => (
            <View style={styles.fileContainer}>
              {renderThumbnail(item)}
              <AppText style={styles.fileName}>{item.name}</AppText>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFile(index)}
              >
                <AppText style={styles.deleteButtonText}>X</AppText>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={pickDocument}>
        <AppText style={styles.addButtonText}>+</AppText>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  generalFileContainer: {
    width: "90%",
    height: "40%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
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
    width: "10%",
    height: "10%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
  },
  ButtonContainer: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  deleteAssistantButton: {
    backgroundColor: "#DC3545", // Changed to a red color for delete
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
});

export default AppDocumentPicker;
