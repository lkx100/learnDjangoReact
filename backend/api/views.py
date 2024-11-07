from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer

class ItemViewList(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializers = ItemSerializer(items, many=True)

        return Response(serializers.data)
