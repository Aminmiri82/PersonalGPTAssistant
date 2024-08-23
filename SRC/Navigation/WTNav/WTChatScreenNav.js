import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "../../Components/Icon";
import WTChatScreen from "../../Screens/WTScreens/WTChatScreen/WTChatScreen";
import WTChatMenuScreen from "../../Screens/WTScreens/WTChatScreen/WTChatMenuScreen";
import WTChooseChatScreen from "../../Screens/WTScreens/WTChatScreen/WTChooseChatScreen";
import { useTranslation } from "react-i18next";

const ChatStack = createNativeStackNavigator();

function ChatScreenNav(props) {
  const { t } = useTranslation();

  const makeNewChatButton = (navigation) => (
    <Icon
      iconSet={"MCI"}
      iconColor="#3E84F7"
      onPress={() => navigation.navigate("WTChooseChatScreen")}
      name={"message-plus"}
    />
    
  );

  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="WTChatMenuScreen" // Use a static name for referencing the screen
        component={WTChatMenuScreen}
        options={({ navigation }) => ({
          title: t("ChatMenuScreen"), // Translated title for this screen
          headerRight: () => makeNewChatButton(navigation),
        })}
      />
      <ChatStack.Screen
        name="WTChooseChatScreen" // Use a static name for referencing the screen
        component={WTChooseChatScreen}
        options={{
          title: t("ChooseChatScreen"), // Translated title for this screen
        }}
      />
      <ChatStack.Screen
        name="WTChatScreen" // Use a static name for referencing the screen
        component={WTChatScreen}
        options={({ navigation }) => ({
          title: t("ChatScreen"), // Translated title for this screen
          headerBackTitle: t("ChatScreen"), // Translate the back button title
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.popToTop()}
              backImage={() => (
                <Icon iconSet={"MCI"} name="chevron-left" size={36} iconColor="#3E84F7" /> // Custom chevron icon using MaterialCommunityIcons
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
