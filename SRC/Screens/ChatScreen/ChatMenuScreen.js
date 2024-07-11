import React from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";

import ChatItem from "../../Components/ChatComponents/ChatItem";
import Screen from "../../Components/Screen";

import colors from "../../config/colors";
import Icon from "../../Components/Icon";
import ListItemSeparator from "../../Components/ListItemSeparator";
import Textinput from "../../Components/ChatComponents/Textinput";
// note from amin : what the fuck is this shit? i thought this was supposed to be the chatmenuScreen wtf
const menuItems = [
  {
    title: "My listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My message",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];

function ChatMenuScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.textinputcontainer}>
        <Textinput style={styles.textinput} />
      </View>
      {/* <View style={styles.container}>
        <ChatItem
          title="place holder"
          subTitle="aliradmard5@gmail.com"
          image={require("../../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ChatItem
              title={item.title}
              IconComponent={
                <Icon
                  iconSet="MCI" //shortened for MaterialCommunityIcons
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor} //FIXME - backgroundColor in Icon
                />
              }
            />
          )}
        />
      </View>
      <ChatItem
        title="Logout"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => navigation.navigate("OnBoardingScreen")} // temp for making sure the navigation thingy works
      /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  textinputcontainer: {
    position: "absolute",
    bottom: "5%",
    left: 0,
    right: 0,
    backgroundColor: colors.light,
    borderColor: "red",
  },
});

export default ChatMenuScreen;
