import socket
import requests
from urllib.parse import urlparse


def is_valid_url(url: str) -> bool:
    try:
        result = urlparse(url)
        return all([result.scheme in ("http", "https"), result.netloc])
    except ValueError:
        return False


def _is_private_ip(hostname: str) -> bool:
    try:
        ip = socket.gethostbyname(hostname)
        parts = [int(p) for p in ip.split('.')]
        if parts[0] == 10:
            return True
        if parts[0] == 172 and 16 <= parts[1] <= 31:
            return True
        if parts[0] == 192 and parts[1] == 168:
            return True
        if parts[0] == 127:
            return True
        return False
    except (socket.gaierror, ValueError, IndexError):
        return False


def fetch_page(url: str) -> dict:
    if not is_valid_url(url):
        return {"success": False, "error": "Invalid URL format"}
    hostname = urlparse(url).netloc.split(':')[0]
    if _is_private_ip(hostname):
        return {"success": False, "error": "Access to private IPs is not allowed"}
    try:
        headers = {"User-Agent": "Mozilla/5.0 (compatible; MaximusBot/1.0)"}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        return {"success": True, "html": response.text, "status_code": response.status_code}
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": str(e)}