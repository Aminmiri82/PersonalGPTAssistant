import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, StyleSheet, FlatList, Text, Alert } from "react-native";
import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";
import { fetchAssistants, insertChat } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import { createThread } from "../../openai-backend/ApiBackEnd";
import { DatabaseContext } from "../../DatabaseProvider"; // Adjust the import path
import { useTranslation } from "react-i18next";
import { useCopilot, CopilotStep, walkthroughable } from "react-native-copilot";
import { useTheme } from "../../themes/ThemeProvidor";
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableAMI = walkthroughable(AssistantsMenuItem);

function ChooseChatScreen({ navigation }) {
  const { colorsTh } = useTheme();
  const { t } = useTranslation();
  const { dbInitialized } = useContext(DatabaseContext);
  const [assistants, setAssistants] = useState([]);
  const { start, copilotEvents } = useCopilot();
  const [OnWalkthrough, setOnWalkthrough] = useState(null);

  useEffect(() => {
    const checkWalkthroughStatus = async () => {
      const walkthroughCompleted = false; // chnage this with secure store
      if (walkthroughCompleted === "true") {
        setOnWalkthrough(false);
      } else {
        setOnWalkthrough(true);
      }
    };
    checkWalkthroughStatus();
    console.log("1OnWalkthrough status", OnWalkthrough);
  }, []);

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

  const createAndInstertNewThread = async (assistant_id, assistantName) => {
    try {
      const newThread = await createThread();

      // Handle case where newThread is null (if createThread fails)
      if (!newThread) {
        throw new Error("Failed to create a new thread.");
      }

      console.log("Thread created:", newThread.id);

      await insertChat(newThread.id, assistant_id, null);
      console.log("Inserted chat", newThread.id, assistant_id, null);

      navigation.navigate("ChatScreen", {
        assistantId: assistant_id,
        threadId: newThread.id,
        assistantName: assistantName,
      });
    } catch (error) {
      console.error("Error in createAndInsertNewThread:", error);
      Alert.alert("Error", "Failed to create a new thread. Please try again.");
    }
  };

  if (!dbInitialized) {
    return <Text>Loading...</Text>;
  }
  console.log("2Onalkthrough status", OnWalkthrough);

  const renderItem = ({ item }) => (
    <AssistantsMenuItem
      key={item.id}
      imageUri={item.profile}
      title={item.name}
      onPress={() => {
        createAndInstertNewThread(item.id, item.name);
      }}
      ShowEditButton={false}
    />
  );

  return (
    <Screen
      style={[styles.container, { backgroundColor: colorsTh.background }]}
    >
      <View
        style={[styles.container, { backgroundColor: colorsTh.background }]}
      >
        <CopilotStep text={t("step4")} order={4} name="step4">
          <WalkthroughableAMI
            title={t("PersianLegalGuide")}
            onPress={() => {
              createAndInstertNewThread(
                "asst_40ROFN9nKe2V6Eka6bYXSZ2y",
                t("PersianLegalGuide")
              );
            }}
            ShowEditButton={false}
          />
        </CopilotStep>
        <FlatList
          data={assistants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.top}
        />
      </View>

      <CopilotStep text={t("step5")} order={5} name="step5">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>
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
