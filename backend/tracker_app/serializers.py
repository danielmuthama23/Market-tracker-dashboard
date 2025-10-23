from rest_framework import serializers
from .models import MarketData

class MarketDataSerializer(serializers.ModelSerializer):
    """
    Serializer for returning and receiving MarketData objects.
    """
    class Meta:
        model = MarketData
        fields = ['id', 'market', 'brand', 'date', 'sales', 'volume']
