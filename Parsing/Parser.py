import fitz  # PyMuPDF
import os
import json
import concurrent.futures
from pathlib import Path

max_chunk_size = 1000
batch_size = 20  # Adjust based on system resources

# Function to split text into chunks
def split_text_into_chunks(text, max_chunk_size):
    chunks = []
    words = text.split()
    current_chunk = ""

    for word in words:
        # If adding this word to the current chunk would exceed max_chunk_size
        if len(current_chunk) + len(word) + 1 > max_chunk_size:
            # Save the current chunk and start a new one
            chunks.append(current_chunk.strip())
            current_chunk = word
        else:
            # Add the word to the current chunk
            if current_chunk:
                current_chunk += " "
            current_chunk += word

    # Add the last chunk if it's not empty
    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks
# Worker function to process a batch of pages
def process_pages(pdf_path, pages, file_name):
    searchable_data = []
    pdf_document = fitz.open(pdf_path)
    
    for page_num in pages:
        try:
            page = pdf_document.load_page(page_num - 1)  # 0-based index
            page_text = page.get_text()

            page_chunks = split_text_into_chunks(page_text, max_chunk_size)

            for index, chunk in enumerate(page_chunks):
                searchable_data.append({
                    'id': f'{page_num}-{index}',  # Unique ID combining page and chunk index
                    'text': chunk.lower(),  # Normalize text to lowercase
                    'page': page_num,
                    'fileName': file_name,
                })

        except Exception as e:
            print(f"Error processing page {page_num}: {e}")

    pdf_document.close()
    return searchable_data

# Main function to orchestrate processing
def process_pdf(input_file_path, file_name, all_searchable_data):
    try:
        pdf_document = fitz.open(input_file_path)
        total_pages = pdf_document.page_count
        pdf_document.close()

        print(f"Processing {total_pages} pages from file: {file_name}")

        page_batches = [range(i + 1, min(i + batch_size + 1, total_pages + 1)) for i in range(0, total_pages, batch_size)]

        with concurrent.futures.ThreadPoolExecutor(max_workers=None) as executor:
            future_to_batch = {executor.submit(process_pages, input_file_path, batch, file_name): batch for batch in page_batches}

            for future in concurrent.futures.as_completed(future_to_batch):
                try:
                    data = future.result()
                    all_searchable_data.extend(data)
                except Exception as e:
                    print(f"Error processing batch: {e}")

    except Exception as e:
        print(f"Error processing the file: {e}")

if __name__ == "__main__":
    file_paths = ["همکاری.pdf", "آیین-دادرسی-کیفری.pdf","قانون تجارت.pdf","قانون_آیین_دادرسی مدنی.pdf","قانون-تجارت2.pdf","قانون-جرایم-رایانه-ای-1.pdf","قانون-کاهش-مجازات-حبس-تعزیری-2.pdf","قانون-مجازات-92-1.pdf","قانون-مجازات-اسلامی-1375.pdf","قانون-مدنی.pdf","مجموعه-قوانین-جزا.pdf","constitution.pdf"]
    output_file_path = Path(__file__).parent / "all_searchable_data.json"

    all_searchable_data = []

    for file_path in file_paths:
        input_file_path = Path(__file__).parent / file_path
        file_name = Path(file_path).name
        process_pdf(input_file_path, file_name, all_searchable_data)

    # Write the aggregated data to a single JSON file
    with open(output_file_path, 'w', encoding='utf-8') as f:
        json.dump(all_searchable_data, f, ensure_ascii=False, indent=2)

    print(f"Data has been processed and saved to {output_file_path}")
