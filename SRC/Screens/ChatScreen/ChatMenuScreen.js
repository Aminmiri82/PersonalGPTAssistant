import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { initDB, getDB } from "../../database";
import ChatItem from "../../Components/ChatComponents/ChatItem";

const ChatMenuScreen = () => {
  const [chatItems, setChatItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = await initDB();
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM ChatItems", [], (tx, results) => {
          let items = [];
          for (let i = 0; i < results.rows.length; i++) {
            items.push(results.rows.item(i));
          }
          setChatItems(items);
        });
      });
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>first commit</Text>
      <FlatList
        data={chatItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ChatItem
            title={item.title}
            lastMessage={item.lastMessage}
            timestamp={item.timestamp}
          />
        )}
      />
    </View>
  );
};

export default ChatMenuScreen;
