from transformers import pipeline
import re
import csv

# loading my fine-tuned T5 model from Hugging Face Hub
hub_model_id = 'SurAyush/news-summarizer-t5'

# loading the summarization pipeline with the model
summarizer = pipeline('summarization',model = hub_model_id)

def summarize_text(text, min_length=30):
    """
    Summarizes the given text using the fine-tuned T5 model."
    """
    summary = summarizer(text, min_length=min_length)
    return capitalize_sentences(summary[0]['summary_text'])

def capitalize_sentences(text):
    '''
    Capitalizes the first letter of each sentence in the text and replaces 'india' with 'India'.
    '''
    sentences = re.split(r'([.!?]\s*)', text)  # Split text while keeping punctuation
    capitalized_sentences = [s.capitalize() for s in sentences]
    result = ''.join(capitalized_sentences)

    result = re.sub(r'\bindia\b', 'India', result, flags=re.IGNORECASE)

    return result

csv_file = 'sample_news.csv'
new_csv_file = 'summarized_news.csv'

with open(csv_file, 'r') as f:
    reader = csv.reader(f)  # Create a CSV reader object
    
    for row in reader:  # Iterate through rows
        summary = summarize_text(row[2]) 
        with open(new_csv_file, "a") as file:
            writer = csv.writer(file)
            writer.writerow([row[0], row[1], summary])  # Append data