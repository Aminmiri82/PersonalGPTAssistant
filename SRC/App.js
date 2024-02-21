import { StyleSheet, Text, View } from "react-native";

import Screen from "./Components/Screen";
import NavBar from "./Components/NavBar";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "./Components/Header";
import colors from "./config/colors";
import AppText from "./Components/AppText";
import AppTextInput from "./Components/AppTextInput";
import AssistantsMenuItem from "./Components/AssistantsMenuItem";
import ListItem from "./Components/ListItem";
import ListItemDeleteAction from "./Components/ListItemDeleteAction";
import OnBoardingScreen from "./Screens/OnBoardingScreen";
import LinearGradientScreen from "./Screens/LinearGradinetScreen";
export default function App() {
  return <OnBoardingScreen />;
}

const styles = StyleSheet.create({});
