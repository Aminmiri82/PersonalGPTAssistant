import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Dimensions,
  Text,
} from "react-native";
import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";
import AppText from "../../Components/AppText";
import { fetchAssistants, initDB } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { CopilotStep, useCopilot, walkthroughable } from "react-native-copilot";
import * as SecureStore from "expo-secure-store";
import { useTheme } from "../../themes/ThemeProvidor";
import AppButton from "../../Components/AppButton";

const { height } = Dimensions.get("window");

const WalkthroughableView = walkthroughable(View);
const WalkthroughableAMI = walkthroughable(AssistantsMenuItem);
const WalkthroughableText = walkthroughable(Text);
function AssistantMenuScreen({ navigation }) {
  const { colorsTh } = useTheme();
  const [assistants, setAssistants] = useState([]);
  const { t } = useTranslation();
  const [OnWalkthrough, setOnWalkthrough] = useState(null);
  //all these console logs are just for testing
  //dear amin please remember that the actal secure store vallue never chnages so you have to manipulate the onwalkthrough state manually
  useEffect(() => {
    const checkWalkthroughStatus = async () => {
      const walkthroughCompleted = await SecureStore.getItemAsync(
        "walkthroughCompleted"
      );
      if (walkthroughCompleted === "true") {
        console.log(
          "if walkingthrough completed is true then it is :",
          walkthroughCompleted
        );
        setOnWalkthrough(false);
        console.log("then OnWalkthrough is false so:", OnWalkthrough);
      } else {
        console.log(
          "if walkingthrough completed is false then it is :",
          walkthroughCompleted
        );
        setOnWalkthrough(true);
      }
    };
    checkWalkthroughStatus();
    console.log("1OnWalkthrough status", OnWalkthrough);
  }, []);

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
    <>
      <CopilotStep text={t("step9")} order={9} name="step9">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>

      <CopilotStep text={t("step8")} order={8} name="step8">
        {OnWalkthrough === true ? (
          <WalkthroughableAMI
            key={0}
            imageUri={null}
            title={t("PersianLegalGuide")}
            onPress={() => console.log("pressed")}
          />
        ) : (
          <WalkthroughableView></WalkthroughableView>
        )}
      </CopilotStep>
      <View
        style={[styles.container, { backgroundColor: colorsTh.background }]}
      >
        {assistants.length === 0 && !OnWalkthrough ? (
          <View style={styles.noAss}>
            <AppText style={styles.text}>{t("emptyassistant")}</AppText>
            <AppButton
              title={t("statrtBuldingAssistant")}
              onPress={() => navigation.navigate("AssistantMakerScreen1")}
              style={[styles.button, { backgroundColor: colorsTh.button_blue }]}
              textStyle={{ color: colorsTh.white }}
              
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

      <CopilotStep text={t("step10")} order={10} name="step10">
        <WalkthroughableView></WalkthroughableView>
      </CopilotStep>
    </>
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
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  listContainer: {
    paddingVertical: 10,
  },
});

export default AssistantMenuScreen;
