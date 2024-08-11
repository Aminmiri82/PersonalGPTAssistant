import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons

import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import ChatMenuScreen from "../Screens/ChatScreen/ChatMenuScreen";
import ChooseChatScreen from "../Screens/ChatScreen/ChooseChatScreen";
import OfflineSearchScreen from "../Screens/OfflineSearchScreen/OfflineSearchScreen";
import TestScreen from "../Screens/TestScreen";
import AppButton from "../Components/AppButton";
import { useTranslation } from "react-i18next";

const ChatStack = createNativeStackNavigator();

function ChatScreenNav(props) {
  const { t } = useTranslation();
  
  const makeNewChatButton = (navigation) => (
    <AppButton
      title={t("newChat")} // Translate the title
      onPress={() => navigation.navigate(t("ChooseChatScreen"))}
    />
  );

  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name={t("OfflineSearchScreen")} component={OfflineSearchScreen} />
      <ChatStack.Screen
        name={t("ChatMenuScreen")} // Use a static name for referencing the screen
        component={ChatMenuScreen}
        options={({ navigation }) => ({
          title: t("ChatMenuScreen"), // Translated title for this screen
          headerRight: () => makeNewChatButton(navigation),
        })}
      />
      <ChatStack.Screen
        name={t("ChooseChatScreen")} // Use a static name for referencing the screen
        component={ChooseChatScreen}
        options={{
          title: t("ChooseChatScreen"), // Translated title for this screen
        }}
      />
      <ChatStack.Screen
        name="ChatScreen" // Use a static name for referencing the screen
        component={ChatScreen}
        options={({ navigation }) => ({
          title: t("ChatScreen"), // Translated title for this screen
          headerBackTitle: t("ChatScreen"), // Translate the back button title
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.popToTop()}
              backImage={() => (
                <Icon name="chevron-left" size={24} color="black" /> // Custom chevron icon using MaterialCommunityIcons
              )}
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
