# 📰 QuickReads

**QuickReads** is an intelligent, automated news summarization tool. It scrapes articles from news websites, summarizes them using a fine-tuned NLP model, and displays them on a sleek, minimal frontend.

---

## 🚀 Features

- 🌐 **Web Scraping**  
  Uses `BeautifulSoup` to scrape multiple pages from a target news website.

- 🧠 **Summarization Model**  
  Fine-tuned [`T5-small`](https://huggingface.co/SurAyush/news-summarizer-t5) model on the [`BBC News`](https://huggingface.co/datasets/SurAyush/News_Summary_Dataset) dataset, achieving **ROUGE score > 20**. Available on Hugging Face Hub.

- ⚙️ **Daily Automation**  
  A GitHub Actions cron job scrapes and summarizes articles every day—fully automated pipeline.

- 💻 **Web-App**  
  Built with **Next.js**, providing a clean and responsive UI for reading summarized news.

- 📬 **Newsletter Subscription** *(Coming Soon)*  
  Stay updated with daily summaries delivered straight to your inbox.

---

## 🧰 Tech Stack

- `Python` 
- `BeautifulSoup` (Web scraping)
- `Transformers` (T5-small fine-tuning)
- `Hugging Face Hub` (Model hosting)
- `Next.js` (Web-App)
- `GitHub Actions` (Scheduled automation)
- `PostgreSQL` (Database)
- `Redis` (Key-Value Database)

---

## 🛠️ Setup

Clone the repo:
```bash
   git clone https://github.com/SurAyush/QuickReads
```

### 🌐 Scraping and Summarization

1. Move to the directory:
   ```bash
   cd scrape_and_summarize
   ```

2. Install the requirements:
   ```bash
   pip install -r requirements.txt
   ```

3. Set Up the .env file

4. Scrape the site
```bash
python scraping.py
```

6. Summarize and save the articles
```bash
  python summarize.py
```

### 💻 Web-App


1. Move to the directory:
   ```bash
   cd quickreads_webapp
   ```

2. Install the requirements:
   ```bash
   npm install
   ```

3. Set Up the .env file

4. Start the server
```bash
  npm run dev
```


## 🤖 Automation

A GitHub Actions workflow is configured to run daily

- Scrapes new articles

- Summarizes using the fine-tuned T5 model

- Updates content to database for the live frontend


Find the workflow at:
```bash
  https://github.com/SurAyush/QuickReads/blob/main/.github/workflows/daily_run.yml
```


## 🧠 Model Details

- Base Model: t5-small

- Dataset: BBC News articles

- Fine-Tuning: Custom training to generate concise summaries

- ROUGE Score: 20+ on the test set

- Prefix Strategy: The model was fine-tuned **without task-specific prefixes** (e.g., "summarize:"), as suggested by the original [T5 paper](https://arxiv.org/abs/1910.10683).

- Model Hosting: Hugging Face Hub

Check out the training notebook for further details...



## 📌 To Do

- Newsletter subscription feature

- Add support for multiple news sources

- Improve model with larger datasets



## 🙌 Contributing

Contributions are welcome! If you'd like to improve something or add a feature, feel free to fork the repo and open a pull request. For major changes, please open an issue first.


## 🛑 Disclaimer

This project is intended **solely for educational and research purposes**. It is **not** designed or authorized for any commercial use, profit-making, or public-facing service delivery.

Please note that **scraping content from websites may violate their Terms of Service**. Ensure you have the right to access and use any scraped data, and always respect `robots.txt` directives and copyright policies. The creators of this project do not endorse or encourage misuse of scraping tools or content.
