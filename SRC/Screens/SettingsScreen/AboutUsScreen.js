import React from "react";
import { View, StyleSheet } from "react-native";
import ScrollableAppText from "../../Components/SettingsComponents/ScrollableAppText";
import EmailLink from "../../Components/SettingsComponents/EmailLink";
import Materialcomunityicons from "react-native-vector-icons/MaterialCommunityIcons";
import AppText from "../../Components/AppText";

function AboutUsScreen(props) {
  return (
    <>
      <ScrollableAppText>
        {`
About Us

Welcome to [Your App Name], a cutting-edge AI chatbot designed to revolutionize the way you communicate, learn, and interact online. Founded in [Year] by [Founder's Name], our mission is to harness the power of artificial intelligence to create a more connected and intelligent world.

Our Journey

[Your App Name] was born out of a passion for technology and innovation. Recognizing the potential of AI to transform everyday interactions, our founder, [Founder's Name], set out to develop a solution that was not only powerful but also accessible to everyone. From our humble beginnings in [Location], we've grown into a dedicated team of developers, designers, and AI enthusiasts committed to delivering excellence.

Our Vision

Our vision is to create a world where technology bridges the gap between people and information. We believe in building a platform that empowers users to discover, learn, and communicate in more efficient and meaningful ways. Through [Your App Name], we aim to provide an experience that is not just informative but also engaging and intuitive.

Our Values

Innovation: At the heart of [Your App Name] is a commitment to innovation. We are constantly exploring new technologies and methodologies to enhance your experience.
Quality: We believe in the importance of quality. From the AI algorithms to the user interface, every aspect of [Your App Name] is crafted with attention to detail.
Privacy: Your privacy is paramount to us. We are dedicated to protecting your data and ensuring that your interactions with [Your App Name] are secure.
Community: [Your App Name] is more than just an app; it's a community. We value the feedback and contributions of our users, as they shape the future of our platform.
Meet the Team

Behind [Your App Name] is a team of talented individuals with a shared passion for technology and innovation. From our AI experts to our customer support heroes, every member plays a vital role in bringing [Your App Name] to life.

Join Us on Our Journey

We're just getting started, and we'd love for you to join us on this exciting journey. Whether you're a user, a developer, or an AI enthusiast, there's a place for you in the [Your App Name] community. Let's build the future of communication together.
`}
        <EmailLink email="miri.amin96@gmail.com" emailSubject="Inquiry">
          {<Materialcomunityicons name="email" size={30} color="black" />}
        </EmailLink>
      </ScrollableAppText>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AboutUsScreen;
