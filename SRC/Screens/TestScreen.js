import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const DocumentPickerScreen = () => {
  const [fileInfo, setFileInfo] = useState(null);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('Document selected:', res);
      setFileInfo(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Unknown error:', err);
        throw err;
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Document Picker Example</Text>
      <Button title="Pick a Document" onPress={pickDocument} />
      {fileInfo && (
        <View style={styles.fileInfo}>
          <Text style={styles.label}>File Name:</Text>
          <Text>{fileInfo[0].name}</Text>
          <Text style={styles.label}>File URI:</Text>
          <Text>{fileInfo[0].uri}</Text>
          <Text style={styles.label}>File Type:</Text>
          <Text>{fileInfo[0].type}</Text>
          <Text style={styles.label}>File Size:</Text>
          <Text>{fileInfo[0].size} bytes</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fileInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default DocumentPickerScreen;