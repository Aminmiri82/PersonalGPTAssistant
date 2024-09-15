import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
function Screen({ children, style, text, textStyle }) {
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={[styles.screen, style]}>
        <Text style={textStyle}>{text}</Text>
        {children}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Constants.statusBarHeight,
    // flex: 1,
  },
});

export default Screen;
