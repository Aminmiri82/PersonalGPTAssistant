// Icon.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  iconSet,
  name,
  size = 40,
  iconColor = "#fff",
  backgroundColor = "#000",
  style,
}) {
  return (
    <View
      style={[
        { justifyContent: "center", backgroundColor },
        { width: size, height: size },
        style,
      ]}
    >
      {iconSet === "AntDesign" && (
        <AntDesign name={name} color={iconColor} size={size * 0.5} />
      )}
      {iconSet === "MCI" && (
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#000",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Icon;
