import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatMenuScreen from '../Screens/ChatScreen/ChatMenuScreen';
import OnBoardingScreen from '../Screens/OBS/OnBoardingScreen';

const ChatStack = createNativeStackNavigator();
function ChatScreenNav(props) {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="ChatMenuScreen" component={ChatMenuScreen} options={{headerShown : false}}/>
      <ChatStack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
    </ChatStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default ChatScreenNav;