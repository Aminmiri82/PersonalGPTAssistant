import React from "react";
import { ScrollView, Text, View } from "react-native";
import AppText from "../AppText"; 
import defaultStyles from "../../config/Styles"; 
//imma be honest with you this shit is really not necescary 
function ScrollableAppText({ children, style }) {
  return (
    <View style={{ flex: 1 }}>
       <ScrollView>
       <AppText style={[defaultStyles.text, style]}>{children}</AppText>
       </ScrollView>
    </View>
  );
}

export default ScrollableAppText;
