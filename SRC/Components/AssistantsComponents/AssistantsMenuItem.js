import React, { forwardRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import AppText from "../AppText";

import colors from "../../config/colors";
import { useTheme } from "../../themes/ThemeProvidor";

const AssistantsMenuItem = forwardRef(
  ({ imageUri, title, onPress, ShowEditButton = true }, ref) => {
    const { colorsTh } = useTheme();
    return (
      <View
        style={[
          styles.TopContainer,
          {
            backgroundColor: colorsTh.white,
            borderBottomColor: colorsTh.light,
          },
        ]}
      >
        <View style={styles.ImageContainer}>
          <TouchableOpacity onPress={onPress} ref={ref}>
            {imageUri ? (
              <Image style={styles.image} source={{ uri: imageUri }} />
            ) : (
              <Image
                style={styles.image}
                source={require("../../assets/logo.jpg")}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.modelTextContainer}>
          <AppText style={styles.modelText}>{title}</AppText>
        </View>
        {ShowEditButton && (
          <TouchableOpacity onPress={onPress}>
            <AppText style={[styles.edit, { color: colorsTh.blue }]}>
              edit
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  TopContainer: {
    flexDirection: "column",
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 20,
    width: "45%", // Set width to less than half to fit two items per row
    margin: "2.5%", // Set margin to space items out
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
  },
  edit: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  modelText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
});

{
  /*
style sheet for the actual screen in order to make the items appear in a grid:
menuScreen: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between', // This will space out the items evenly
    alignItems: 'flex-start',
    maxWidth: '100%', // Ensuring the container doesn't stretch too much
  },

*/
}

export default AssistantsMenuItem;
