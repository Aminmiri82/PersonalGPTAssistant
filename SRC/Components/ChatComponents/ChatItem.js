import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import Icon from "../Icon";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";

function ChatItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  modelname,
  showDelete,
  onDelete,
}) {
  const renderRightActions = () => (
    <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
      <Ionicons name="trash-bin" size={24} color="red" />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            <View style={styles.visualcontainer}>
              {IconComponent}
              {image && <Image style={styles.image} source={image} />}
              {modelname && (
                <AppText style={styles.modelstyle}> {modelname} </AppText>
              )}
            </View>
            <View style={styles.detailContainer}>
              <AppText style={styles.title}>{title}</AppText>
              {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: colors.medium,
  },
  visualcontainer: {
    flexDirection: "column",
  },
  modelstyle: {
    alignSelf: "center",
  },
  deleteButton: {
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
});

export default ChatItem;
