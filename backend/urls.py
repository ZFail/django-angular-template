from django.conf.urls import include, url
from django.contrib import admin
import views

urlpatterns = [
    url(r'^b/admin/', admin.site.urls),
    url(r'^b/isadmin', views.isadmin),
    url(r'^b/run', views.run),
]
