import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../themes/ThemeProvidor";

function Icon({
  iconSet,
  name,
  size = 24,
  iconColor, // Removed the default value here
  style,
  onPress,
}) {
  const { colorsTh } = useTheme(); // Access colorsTh using the hook
  const colorToUse = iconColor || colorsTh.icon; // Set the default color here

  const IconContent = (
    <View style={[styles.container, style]}>
      {iconSet === "AntDesign" && (
        <AntDesign name={name} color={colorToUse} size={size} />
      )}

      {iconSet === "MCI" && (
        <MaterialCommunityIcons name={name} color={colorToUse} size={size} />
      )}
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{IconContent}</TouchableOpacity>;
  }

  return IconContent;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Icon;
