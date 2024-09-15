import { Platform } from "react-native";
import colors from "./colors";
import { useTheme } from "../themes/ThemeProvidor";

export default {
  colors,
  text: (colorsTh) => ({
    color: colorsTh.dark, // Pass colorsTh dynamically from your component
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  }),
};
