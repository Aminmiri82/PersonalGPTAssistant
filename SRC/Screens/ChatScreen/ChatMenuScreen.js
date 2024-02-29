import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "../../Components/ListItem";
import ChatItem from "../../Components/ChatItem";
import Screen from "../../Components/Screen";

import colors from "../../config/colors";
import Icon from "../../Components/Icon";
import ListItemSeparator from "../../Components/ListItemSeparator";

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

function AccountScreen(props) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ChatItem
          title="Mosh Hamedani"
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
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ChatItem
        title="Logout"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
