import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import ChatMenuScreen from "../Screens/ChatScreen/ChatMenuScreen";
import OnBoardingScreen from "../Screens/OBS/OnBoardingScreen";
import ChooseChatScreen from "../Screens/ChatScreen/ChooseChatScreen";
import AppButton from "../Components/AppButton";
import TestScreen from "../Screens/TestScreen";


const ChatStack = createNativeStackNavigator();

const makeNewChatButton = (navigation) => (
  <AppButton
    title="new chat"
    onPress={() => navigation.navigate("ChooseChatScreen")}
  />
);
function ChatScreenNav(props) {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="TestScreen"
        component={TestScreen}
        
      />
      <ChatStack.Screen
        name="ChatMenuScreen"
        component={ChatMenuScreen}
        options={({ navigation }) => ({
          headerRight: () => makeNewChatButton(navigation),
        })}
      />
      <ChatStack.Screen name="ChooseChatScreen" component={ChooseChatScreen} />
      <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
    </ChatStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatScreenNav;
