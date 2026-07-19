"""
Revenue Sharing Model for Plugin Marketplace
"""

def calculate_revenue_share(plugin_price: float, platform_fee: float = 0.20):
    """
    80% goes to plugin author
    20% goes to Maximus platform
    """
    platform_share = round(plugin_price * platform_fee, 2)
    author_share = round(plugin_price - platform_share, 2)
    
    return {
        "platform_share": platform_share,
        "author_share": author_share,
        "platform_fee_percentage": f"{int(platform_fee * 100)}%"
    }