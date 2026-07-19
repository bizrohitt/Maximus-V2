# backend/apps/keyword_research/analyzer.py

from .crawler import get_google_suggestions, get_related_searches


def generate_keyword_ideas(seed_keyword: str) -> list:
    """
    Generate keyword ideas using Google suggestions and related searches.
    """
    suggestions = get_google_suggestions(seed_keyword)
    related = get_related_searches(seed_keyword)

    all_keywords = list(set(suggestions + related))
    return [kw for kw in all_keywords if kw.lower() != seed_keyword.lower()]


def calculate_keyword_difficulty(keyword: str, top_results: list) -> int:
    """
    Simple custom keyword difficulty score (0-100).
    This is a basic version. Can be improved later.
    """
    score = 30  # base score

    # Penalize if many strong domains rank
    strong_domains = ["wikipedia.org", "youtube.com", "amazon.com", "facebook.com"]
    for result in top_results:
        if any(domain in result.lower() for domain in strong_domains):
            score += 15
            break

    # Longer keywords are usually easier
    if len(keyword.split()) >= 4:
        score -= 10

    return max(0, min(100, score))