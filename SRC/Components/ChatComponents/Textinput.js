import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, View } from "react-native";

const Textinput = () => {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Type here"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    height: 45,
    borderColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
});

export default Textinput;
