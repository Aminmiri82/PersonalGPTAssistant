import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ChatItem from "../../Components/ChatComponents/ChatItem";

function ChatMenuScreen() {
  return (
    <View>
      <ChatItem title="Hello" subTitle="Hi" />
    </View>
  );
}

export default ChatMenuScreen;
