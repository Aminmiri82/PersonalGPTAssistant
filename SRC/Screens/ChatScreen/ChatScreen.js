import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import ChatItem from "../../Components/ChatComponents/ChatItem";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import Icon from "../../Components/Icon";
import ListItemSeparator from "../../Components/ListItemSeparator";
import Textinput from "../../Components/ChatComponents/Textinput";
import ChatBubble from "../../Components/ChatComponents/Chatbubble";

function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    setMessages([...messages, { id: messages.length.toString(), text }]);
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble text={item.text} />}
        contentContainerStyle={styles.chatContainer}
      />
      <Textinput onSubmit={handleSend} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 50, // Add some padding to avoid being covered by the TextInput
  },
});

export default ChatScreen;
