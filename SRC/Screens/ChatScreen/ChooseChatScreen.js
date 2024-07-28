import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";

import { fetchAssistants, initDB, insertChat } from "../../database";
import { useFocusEffect } from "@react-navigation/native";

function ChooseChatScreen({ navigation }) {
  const [assistants, setAssistants] = useState([]);

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
              <Text>No assistants available. Please add a new assistant.</Text>
            ) : (
              assistants.map((assistant) => (
                <AssistantsMenuItem
                  key={assistant.id}
                  image={require("../../assets/IMG_1706.jpeg")}
                  title={assistant.name}
                  onPress={() => {
                    console.log("in choose chat screen", assistant.id);
                    console.log("threadID being passed to chat screen", null);
                    navigation.navigate("ChatScreen", {
                      assistantId: assistant.id,
                      threadId: null,
                    });
                  }}
                  ShowEditButton={false}
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

export default ChooseChatScreen;
