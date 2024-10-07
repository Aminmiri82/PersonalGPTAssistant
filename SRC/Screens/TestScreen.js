import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

const TestFsScreen = () => {
  const [fileContent, setFileContent] = useState('');
  const [fileName, setFileName] = useState('');

  const pickFile = async () => {
    try {
      // Pick a file using the document picker
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Adjust the type as needed
      });

      // Access the first item in the array
      const file = res[0]; // This retrieves the first file

      // Check if the uri is available
      if (file.uri) {
        // Read the file
        const contents = await RNFS.readFile(file.uri, 'utf8');
        setFileContent(contents);
        setFileName(file.name); // Store the name of the file
        Alert.alert('File Read', `Successfully read ${file.name}`);
      } else {
        Alert.alert('Error', 'Selected file does not have a valid URI');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled', 'File picking was canceled');
      } else {
        Alert.alert('Error', `Failed to read the file: ${err.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test react-native-document-picker</Text>
      <Text>Selected File: {fileName || 'No file selected'}</Text>
      <Text>File Content: {fileContent || 'No content yet.'}</Text>
      <Button title="Pick a File" onPress={pickFile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default TestFsScreen;