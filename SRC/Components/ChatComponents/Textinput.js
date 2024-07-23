import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../config/Styles";

const Textinput = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") {
      return;
    }
    onSubmit(text);
    setText(""); // Clear the input field after submission
  };

  return (
    <View style={styles.container}>
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
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="send"
            size={30}
            color={defaultStyles.colors.white}
            style={{ alignSelf: "center" }}
            onPress={handleSend}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3, // for Android
    flex: 1, // Take up all available space except for button
    marginLeft: 30, // add spacing between the text input and left edge of the screen
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
    justifyContent: "center", // centers the icon vertically
    alignItems: "center", // centers the icon horizontally
    marginLeft: 10, // add spacing between the text input and button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3, // for Android
  },
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    position: "absolute", // Position the container absolutely
    bottom: 0, // Align it to the bottom of the parent View
    left: 0, // Align it to the left of the parent View
    right: 0, // Align it to the right of the parent View
    backgroundColor: "white", // Or any other color that matches your design
  },
});

export default Textinput;
