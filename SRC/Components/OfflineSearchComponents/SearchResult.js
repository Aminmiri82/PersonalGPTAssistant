import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function SearchResult({ item, query, onPress }) {
  const { t } = useTranslation();
  // Function to highlight the query in the text
  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) {
      return <Text style={styles.text}>{text}</Text>;
    }
    
    const lowerText = text.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();
    const startIndex = lowerText.indexOf(lowerHighlight);

    if (startIndex === -1) {
      return <Text style={styles.text}>{text}</Text>;
    }

    const endIndex = startIndex + highlight.length;

    return (
      <Text style={styles.text}>
        {text.slice(0, startIndex)}
        <Text style={styles.highlight}>{text.slice(startIndex, endIndex)}</Text>
        {text.slice(endIndex)}
      </Text>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.textContainer}>
        {/* Display the chunk of text with highlighted query */}
        {getHighlightedText(item.text, query)}
        
        <View style={styles.detailsContainer}>
          <Text style={styles.fileName}>{item.fileName} - {t("Page")} {item.page}</Text>
        </View>
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
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  detailsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 5,
  },
  fileName: {
    fontSize: 14,
    color: '#6c757d',
    fontStyle: 'italic',
  },
});
