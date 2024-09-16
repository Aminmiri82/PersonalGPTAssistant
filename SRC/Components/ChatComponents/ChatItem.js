import React, { forwardRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AppText from "../AppText";
import colors from "../../config/colors";
import colorsTh from "../../themes/colorsTh.js";
import Icon from "../Icon";
import { Ionicons } from "@expo/vector-icons";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useTheme } from "../../themes/ThemeProvidor";

const ChatItem = forwardRef(
  (
    { title, subTitle, imageUri, IconComponent, onPress, modelname, onDelete },
    ref
  ) => {
    const renderRightActions = () => (
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Ionicons name="trash-bin" size={24} color="red" />
      </TouchableOpacity>
    );
    const { dark, colorsTh, setScheme } = useTheme();

    return (
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <TouchableHighlight
            underlayColor={colorsTh.light}
            onPress={onPress}
            ref={ref}
          >
            <View
              style={[
                styles.container,
                { backgroundColor: colorsTh.background },
              ]}
            >
              <View style={styles.visualcontainer}>
                {IconComponent}
                {imageUri ? (
                  <Image style={styles.image} source={{ uri: imageUri }} />
                ) : (
                  <Image
                    style={styles.image}
                    source={require("../../assets/logo.jpg")}
                  />
                )}
                {modelname && (
                  <AppText style={styles.modelstyle}> {modelname} </AppText>
                )}
              </View>
              <View style={styles.detailContainer}>
                <AppText style={styles.title}>{title}</AppText>
                {subTitle && (
                  <AppText style={styles.subTitle}>{subTitle}</AppText>
                )}
              </View>
            </View>
          </TouchableHighlight>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "grey",
    borderWidth: 0.2,
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
  visualcontainer: {
    flexDirection: "column",
  },
  modelstyle: {
    alignSelf: "center",
    fontSize: 13,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
});

export default ChatItem;
