#!/bin/bash
pkill -f python
pkill -f nginx
env NGINX_USE_WSGI=1
uwsgi --ini uwsgi.ini --chmod-socket=666 &
nginx -p . -c nginx.conf &
