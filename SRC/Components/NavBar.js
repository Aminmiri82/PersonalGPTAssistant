import React from 'react';
import { View, StyleSheet,TouchableOpacity,Text,SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
function NavBar(props) {
    return (
        
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.iconWrapper}>
              <MaterialCommunityIcons name="chat" size={35}/> 
              <Text>Chat</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
                <MaterialCommunityIcons name="vector-arrange-below" size={35}/>
                <Text>Assistants</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper}>
                <MaterialCommunityIcons name="cog"  size={35}/>
                <Text>Settings</Text>
            </TouchableOpacity>
        </View>

        
        
    );
}
const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row', // This aligns items horizontally
        justifyContent: 'space-around', // This distributes space around the items
        alignItems: 'center', 
        height: 80,
        paddingBottom: 10, 
        backgroundColor: colors.lightGrey
    },
    iconWrapper: {
        // Style for each icon wrapper
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
    },
    
})

export default NavBar;