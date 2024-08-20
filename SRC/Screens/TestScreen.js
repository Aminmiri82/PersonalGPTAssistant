import React, { useState } from "react";
import { View, Button, Text,  } from "react-native";
import Screen from "../Components/Screen";
import { fetchAssistantstest } from "../database";


const TestScreen = () => {
  const [result, setResult] = useState("");
  const test = async () => {
    const res = await fetchAssistantstest();
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
