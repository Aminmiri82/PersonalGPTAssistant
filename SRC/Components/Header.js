import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import AppText from './AppText';

function Header({ title }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back pressed")} style={styles.iconContainer}>
          <MaterialCommunityIcons name="chevron-left" size={30} color={colors.medium} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <AppText style={styles.titleText}>{title}</AppText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white, // Or any color that fits your app's theme
  },
  header: {
    flexDirection: 'row', // Aligns items horizontally
    alignItems: 'center', // Centers items vertically within the container
    padding: 10, // Adds padding around the content
    backgroundColor: colors.white, // Background color of the header
  },
  iconContainer: {
    marginRight: 10, // Adds some space between the icon and the title
  },
  titleContainer: {
    flex: 1, // Ensures it takes up the remaining space
    alignItems: 'center', 
    
  },
  titleText: {
    fontWeight: 'bold', // Makes the title stand out
    fontSize: 20, // Increases the font size for better readability
    color: colors.black,
    alignContent: 'center',
  },
});

export default Header;
