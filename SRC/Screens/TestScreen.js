import React from "react";
import { View, StyleSheet } from "react-native";

import ListItem from "../Components/ListItem";
import Screen from "../Components/Screen";

function TestScreen(props) {
  return (
    <>
      <Screen style={styles.container}>
        <ListItem
          modelName="something"
          chatMessage="hi"
          chatName="thing"
          image={require("../assets/mosh.jpg")}
          renderRightActions={ListItemDeleteAction}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TestScreen;
