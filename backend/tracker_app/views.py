import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from django.views.generic import TemplateView
from django.db.models import Sum
from .models import MarketData
from .serializers import MarketDataSerializer
from .utils.data_ingestion import ingest_market_data


class FileUploadView(APIView):
    """
    Handles CSV/XLSX uploads and ingestion.
    """
    parser_classes = [MultiPartParser]

    def post(self, request):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

        upload_dir = 'media/uploads'
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, file_obj.name)

        # Save file temporarily
        with open(file_path, 'wb+') as dest:
            for chunk in file_obj.chunks():
                dest.write(chunk)

        # Process ingestion
        try:
            record_count = ingest_market_data(file_path)
            return Response({
                'status': 'success',
                'message': f'File uploaded successfully. {record_count} records processed.'
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MarketDataListView(APIView):
    """
    Returns aggregated MarketData with filters:
    ?market=Kenya&start=2024-01-01&end=2024-12-31
    """
    def get(self, request):
        market = request.GET.get('market')
        start = request.GET.get('start')
        end = request.GET.get('end')

        data = MarketData.objects.all()

        if market:
            data = data.filter(market__iexact=market)
        if start and end:
            data = data.filter(date__range=[start, end])

        agg = data.values('market', 'brand').annotate(
            total_sales=Sum('sales'),
            total_volume=Sum('volume')
        )

        return Response(agg)


class BrandPerformanceView(APIView):
    """
    Returns time-series data for a specific brand.
    """
    def get(self, request, brand_name):
        data = MarketData.objects.filter(brand__iexact=brand_name).order_by('date')
        serializer = MarketDataSerializer(data, many=True)
        return Response(serializer.data)


class UploadTemplateView(TemplateView):
    """
    Simple HTML upload page for manual testing.
    """
    template_name = 'upload.html'
