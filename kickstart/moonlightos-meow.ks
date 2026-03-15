# moonlightOS Meow v4.0-pre — Kickstart Configuration
# Base: Nobara Linux (Fedora-based)
# Author: Ash
# Description: Cosmic-themed minimal Linux distro. Named by a cat.
#
# Usage: lorax --product="moonlightOS Meow" --version="v4.0-pre" \
#              --release="1" --source=<repo-url> \
#              --kickstart=moonlightos-meow.ks \
#              --output=/path/to/output /path/to/lorax-templates
#
# Or with livemedia-creator:
# livemedia-creator --ks=moonlightos-meow.ks --no-virt \
#                   --resultdir=/var/lmc --project="moonlightOS Meow" \
#                   --make-iso --volid="moonlightOS-Meow-v4" \
#                   --iso-only --iso-name=moonlightos-meow-v4.0-pre.iso

# ── INSTALLATION BASICS ─────────────────────────────────────────────────────
text
lang en_US.UTF-8
keyboard us
timezone UTC --utc

# Network — DHCP by default, user can configure post-install
network --bootproto=dhcp --device=link --activate

# Bootloader — installed to MBR/EFI, user handles partitioning via Anaconda
bootloader --location=mbr --append="rhgb quiet"

# Partitioning — handled interactively by Anaconda
# (autopart is intentionally NOT set — user picks their layout)
clearpart --none

# ── DEFAULT LIVE USER ────────────────────────────────────────────────────────
# Username: mos (short for moonlightOS)
# Password: moonlight (user should change on first boot)
user --name=mos --fullname="moonlightOS User" --password=moonlight --plaintext --groups=wheel,audio,video,networkmanager,input

# Root account — locked by default (use sudo via mos)
rootpw --lock

# ── DISPLAY MANAGER ──────────────────────────────────────────────────────────
# SDDM — works with both i3 (via xinitrc/xsession) and KDE Plasma
services --enabled=sddm
xconfig --startxonboot

# ── PACKAGE SELECTION ────────────────────────────────────────────────────────
%packages
# ── Core system ──
@core
@base-x
@fonts
@hardware-support
@networkmanager-submodules
bash
sudo
polkit
dbus
systemd
xorg-x11-server-Xorg
xorg-x11-xinit
xorg-x11-drv-libinput

# ── Display manager ──
sddm
sddm-themes

# ── i3 Window Manager stack (DEFAULT DE) ──────────────────────────────────
i3
i3status
i3lock
i3-ipc
picom
rofi
dunst
polybar
feh
xss-lock
xautolock
xclip
xdotool
xrandr
arandr
lxappearance
nitrogen
numlockx

# ── Terminal ──
alacritty
bash-completion
tmux
neofetch
htop
btop

# ── File manager ──
thunar
thunar-archive-plugin
thunar-volman
gvfs
gvfs-mtp
file-roller

# ── App launcher / utilities ──
rofi
dmenu
flameshot
copyq
network-manager-applet
pavucontrol
blueman
playerctl

# ── Fonts ──
google-noto-fonts-common
google-noto-sans-fonts
google-noto-mono-fonts
jetbrains-mono-fonts
fontawesome-fonts
terminus-fonts

# ── GTK theming ──
arc-theme
papirus-icon-theme
gnome-themes-extra
gtk-murrine-engine

# ── Audio ──
pipewire
pipewire-alsa
pipewire-pulseaudio
pipewire-jack
wireplumber
pamixer

# ── Browser ──
firefox

# ── Text editor ──
gedit
nano
vim

# ── Image viewer ──
eog

# ── Media ──
mpv
rhythmbox

# ── Archive tools ──
p7zip
unzip
zip
tar

# ── System tools ──
gparted
timeshift
flatpak

# ── KDE Plasma (OPTIONAL — selectable during install) ─────────────────────
# Anaconda will present this as an optional environment group
# Users who want KDE select it; i3 is the default
@^kde-desktop-environment
# KDE extras
plasma-nm
plasma-pa
plasma-vault
kdeconnect
dolphin
konsole
kate
spectacle
ark

# ── moonlightOS branding ──
# (place your custom branding RPM here once built)
# moonlightos-branding
# moonlightos-release
# moonlightos-wallpapers

%end

# ── POST-INSTALL SCRIPTS ─────────────────────────────────────────────────────
%post --log=/root/moonlightos-post.log

# Set hostname
echo "moonlightOS" > /etc/hostname

# Create moonlightOS release file
cat > /etc/moonlightos-release << 'EOF'
NAME="moonlightOS"
VERSION="Meow v4.0-pre"
BASE="Nobara Linux (Fedora)"
WM="i3"
NAMED_BY="a cat"
STATUS="cooking 🍳"
AUTHOR="Ash"
EOF

# Symlink for os-release compatibility
cp /etc/moonlightos-release /etc/os-release.moonlightos

# Enable Flathub for Flatpak
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo || true

# Set SDDM theme (if moonlightOS theme is present)
# sed -i 's/^Current=.*/Current=moonlightos/' /etc/sddm.conf.d/default.conf || true

# Copy i3 config for default user
mkdir -p /home/mos/.config/i3
cp /etc/skel/.config/i3/config /home/mos/.config/i3/config 2>/dev/null || true
chown -R mos:mos /home/mos/.config

# Set default wallpaper path (feh sets it on i3 startup)
mkdir -p /home/mos/.config/moonlightos
echo "feh --bg-scale /usr/share/moonlightos/wallpapers/default.jpg" > /home/mos/.fehbg
chmod +x /home/mos/.fehbg
chown mos:mos /home/mos/.fehbg

# Enable services
systemctl enable NetworkManager
systemctl enable bluetooth
systemctl enable sddm
systemctl enable pipewire
systemctl enable pipewire-pulse

echo "moonlightOS Meow v4.0-pre post-install complete. Named by a cat. 🐱" >> /root/moonlightos-post.log

%end

# ── SKEL (copied to new users) ───────────────────────────────────────────────
%post
mkdir -p /etc/skel/.config/i3
mkdir -p /etc/skel/.config/alacritty
mkdir -p /etc/skel/.config/dunst
mkdir -p /etc/skel/.config/rofi

# Copy configs from /etc/moonlightos-defaults/ if they exist
cp -r /etc/moonlightos-defaults/i3/config /etc/skel/.config/i3/config 2>/dev/null || true
cp -r /etc/moonlightos-defaults/alacritty/alacritty.toml /etc/skel/.config/alacritty/ 2>/dev/null || true
cp -r /etc/moonlightos-defaults/dunst/dunstrc /etc/skel/.config/dunst/ 2>/dev/null || true
cp -r /etc/moonlightos-defaults/rofi/config.rasi /etc/skel/.config/rofi/ 2>/dev/null || true
%end
