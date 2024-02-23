import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

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
import OnBoardingScreen from "./Screens/OBS/OnBoardingScreen";
import LinearGradientScreen from "./Screens/LinearGradinetScreen";
import testOBS from "./Screens/OBS/testOBS";

export default function App() {
  return (
    // <NavigationContainer>

    // </NavigationContainer>

    <OnBoardingScreen />
  );
}

const styles = StyleSheet.create({});
