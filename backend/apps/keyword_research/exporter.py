# backend/apps/keyword_research/exporter.py

import csv
from io import StringIO


def export_keywords_to_csv(keywords: list) -> str:
    """
    Convert keyword results into CSV format.
    """
    output = StringIO()
    writer = csv.writer(output)

    # Header
    writer.writerow(['Keyword', 'Difficulty', 'Intent'])

    # Data
    for item in keywords:
        writer.writerow([
            item.get('keyword', ''),
            item.get('difficulty', ''),
            item.get('intent', '')
        ])

    return output.getvalue()