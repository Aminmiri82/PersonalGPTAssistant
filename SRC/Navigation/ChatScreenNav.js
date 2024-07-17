import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import ChatMenuScreen from "../Screens/ChatScreen/ChatMenuScreen";
import OnBoardingScreen from "../Screens/OBS/OnBoardingScreen";
import AppButton from "../Components/AppButton";
import Icon from "../Components/Icon";

const ChatStack = createNativeStackNavigator();

const makeNewChatButton = (navigation) => (
  <AppButton
    title="new chat"
    onPress={() => navigation.navigate("OnBoardingScreen")}
  />
);
function ChatScreenNav(props) {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatMenuScreen"
        // component={ChatScreen}
        component={ChatMenuScreen}
        options={({ navigation }) => ({
          headerRight: () => makeNewChatButton(navigation),
        })}
      />
      <ChatStack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
    </ChatStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatScreenNav;
