from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer
from rest_framework import status

class ItemViewList(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializers = ItemSerializer(items, many=True)  # QuerySet --> JSON

        return Response(serializers.data)
    
    def post(self, request):
        serialisers = ItemSerializer(data=request.data)  # JSON --> QuesrySet
        if serialisers.is_valid():
            serialisers.save()
            return Response(serialisers.data, status=status.HTTP_201_CREATED)
        return Response(serialisers.errors, status=status.HTTP_400_BAD_REQUEST)

