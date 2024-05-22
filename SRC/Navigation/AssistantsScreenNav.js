import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssistantMakerScreen from '../Screens/AssistantScreen/AssistantMakerScreen';
import BuildScreen from '../Screens/AssistantScreen/BuildScreen';

const AssistantsStack = createNativeStackNavigator();
function AssistantsScreenNav(props) {
  return (
    <AssistantsStack.Navigator>
      <AssistantsStack.Screen name="AssistantMakerScreen" component={AssistantMakerScreen} options={{headerShown : false}}/>
      <AssistantsStack.Screen name="BuildScreen" component={BuildScreen} />
    </AssistantsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default AssistantsScreenNav;