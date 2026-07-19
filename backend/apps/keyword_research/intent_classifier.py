# backend/apps/keyword_research/intent_classifier.py

def classify_intent(keyword: str) -> str:
    """
    Improved search intent classification.
    Returns: 'Informational', 'Transactional', or 'Navigational'
    """
    keyword = keyword.lower()

    transactional_words = ['buy', 'price', 'cheap', 'deal', 'discount', 'purchase', 'order', 'best']
    navigational_words = ['login', 'official', 'website', 'site', 'app', 'download']

    if any(word in keyword for word in transactional_words):
        return 'Transactional'
    elif any(word in keyword for word in navigational_words):
        return 'Navigational'
    else:
        return 'Informational'