
import { StyleSheet, Text, View } from 'react-native';

import Screen from './Components/Screen';
import NavBar from './Components/NavBar';
import ListItem from './Components/ListItem';
import ListItemDeleteAction from './Components/ListItemDeleteAction';
export default function App() {
  
  return (
    <>
    <Screen>
    <ListItem
    chatName="My chat name"
    chatMessage="My chat message"
    image= {require("./assets/mosh.jpg")}
    modelName="gpt"
    renderRightActions={ListItemDeleteAction}/>
      
    

      
      
      
    </Screen>
   
    <NavBar/>
    </>
   
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
