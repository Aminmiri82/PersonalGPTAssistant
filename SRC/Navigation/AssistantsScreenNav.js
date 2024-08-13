import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssistantMenuScreen from "../Screens/AssistantScreen/AssistantMenuScreen";
import BuildScreen from "../Screens/AssistantScreen/EmptyAssistantsMenuScreen";
import AppButton from "../Components/AppButton";
import AssistantMakerScreen1 from "../Screens/AssistantScreen/AssistantMakerScreen1";
import AssistantMakerScreen2 from "../Screens/AssistantScreen/AssistantMakerScreen2";
import AssistantEditorScreen1 from "../Screens/AssistantScreen/AssistantEditorScreen1";
import AssistantEditorScreen2 from "../Screens/AssistantScreen/AssistantEditorScreen2";
import { useTranslation } from "react-i18next";
import Icon from "../Components/Icon";

const AssistantsStack = createNativeStackNavigator();

function AssistantsScreenNav() {
  const { t } = useTranslation();

  const makeNewAssistantButton = (navigation) => (
    <Icon
      iconSet={"MCI"}
      name={"plus-circle"}
      iconColor="#3E84F7"
      onPress={() => navigation.navigate("AssistantMakerScreen1")}
    />
    // <AppButton
    //   title={t("newAssistant")}
    //   onPress={() => navigation.navigate("AssistantMakerScreen1")}
    // />
  );

  return (
    <AssistantsStack.Navigator>
      <AssistantsStack.Screen
        name="AssistantMenuScreen" // Use static names for screens
        component={AssistantMenuScreen}
        options={({ navigation }) => ({
          title: t("AssistantMenuScreen"), // Translated title for the screen
          headerRight: () => makeNewAssistantButton(navigation),
        })}
      />
      <AssistantsStack.Screen
        name="AssistantMakerScreen1" // Use static names for screens
        component={AssistantMakerScreen1}
        options={{ title: t("AssistantMakerScreen1") }}
      />
      <AssistantsStack.Screen
        name="AssistantMakerScreen2" // Use static names for screens
        component={AssistantMakerScreen2}
        options={{ title: t("AssistantMakerScreen2") }}
      />
      <AssistantsStack.Screen
        name="AssistantEditorScreen1" // Use static names for screens
        component={AssistantEditorScreen1}
        options={{ title: t("AssistantEditorScreen1") }}
      />
      <AssistantsStack.Screen
        name="AssistantEditorScreen2" // Use static names for screens
        component={AssistantEditorScreen2}
        options={{ title: t("AssistantEditorScreen2") }}
      />
      <AssistantsStack.Screen
        name="BuildScreen" // Use static names for screens
        component={BuildScreen}
        options={{ title: t("BuildScreen") }} // Optional: Add translation if needed
      />
    </AssistantsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AssistantsScreenNav;
