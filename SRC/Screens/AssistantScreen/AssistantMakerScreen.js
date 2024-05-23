import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";

import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";

function AssistantMakerScreen({ navigation }) {
  const showAlert = () =>
    Alert.alert("Alert", "This feature is not yet implemented");

  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView bounces={false}>
          <View style={styles.top}>
            <AssistantsMenuItem
              image={require("../../assets/IMG_1706.jpeg")}
              title="Mosh"
              onPress={() => {
                {
                  navigation.navigate("BuildScreen");
                  showAlert();
                }
              }}
            />
            <AssistantsMenuItem
              image={require("../../assets/mosh.jpg")}
              title="Mosh"
            />
            <AssistantsMenuItem
              image={require("../../assets/mosh.jpg")}
              title="Mosh"
            />
            <AssistantsMenuItem
              image={require("../../assets/mosh.jpg")}
              title="Mosh"
            />
            <AssistantsMenuItem
              image={require("../../assets/mosh.jpg")}
              title="Mosh"
            />

          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  top: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default AssistantMakerScreen;
