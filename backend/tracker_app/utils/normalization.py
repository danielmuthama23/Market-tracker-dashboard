import pandas as pd

def normalize_strings(df, fields):
    """
    Normalize string fields by trimming whitespace and standardizing capitalization.
    """
    for field in fields:
        if field in df.columns:
            df[field] = df[field].astype(str).str.strip().str.title()
    return df


def handle_nans(df, fields):
    """
    Replace NaN values in specified numeric fields with zeros.
    """
    for field in fields:
        if field in df.columns:
            df[field] = df[field].fillna(0)
    return df
