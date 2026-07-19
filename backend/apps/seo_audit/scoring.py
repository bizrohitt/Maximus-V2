# backend/apps/seo_audit/scoring.py

def calculate_seo_score(data: dict) -> dict:
    """
    Calculate SEO score based on analyzed data.
    Returns: {"score": int, "recommendations": list}
    """
    score = 100
    recommendations = []

    if not data.get("title"):
        score -= 15
        recommendations.append("Missing page title. Add a clear and descriptive title.")
    elif len(data["title"]) > 60:
        score -= 5
        recommendations.append("Title is too long. Keep it under 60 characters.")

    if not data.get("meta_description"):
        score -= 10
        recommendations.append("Missing meta description. Add one (150-160 characters).")
    elif len(data["meta_description"]) > 160:
        score -= 5
        recommendations.append("Meta description is too long. Keep it under 160 characters.")

    if not data.get("headings", {}).get("h1"):
        score -= 10
        recommendations.append("No H1 tag found. Add at least one H1 heading.")

    if data.get("images_without_alt"):
        missing = len(data["images_without_alt"])
        score -= min(15, missing * 3)
        recommendations.append(f"{missing} images are missing alt text.")

    if not data.get("robots_txt", {}).get("exists"):
        score -= 5
        recommendations.append("robots.txt file is missing.")

    if not data.get("sitemap", {}).get("exists"):
        score -= 5
        recommendations.append("sitemap.xml is missing.")

    if not data.get("mobile_friendly"):
        score -= 10
        recommendations.append("Page may not be mobile-friendly. Add viewport meta tag.")

    score = max(0, min(100, score))

    return {
        "score": score,
        "recommendations": recommendations
    }