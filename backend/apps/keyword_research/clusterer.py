# backend/apps/keyword_research/clusterer.py

def simple_cluster(keywords: list) -> dict:
    """
    Improved basic keyword clustering.
    Groups keywords by their first meaningful word.
    """
    clusters = {}

    for kw in keywords:
        words = kw.lower().split()
        if len(words) > 0:
            key = words[0]
            if key not in clusters:
                clusters[key] = []
            clusters[key].append(kw)

    return clusters