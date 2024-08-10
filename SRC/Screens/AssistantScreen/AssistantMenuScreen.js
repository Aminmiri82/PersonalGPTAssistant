import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";

import { fetchAssistants, initDB } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

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
          <View style={styles.top}>
            {assistants.length === 0 ? (
              <Text>{t("noAssistants")}</Text>
            ) : (
              assistants.map((assistant) => (
                <AssistantsMenuItem
                  key={assistant.id}
                  image={require("../../assets/assistant.jpg")}
                  title={assistant.name}
                  onPress={() =>
                    navigation.navigate(t("AssistantEditorScreen1"), {
                      id: assistant.id,
                    })
                  }
                  ShowEditButton={true}
                />
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
});

export default AssistantMenuScreen;
