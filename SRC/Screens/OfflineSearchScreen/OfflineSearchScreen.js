import React, { useState, useCallback } from "react";
import {
  FlatList,
  TextInput,
  StyleSheet,
  View,
  Text,
} from "react-native";
import _ from "lodash";  
import SearchResult from "../../Components/OfflineSearchComponents/SearchResult";
import searchableData from "../../assets/searchableData.json";
import Screen from "../../Components/Screen";
import { useTranslation } from "react-i18next";

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { t } = useTranslation();

  // Function to process search
  const handleSearch = (text) => {
    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Use Lodash filter to find matches
    const results = _.filter(searchableData, (item) =>
      item.text.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(results);
  };

  // Create debounced version of handleSearch
  const debouncedHandleSearch = useCallback(
    _.debounce((text) => handleSearch(text), 300),
    [] // Dependency array for useCallback
  );

  // Handle search input change
  const handleChangeText = (text) => {
    setQuery(text); // Update query immediately
    debouncedHandleSearch(text); // Call debounced search function
  };

  const handleResultPress = (item) => {
    console.log(item);
    
  };

  const renderItem = ({ item }) => (
    <SearchResult
      item={item}
      query={query}
      onPress={() => handleResultPress(item)}
    />
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t("SearchPlaceholder")}
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleChangeText} // Use handleChangeText for text input
        />
        {query.length > 0 && (
          <Text style={styles.resultsIndicator}>
            {searchResults.length}{" "}
            {searchResults.length === 1 ? t("Result") : t("Results")}
          </Text>
        )}
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={
          searchResults.length === 0 ? styles.emptyContentContainer : {}
        }
        ListEmptyComponent={
          query.length > 0 && searchResults.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{t("NoResultsFound")}</Text>
            </View>
          ) : null
        }
        initialNumToRender={20}
        removeClippedSubviews={true}
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
