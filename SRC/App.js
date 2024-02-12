
import { StyleSheet, Text, View } from 'react-native';

import Screen from './Components/Screen';
import NavBar from './Components/NavBar';
import ListItem from './Components/ListItem';
import ListItemDeleteAction from './Components/ListItemDeleteAction';
import SettingsItem from './Components/SettingsItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Components/Header';
export default function App() {
  
  return (
    <>
    <Header title="settings"/>
    <Screen>
      
    
    

      
      
      
    </Screen>
   
    <NavBar/>
    </>
   
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
