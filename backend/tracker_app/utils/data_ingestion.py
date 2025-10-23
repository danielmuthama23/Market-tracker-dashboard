import pandas as pd
from .normalization import normalize_strings, handle_nans
from tracker_app.models import MarketData

def ingest_market_data(file_path):
    """
    Ingests data from XLSX or CSV file into MarketData model.
    Returns number of records processed.
    """
    if file_path.endswith('.xlsx'):
        df = pd.read_excel(file_path)
    elif file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
    else:
        raise ValueError("Unsupported file type")

    # Normalize and clean
    df = handle_nans(df, ['sales', 'volume'])
    df = normalize_strings(df, ['market', 'brand'])

    records = 0
    for _, row in df.iterrows():
        MarketData.objects.update_or_create(
            market=row['market'],
            brand=row['brand'],
            date=row['date'],
            defaults={
                'sales': row['sales'],
                'volume': row['volume']
            }
        )
        records += 1
    return records
