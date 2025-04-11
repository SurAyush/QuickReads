from transformers import pipeline
import re
import csv
import psycopg2
import os
from dotenv import load_dotenv

# Development
if os.getenv("GITHUB_ACTIONS") != "true":
    from dotenv import load_dotenv
    load_dotenv()

# Connection string
connection_string = os.getenv("DATABASE_URL")

# print("DATABASE_URL =", os.getenv("DATABASE_URL"))

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

# temporary CSV file: storing  the scraped news artcile
csv_file = 'temporary_data.csv'

try:
    # Connect to the database
    conn = psycopg2.connect(connection_string)
    print("Connected to PostgreSQL successfully!")
    
    # Create a cursor object to execute SQL commands
    cur = conn.cursor()

    insert_query = """
    INSERT INTO news_with_summary (heading, article, summary, tag) 
    VALUES (%s, %s, %s, %s);
    """

    with open(csv_file, 'r') as f:

        reader = csv.reader(f)  

        for row in reader:
            print(row[2])
            summary = summarize_text(row[3]) 
            data = (row[2], row[3], summary, row[1])
            cur.execute(insert_query, data)


    conn.commit()  # Commit the transaction
    cur.close()
    conn.close()
    print("Connection closed.")
    if os.path.exists(csv_file):
        os.remove(csv_file)

except Exception as e:
    print(e)
