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
import Screen from "../../Components/Screen";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Initialize Fuse.js with updated options
  const fuse = new Fuse(searchableData, {
    keys: ["text"],
    threshold: 0.5, // Lowering the threshold for more lenient matching
    // Adjusting the distance for better flexibility
    minMatchCharLength: 2,
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
    const { fileName, page } = item;
    const filePath = require(`../../assets/documents/test.pdf`);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
        />
        {query.length > 0 && (
          <Text style={styles.resultsIndicator}>
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "result" : "results"}
          </Text>
        )}
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SearchResult
            item={item}
            query={query}
            onPress={() => handleResultPress(item)}
          />
        )}
        contentContainerStyle={
          searchResults.length === 0 ? styles.emptyContentContainer : {}
        }
        ListEmptyComponent={
          query.length > 0 && searchResults.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          ) : null
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  searchInput: {
    width: "80%", // Adjust width as needed
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultsIndicator: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  emptyContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
