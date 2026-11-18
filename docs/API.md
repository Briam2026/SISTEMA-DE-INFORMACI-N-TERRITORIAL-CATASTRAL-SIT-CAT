# API starter

- GET /api/v1/health: service and database connectivity.
- GET /api/schema/: OpenAPI document.
- GET /api-docs/: Swagger UI.

The API health endpoint is infrastructure-only. Business endpoints must be added under /api/v1/ with tenant enforcement, permissions, pagination, validation and tests.
