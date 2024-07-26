import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, Text, ScrollView } from "react-native";
import ChatItem from "../../Components/ChatComponents/ChatItem";
import { fetchChatItems, deleteChatItemById, initDB } from "../../database";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../Components/Screen";

// const ChatMenuScreen = () => {
//   // const [chatItems, setChatItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const db = await initDB();
//       db.transaction((tx) => {
//         tx.executeSql("SELECT * FROM ChatItems", [], (tx, results) => {
//           let items = [];
//           for (let i = 0; i < results.rows.length; i++) {
//             items.push(results.rows.item(i));
//           }
//           setChatItems(items);
//         });
//       });
//     };
//     fetchData();
//   }, []);

//   return (
//     <View>
//       <FlatList
//         data={chatItems}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <ChatItem
//             title={item.title}
//             lastMessage={item.lastMessage}
//             timestamp={item.timestamp}
//           />
//         )}
//       />
//     </View>
//   );
// };

function ChatMenuScreen({ navigation }) {
  const [chatItems, setChatItems] = useState([]);

  useEffect(() => {
    initDB().catch((error) => {
      console.log("Error initializing database: ", error);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchChatItems()
        .then((data) => {
          setChatItems(data);
        })
        .catch((error) => {
          console.log("Error fetching ChatItems: ", error);
        });
    }, [])
  );

  const handlePress = (id) => {
    navigation.navigate("ChatScreen", { chatId: id });
  };

  return (
    <Screen>
      <View>
        <ScrollView bounces={false}>
          {chatItems.length === 0 ? (
            <Text>No chats available. please add a new chat.</Text>
          ) : (
            chatItems.map((chat) => (
              <ChatItem
                key={chat.id}
                title={chat.assistantName}
                subTitle={chat.lmit}
                image="../../assets/IMG_1706.jpeg"
                modelname={chat.modelname}
                onPress={() => handlePress(chat.chatId)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}

export default ChatMenuScreen;
