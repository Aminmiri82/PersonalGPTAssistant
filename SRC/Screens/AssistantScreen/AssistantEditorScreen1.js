import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import AppImagePicker from "../../Components/AssistantsComponents/AppImagePicker";
import { fetchAssistantById, deleteAssistantById } from "../../database";
import { useTranslation } from "react-i18next";
import { useHeaderHeight } from "@react-navigation/elements";

function AssistantEditorScreen1({ navigation, route }) {
  const { t } = useTranslation();
  const { id } = route.params;
  const headerHeight = useHeaderHeight();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUri, setImageUri] = useState("");

  useEffect(() => {
    fetchAssistantById(id) // could've pickeck these up from route params
      .then((assistant) => {
        setName(assistant.name);
        setInstructions(assistant.instructions);
        setImageUri(assistant.profile);
        console.log("Assistant fetched: ", assistant.profile);
      })
      .catch((error) => {
        console.log("Error fetching assistant: ", error);
      });
  }, [id]);

  const handleNext = () => {
    if (!name || !instructions || !imageUri) {
      Alert.alert(t("error"), t("emptyfields"));
      return;
    }
    navigation.push("AssistantEditorScreen2", {
      id,
      name,
      instructions,
      imageUri,
    });
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
  const handleImagePicked = (newUri) => {
    setImageUri(newUri);
    console.log("Image URI:", newUri);
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? headerHeight : headerHeight * 2
        }
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <AppImagePicker
              tipText={t("choosingPhotoForAssistant")}
              editText={t("edit")}
              onImagePicked={handleImagePicked}
              prepickedUri={{ uri: imageUri }}
            />
            <View style={styles.middleContainer}>
              <AppText style={styles.midTitle}>
                {t("choosingNameForAssistant")}
              </AppText>
              <TextInput
                style={styles.midInput}
                placeholder={t("enterName")}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.bottomContainer}>
              <AppText style={styles.bottomTitle}>
                {t("giveAssistantInstruction")}
              </AppText>
              <TextInput
                style={styles.bottomInput}
                placeholder={t("enterInstructions")}
                value={instructions}
                onChangeText={setInstructions}
                multiline
                numberOfLines={5}
                scrollEnabled
              />
            </View>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.deleteAssistantButton}
              >
                <AppText style={styles.deleteButtonText}>{t("delete")}</AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <AppText style={styles.nextButtonText}>{t("next")}</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  topContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  middleContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  midTitle: {
    fontSize: 20,
    color: colors.dark,
    marginBottom: 10,
    textAlign: "center",
  },
  midInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: "80%",
  },
  bottomContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  bottomTitle: {
    fontSize: 20,
    color: colors.dark,
    marginBottom: 10,
    textAlign: "center",
  },
  bottomInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 10,
    width: "80%",
    textAlignVertical: "top",
  },
  ButtonContainer: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  deleteAssistantButton: {
    backgroundColor: colors.deleteRed,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    marginRight: 10,
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: colors.niceBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    marginLeft: 10,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AssistantEditorScreen1;
