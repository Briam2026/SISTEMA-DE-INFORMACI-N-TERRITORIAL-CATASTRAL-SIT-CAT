FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
RUN apt-get update && apt-get install -y --no-install-recommends     binutils gdal-bin libgdal-dev libgeos-dev libproj-dev libpq-dev     gcc curl libpango-1.0-0 libpangoft2-1.0-0 libpangocairo-1.0-0     libgdk-pixbuf-2.0-0 shared-mime-info     && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--access-logfile", "-"]
