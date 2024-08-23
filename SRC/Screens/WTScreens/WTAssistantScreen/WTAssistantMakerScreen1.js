import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import AppText from "../../../Components/AppText";
import Screen from "../../../Components/Screen";
import colors from "../../../config/colors";
import AppButton from "../../../Components/AppButton";
import { useTranslation } from "react-i18next";

function AssistantMakerScreen1({ navigation }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleNext = () => {
    if (!name || !instructions) {
      console.log("Name or instructions are missing");
      return;
    }
    navigation.navigate("WTAssistantMakerScreen2", {
      name,
      instructions,
    });
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50} // Adjust the offset as needed
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.pictureContainer}>
              <View style={styles.pictureTipContainer}>
                <AppText style={styles.pictureTip}>
                  {t("choosingPhotoForAssistant")}
                </AppText>
              </View>
              <View style={styles.pictureWrapper}>
                <TouchableOpacity
                  style={styles.picture}
                  onPress={() => {
                    console.log("edit");
                  }}
                >
                  <Image
                    style={styles.picture}
                    source={require("../../../assets/assistant.jpg")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pictureButton}
                  onPress={() => {
                    console.log("edit");
                  }}
                >
                  <AppText style={styles.pictureButtonText}>
                    {t("edit")}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
          <AppButton
            title={t("next")}
            onPress={handleNext}
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
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
    color: colors.dark,
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
    color: colors.blue,
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
  nextButton: {
    backgroundColor: colors.niceBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    marginLeft: 10,
    position: "relative",
    left: "28%",
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AssistantMakerScreen1;
