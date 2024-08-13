import React from "react";
import { View, Text, StyleSheet, Platform, TextInput } from "react-native";
import colors from "../../config/colors";

const Chatbubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.assistantBubble,
      ]}
    >
      {Platform.OS === "ios" ? (
        <TextInput
          style={styles.text}
          multiline={true}
          selectable={true}
          editable={false}
          value={message.content}
        />
      ) : (
        <Text style={styles.text} selectable={true}>
          {message.content}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: colors.secondary,
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  assistantBubble: {
    backgroundColor: colors.light,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  text: {
    color: colors.dark,
  },
});

export default Chatbubble;
