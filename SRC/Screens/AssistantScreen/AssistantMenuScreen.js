import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import AssistantsMenuItem from "../../Components/AssistantsComponents/AssistantsMenuItem";
import Screen from "../../Components/Screen";

function AssistantMenuScreen({ navigation }) {
  return (
    <Screen>
      <View style={styles.container}>
        <ScrollView bounces={false}>
          <View style={styles.top}>
            <AssistantsMenuItem
              image={require("../../assets/IMG_1706.jpeg")}
              title="assistant1"
              onPress={() => {
                {
                  navigation.navigate("AssistantMakerScreen1");
                }
              }}
            />
            <AssistantsMenuItem
              image={require("../../assets/mosh.jpg")}
              title="assistant2"
            />
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  top: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default AssistantMenuScreen;
