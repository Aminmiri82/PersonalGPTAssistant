import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../../config/Styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../themes/ThemeProvidor";

const AppTextInput = ({ onSubmit }) => {
  const { colorsTh } = useTheme();
  const [text, setText] = useState("");
  const { t } = useTranslation();

  const handleSend = () => {
    if (text.trim() === "") {
      return;
    }
    onSubmit(text);
    setText(""); // Clear the input field after submission
  };

  return (
    <View style={[styles.AppTextInput, { backgroundColor: colorsTh.icon }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.textInputContainer,
            { backgroundColor: colorsTh.background },
          ]}
        >
          <TextInput
            onChangeText={setText}
            value={text}
            placeholder={t("AppTextInputPlaceholder")}
            placeholderTextColor={colorsTh.placeholder}
            multiline
            blurOnSubmit={false}
            style={[
              styles.input,
              {
                backgroundColor: colorsTh.docPicker,
                color: text ? colorsTh.text : colorsTh.placeholder,
              },
            ]}
          />
          <View style={styles.button}>
            <TouchableOpacity onPress={handleSend}>
              <MaterialCommunityIcons
                name="send"
                size={30}
                color={defaultStyles.colors.white}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: defaultStyles.colors.blue,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  input: {
    maxHeight: 100,
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    padding: 10,
    shadowColor: "#9E9E9E",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
    flex: 1,
    marginLeft: 10,
  },
});

export default AppTextInput;
