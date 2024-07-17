import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ChatItem from "../../Components/ChatComponents/ChatItem";
import ChatScreen from "./ChatScreen";

function ChatMenuScreen({ navigation }) {
  return (
    <View>
      <ChatItem
        title="auto generated name"
        subTitle="last message in thread"
        image="../../assets/IMG_1706.jpeg"
        modelname="gpt"
      />
    </View>
  );
}

export default ChatMenuScreen;
