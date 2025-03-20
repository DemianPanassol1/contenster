#!/bin/bash

# Colors for text formatting
GREEN='\033[0;32m'
RESET='\033[0m'
YELLOW='\033[1;33m'

# Function to present options and get the user's choice
function present_options {
    echo -e "${GREEN}######${RESET}"
    echo -e "${GREEN}### $1${RESET}"
    echo -e "${GREEN}######${RESET}"
    echo
    echo -e "${YELLOW}$2${RESET}"

    # Options provided as arguments to the function
    select_option "${@:3}"
    return $?
}

# Renders a text-based list of options that can be selected by the
# user using up, down, and enter keys and returns the chosen option.
#
#   Arguments   : list of options, maximum of 256
#                 "opt1" "opt2" ...
#   Return value: selected index (0 for opt1, 1 for opt2 ...)
function select_option {

    # Terminal control sequences for colors and formatting
    ESC=$(printf "\033")
    GREEN="${ESC}[1;32m"
    RESET="${ESC}[0m"

    # Helper functions for terminal control
    cursor_blink_on() { printf "${ESC}[?25h"; }
    cursor_blink_off() { printf "${ESC}[?25l"; }
    cursor_to() { printf "${ESC}[$1;${2:-1}H"; }
    print_option() { printf "   $1 "; }
    print_selected() { printf " ${GREEN}➔ $1${RESET} "; }
    get_cursor_row() {
        IFS=';' read -sdR -p $'\E[6n' ROW COL
        echo ${ROW#*[}
    }
    key_input() {
        read -s -n3 key 2>/dev/null >&2
        if [[ $key = $ESC[A ]]; then echo up; fi
        if [[ $key = $ESC[B ]]; then echo down; fi
        if [[ $key = "" ]]; then echo enter; fi
    }

    # Initially print empty new lines (scroll down if at bottom of screen)
    for opt; do printf "\n"; done

    # Determine current screen position for overwriting the options
    local lastrow=$(get_cursor_row)
    local startrow=$(($lastrow - $#))

    # Ensure cursor and input echoing back on upon a ctrl+c during read -s
    trap "cursor_blink_on; stty echo; printf '\n'; exit" 2
    cursor_blink_off

    local selected=0
    while true; do
        # Print options by overwriting the last lines
        local idx=0
        for opt; do
            cursor_to $(($startrow + $idx))
            if [ $idx -eq $selected ]; then
                print_selected "$opt"
            else
                print_option "$opt"
            fi
            ((idx++))
        done

        # User key control
        case $(key_input) in
        enter) break ;;
        up)
            ((selected--))
            if [ $selected -lt 0 ]; then selected=$(($# - 1)); fi
            ;;
        down)
            ((selected++))
            if [ $selected -ge $# ]; then selected=0; fi
            ;;
        esac
    done

    # Cursor position back to normal
    cursor_to $lastrow
    printf "\n"
    cursor_blink_on

    return $selected
}
