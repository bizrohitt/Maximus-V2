from bs4 import BeautifulSoup
from urllib.parse import urlparse
from .crawler import fetch_page, is_valid_url
from .scoring import calculate_seo_score
from .technical import check_robots_txt, check_sitemap, check_mobile_friendly


def analyze_onpage_seo(html: str) -> dict:
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.title.string.strip() if soup.title else None
    meta_desc = soup.find("meta", attrs={"name": "description"})
    meta_description = meta_desc["content"].strip() if meta_desc else None
    headings = {
        "h1": [h.get_text(strip=True) for h in soup.find_all("h1")],
        "h2": [h.get_text(strip=True) for h in soup.find_all("h2")],
    }
    images = soup.find_all("img")
    images_without_alt = [img.get("src", "") for img in images if not img.get("alt")]
    return {
        "title": title,
        "meta_description": meta_description,
        "headings": headings,
        "images_without_alt": images_without_alt,
        "total_images": len(images),
    }


def run_seo_audit(url: str) -> dict:
    if not is_valid_url(url):
        return {"success": False, "error": "Invalid URL"}
    page = fetch_page(url)
    if not page["success"]:
        return {"success": False, "error": page.get("error", "Failed to fetch page")}
    base_url = f"{urlparse(url).scheme}://{urlparse(url).netloc}"
    onpage = analyze_onpage_seo(page["html"])
    robots = check_robots_txt(base_url)
    sitemap = check_sitemap(base_url)
    mobile = check_mobile_friendly(page["html"])
    onpage.update({"robots_txt": robots, "sitemap": sitemap, "mobile_friendly": mobile})
    scoring = calculate_seo_score(onpage)
    return {"success": True, "url": url, "score": scoring["score"], "recommendations": scoring["recommendations"], "details": onpage}