from unittest.mock import MagicMock, patch

from django.db import DatabaseError
from django.test import SimpleTestCase
from django.urls import reverse


class HealthEndpointTests(SimpleTestCase):
    @patch("apps.core.views.connections")
    def test_health_returns_200_when_database_is_available(self, connections):
        cursor = MagicMock()
        connections.__getitem__.return_value.cursor.return_value.__enter__.return_value = cursor
        response = self.client.get(reverse("health"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")
        self.assertEqual(response.json()["checks"]["database"], "ok")
        cursor.execute.assert_called_once_with("SELECT 1")

    @patch("apps.core.views.connections")
    def test_health_returns_503_when_database_is_unavailable(self, connections):
        connections.__getitem__.side_effect = DatabaseError("unavailable")
        response = self.client.get(reverse("health"))

        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json()["status"], "degraded")

    def test_openapi_schema_documents_health_endpoint(self):
        response = self.client.get("/api/schema/?format=json")

        self.assertEqual(response.status_code, 200)
        self.assertIn("/api/v1/health", response.json()["paths"])

