import React from "react";
import { ScrollView, Text, View } from "react-native";
import AppText from "./AppText"; // Ensure this import path is correct
import defaultStyles from "../config/Styles"; // Ensure this import path is correct

function ScrollableAppText({ children, style }) {
  return (
    <View style={{ flex: 1 }}>
       <ScrollView>
       <AppText style={[defaultStyles.text, style]}>{children}</AppText>
       </ScrollView>
    </View>
  );
}

export default ScrollableAppText;
