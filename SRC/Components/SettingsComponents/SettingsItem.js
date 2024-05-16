import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AppText from "../AppText";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from "../../config/colors";

function SettingsItem({
  title,
  subTitle,
  IconComponent,
  onPress,
  
}) {
  return (
    
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          <View>
            {IconComponent}
          </View>
          
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            </View>
            {subTitle && (
          <View style={styles.subTitleContainer}>
            <AppText style={styles.subTitle}>{subTitle}</AppText>
          </View>)}
    
          <View style={styles.arrow}>
            <MaterialCommunityIcons name="chevron-right" size={25} color={colors.medium} />
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
    alignItems: 'center'
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  
  subTitle: {
    color: colors.medium,
    
  },
  title: {
    fontWeight: "500",
  },
  arrow: {
    alignItems: 'flex-end', 
    flex: 0,
  },
  subTitleContainer: {
 
    marginRight: 10, 
  },
});

export default SettingsItem;
