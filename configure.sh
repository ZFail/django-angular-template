#!/bin/bash
cd backend
pip3 install -r requirements.txt -t src
cd ../frontend
bower install
cd ..
