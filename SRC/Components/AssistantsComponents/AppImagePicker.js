import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppText from "../AppText";
import colors from "../../config/colors";
import { useTheme } from "../../themes/ThemeProvidor";

export default function AppImagePicker({
  tipText,
  editText,
  onImagePicked,
  prepickedUri = null,
}) {
  const [imageUri, setImageUri] = useState(null);
  const { colorsTh } = useTheme();

  // Request permission to access the media library
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Sorry, we need camera roll permissions to make this work!"
      );
    }
  };

  // Pick an image from the camera roll
  const pickImage = async () => {
    await requestPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      if (onImagePicked) {
        onImagePicked(uri);
      }
    }
  };

  return (
    <View style={styles.topContainer}>
      <View style={styles.pictureContainer}>
        <View style={styles.pictureTipContainer}>
          <AppText style={[styles.pictureTip, { color: colorsTh.text }]}>
            {tipText}
          </AppText>
        </View>
        <View style={styles.pictureWrapper}>
          <TouchableOpacity style={styles.picture} onPress={pickImage}>
            <Image
              style={styles.picture}
              source={imageUri ? { uri: imageUri } : prepickedUri}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.pictureButton} onPress={pickImage}>
            <AppText
              style={[styles.pictureButtonText, { color: colorsTh.blue }]}
            >
              {editText}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  pictureContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  pictureTipContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  pictureTip: {
    fontSize: 16,
    textAlign: "center",
  },
  pictureWrapper: {
    alignItems: "center",
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  pictureButton: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  pictureButtonText: {
    fontSize: 12,
  },
});
