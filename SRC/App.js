import React from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import Screen from './Components/Screen';
import TermsAndConditionsScreen from './Screens/TermsAndConditionsScreen';
import AppText from './Components/AppText';
import ScrollableAppText from './Components/ScrollableAppText';
import PrivacyPolicyScreen from './Screens/PrivacyPolicyScreen';
import AboutUsScreen from './Screens/AboutUsScreen';




export default function App() {
  
  return (
    <>
    <Header title="test"/>
    <Screen>
    <AboutUsScreen/>
    </Screen>
    <NavBar/>

    
      
     

    
     
      
      
    
   
   
    </>
   
    
    
  );
}

const styles = StyleSheet.create({
  
});
