import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
} from "react-native";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";

function AssistantsMenuItem({
  image,
  modelName,
}) {
  return (
    
      
        <View style={styles.TopContainer}>
          <View style={styles.ImageContainer}>
            <TouchableOpacity >
              {image && <Image style={styles.image} source={image} />} 
            </TouchableOpacity>
          </View>
          <View style={styles.modelTextContainer}>
            <Text style={styles.modelText}>{modelName}</Text>
          </View>
          <TouchableOpacity>
            <AppText style={styles.edit}>Edit</AppText>
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
    width: '45%', // Set width to less than half to fit two items per row
    margin: '2.5%', // Set margin to space items out
    // Other styles...
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
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


{/*
style sheet for the actual screen in order to make the items appear in a grid:
menuScreen: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between', // This will space out the items evenly
    alignItems: 'flex-start',
    maxWidth: '100%', // Ensuring the container doesn't stretch too much
  },

*/}

export default AssistantsMenuItem;
