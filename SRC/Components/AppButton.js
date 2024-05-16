import React from "react";
import { View, StyleSheet, TouchableOpacity, Touchable } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";

function AppButton({
  title,
  color = "primary",
  onPress,
  icon,
  style,
  iconStyle,
  textStyle,
  iconSet,
}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <AppText style={[styles.text, textStyle]}>{title}</AppText>
      {icon && (
        <Icon
          iconSet={iconSet}
          name={icon}
          iconColor={colors.black}
          style={iconStyle}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 100,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    flexDirection: "row",
  },
  //   icon: {
  //     left: 27,
  //   },
  text: {
    left: 14,
  },
});

export default AppButton;
