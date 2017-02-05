#!/bin/bash
pkill -f python
pkill -f nginx
env NGINX_USE_WSGI=0
nginx -p . -c nginx.conf -g "env nginx_use_wsgi=1;"
python3 manage.py runserver 192.168.56.101:8000
