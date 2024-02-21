// Icon.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function Icon({ name, size = 40, iconColor = "#fff", style }) {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <AntDesign name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // alignItems: "center",
    // flexDirection: "row",
  },
});

export default Icon;
