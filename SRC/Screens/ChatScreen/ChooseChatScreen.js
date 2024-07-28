import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";
import { fetchAssistants, insertChat } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import { createThread } from "../../openai-backend/ApiBackEnd";
import { DatabaseContext } from "../../DatabaseProvider"; // Adjust the import path

function ChooseChatScreen({ navigation }) {
  const { dbInitialized } = useContext(DatabaseContext);
  const [assistants, setAssistants] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (dbInitialized) {
        fetchAssistants()
          .then((data) => {
            setAssistants(data);
          })
          .catch((error) => {
            console.log("Error fetching assistants: ", error);
          });
      }
    }, [dbInitialized])
  );

  const createAndInstertNewThread = async (assistant_id) => {
    const newThread = await createThread();
    console.log("Thread created:", newThread.id);
    await insertChat(newThread.id, assistant_id, null);
    console.log("Inserted chat", newThread.id, assistant_id, null);
    navigation.navigate("ChatScreen", {
      assistantId: assistant_id,
      threadId: newThread.id,
      
    });
  };

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }

  const renderItem = ({ item }) => (
    <AssistantsMenuItem
      key={item.id}
      image={require("../../assets/IMG_1706.jpeg")}
      title={item.name}
      onPress={() => {
        createAndInstertNewThread(item.id);
      }}
      ShowEditButton={false}
    />
  );

  return (
    <Screen>
      <View style={styles.container}>
        <AssistantsMenuItem
          image={require("../../assets/IMG_1706.jpeg")}
          title = "persian law guide"
          onPress={() => {
            createAndInstertNewThread("asst_40ROFN9nKe2V6Eka6bYXSZ2y");
          }}
          ShowEditButton={false}
        />
        {assistants.length === 0 ? (
          <Text>No assistants available. Please add a new assistant.</Text>
        ) : (
          <FlatList
            data={assistants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.top}
          />
        )}
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
    justifyContent: "space-between",
  },
});

export default ChooseChatScreen;
