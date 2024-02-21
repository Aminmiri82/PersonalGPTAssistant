import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Components/Header";
import ListItem from "../Components/ListItem";
import Screen from "../Components/Screen";

function TestScreen(props) {
  return (
    <>
      <Header title="test title" backButton="" />
      <Screen style={styles.container}>
        <ListItem
          modelName="something"
          chatMessage="hi"
          chatName="thing"
          image={require("./assets/mosh.jpg")}
          renderRightActions={ListItemDeleteAction}
        />
      </Screen>

      <NavBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default TestScreen;
