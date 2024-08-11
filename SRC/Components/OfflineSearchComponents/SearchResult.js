import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function SearchResult({ item, query, onPress }) {
  // Function to highlight the query in the text
  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) {
      return <Text style={styles.text}>{text}</Text>;
    }
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text style={styles.text}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.highlight}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View>
        {/* Display the chunk of text with highlighted query */}
        {getHighlightedText(item.text, query)}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
});
