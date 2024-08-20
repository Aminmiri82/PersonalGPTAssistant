import React from 'react';
import { View } from 'react-native';
import AppImagePicker from '../Components/AssistantsComponents/AppImagePicker';// Adjust the path as necessary

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AppImagePicker 
        tipText="Choosing photo for the assistant" 
        editText="Edit"
      />
    </View>
  );
}