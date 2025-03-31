import requests
from bs4 import BeautifulSoup
from datetime import date
import csv

# We will scrape the home page of HindustanTimes to start with
# NOTE: This project is only for educational purpose made by a B.Tech student of NIT KKR
# Humble Request to the HindustanTimes team to not apply any strikes

today = date.today()
csv_file = 'sample_news.csv'
base_url = 'https://www.hindustantimes.com/'

# necessary, because the website gives Authorization Error 401 is User-Agent is empty
headers={
    "User-Agent": "Mozilla/5.0",
}

# function to fetch the web-page
def fetch_page(url):
    ct = 0
    # for connection issues
    while True:
        try:
            page = requests.get(url, headers=headers)      # blocking line
            if page.status_code == 200:
                return page
            break
        except:
            ct += 1 
            if (ct>=10):
                break
            else:
                continue 

    return None 

    
# scraping the home page
home_page = fetch_page(base_url)

if home_page is not None:

    print("Home scraped")

    soup_home = BeautifulSoup(home_page.content, 'html.parser')

    # we will crawl the home page and extract all the links from the news articles
    all_links = soup_home.find_all('a', class_='storyLink articleClick')         # class_: storyLink articleClick    --> might change over time


    # for the initial version, we will only scrape the first 15 articles
    all_links = all_links[:15]                    # these are the anchor tags containing the links to the articles

    # we will now extract the links from the articles
    for link in all_links:

        news_link = base_url + link['href'][1:]           # skipping the first char: '/'   (to prevent repitions as base_url contains this)
        print(news_link)
        article_page = fetch_page(news_link)

        try:
            if article_page is not None:

                soup_article = BeautifulSoup(article_page.text, 'html.parser')

                artcile_heading = soup_article.find('h1', class_='hdg1').text.strip()
                # content is divided into small <p> tags, separated by advertisements
                article_content = soup_article.find_all('p')

                article_text = ''
                # the first <p> tag is an suscribe ad, so we will skip it
                for para in article_content[1:]:
                    article_text += para.text.strip() + '\n'          # adding new line to separate paragraphs

                # now we have the heading and the content of the article
                # temporarily storing in a csv file
                with open(csv_file, "a", newline="") as file:
                    writer = csv.writer(file)
                    writer.writerow([today, artcile_heading, article_text])          # Append data

        except Exception as e:
            print('Error in scraping article')
            print(e)

else:
    print("oops!!!")



