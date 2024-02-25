import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollableAppText from '../../Components/ScrollableAppText';

function PrivacyPolicyScreen(props) {
  return (
    <ScrollableAppText>
        {`Privacy Policy for Your App Name At [Your App Name], 
accessible from [Your Apps URL or App Store Location], one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by [Your App Name] and how we use it.

If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.

This Privacy Policy applies only to our online activities and is valid for visitors to our app with regards to the information that they shared and/or collect in [Your App Name]. This policy is not applicable to any information collected offline or via channels other than this app.

Consent

By using our app, you hereby consent to our Privacy Policy and agree to its terms.

Information We Collect

The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.

If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.

When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.

How We Use Your Information

We use the information we collect in various ways, including to:

Provide, operate, and maintain our app
Improve, personalize, and expand our app
Understand and analyze how you use our app
Develop new products, services, features, and functionality
Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the app, and for marketing and promotional purposes
Send you emails
Find and prevent fraud
Log Files

[Your App Name] follows a standard procedure of using log files. 
These files log visitors when they visit apps. The information collected by log files include internet protocol (IP) addresses`}
    </ScrollableAppText>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default PrivacyPolicyScreen;