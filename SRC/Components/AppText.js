import React from "react";
import { Text} from "react-native";

import defaultStyles from "../config/Styles";
function AppText({ children, style }) {
  return (<Text style={[defaultStyles.text, style]}>{children}</Text>);
}



export default AppText;
