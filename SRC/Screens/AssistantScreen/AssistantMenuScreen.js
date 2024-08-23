import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, Button, Dimensions } from "react-native";

import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";
import AppText from "../../Components/AppText";

import { fetchAssistants, initDB } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useCopilot, walkthroughable, CopilotStep } from "react-native-copilot";

const { height } = Dimensions.get("window");
const WalkthroughableAMI = walkthroughable(AssistantsMenuItem);
const WalkthroughableView = walkthroughable(View);

function AssistantMenuScreen({ navigation }) {
  const [assistants, setAssistants] = useState([]);
  const { start, copilotEvents } = useCopilot();
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

  const renderItem = ({ item }) => (
    <AssistantsMenuItem
      key={item.id}
      imageUri={item.profile} //local asset uri not working
      title={item.name}
      onPress={() =>
        navigation.navigate("AssistantEditorScreen1", {
          id: item.id,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      {assistants.length === 0 ? (
        <View style={styles.noAss}>
          <AppText style={styles.text}>{t("emptyassistant")}</AppText>
          <Button
            title={t("statrtBuldingAssistant")}
            onPress={() => navigation.navigate("AssistantMakerScreen1")}
            style={styles.button}
            textStyle={styles.buttonText}
            color="#3E84F7"
          />
        </View>
      ) : (
        <FlatList
          data={assistants}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noAss: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    width: "80%",
    fontSize: 25,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    width: "auto",
    height: "auto",
    borderRadius: height * 0.03,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingVertical: 10,
  },
});

export default AssistantMenuScreen;
