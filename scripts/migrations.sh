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
echo -e "\n${YELLOW}${BOLD}### Select the environment mode ###${RESET}"
present_options "Select an option using the up/down arrow keys and press enter:" \
    "Select environment for checking:" \
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

# Present and get the choice for action to execute
echo -e "\n${YELLOW}${BOLD}### Select the action to execute ###${RESET}"
present_options "Select an option using the up/down arrow keys and press enter:" \
    "Select action to execute:" \
    "Run migrations" \
    "Revert last migration" \
    "Show migrations" \
    "Check schema" \
    "Create migration"
action_choice=$?

sleep 0.5
clear
sleep 0.5

action=""
case $action_choice in
0)
    action="migrate"
    ;;
1)
    action="rollback"
    ;;
2)
    action="migrations"
    ;;
3)
    action="schema"
    ;;
4)
    action="create"
    ;;
esac

# Present and get the choice for which database project to use
echo -e "\n${YELLOW}${BOLD}### Select the database project ###${RESET}"
present_options "Select an option using the up/down arrow keys and press enter:" \
    "Select database project to use:" \
    "contenster" \
    "portfolio"
database_choice=$?

sleep 0.5
clear
sleep 0.5

database=""
case $database_choice in
0)
    database="contensterdb"
    ;;
1)
    database="portfoliodb"
    ;;
esac

# Execute the selected action
echo -e "\n${YELLOW}${BOLD}### Executing action: $action for $database in $mode mode...${RESET}"
if [ "$action" == "migrate" ]; then
    cross-env NODE_ENV=$mode FOLDER_NAME=$database npx typeorm-ts-node-commonjs migration:run -d ./src/config/typeorm/typeorm.config.ts
elif [ "$action" == "rollback" ]; then
    cross-env NODE_ENV=$mode FOLDER_NAME=$database npx typeorm-ts-node-commonjs migration:revert -d ./src/config/typeorm/typeorm.config.ts
elif [ "$action" == "migrations" ]; then
    cross-env NODE_ENV=$mode FOLDER_NAME=$database npx typeorm-ts-node-commonjs migration:show -d ./src/config/typeorm/typeorm.config.ts
elif [ "$action" == "schema" ]; then
    cross-env NODE_ENV=$mode FOLDER_NAME=$database npx typeorm-ts-node-commonjs schema:log -d ./src/config/typeorm/typeorm.config.ts
elif [ "$action" == "create" ]; then
    echo -e "\n${YELLOW}${BOLD}### Creating migration...${RESET}"
    sleep 0.5
    clear
    sleep 0.5
    read -p "Enter migration name: " migration_name
    cross-env NODE_ENV=$mode FOLDER_NAME=$database npx typeorm-ts-node-commonjs migration:generate ./src/migrations/$database/$migration_name -d ./src/config/typeorm/typeorm.config.ts
fi

echo -e "\n${GREEN}${BOLD}### Action completed successfully ###${RESET}"
sleep 1
