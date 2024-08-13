import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function Icon({
  iconSet,
  name,
  size = 24,
  iconColor = colors.black,
  style,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        {iconSet === "AntDesign" && (
          <AntDesign name={name} color={iconColor} size={size} />
        )}

        {iconSet === "MCI" && (
          <MaterialCommunityIcons name={name} color={iconColor} size={size} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Icon;
