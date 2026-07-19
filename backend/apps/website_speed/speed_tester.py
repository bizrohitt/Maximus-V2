# backend/apps/website_speed/speed_tester.py

import requests
import time
from urllib.parse import urlparse


def is_valid_url(url: str) -> bool:
    """Check if the URL is valid."""
    try:
        result = urlparse(url)
        return all([result.scheme in ("http", "https"), result.netloc])
    except:
        return False


def measure_page_speed(url: str) -> dict:
    """
    Measure basic page load time and request count.
    Returns: {"success": bool, "load_time": float, "request_count": int, "error": str}
    """
    if not is_valid_url(url):
        return {"success": False, "error": "Invalid URL format"}

    try:
        start_time = time.time()
        response = requests.get(url, timeout=15)
        end_time = time.time()

        load_time = round(end_time - start_time, 2)

        return {
            "success": True,
            "load_time": load_time,
            "status_code": response.status_code,
            "content_length": len(response.content)
        }
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": str(e)}