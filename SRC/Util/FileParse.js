const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

const maxChunkSize = 1000;
const batchSize = 10; // Number of pages to process in each batch

// Function to split text into chunks
function splitTextIntoChunks(text, maxChunkSize) {
  const chunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let endIndex = startIndex + maxChunkSize;

    if (endIndex > text.length) {
      endIndex = text.length;
    } else {
      let lastPeriod = text.lastIndexOf(".", endIndex);
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

// Worker function to process a batch of pages
async function processPages(pdfBuffer, pages, fileName) {
  const searchableData = [];

  for (const pageNum of pages) {
    try {
      const pageData = await pdfParse(pdfBuffer, {
        pagerender: (pageData) =>
          pageData.getTextContent().then((textContent) => {
            return textContent.items.map((item) => item.str).join(" ");
          }),
        page: pageNum,
      });

      const pageChunks = splitTextIntoChunks(pageData.text, maxChunkSize);

      pageChunks.forEach((chunk, index) => {
        searchableData.push({
          id: `${pageNum}-${index}`, // Unique ID combining page and chunk index
          text: chunk,
          page: pageNum, // Page number (1-based index)
          fileName: fileName, // File name
        });
      });

      parentPort.postMessage({ type: "progress", pageNum });
    } catch (error) {
      console.error(`Error processing page ${pageNum}:`, error);
    }
  }

  parentPort.postMessage({ type: "result", data: searchableData });
}

if (isMainThread) {
  // Main thread: Orchestrates the processing

  async function processPDF(inputFilePath, outputFilePath) {
    try {
      const pdfBuffer = fs.readFileSync(inputFilePath);
      const pdfData = await pdfParse(pdfBuffer);
      const fileName = path.basename(inputFilePath);
      const totalPages = pdfData.numpages;

      console.log(`Processing ${totalPages} pages from file: ${fileName}`);

      let allSearchableData = [];
      const workerPromises = [];

      for (let i = 0; i < totalPages; i += batchSize) {
        const pagesToProcess = Array.from({ length: batchSize }, (_, idx) => i + idx + 1).filter(page => page <= totalPages);

        workerPromises.push(
          new Promise((resolve) => {
            const worker = new Worker(__filename, {
              workerData: { pdfBuffer, pagesToProcess, fileName }
            });

            worker.on("message", (message) => {
              if (message.type === "progress") {
                console.log(`Processed page ${message.pageNum}`);
              } else if (message.type === "result") {
                allSearchableData = allSearchableData.concat(message.data);
              }
            });

            worker.on("exit", resolve);
          })
        );
      }

      // Wait for all workers to finish
      await Promise.all(workerPromises);

      // Write the formatted data to a JSON file
      fs.writeFileSync(outputFilePath, JSON.stringify(allSearchableData, null, 2), "utf8");

      console.log(`Data has been processed and saved to ${outputFilePath}`);
    } catch (error) {
      console.error("Error processing the file:", error);
    }
  }

  // Define file paths
  const inputFilePath = path.join(__dirname, "../assets/documents/test.pdf");
  const outputFilePath = path.join(__dirname, "../assets/searchableData.json");

  // Process the PDF and create the JSON file
  processPDF(inputFilePath, outputFilePath);

} else {
  // Worker thread: Processes a batch of pages
  const { pdfBuffer, pagesToProcess, fileName } = workerData;
  processPages(pdfBuffer, pagesToProcess, fileName);
}
