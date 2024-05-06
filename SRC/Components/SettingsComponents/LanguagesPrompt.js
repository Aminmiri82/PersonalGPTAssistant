import React from "react";
import { View, StyleSheet, Alert, Button } from "react-native";

function LanguagesPrompt(props) {
  const createTwoButtonAlert = () =>
    Alert.alert("choose the apps language", message, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const apiKeyAlert = () =>
    Alert.prompt("Enter API Key", "Enter your OpenAI API Key", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: (apiKey) => console.log("OK Pressed, API Key: " + apiKey),
        style: "default",
        AlertType: "secure-text",
      },
    ]);
  return (
    <View style={styles.container}>
      <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />
      <Button title={"API Key Alert"} onPress={apiKeyAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LanguagesPrompt;
