import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WTAssistantMenuScreen from "../../Screens/WTScreens/WTAssistantScreen/WTAssistantMenuScreen";

import WTAssistantMakerScreen1 from "../../Screens/WTScreens/WTAssistantScreen/WTAssistantMakerScreen1";
import WTAssistantMakerScreen2 from "../../Screens/WTScreens/WTAssistantScreen/WTAssistantMakerScreen2";

import { useTranslation } from "react-i18next";
import Icon from "../../Components/Icon";

const AssistantsStack = createNativeStackNavigator();

function WTAssistantsScreenNav() {
  const { t } = useTranslation();

  const makeNewAssistantButton = (navigation) => (
    <Icon
      iconSet={"MCI"}
      name={"plus-circle"}
      iconColor="#3E84F7"
      onPress={() => navigation.navigate("WTAssistantMakerScreen1")}
    />
  );

  return (
    <AssistantsStack.Navigator>
      <AssistantsStack.Screen
        name="WTAssistantMenuScreen" // Use static names for screens
        component={WTAssistantMenuScreen}
        options={({ navigation }) => ({
          title: t("AssistantMenuScreen"), // Translated title for the screen
          headerRight: () => makeNewAssistantButton(navigation),
        })}
      />
      <AssistantsStack.Screen
        name="WTAssistantMakerScreen1" // Use static names for screens
        component={WTAssistantMakerScreen1}
        options={{ title: t("AssistantMakerScreen1") }}
      />
      <AssistantsStack.Screen
        name="WTAssistantMakerScreen2" // Use static names for screens
        component={WTAssistantMakerScreen2}
        options={{ title: t("AssistantMakerScreen2") }}
      />
    </AssistantsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WTAssistantsScreenNav;
