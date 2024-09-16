import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "../Components/Icon";
import colors from "../config/colors";
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import ChatMenuScreen from "../Screens/ChatScreen/ChatMenuScreen";
import ChooseChatScreen from "../Screens/ChatScreen/ChooseChatScreen";
import EmptyCS from "../Screens/ChatScreen/EmptyCS";
import { useCopilot, CopilotStep, walkthroughable } from "react-native-copilot";

import TestScreen from "../Screens/TestScreen";
import AppButton from "../Components/AppButton";
import { useTranslation } from "react-i18next";
import { useTheme } from "../themes/ThemeProvidor"; // Import useTheme

const ChatStack = createNativeStackNavigator();

function ChatScreenNav(props, route) {
  const { colorsTh } = useTheme(); // Get theme colors
  const { t } = useTranslation();
  const startWalkthrough = route.params?.startWalkthrough;

  const makeNewChatButton = (navigation) => (
    <Icon
      iconSet={"MCI"}
      iconColor={colors.niceBlue}
      onPress={() => navigation.navigate("ChooseChatScreen")}
      name={"message-plus"}
    />
  );

  return (
    <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorsTh.background, // Set header background based on theme
        },
        headerTintColor: colorsTh.text, // Set header text color based on theme
        headerTitleStyle: {
          fontWeight: "bold", // Optional: Customize the title style
        },
        // borderBottomColor: "white",
      }}
    >
      <ChatStack.Screen
        name="ChatMenuScreen" // Use a static name for referencing the screen
        component={ChatMenuScreen}
        initialParams={{ startWalkthrough }}
        options={({ navigation }) => ({
          title: t("ChatMenuScreen"), // Translated title for this screen
          headerRight: () => makeNewChatButton(navigation),
        })}
      />
      <ChatStack.Screen
        name="ChooseChatScreen" // Use a static name for referencing the screen
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
                <Icon
                  iconSet={"MCI"}
                  name="chevron-left"
                  size={36}
                  iconColor="#3E84F7"
                /> // Custom chevron icon using MaterialCommunityIcons
              )}
            />
          ),
        })}
      />
      <ChatStack.Screen
        name="EmptyCS" // Use a static name for referencing the screen
        component={EmptyCS}
        options={{
          title: t("ChatScreen"), // Translated title for this screen
        }}
      />
    </ChatStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatScreenNav;
