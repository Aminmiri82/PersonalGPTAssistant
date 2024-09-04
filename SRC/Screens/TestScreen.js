import React, { useState } from 'react';
import { View, Button, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const FileUploadScreen = () => {
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadFile(result.assets[0].uri);
    }
  };

  const uploadFile = async (uri) => {
    const fileUri = await FileSystem.getInfoAsync(uri);
    const formData = new FormData();

    formData.append('file', {
      uri: fileUri.uri,
      name: 'test.jpg',
      type: 'image/jpeg',
    });

    axios.post('https://file.io', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader('x-decompressed-content-length');

        if (totalLength) {
          const progress = Math.round((progressEvent.loaded * 100) / totalLength);
          setProgress(progress);
        }
      },
    })
    .then(response => {
      setFileUrl(response.data.link);
      console.log('Upload successful', response.data);
    })
    .catch(error => {
      console.error('Upload failed', error);
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick an Image" onPress={pickImage} />
      <Text>Upload Progress: {progress}%</Text>
      {fileUrl ? (
        <Text style={{ marginTop: 20 }}>File URL: {fileUrl}</Text>
      ) : null}
    </View>
  );
};

export default FileUploadScreen;