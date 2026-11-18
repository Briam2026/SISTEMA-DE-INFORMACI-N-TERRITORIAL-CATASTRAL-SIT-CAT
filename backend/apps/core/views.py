from django.db import DatabaseError, connections
from drf_spectacular.utils import extend_schema
from rest_framework.authentication import BaseAuthentication
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView


class HealthView(APIView):
    authentication_classes: list[type[BaseAuthentication]] = []
    permission_classes: list[type[BasePermission]] = [AllowAny]

    @extend_schema(
        operation_id="healthRetrieve",
        summary="Comprobar disponibilidad de SIT-CAT",
        responses={200: dict, 503: dict},
    )
    def get(self, request):
        checks = {"database": "ok"}
        status_code = 200
        try:
            with connections["default"].cursor() as cursor:
                cursor.execute("SELECT 1")
        except DatabaseError:
            checks["database"] = "unavailable"
            status_code = 503

        payload = {
            "status": "ok" if status_code == 200 else "degraded",
            "checks": checks,
        }
        return Response(payload, status=status_code)
