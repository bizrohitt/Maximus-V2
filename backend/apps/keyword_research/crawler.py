import logging
import time
import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)


def get_google_suggestions(keyword: str) -> list:
    suggestions = []
    try:
        url = f"https://suggestqueries.google.com/complete/search?client=chrome&q={keyword}"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=5)
        data = response.json()
        suggestions = data[1][:10] if len(data) > 1 else []
        time.sleep(1)
    except (requests.RequestException, ValueError, IndexError) as e:
        logger.warning(f"Error fetching suggestions: {e}")
    return suggestions


def get_related_searches(keyword: str) -> list:
    related = []
    try:
        url = f"https://www.google.com/search?q={keyword}"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        related_searches = soup.find_all("div", class_="BNeawe s3v9rd AP7Wnd")
        for item in related_searches[:8]:
            text = item.get_text(strip=True)
            if text and text not in related:
                related.append(text)
    except (requests.RequestException, AttributeError) as e:
        logger.warning(f"Error fetching related searches: {e}")
    return related