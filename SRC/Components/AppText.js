import React, { forwardRef } from "react";
import { Text, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import { useTheme } from "../themes/ThemeProvidor";

import defaultStyles from "../config/Styles";
const AppText = forwardRef(({ children, style, onpress, ...props }, ref) => {
  const { colorsTh } = useTheme();
  return (
    <TouchableHighlight
      ref={ref}
      underlayColor={colors.light}
      onPress={onpress}
    >
      <Text style={[defaultStyles.text(colorsTh), style]} {...props}>
        {children}
      </Text>
    </TouchableHighlight>
  );
});

export default AppText;
