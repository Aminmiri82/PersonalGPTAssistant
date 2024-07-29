import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import AppText from "../../Components/AppText";
import Screen from "../../Components/Screen";
import colors from "../../config/colors";
import { useState, useEffect } from "react";
import { fetchAssistantById, deleteAssistantById } from "../../database";
//info is the stuff that is saved in the database and you edit it here
function AssistantEditorScreen1({ navigation, info, route }) {
  const { id } = route.params;
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    fetchAssistantById(id)
      .then((assistant) => {
        setName(assistant.name);
        setInstructions(assistant.instructions);
      })
      .catch((error) => {
        console.log("Error fetching assistant: ", error);
      });
  }, [id]);

  const handleNext = () => {
    if (!name || !instructions) {
      console.log("Name or instructions are missing");
      return;
    }
    navigation.push("AssistantEditorScreen2", {
      id,
      name,
      instructions,
    });
  };

  const handleDelete = () => {
    deleteAssistantById(id)
      .then(() => {
        navigation.navigate("AssistantMenuScreen"); // Navigate back to the assistant menu
      })
      .catch((error) => {
        console.log("Error deleting assistant: ", error);
      });
  };

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
            <TouchableOpacity
              style={styles.picture}
              onPress={() => {
                console.log("edit");
              }}
            >
              <Image
                style={styles.picture}
                source={require("../../assets/assistant.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pictureButton}
              onPress={() => {
                console.log("edit");
              }}
            >
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
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.deleteAssistantButton}
        >
          <AppText style={styles.deleteButtonText}>delete</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
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
    // borderColor: "blue",
    // borderWidth: 1,
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
    // borderWidth: 1,
    // borderColor: colors.primary,
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
  ButtonContainer: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  deleteAssistantButton: {
    backgroundColor: colors.deleteRed,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    marginRight: 10,
  },
  deleteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: colors.niceBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
    marginLeft: 10,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AssistantEditorScreen1;
