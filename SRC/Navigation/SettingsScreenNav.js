import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from "../Screens/SettingsScreen/SettingsScreen";
import AboutUsScreen from "../Screens/SettingsScreen/AboutUsScreen";
import TermsAndConditionsScreen from "../Screens/SettingsScreen/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../Screens/SettingsScreen/PrivacyPolicyScreen";


const SettingsStack = createNativeStackNavigator();
export default function SettingsScreenNav() {
  return (
    
        <SettingsStack.Navigator  >
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen}options={{}}/>
            <SettingsStack.Screen name="AboutUsScreen" component={AboutUsScreen} />
            <SettingsStack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
            <SettingsStack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        </SettingsStack.Navigator>
    
    
  )
}