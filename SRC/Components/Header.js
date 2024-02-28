import React from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import ListItemSeparator from "./ListItemSeparator";
{
  /* setting the backButton arg to anything but an empty string will result in it showing up in the header */
}
function Header({ title, backButton, style }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={styles.header}>
        {backButton && (
          <TouchableOpacity
            onPress={() => console.log("Back pressed")}
            style={styles.iconContainer}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={colors.medium}
            />
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <AppText style={styles.titleText}>{title}</AppText>
        </View>

        {/* Spacer View */}
        {backButton && <View style={styles.iconContainer} />}
      </View>
      <ListItemSeparator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 30, // Ensure this matches the width of your icon or adjust accordingly
    alignItems: "center", // Center the icon within the container
  },
  titleContainer: {
    flex: 1,
    // Removed position: 'absolute'
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.black,
  },
});

export default Header;
