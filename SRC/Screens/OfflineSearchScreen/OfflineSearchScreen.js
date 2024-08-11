import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Fuse from "fuse.js";
import SearchResult from "../../Components/OfflineSearchComponents/SearchResult";
import searchableData from "../../assets/searchableData.json";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Initialize Fuse.js with options
  const fuse = new Fuse(searchableData, {
    keys: ["text"],
    threshold: 0.0,
    distance: 0,
  });

  const handleSearch = (text) => {
    setQuery(text);

    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = fuse.search(text).map((result) => result.item);
    setSearchResults(results);
  };

  const handleResultPress = (item) => {
    // Handle navigation or opening the file based on item
    console.log("Opening file or navigating to:", item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SearchResult item={item} query={query} onPress={handleResultPress} />
        )}
        ListEmptyComponent={
          query.length > 0 && searchResults.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    fontSize: 16,
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
