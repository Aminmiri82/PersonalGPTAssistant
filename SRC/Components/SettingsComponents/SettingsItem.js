import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import AppText from "../AppText";

import { MaterialCommunityIcons } from "@expo/vector-icons";


import colors from "../../config/colors";
import Icon from "../Icon";

function SettingsItem({ title, subTitle, IconComponent, onPress }) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{IconComponent}</View>

        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
        </View>
        {subTitle && (
          <View style={styles.subTitleContainer}>
            <AppText style={styles.subTitle}>{subTitle}</AppText>
          </View>
        )}

        <View style={styles.arrow}>
          <Icon
            iconSet="MCI"
            name="chevron-right"
            size={25}
            color={colors.medium}
            style={styles.arrow}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  iconContainer: {
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
  },
  subTitleContainer: {
    marginRight: 10,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 14,
  },
  arrow: {
    alignSelf: "center",
  },
});

export default SettingsItem;
