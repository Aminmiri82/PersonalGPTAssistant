import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import AppText from "../AppText";

import colors from "../../config/colors";

function AssistantsMenuItem({ image, title, onPress }) {
  return (
    <View style={styles.TopContainer}>
      <View style={styles.ImageContainer}>
        <TouchableOpacity onPress={onPress}>
          {image && <Image style={styles.image} source={image} />}
        </TouchableOpacity>
      </View>
      <View style={styles.modelTextContainer}>
        <Text style={styles.modelText}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <AppText style={styles.edit}>edit</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    flexDirection: "column",
    backgroundColor: colors.white,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    width: "45%", // Set width to less than half to fit two items per row
    margin: "2.5%", // Set margin to space items out

    // Other styles...
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
