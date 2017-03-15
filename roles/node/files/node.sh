#!/bin/sh

DIRECTORY="~/nodesource_setup.sh"

if [ ! -d "$DIRECTORY" ]; then
	cd ~
	curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
	sudo bash nodesource_setup.sh
	sudo apt-get install nodejs
	sudo apt-get install build-essential -y
	sudo npm install -g pm2
fi
