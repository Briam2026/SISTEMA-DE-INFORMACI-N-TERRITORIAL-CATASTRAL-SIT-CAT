from config.settings import *  # noqa: F403

INSTALLED_APPS = [
    app for app in INSTALLED_APPS if app != "django.contrib.gis"  # noqa: F405
]
DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}
