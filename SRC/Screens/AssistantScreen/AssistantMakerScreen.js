import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../Components/AppText";
import AppTextInput from "../../Components/ChatTextInput";
import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";

function AssistantMakerScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <AssistantsMenuItem
          edit="upload a photo"
          image={require("../../assets/mosh.jpg")}
          title="Mosh"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    alignItems: "center",
  },
});

export default AssistantMakerScreen;
