from django.urls import path
from .views import (
    FileUploadView,
    MarketDataListView,
    BrandPerformanceView,
    UploadTemplateView
)

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('data/', MarketDataListView.as_view(), name='market-data-list'),
    path('brand/<str:brand_name>/', BrandPerformanceView.as_view(), name='brand-performance'),
    path('upload-form/', UploadTemplateView.as_view(), name='upload-form'),
]
