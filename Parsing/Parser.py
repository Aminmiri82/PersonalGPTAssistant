import fitz  # PyMuPDF
import os
import json
import concurrent.futures
from pathlib import Path
import threading  # Import threading for the lock

max_chunk_size = 1000
batch_size = 20  # Adjust based on system resources
global_id = 1  # Initialize a global ID counter

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

# Worker function to process a batch of pages from a PDF
def process_pdf_pages(pdf_path, pages, file_name, id_lock):
    global global_id
    searchable_data = []
    pdf_document = fitz.open(pdf_path)
    
    for page_num in pages:
        try:
            page = pdf_document.load_page(page_num - 1)  # 0-based index
            page_text = page.get_text()

            page_chunks = split_text_into_chunks(page_text, max_chunk_size)

            for chunk in page_chunks:
                with id_lock:
                    current_id = global_id
                    global_id += 1  # Increment global ID

                searchable_data.append({
                    'id': str(current_id),  # Use the global incremental ID
                    'text': chunk.lower(),  # Normalize text to lowercase
                    'page': page_num,
                    'fileName': file_name,
                })

        except Exception as e:
            print(f"Error processing page {page_num}: {e}")

    pdf_document.close()
    return searchable_data

# Function to process text files
def process_text_file(file_path, file_name, all_searchable_data, id_lock):
    global global_id
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            text = f.read()

        text_chunks = split_text_into_chunks(text, max_chunk_size)

        for chunk in text_chunks:
            with id_lock:
                current_id = global_id
                global_id += 1  # Increment global ID

            all_searchable_data.append({
                'id': str(current_id),  # Use the global incremental ID
                'text': chunk.lower(),  # Normalize text to lowercase
                'page': None,  # No page number for text files
                'fileName': file_name,
            })

    except Exception as e:
        print(f"Error processing text file {file_name}: {e}")

# Main function to orchestrate processing
def process_file(input_file_path, file_name, all_searchable_data, id_lock):
    if input_file_path.suffix.lower() == '.pdf':
        try:
            pdf_document = fitz.open(input_file_path)
            total_pages = pdf_document.page_count
            pdf_document.close()

            print(f"Processing {total_pages} pages from file: {file_name}")

            page_batches = [range(i + 1, min(i + batch_size + 1, total_pages + 1)) for i in range(0, total_pages, batch_size)]

            with concurrent.futures.ThreadPoolExecutor(max_workers=None) as executor:
                future_to_batch = {executor.submit(process_pdf_pages, input_file_path, batch, file_name, id_lock): batch for batch in page_batches}

                for future in concurrent.futures.as_completed(future_to_batch):
                    try:
                        data = future.result()
                        all_searchable_data.extend(data)
                    except Exception as e:
                        print(f"Error processing batch: {e}")

        except Exception as e:
            print(f"Error processing the file: {e}")
    elif input_file_path.suffix.lower() == '.txt':
        process_text_file(input_file_path, file_name, all_searchable_data, id_lock)
    else:
        print(f"Unsupported file format: {input_file_path.suffix}")

if __name__ == "__main__":
    file_paths = ["Assasi.txt","hamkari.txt","dadrasi_madani.txt","dadrasi_keyfari.txt","jarayem_rayaneie.txt","Madani.txt","mojazat.txt","tejarat.txt"]
    output_file_path = Path(__file__).parent / "all_searchable_data.json"

    all_searchable_data = []
    id_lock = threading.Lock()  # Corrected: Use threading.Lock for the lock

    for file_path in file_paths:
        input_file_path = Path(__file__).parent / file_path
        file_name = Path(file_path).name
        process_file(input_file_path, file_name, all_searchable_data, id_lock)

    # Write the aggregated data to a single JSON file
    with open(output_file_path, 'w', encoding='utf-8') as f:
        json.dump(all_searchable_data, f, ensure_ascii=False, indent=2)

    print(f"Data has been processed and saved to {output_file_path}")