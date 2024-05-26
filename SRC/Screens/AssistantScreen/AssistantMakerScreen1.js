import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import Styles from "../../config/Styles";
import { useState } from "react";

function AssistantMakerScreen1({ navigation }) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  return (
    <Screen>
      <View style={styles.topContainer}>
        <View style={styles.pictureContainer}>
          <View style={styles.pictureTipContainer}>
            <AppText style={styles.pictureTip}>
              you can choose a photo for your assistant
            </AppText>
          </View>
          <View style={styles.pictureWrapper}>
            <Image
              style={styles.picture}
              source={require("../../assets/IMG_1706.jpeg")}
            />
            <TouchableOpacity style={styles.pictureButton}>
              <AppText style={styles.pictureButtonText}>edit</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <AppText style={styles.midTitle}>
          choose a name for your assistant
        </AppText>
        <TextInput
          style={styles.midInput}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.bottomContainer}>
        <AppText style={styles.bottomTitle}>
          give your assistant insutructions on how it should behave
        </AppText>
        <TextInput
          style={styles.bottomInput}
          placeholder="Enter instructions"
          value={instructions}
          onChangeText={setInstructions}
          multiline
          numberOfLines={5}
          scrollEnabled
        />
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity onPress={() => console.log("Next")}>
          <AppText style={styles.nextButtonText}>Next</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    borderColor: "blue",
    borderWidth: 1,
  },
  pictureContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  pictureTipContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 10,
  },
  pictureTip: {
    color: colors.dark,
    fontSize: 16,
    textAlign: "center",
  },
  pictureWrapper: {
    alignItems: "center",
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  pictureButton: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  pictureButtonText: {
    fontSize: 12,
    color: colors.blue,
  },
  middleContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  midTitle: {
    fontSize: 20,
    color: colors.dark,
    marginBottom: 10,
    textAlign: "center",
  },
  midInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: "80%",
  },
  bottomContainer: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  bottomTitle: {
    fontSize: 20,
    color: colors.dark,
    marginBottom: 10,
    textAlign: "center",
  },
  bottomInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingTop: 10,
    width: "80%",
    textAlignVertical: "top",
  },
  nextButtonContainer: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default AssistantMakerScreen1;
