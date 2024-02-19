import React from 'react';
import { View, StyleSheet,Text } from 'react-native';

import AppText from '../Components/AppText';
import ScrollableAppText from '../Components/ScrollableAppText';

function TermsAndConditionsScreen(props) {
  return (
    
      
      <ScrollableAppText>
      {`Terms and Conditions for [Your App Name]

Welcome to [Your App Name]! These terms and conditions outline the rules and regulations for the use of [Your Company Name]'s AI chatbot application, located at [Your App's URL or App Store Location].

By accessing this app, we assume you accept these terms and conditions. Do not continue to use [Your App Name] if you do not agree to take all of the terms and conditions stated on this page.

License

Unless otherwise stated, [Your Company Name] and/or its licensors own the intellectual property rights for all material on [Your App Name]. All intellectual property rights are reserved. You may access this from [Your App Name] for your own personal use, subjected to restrictions set in these terms and conditions.

You must not:

Republish material from [Your App Name]
Sell, rent, or sub-license material from [Your App Name]
Reproduce, duplicate, or copy material from [Your App Name]
Redistribute content from [Your App Name]
This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of a legal advisor and a template.

Parts of this app offer an opportunity for users to post and exchange opinions and information in certain areas of the website. [Your Company Name] does not filter, edit, publish, or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of [Your Company Name],its agents, and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, [Your Company Name] shall not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this app.
User Engagement
The following behaviors are prohibited:

Using the app in a way that is harmful, illegal, or fraudulent.
Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this app.
Using this app to engage in any advertising or marketing.
Certain parts of this app offer the opportunity for users to engage in dialogues, discussions, and exchanges. [Your Company Name] reserves the right to monitor all communications made via this platform and to remove any content deemed inappropriate, offensive, or in violation of these Terms and Conditions.

Disclaimer

To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our app and the use of this app. Nothing in this disclaimer will:

Limit or exclude our or your liability for death or personal injury.
Limit or exclude our or your liability for fraud or fraudulent misrepresentation.
Limit any of our or your liabilities in any way that is not permitted under applicable law.
Exclude any of our or your liabilities that may not be excluded under applicable law.
The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.

As long as the app and the information and services on the app are provided free of charge, we will not be liable for any loss or damage of any nature.`}
      </ScrollableAppText>


    
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default TermsAndConditionsScreen;