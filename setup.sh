#!/bin/sh

DIRECTORY="/var/www/html/recipebox"

if [ ! -d "$DIRECTORY" ]; then
	cd /var/www/html
	mkdir recipebox
	cd /
fi