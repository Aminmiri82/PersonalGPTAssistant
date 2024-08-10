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
const AssistantsStack = createNativeStackNavigator();

function AssistantsScreenNav(props) {
  const { t } = useTranslation();
  const makeNewAssistantButton = (navigation) => (
    <AppButton
      title={t("newAssistant")}
      onPress={() => navigation.navigate(t("AssistantMakerScreen1"))}
    />
  );
  return (
    <AssistantsStack.Navigator>
      <AssistantsStack.Screen
        name={t("AssistantMenuScreen")}
        component={AssistantMenuScreen}
        options={({ navigation }) => ({
          headerRight: () => makeNewAssistantButton(navigation),
        })}
      />
      <AssistantsStack.Screen
        name={t("AssistantMakerScreen1")}
        component={AssistantMakerScreen1}
      />
      <AssistantsStack.Screen
        name={t("AssistantMakerScreen2")}
        component={AssistantMakerScreen2}
      />
      <AssistantsStack.Screen
        name={t("AssistantEditorScreen1")}
        component={AssistantEditorScreen1}
      />
      <AssistantsStack.Screen
        name={t("AssistantEditorScreen2")}
        component={AssistantEditorScreen2}
      />
      <AssistantsStack.Screen name="BuildScreen" component={BuildScreen} />
    </AssistantsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AssistantsScreenNav;
