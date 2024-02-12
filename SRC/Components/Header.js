import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import AppText from './AppText';
import ListItemSeparator from './ListItemSeparator';

function Header({ title }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back pressed")} 
          style={styles.iconContainer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialCommunityIcons name="chevron-left" size={30} color={colors.medium} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <AppText style={styles.titleText}>{title}</AppText>
        </View>
        
        {/* Spacer View */}
        <View style={styles.iconContainer} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 30, // Ensure this matches the width of your icon or adjust accordingly
    alignItems: 'center', // Center the icon within the container
  },
  titleContainer: {
    flex: 1,
    // Removed position: 'absolute'
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.black,
  },
});


export default Header;
