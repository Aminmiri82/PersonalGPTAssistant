import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import ChatMenuScreen from "../Screens/ChatScreen/ChatMenuScreen";
import ChooseChatScreen from "../Screens/ChatScreen/ChooseChatScreen";
import AppButton from "../Components/AppButton";
import { useTranslation } from "react-i18next";

const ChatStack = createNativeStackNavigator();

function ChatScreenNav(props) {
  const { t } = useTranslation();
  const makeNewChatButton = (navigation) => (
    <AppButton
      title={t("newChat")}
      onPress={() => navigation.navigate(t("ChooseChatScreen"))}
    />
  );
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name={t("ChatMenuScreen")}
        component={ChatMenuScreen}
        options={({ navigation }) => ({
          headerRight: () => makeNewChatButton(navigation),
        })}
      />
      <ChatStack.Screen
        name={t("ChooseChatScreen")}
        component={ChooseChatScreen}
      />
      <ChatStack.Screen
        name={t("ChatScreen")}
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
