"""
ASGI config for market_tracker project.
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'market_tracker.settings')

application = get_asgi_application()
