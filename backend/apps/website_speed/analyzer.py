import socket
import time
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse


def _is_private_ip(hostname: str) -> bool:
    try:
        ip = socket.gethostbyname(hostname)
        parts = [int(p) for p in ip.split('.')]
        if parts[0] == 10 or parts[0] == 127:
            return True
        if parts[0] == 172 and 16 <= parts[1] <= 31:
            return True
        if parts[0] == 192 and parts[1] == 168:
            return True
        return False
    except (socket.gaierror, ValueError, IndexError):
        return False


def analyze_page_performance(url: str) -> dict:
    result = {"url": url, "success": False}
    try:
        hostname = urlparse(url).netloc.split(':')[0]
        if _is_private_ip(hostname):
            return {"url": url, "success": False, "error": "Access to private IPs is not allowed"}

        start = time.time()
        response = requests.get(url, timeout=15)
        end = time.time()

        load_time = round(end - start, 2)
        html = response.text
        soup = BeautifulSoup(html, "html.parser")

        images = len(soup.find_all("img"))
        scripts = len(soup.find_all("script"))
        styles = len(soup.find_all("link", rel="stylesheet"))

        result.update({
            "success": True,
            "load_time": load_time,
            "total_requests": images + scripts + styles + 1,
            "images": images,
            "scripts": scripts,
            "stylesheets": styles,
            "page_size_kb": round(len(response.content) / 1024, 2),
        })
    except requests.RequestException as e:
        result["error"] = str(e)

    return result