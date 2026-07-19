import requests


def check_robots_txt(base_url: str) -> dict:
    robots_url = base_url.rstrip("/") + "/robots.txt"
    try:
        response = requests.get(robots_url, timeout=5)
        if response.status_code == 200:
            return {"exists": True, "content": response.text[:500]}
        return {"exists": False, "content": None}
    except requests.RequestException:
        return {"exists": False, "content": None}


def check_sitemap(base_url: str) -> dict:
    sitemap_url = base_url.rstrip("/") + "/sitemap.xml"
    try:
        response = requests.get(sitemap_url, timeout=5)
        return {"exists": response.status_code == 200}
    except requests.RequestException:
        return {"exists": False}


def check_mobile_friendly(html: str) -> bool:
    return 'name="viewport"' in html.lower()