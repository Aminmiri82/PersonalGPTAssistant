import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import AppButton from "../../Components/AppButton";
import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";

function AssistantMakerScreen({ navigation }) {
  const showAlert = () =>
    Alert.alert("Alert", "This feature is not yet implemented");

  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          bounces={false}
        >
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
            <AppButton
              title="Add Assistant"
              onPress={() => navigation.navigate("BuildScreen")}
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
    borderColor: "red",
    borderWidth: 2,
  },
  scrollViewContent: {
    borderColor: "green",
    borderWidth: 2,
  },
  top: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderColor: "blue",
    borderWidth: 2,
  },
});

export default AssistantMakerScreen;
