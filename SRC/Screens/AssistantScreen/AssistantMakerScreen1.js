import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import AppButton from "../../Components/AppButton";
import AppImagePicker from "../../Components/AssistantsComponents/AppImagePicker";
import { useTranslation } from "react-i18next";
import { useHeaderHeight } from "@react-navigation/elements";
import { CopilotStep, useCopilot, walkthroughable } from "react-native-copilot";
import { Circle } from "react-native-svg";
import { useTheme } from "../../themes/ThemeProvidor";

const WalkthroughableView = walkthroughable(View);
const WalkthroughableText = walkthroughable(Text);
function AssistantMakerScreen1({ navigation }) {
  const { colorsTh } = useTheme();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUri, setImageUri] = useState("");

  const handleImagePicked = (uri) => {
    setImageUri(uri);
    console.log("Image URI:", uri);
  };
  const handleNext = () => {
    if (!name || !instructions || !imageUri) {
      Alert.alert(t("error"), t("emptyfields"));
      return;
    }
    navigation.navigate("AssistantMakerScreen2", {
      name,
      instructions,
      imageUri,
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? headerHeight : headerHeight * 2
        }
        style={[styles.container, { backgroundColor: colorsTh.background }]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <CopilotStep text={t("step11")} order={11} name="step11">
              <WalkthroughableView>
                <AppImagePicker
                  tipText={t("choosingPhotoForAssistant")}
                  editText={t("edit")}
                  onImagePicked={handleImagePicked}
                  prepickedUri={require("../../assets/assistant.jpg")}
                />
              </WalkthroughableView>
            </CopilotStep>
            <CopilotStep text={t("step12")} order={12} name="step12">
              <WalkthroughableView style={styles.middleContainer}>
                <AppText style={styles.midTitle}>
                  {t("choosingNameForAssistant")}
                </AppText>
                <TextInput
                  style={[
                    styles.midInput,
                    { color: name ? colorsTh.text : colorsTh.placeholder },
                  ]}
                  placeholder={t("enterName")}
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={colorsTh.placeholder}
                />
              </WalkthroughableView>
            </CopilotStep>
            <CopilotStep text={t("step13")} order={13} name="step13">
              <WalkthroughableView style={styles.bottomContainer}>
                <AppText style={styles.bottomTitle}>
                  {t("giveAssistantInstruction")}
                </AppText>
                <TextInput
                  style={[
                    styles.bottomInput,
                    { color: name ? colorsTh.text : colorsTh.placeholder },
                  ]}
                  placeholder={t("enterInstructions")}
                  value={instructions}
                  onChangeText={setInstructions}
                  multiline
                  numberOfLines={5}
                  scrollEnabled
                  placeholderTextColor={colorsTh.placeholder}
                />
              </WalkthroughableView>
            </CopilotStep>
            <AppButton
              title={t("next")}
              onPress={handleNext}
              style={styles.nextButton}
              textStyle={[styles.nextButtonText, { color: colorsTh.text }]}
            />
            <CopilotStep text={t("step14")} order={14} name="step14">
              <WalkthroughableView></WalkthroughableView>
            </CopilotStep>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
  },
  middleContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  midTitle: {
    fontSize: 20,
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
    borderRadius: 100,
    elevation: 2,
    marginLeft: 10,
    // marginLeft: "auto",
    // marginRight: "auto",
    position: "relative",
    left: "28%",
    marginTop: 20,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AssistantMakerScreen1;
