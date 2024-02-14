
import { StyleSheet, Text, View } from 'react-native';

import Screen from './Components/Screen';
import NavBar from './Components/NavBar';


import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Components/Header';
import colors from './config/colors';
import AppText from './Components/AppText';
import AppTextInput from './Components/AppTextInput';
export default function App() {
  
  return (
    <>
    <Header title="test title" backButton="" />
    <Screen>
      
    
    
  <AppTextInput placeholder="Ask me anything" />
      
      
      
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
