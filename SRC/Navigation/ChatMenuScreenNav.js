import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ChatMenuStack = createNativeStackNavigator();

function ChatMenuScreenNav(props) {
  return (
    <ChatMenuStack.Navigator>
      <ChatMenuStack.Screen name="" />
    </ChatMenuStack.Navigator>
  );
}

export default ChatMenuScreenNav;
