# backend/apps/keyword_research/related_questions.py

import requests
from bs4 import BeautifulSoup
import time


def get_related_questions(keyword: str) -> list:
    """
    Scrape 'People Also Ask' questions from Google.
    """
    questions = []
    try:
        url = f"https://www.google.com/search?q={keyword}"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        # People Also Ask section
        paa_elements = soup.find_all("div", class_="BNeawe s3v9rd AP7Wnd")
        for elem in paa_elements[:6]:
            text = elem.get_text(strip=True)
            if text.endswith("?") and text not in questions:
                questions.append(text)

        time.sleep(1)
    except Exception as e:
        print(f"Error fetching related questions: {e}")

    return questions