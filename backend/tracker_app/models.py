from django.db import models

class MarketData(models.Model):
    """
    Stores product listing and performance information by market and brand.
    Indexed for fast filtering and aggregation.
    """
    market = models.CharField(max_length=100, db_index=True)
    brand = models.CharField(max_length=100, db_index=True)
    date = models.DateField(db_index=True)
    sales = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    volume = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['market']),
            models.Index(fields=['brand']),
            models.Index(fields=['date']),
        ]
        ordering = ['-date']

    def __str__(self):
        return f"{self.brand} - {self.market} ({self.date})"