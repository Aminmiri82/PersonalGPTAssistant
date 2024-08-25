import React, { forwardRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import { TouchableHighlight } from "react-native-gesture-handler";

import colors from "../../config/colors";

const AssistantsMenuItem = forwardRef(
  ({ imageUri, title, onPress, ShowEditButton = true }, ref) => {
    return (
      <TouchableHighlight
        ref={ref}
        underlayColor={colors.light}
        onPress={onPress}
      >
        <View style={styles.TopContainer}>
          <View style={styles.ImageContainer}>
            <TouchableOpacity onPress={onPress}>
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
              <AppText style={styles.edit}>edit</AppText>
            </TouchableOpacity>
          )}
        </View>
      </TouchableHighlight>
    );
  }
);

const styles = StyleSheet.create({
  TopContainer: {
    flexDirection: "column",
    backgroundColor: colors.white,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderBottomColor: colors.light,
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
    color: colors.blue,
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
