import React, { forwardRef } from "react";
import { Text, TouchableHighlight } from "react-native";
import colors from "../config/colors";

import defaultStyles from "../config/Styles";
const AppText = forwardRef(({ children, style, onpress, ...props }, ref) => {
  return (
    <TouchableHighlight
      ref={ref}
      underlayColor={colors.light}
      onPress={onpress}
    >
      <Text style={[defaultStyles.text, style]} {...props}>
        {children}
      </Text>
    </TouchableHighlight>
  );
});

export default AppText;
