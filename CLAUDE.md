# SIT-CAT · instrucciones para agentes de código

## Alcance
SIT-CAT es un sistema de información territorial y catastral para Gobiernos Autónomos Municipales de Bolivia. El idioma de interfaz es español boliviano, la moneda es bolivianos (Bs), las fechas se muestran dd/mm/aaaa y la zona horaria es America/La_Paz.

## Arquitectura acordada
- Backend: Python 3.12, Django 5, GeoDjango, Django REST Framework, drf-spectacular, Celery y Redis.
- Datos: PostgreSQL 16 + PostGIS 3.4. La geometría se guarda en EPSG:4326 y se transforma al SRID municipal configurado para cálculos.
- Frontend: React 18, TypeScript, Vite, Tailwind, shadcn/ui, TanStack Query, React Hook Form y Zod.
- Mapas: MapLibre GL JS, Terra Draw y Martin.
- Archivos: MinIO. PDFs: WeasyPrint. Procesamiento CAD/GIS: ODA File Converter, ezdxf, Shapely, pyproj y GDAL.
- Infraestructura: Docker Compose, proxy HTTPS y respaldos cifrados fuera del servidor.

## Reglas obligatorias
1. Los datos de negocio deben pertenecer a un municipio. Aplicar aislamiento en backend y PostgreSQL RLS; no confiar en filtros del frontend.
2. No borrar datos de negocio: usar borrado lógico e historial versionado, especialmente en predios y trámites.
3. Auditar escrituras con actor, instante, IP y valores anterior y posterior. No registrar datos personales sensibles en logs generales.
4. Configuración legal y municipal (código catastral, tasas, SRID, formatos y flujos) vive en datos de configuración. Si falta validación del GAM, marcar PENDIENTE DE VALIDAR; no inventar reglas.
5. Entidades catastrales usan español, snake_case y sin tildes. Infraestructura y utilidades técnicas usan inglés.
6. API REST versionada en /api/v1, con paginación, filtros, permisos de servidor y esquema OpenAPI.
7. Mantener accesibilidad WCAG AA, interfaz adaptable, español de Bolivia y modo claro/oscuro.
8. Antes de programar un módulo, resumir alcance y plan, preguntar solo ante ambigüedad crítica, implementar en pasos pequeños y ejecutar las pruebas solicitadas.
9. Cada módulo incluye pruebas, documentación y seed. Convenciones de commits: Conventional Commits.
10. No incluir datos reales de contribuyentes ni planos municipales en fixtures o logs.

## Comandos de desarrollo
- Copiar .env.example a .env para desarrollo local.
- docker compose up --build
- Backend: cd backend; python manage.py check
- Pruebas: cd backend; pytest
- Frontend: cd frontend; npm ci; npm run build

La primera entrega solo incluye el esqueleto técnico y /api/v1/health; no anticipar módulos de negocio sin una solicitud expresa.

