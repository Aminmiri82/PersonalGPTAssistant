import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");

  const handleSendEmail = async () => {
    const postmarkApiUrl = "https://api.postmarkapp.com/email";
    const postmarkServerToken = "43a20f35-cca3-4398-a906-1e22b169aede";

    const emailBody = `
      Name: ${name}
      Question: ${question}
      Email to respond to: ${email}
    `;

    const emailData = {
      From: "outgoing@dadafarin.net",
      To: "Incoming@dadafarin.net",
      Subject: "User Question",
      TextBody: emailBody,
      MessageStream: "outbound",
    };

    try {
      const response = await fetch(postmarkApiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": postmarkServerToken,
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Your question has been sent!");
      } else {
        Alert.alert("Error", `Failed to send email: ${result.Message}`);
      }
    } catch (error) {
      Alert.alert("Error", `Failed to send email: ${error.message}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Your Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
      />

      <Text>Your Question:</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Enter your question"
        style={{
          height: 80,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        multiline
      />

      <Text>Email to receive the answer:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        keyboardType="email-address"
      />

      <Button title="Send" onPress={handleSendEmail} />
    </View>
  );
};

export default ContactForm;
