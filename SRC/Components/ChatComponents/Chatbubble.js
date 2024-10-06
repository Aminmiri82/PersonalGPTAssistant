import React, { useState, useEffect, forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../config/colors";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../themes/ThemeProvidor";

const Chatbubble = forwardRef(({ message }, ref) => {
  const [loadingDots, setLoadingDots] = useState("");
  const { colorsTh } = useTheme();
  const { t } = useTranslation();
  const isUser = message.role === "user";
  const isDuringLoading = message.isDuringLoading;

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev === "") return ".";
        if (prev === ".") return "..";
        if (prev === "..") return "...";
        return "";
      });
    }, 500); // Update every 500ms

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View
      style={[
        styles.bubble,
        isUser
          ? [styles.userBubble, { backgroundColor: colorsTh.blue }]
          : [
              styles.assistantBubble,
              { backgroundColor: colorsTh.assistant_bubble },
            ],
      ]}
      ref={ref}
    >
      {isDuringLoading ? (
        <View style={styles.assistantBubble}>
          <Text style={[styles.loadingText, { color: colorsTh.text }]}>
          {`${t("loading")}${loadingDots}`}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            isUser
              ? [{ color: colorsTh.white }]
              : [{ color: colorsTh.assistant_text }],
          ]}
          selectable={true}
        >
          {message.content}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: colors.secondary,
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  assistantBubble: {
    backgroundColor: colors.light,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  text: {
    color: colors.dark,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center horizontally
    marginTop: 5,
    width: 120,
    height: 20,
  },
  lottie: {
    width: 40,
    height: 40,
    color: "green",
  },
  loadingText: {
    marginLeft: 10, // Adjust margin as needed
  },
});

export default Chatbubble;
