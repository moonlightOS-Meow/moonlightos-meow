#!/bin/bash
# moonlightOS Meow — Rofi Power Menu
# Used by: Super+Shift+E in i3 config

options="🔒 Lock\n🚪 Logout\n🔄 Reboot\n⏻ Shutdown"

chosen=$(echo -e "$options" | rofi -dmenu -i -p "Power" \
    -theme-str 'window {width: 200px;}' \
    -theme-str 'listview {lines: 4;}')

case "$chosen" in
    "🔒 Lock")     i3lock -c 0D0D0D ;;
    "🚪 Logout")   i3-msg exit ;;
    "🔄 Reboot")   systemctl reboot ;;
    "⏻ Shutdown") systemctl poweroff ;;
esac
