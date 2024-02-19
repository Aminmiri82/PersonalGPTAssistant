import React from 'react';
import {TouchableOpacity, Linking } from 'react-native';
import AppText from './AppText';


function EmailLink({ email, emailSubject = '', children, style }) {
  function handlePress() {
    const subjectEncoded = encodeURIComponent(emailSubject);
    const url = `mailto:${email}?subject=${subjectEncoded}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      
      <AppText style={style}>{children || email}</AppText>
    </TouchableOpacity>
  );
}

export default EmailLink;
