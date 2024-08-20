import React, { useState } from "react";
import { View, Button, Text,  } from "react-native";
import Screen from "../Components/Screen";
import { fetchAssistantstest,fetchChatItems } from "../database";


const TestScreen = () => {
  const [result, setResult] = useState("");
  const test = async () => {
    const res1 = await fetchAssistantstest();
    const res2 = await fetchChatItems();
    const res = res1.concat(res2);
    setResult(JSON.stringify(res));
  };
  
  
  return (
    <Screen>
      <Button title="Test" onPress={test} />
      <Text>{result}</Text>
    </Screen>
  );
};

export default TestScreen;
