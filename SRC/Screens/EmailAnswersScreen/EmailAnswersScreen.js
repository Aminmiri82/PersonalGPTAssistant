import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { POSTMARK_API_KEY } from "@env";
import colors from "../../config/colors";
import Screen from "../../Components/Screen";
import AppText from "../../Components/AppText";
import { useTranslation } from "react-i18next";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import { useTheme } from "../../themes/ThemeProvidor";
import AppButton from "../../Components/AppButton";

const WalkthroughableView = walkthroughable(View);
const EmailAnswersScreen = () => {
  const { dark, colorsTh, setScheme } = useTheme();
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleSendEmail = async () => {
    if (!name || !question || !email) {
      Alert.alert(t("error"), t("emptyfields"));
      return;
    }
    const postmarkApiUrl = "https://api.postmarkapp.com/email";
    const postmarkServerToken = POSTMARK_API_KEY;

    const emailBody = `
      Name: ${name}
      Question: ${question}
      Email to respond to: ${email}
    `;

    const emailData = {
      From: "Outgoing@dadafarin.net",
      To: "Incoming@dadafarin.net",
      Subject: "User Question",
      TextBody: emailBody,
      MessageStream: "outbound",
    };

    try {
      const response = await fetch(postmarkApiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": postmarkServerToken,
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert(t("done"), t("EmailSent"));
      } else {
        Alert.alert(t("error"), `${t("EmailFailed")}: ${result.Message}`);
      }
    } catch (error) {
      Alert.alert(t("error"), `${t("EmailFailed")}: ${error.message}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorsTh.background }]}>
      <CopilotStep text={t("step18")} order={18} name="step18">
        <WalkthroughableView style={styles.stepContainer}>
          <Text style={[styles.headerText, { color: colorsTh.text }]}>
            {t("EmailAnswersExplanation")}
          </Text>

          <Text style={[styles.labelText, { color: colorsTh.text }]}>
            {t("UserName")}
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t("UserNamePlaceholder")}
            placeholderTextColor={colorsTh.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: colorsTh.background,
                color: name ? colorsTh.text : colorsTh.placeholder,
              },
            ]}
          />

          <Text style={[styles.labelText, { color: colorsTh.text }]}>
            {t("UserQuestion")}
          </Text>
          <TextInput
            value={question}
            onChangeText={setQuestion}
            placeholder={t("UserQuestionPlaceholder")}
            placeholderTextColor={colorsTh.placeholder}
            style={[
              styles.questionInput,
              {
                backgroundColor: colorsTh.background,
                color: question ? colorsTh.text : colorsTh.placeholder,
              },
            ]}
            multiline
          />

          <Text style={[styles.labelText, { color: colorsTh.text }]}>
            {t("EmailToReceiveAnswer")}
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder={t("EmailToReceiveAnswerPlaceholder")}
            placeholderTextColor={colorsTh.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: colorsTh.background,
                color: name ? colorsTh.email : colorsTh.placeholder,
              },
            ]}
            keyboardType="email-address"
          />
        </WalkthroughableView>
      </CopilotStep>
      <AppButton
        title={t("Send")}
        onPress={handleSendEmail}
        style={[styles.doneButton, { color: colorsTh.blue }]}
        textStyle={styles.doneButtonText}
      />
      <CopilotStep text={t("step19")} order={19} name="step19">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
  labelText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontWeight: "600",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#333",
    width: "100%",
  },
  questionInput: {
    height: 120,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#333",
    textAlignVertical: "top",
    width: "100%",
  },
  doneButton: {
    backgroundColor: colors.niceBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginTop: 20,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  stepContainer: {
    width: "100%",
  },
});

export default EmailAnswersScreen;
