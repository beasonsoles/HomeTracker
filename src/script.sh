#!/bin/bash

# Print directory tree excluding .git folder
print_tree() {
    local prefix="$1"
    local dir="$2"
    local items=("$dir"/*)

    for i in "${!items[@]}"; do
        local item="${items[$i]}"
        local name="$(basename "$item")"
        local is_last=$((i == ${#items[@]} - 1))
        local pointer="├──"

        if [ $is_last -eq 1 ]; then
            pointer="└──"
        fi

        if [ "$name" != ".git" ]; then
            echo "${prefix}${pointer} $name"
            if [ -d "$item" ]; then
                local new_prefix="$prefix"
                if [ $is_last -eq 1 ]; then
                    new_prefix+="    "
                else
                    new_prefix+="│   "
                fi
                print_tree "$new_prefix" "$item"
            fi
        fi
    done
}

# Run from current directory
print_tree "" .


