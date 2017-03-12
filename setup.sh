#!/bin/sh

DIRECTORY="/var/www/html/indiespot"

if [ ! -d "$DIRECTORY" ]; then
	cd /var/www/html
	mkdir indiespot
	cd /
fi