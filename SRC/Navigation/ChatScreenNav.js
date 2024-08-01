import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import ChatMenuScreen from "../Screens/ChatScreen/ChatMenuScreen";
import ChooseChatScreen from "../Screens/ChatScreen/ChooseChatScreen";
import AppButton from "../Components/AppButton";

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
        name="ChatMenuScreen"
        component={ChatMenuScreen}
        options={({ navigation }) => ({
          headerRight: () => makeNewChatButton(navigation),
        })}
      />
      <ChatStack.Screen name="ChooseChatScreen" component={ChooseChatScreen} />
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ navigation }) => ({
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.popToTop()}
            />
          ),
        })}
      />
    </ChatStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatScreenNav;
