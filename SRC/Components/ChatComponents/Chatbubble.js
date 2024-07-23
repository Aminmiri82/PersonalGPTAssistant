import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../../config/colors";

const Chatbubble = ({ text }) => {
  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: "flex-end", // or 'flex-end' based on the message sender
    borderBottomRightRadius: 0,
  },
  text: {
    color: colors.dark,
  },
});

export default Chatbubble;
