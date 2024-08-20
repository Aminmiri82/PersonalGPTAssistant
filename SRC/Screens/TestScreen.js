import React, { useState } from 'react';
import { View, Text,Button } from 'react-native';
import { fetchAssistantstest } from '../database';

export default function App() {
  const [res, setRes] = useState('');
test = async () => {
  const result = await fetchAssistantstest();
  setRes(JSON.stringify(result));
}
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Button title="Test" onPress={test} />
      <Text>{res}</Text>
    </View>
  );
}