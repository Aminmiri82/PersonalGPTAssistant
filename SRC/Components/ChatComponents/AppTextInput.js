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

const AppTextInput = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") {
      return;
    }
    onSubmit(text);
    setText(""); // Clear the input field after submission
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={Platform.select({ ios: 150, android: 80 })}
        >
          <View style={styles.innerContainer}>
            {/* Other content here */}
          </View>
          <View style={styles.textInputContainer}>
            <View style={styles.textContainer}>
              <View style={styles.textbox}>
                <TextInput
                  style={styles.input}
                  onChangeText={setText}
                  value={text}
                  placeholder="Type here"
                />
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="microphone"
                  size={25}
                  color={defaultStyles.colors.medium}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  innerContainer: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  textContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
    flex: 1,
    marginLeft: 30,
  },
  icon: {
    marginRight: 10,
  },
  textbox: {
    flex: 1,
  },
  button: {
    backgroundColor: defaultStyles.colors.blue,
    width: 50,
    height: 50,
    borderRadius: 25,
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
    width: "100%",
  },
});

export default AppTextInput;
