#!/bin/bash

# Import the select_option function
source ./scripts/common.sh

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
RESET='\033[0m'

sleep 0.5
clear
sleep 0.5

# Present and get the choice for the environment mode
present_options "Select an option using the up/down arrow keys and press enter:" \
    "Select environment for build:" \
    "development mode" \
    "staging mode" \
    "production mode"
mode_choice=$?

sleep 0.5
clear
sleep 0.5

mode=""

case $mode_choice in
0)
    mode="development"
    ;;
1)
    mode="staging"
    ;;
2)
    mode="production"
    ;;
esac

echo -e "\n${YELLOW}${BOLD}### Installing server dependencies...${RESET}"
yarn install

echo -e "\n${GREEN}${BOLD}### Installation completed ###${RESET}"
sleep 1

echo -e "\n${YELLOW}${BOLD}### Building the server...${RESET}"
npx nest build

echo -e "\n${GREEN}${BOLD}### Server build completed ###${RESET}"
sleep 1

clear

environment="./src/settings/$mode.json"
settings="./client/src/config/settings.json"

ssl=$(cat "$environment" | grep -E '"SSL"\s*:' | awk -F': ' '{print $2}' | tr -d ',"[:space:]')
host=$(cat "$environment" | grep -E '"HOST"\s*:' | awk -F': ' '{print $2}' | tr -d ',"[:space:]')
port=$(cat "$environment" | grep -E '"PORT"\s*:' | awk -F': ' '{print $2}' | tr -d ',"[:space:]')
api_login=$(cat "$environment" | grep -E '"API_LOGIN"\s*:' | awk -F': ' '{print $2}' | tr -d ',"[:space:]')
api_password=$(cat "$environment" | grep -E '"API_PASSWORD"\s*:' | awk -F': ' '{print $2}' | tr -d ',"[:space:]')

api_base_url=""

if [ "$host" = "localhost" ] || [ "$host" = "127.0.0.1" ]; then
    api_base_url="http://$host:$port"
else
    if [ "$ssl" = "true" ]; then
        api_base_url="https://$host"
    else
        api_base_url="http://$host"
    fi
fi

sed -i "s/\"API_LOGIN\": \"[^\"]*\"/\"API_LOGIN\": \"$api_login\"/" "$settings"
sed -i "s|\"API_BASE_URL\": \".*\"|\"API_BASE_URL\": \"$api_base_url\"|" "$settings"
sed -i "s/\"API_PASSWORD\": \"[^\"]*\"/\"API_PASSWORD\": \"$api_password\"/" "$settings"

echo -e "\n${YELLOW}${BOLD}### Installing frontend dependencies...${RESET}"
cd client
yarn install
cd ..

echo -e "\n${GREEN}${BOLD}### Installation completed ###${RESET}"
sleep 1

echo -e "\n${YELLOW}${BOLD}### Building the frontend...${RESET}"
cd client
yarn build
cd ..
sleep 1

clear

echo -e "\n${GREEN}${BOLD}### Frontend build completed ###${RESET}"

clear

echo -e "\n${YELLOW}${BOLD}### Deleting 'node_modules' from client...${RESET}"

rm -rf client/node_modules

echo -e "\n${GREEN}${BOLD}### Completed ###${RESET}"

sleep 1

clear

# Ask if the user wants to start the server with pm2
present_options "Select an option using the up/down arrow keys and press enter:" \
    "Do you want to start the server with pm2?" \
    "Yes" \
    "No"
pm2_choice=$?

if [ $pm2_choice -eq 0 ]; then
    echo -e "\n${YELLOW}${BOLD}### Starting server...${RESET}"

    app_name=$(cat "./package.json" | grep -E '"name"\s*:' | awk -F': ' '{print $2}' | tr -d ',"[:space:]')
    app_version=$(cat "./package.json" | grep -E '"version"\s*:' | awk -F': ' '{print $2}' | tr -d ',"[:space:]')

    if pm2 list | grep -q "$app_name-$app_version"; then
        NODE_ENV=$mode pm2 reload "$app_name-$app_version"
    else
        NODE_ENV=$mode pm2 start dist/main.js --name "$app_name-$app_version"
    fi

    clear

    sleep 1

    echo -e "\n${GREEN}${BOLD}### Completed ###${RESET}"
    sleep 1
else
    echo -e "\n${YELLOW}${BOLD}### Skipping pm2 server start ###${RESET}"
fi

git restore client/src/config/settings.json

sleep 1

echo -e "\n${GREEN}${BOLD}### Done ###${RESET}"
