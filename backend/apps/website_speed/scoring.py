# backend/apps/website_speed/scoring.py

def calculate_speed_score(data: dict) -> dict:
    """
    Calculate a performance score (0-100) based on speed metrics.
    """
    score = 100
    recommendations = []

    load_time = data.get("load_time", 0)
    requests = data.get("total_requests", 0)
    size_kb = data.get("page_size_kb", 0)

    # Load time penalty
    if load_time > 5:
        score -= 30
        recommendations.append("Page load time is too slow (>5s).")
    elif load_time > 3:
        score -= 15
        recommendations.append("Page load time is slow (>3s).")

    # Too many requests
    if requests > 80:
        score -= 20
        recommendations.append("Too many HTTP requests. Consider reducing them.")

    # Large page size
    if size_kb > 2000:
        score -= 15
        recommendations.append("Page size is very large. Optimize images and scripts.")

    score = max(0, min(100, score))

    return {
        "score": score,
        "recommendations": recommendations
    }