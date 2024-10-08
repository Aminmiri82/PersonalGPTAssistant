import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const AudioRecorderScreen = () => {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [recordingUri, setRecordingUri] = useState(null);  // Store the recording URI
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const startRecording = async () => {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setRecordingUri(uri);  // Set the recording URI for playback

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
  };

  const playSound = async () => {
    if (!recordingUri) {
      console.log('No recording available to play.');
      return;
    }

    console.log('Loading Sound from URI:', recordingUri);
    const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {recording && <Text>Recording...</Text>}
      {recordingUri && (
        <Button
          title="Play Last Recording"
          onPress={playSound}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});

export default AudioRecorderScreen;