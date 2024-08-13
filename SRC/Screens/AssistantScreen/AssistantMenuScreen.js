import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";

import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";
import AppText from "../../Components/AppText";
import AppButton from "../../Components/AppButton";

import { fetchAssistants, initDB } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

function AssistantMenuScreen({ navigation }) {
  const [assistants, setAssistants] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    initDB().catch((error) => {
      console.log("Error initializing database: ", error);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAssistants()
        .then((data) => {
          setAssistants(data);
        })
        .catch((error) => {
          console.log("Error fetching assistants: ", error);
        });
    }, [])
  );

  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView bounces={false}>
          <View>
            {assistants.length === 0 ? (
              <>
                <View style={styles.noAss}>
                  <AppText style={styles.text}>
                    Build a new personal Chat GPT Assistant
                  </AppText>
                  <AppButton
                    title="Get Started"
                    onPress={() => console.log("Get started")}
                    style={styles.button}
                    textStyle={styles.buttonText}
                    color="blue"
                  />
                </View>
              </>
            ) : (
              assistants.map((assistant) => (
                <View style={styles.top}>
                  <AssistantsMenuItem
                    key={assistant.id}
                    image={require("../../assets/assistant.jpg")}
                    title={assistant.name}
                    onPress={() =>
                      navigation.navigate("AssistantEditorScreen1", {
                        id: assistant.id,
                      })
                    }
                    ShowEditButton={true}
                  />
                </View>
              ))
            )}
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
  button: {
    flexDirection: "row",
    position: "static",
    bottom: height * 0.25,
    width: "auto",
    height: "auto",
    borderRadius: height * 0.03,
    borderTopRightRadius: height * 0.03,
    borderBottomRightRadius: height * 0.03,
    backgroundColor: "blue", // Specify background color directly here if needed
    justifyContent: "center", // Align button text vertically centered
    alignItems: "center", // Align button text horizontally centered
  },
  // Styling for the button text
  buttonText: {
    textAlign: "center",
    fontSize: 25,
  },
  // Styling for the main container
  // Styling for the descriptive text
  text: {
    textAlign: "center",
    width: "55%",
    fontSize: 25,
    top: height * 0.2,
    fontWeight: "bold",
  },
  noAss: {
    flex: 1,
    alignItems: "center",
  },
});

export default AssistantMenuScreen;
