import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import Screen from './Components/Screen';
import TermsAndConditionsScreen from './Screens/TermsAndConditionsScreen';
import AppText from './Components/AppText';
import ScrollableAppText from './Components/ScrollableAppText';




export default function App() {
  
  return (
    <>
    <Header title="test"/>
    <Screen>
    <TermsAndConditionsScreen/>
    </Screen>
    <NavBar/>

    
      
     

    
     
      
      
    
   
   
    </>
   
    
    
  );
}

const styles = StyleSheet.create({
  
});
