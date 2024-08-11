import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Fuse from 'fuse.js';
import searchableData from '../assets/searchableData.json'; // Adjust the path as necessary

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Setup Fuse.js with the imported data
    const fuse = new Fuse(searchableData, {
      keys: ['text'],
      includeScore: true,
    });

    if (query.length > 0) {
      const result = fuse.search(query);
      setResults(result.map(({ item }) => item));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  item: {
    padding: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default App;
