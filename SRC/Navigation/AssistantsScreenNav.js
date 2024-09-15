import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssistantMenuScreen from "../Screens/AssistantScreen/AssistantMenuScreen";

import colors from "../config/colors";
import AssistantMakerScreen1 from "../Screens/AssistantScreen/AssistantMakerScreen1";
import AssistantMakerScreen2 from "../Screens/AssistantScreen/AssistantMakerScreen2";
import AssistantEditorScreen1 from "../Screens/AssistantScreen/AssistantEditorScreen1";
import AssistantEditorScreen2 from "../Screens/AssistantScreen/AssistantEditorScreen2";
import { useTranslation } from "react-i18next";
import Icon from "../Components/Icon";
import { useTheme } from "../themes/ThemeProvidor";

const AssistantsStack = createNativeStackNavigator();

function AssistantsScreenNav() {
  const { t } = useTranslation();
  const { colorsTh } = useTheme();

  const makeNewAssistantButton = (navigation) => (
    <Icon
      iconSet={"MCI"}
      name={"plus-circle"}
      iconColor={colors.niceBlue}
      onPress={() => navigation.navigate("AssistantMakerScreen1")}
    />
  );

  return (
    <AssistantsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorsTh.background, // Set header background based on theme
        },
        headerTintColor: colorsTh.text, // Set header text color based on theme
        headerTitleStyle: {
          fontWeight: "bold", // Optional: Customize the title style
        },
      }}
    >
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
    </AssistantsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AssistantsScreenNav;
