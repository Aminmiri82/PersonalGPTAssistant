import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import AppButton from "../../Components/AppButton";
import AppImagePicker from "../../Components/AssistantsComponents/AppImagePicker";
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
    navigation.navigate("AssistantMakerScreen2", {
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
        <View style={styles.container}>
          <AppImagePicker
            tipText="Choosing photo for the assistant"
            editText="Edit"
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
          <AppButton
            title={t("next")}
            onPress={handleNext}
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
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
