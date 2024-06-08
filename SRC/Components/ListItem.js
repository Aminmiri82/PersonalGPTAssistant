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

function ListItem({
  
  image,
  onPress,
  renderRightActions,
  modelName,
  chatName,
  chatMessage,
  
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          <View>
          
          {image && <Image style={styles.image} source={image} />} 
          <Text style={styles.modelText}>{modelName}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <AppText style={styles.chatName}>{chatName}</AppText>
            {chatMessage && <AppText style={styles.chatMessage}>{chatMessage}</AppText>}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    height: 120,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
   
  },
  modelText: {
    color: colors.medium,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  chatMessage: {
    color: colors.medium,
    paddingLeft:60
  },
  chatName: {
    fontWeight: "500",
    paddingBottom: 10,
    paddingLeft: 10,

  },
});

export default ListItem;
