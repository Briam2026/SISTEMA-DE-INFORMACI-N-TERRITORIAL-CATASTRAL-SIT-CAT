# Architecture overview

## Purpose and scope
SIT-CAT is a municipal territorial and cadastral information system for Bolivian GAMs. This repository starter establishes the runtime and a health endpoint only. Business modules are intentionally out of scope for this delivery.

## Runtime components
- frontend: React 18 + TypeScript + Vite starter, built to static assets.
- proxy: Nginx routes / to the web container, /api/ and /api-docs/ to Django, and /tiles/ to Martin.
- api: Django 5 + GeoDjango + Django REST Framework. OpenAPI is published at /api/schema/ and Swagger UI at /api-docs/.
- worker: Celery process using the same Django image and Redis broker.
- db: PostgreSQL 16 with PostGIS 3.4.
- redis: Celery broker and future cache.
- minio: S3-compatible object storage for future document workflows.
- martin: vector tile server backed by PostGIS.

## Tenant isolation
Every future business table must have municipio_id. A verified municipality identity must come from the authenticated token. Middleware establishes the PostgreSQL session tenant context inside each request transaction; PostgreSQL row-level security policies enforce the tenant boundary. Background tasks must set tenant context explicitly. The health endpoint is infrastructure-only and has no tenant data.

Do not treat a frontend municipality selector as an authorization boundary. Tenant RLS policies and cross-tenant tests are required before business data is introduced.

## Spatial reference and topology
Store canonical geometries in EPSG:4326. Configure each GAM's official local SRID in municipality data (commonly EPSG:32719, EPSG:32720 or EPSG:32721). Use ST_Transform to calculate planar area, perimeter and distance. Input transformations from PSAD56 or SIRGAS require explicit source CRS metadata and review. Topological validation rules will be implemented with the GIS module and must be validated against GAM data.

## Versioning and audit
Business data is archived logically. Predio history records validity interval, reason, actor and originating tramite. Every write audit records actor, timestamp, request IP and before/after values. Sensitive personal values must be redacted from general application logs. Audit tables and RLS policies must be included with each business module migration.

## Configuration and security
Municipal code formats, taxes, document templates, workflows and SRID belong in configuration tables. Legal values are marked PENDIENTE DE VALIDAR until approved by the GAM. Production secrets are provided through environment secrets, never committed. Production deployment must add HTTPS, strict CORS/CSRF origins, rate limiting, secure HttpOnly authentication cookies, Argon2 password hashing, TOTP for privileged roles, security headers, encrypted offsite backups and restore exercises.

## Development and deployment
For local development, copy .env.example to .env and run docker compose up --build. The Compose stack is a development starter and does not enable public ingress or production TLS. Production deployment requires a reviewed proxy/TLS configuration, secret management, backup destination and operational monitoring.

## First acceptance boundary
This starter exposes GET /api/v1/health, checks database reachability, and publishes OpenAPI. No cadastral, user, municipal or personal data endpoints are included yet.

## Dependency audit status
The current full frontend audit reports the upstream GHSA-fc5q-39xc-vjpf advisory for picomatch 4.0.7 through Vite 6.4.6. The npm registry currently reports 4.0.7 as the latest picomatch release, so no fixed version is available to pin yet. The production dependency audit (npm audit --omit=dev) reports zero vulnerabilities. Vite is used only during frontend development/build and is not copied into the final Nginx image; do not expose the Vite development server publicly. Re-run npm audit when the upstream package is patched.

## MinIO development image
The upstream public MinIO community image references are unavailable anonymously in this environment. For local development only, Compose defaults to the archived community release mirrored in Amazon ECR Public. Review and mirror this image into a municipality-controlled registry before production; production image provenance is PENDIENTE DE VALIDAR. Override it with MINIO_IMAGE in the environment when using an approved image.
