import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssistantMakerScreen from "../Screens/AssistantScreen/AssistantMakerScreen";
import BuildScreen from "../Screens/AssistantScreen/EmptyAssistantsMenuScreen";
import AppButton from "../Components/AppButton";

const AssistantsStack = createNativeStackNavigator();
const makeNewAssistantButton = (navigation) => (
  <AppButton title="new ass" onPress={() => navigation.navigate("BuildScreen")} />
);

function AssistantsScreenNav(props) {
  return (
    <AssistantsStack.Navigator>
      <AssistantsStack.Screen
        name="AssistantMakerScreen"
        component={AssistantMakerScreen}
        options={({ navigation }) => ({
          headerRight: () => makeNewAssistantButton(navigation),
        })}
      />
      <AssistantsStack.Screen name="BuildScreen" component={BuildScreen} />
    </AssistantsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AssistantsScreenNav;
