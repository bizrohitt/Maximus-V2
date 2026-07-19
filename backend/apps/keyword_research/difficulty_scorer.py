# backend/apps/keyword_research/difficulty_scorer.py

def calculate_keyword_difficulty(keyword: str, top_results: list = None) -> int:
    """
    Improved custom keyword difficulty scoring (0-100).
    """
    score = 35  # base score

    # Longer keywords are usually easier
    word_count = len(keyword.split())
    if word_count >= 4:
        score -= 12
    elif word_count == 3:
        score -= 5

    # Penalize if strong domains appear in top results
    if top_results:
        strong_domains = ["wikipedia.org", "youtube.com", "amazon.com", "facebook.com", "reddit.com"]
        for result in top_results:
            if any(domain in result.lower() for domain in strong_domains):
                score += 18
                break

    return max(0, min(100, score))