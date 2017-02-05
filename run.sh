#!/bin/bash
pkill -f python
pkill -f nginx
nginx -p . -c nginx.conf
python3 manage.py runserver 192.168.56.101:8000
