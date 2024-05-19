import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../Components/AppText";
import AppTextInput from "../../Components/ChatComponents/ChatTextInput";
import AppButton from "../../Components/AppButton";
import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";

function AssistantMakerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <AssistantsMenuItem
          image={require("../../assets/mosh.jpg")}
          title="Mosh"
        />
        <AppButton
          title="Create Assistant"
          onPress={() => navigation.push('BuildScreen')}
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
