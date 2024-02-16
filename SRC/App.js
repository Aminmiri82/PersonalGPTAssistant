
import { StyleSheet, Text, View } from 'react-native';

import Screen from './Components/Screen';
import NavBar from './Components/NavBar';



import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Components/Header';
import colors from './config/colors';
import AppText from './Components/AppText';
import AppTextInput from './Components/AppTextInput';
import AssistantsMenuItem from './Components/AssistantsMenuItem';
import ListItem from './Components/ListItem';
import ListItemDeleteAction from './Components/ListItemDeleteAction';
export default function App() {
  
  return (
    <>
    <Header title="test title" backButton="" />
    <Screen style={styles.container}>
      <AssistantsMenuItem image={require('./assets/mosh.jpg')} modelName="Assistant 1" />
      <AssistantsMenuItem image={require('./assets/mosh.jpg')} modelName="Assistant 2" />
      <ListItem
        modelName="My title"
        chatName="Chat name"
        chatMessage="Chat message"
        image={require('./assets/mosh.jpg')}
        renderRightActions={ListItemDeleteAction}
        />


      
    
    
  
      
      
      
    </Screen>
   
   
    <NavBar/>
    </>
   
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between', // This will space out the items evenly
    alignItems: 'flex-start',
    maxWidth: '100%', // Ensuring the container doesn't stretch too much
  },
});
