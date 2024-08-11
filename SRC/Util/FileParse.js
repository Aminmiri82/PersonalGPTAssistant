const fs = require('fs');
const path = require('path');

// Function to split text into chunks
function splitTextIntoChunks(text, maxChunkSize) {
  const chunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    // Ensure the chunk doesn't exceed maxChunkSize
    let endIndex = startIndex + maxChunkSize;
    
    if (endIndex > text.length) {
      endIndex = text.length;
    } else {
      // Avoid breaking in the middle of a sentence if possible
      let lastPeriod = text.lastIndexOf('.', endIndex);
      if (lastPeriod > startIndex) {
        endIndex = lastPeriod + 1;
      }
    }

    const chunk = text.substring(startIndex, endIndex).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    startIndex = endIndex;
  }

  return chunks;
}

// Function to process the book text
function processText(inputFilePath, outputFilePath) {
  try {
    // Read the book text file
    const bookText = fs.readFileSync(inputFilePath, 'utf8');
    
    // Define maximum chunk size (e.g., 1000 characters)
    const maxChunkSize = 1000;

    // Split text into smaller chunks
    const chunks = splitTextIntoChunks(bookText, maxChunkSize);
    
    // Format the data for Fuse.js
    const searchableData = chunks.map((chunk, index) => ({
      id: index,      // Optional unique ID
      text: chunk
    }));
    
    // Write the formatted data to a JSON file
    fs.writeFileSync(outputFilePath, JSON.stringify(searchableData, null, 2), 'utf8');
    
    console.log(`Data has been processed and saved to ${outputFilePath}`);
  } catch (error) {
    console.error('Error processing the file:', error);
  }
}

// Define file paths
const inputFilePath = path.join(__dirname, '../assets/documents/test.txt'); // Path to your .txt file
const outputFilePath = path.join(__dirname, 'searchableData.json'); // Output JSON file

// Process the text and create the JSON file
processText(inputFilePath, outputFilePath);
