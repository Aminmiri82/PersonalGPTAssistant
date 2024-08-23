import os
from pathlib import Path

# Function to clean the text by removing U+200F and U+200E characters
def clean_text(text):
    # U+200F is the Right-to-Left Mark (RLM)
    # U+200E is the Left-to-Right Mark (LRM)
    return text.replace('\u200f', '').replace('\u200e', '')

# Function to process a text file, clean it, and save the cleaned version
def clean_text_file(input_file_path, output_dir):
    try:
        with open(input_file_path, 'r', encoding='utf-8') as f:
            text = f.read()

        cleaned_text = clean_text(text)

        # Create the output directory if it doesn't exist
        output_dir.mkdir(parents=True, exist_ok=True)

        # Create the output file path
        output_file_path = output_dir / input_file_path.name

        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(cleaned_text)

        print(f"Cleaned file saved to {output_file_path}")

    except Exception as e:
        print(f"Error processing file {input_file_path.name}: {e}")

if __name__ == "__main__":
    # List of .txt files to process
    file_paths = ["Assasi.txt","hamkari.txt","dadrasi_madani.txt","dadrasi_keyfari.txt","jarayem_rayaneie.txt","Madani.txt","mojazat.txt","tejarat.txt"]

    # Directory where cleaned files will be saved
    output_dir = Path(__file__).parent / "cleaned_files"

    for file_path in file_paths:
        input_file_path = Path(__file__).parent / file_path
        clean_text_file(input_file_path, output_dir)

    print("All files have been processed.")