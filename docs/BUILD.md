# moonlightOS Meow v4.0-pre — ISO Build Guide

**Base:** Nobara Linux (Fedora-based)  
**Author:** Ash  
**Named by:** Lucyfer (the cat)  
**Status:** cooking 🍳

---

## ISO Builder Dependencies

Install these on your Nobara/Fedora build machine before running the ISO builder:

```bash
sudo dnf install -y \
    lorax \
    livemedia-creator \
    anaconda \
    anaconda-install-env-deps \
    pykickstart \
    pungi \
    createrepo_c \
    genisoimage \
    isomd5sum \
    syslinux \
    grub2-tools \
    grub2-efi-x64 \
    shim-x64 \
    efibootmgr \
    dosfstools \
    xorriso \
    squashfs-tools \
    dracut \
    dracut-live \
    dracut-network \
    dracut-config-generic \
    python3-kickstart \
    python3-pyparted \
    python3-blivet \
    python3-dnf
```

---

## Validate the Kickstart File

Before building, always validate your kickstart to catch errors early:

```bash
ksvalidator kickstart/moonlightos-meow.ks
```

If it reports warnings about unknown packages, that's fine — those are optional or branding packages you'll add later.

---

## Build the ISO

### Method 1 — livemedia-creator (recommended, no VM needed)

Run as root on your Nobara machine:

```bash
sudo livemedia-creator \
    --ks=kickstart/moonlightos-meow.ks \
    --no-virt \
    --resultdir=/var/moonlightos-build \
    --project="moonlightOS Meow" \
    --make-iso \
    --volid="moonlightOS-Meow-v4" \
    --iso-only \
    --iso-name=moonlightos-meow-v4.0-pre-x86_64.iso \
    --releasever=41 \
    --tmp=/var/tmp
```

**Note:** This requires ~10–15 GB of free space and takes 20–40 minutes depending on your internet speed (it downloads packages during the build).

### Method 2 — lorax + livemedia-creator with mock

If you want a cleaner build environment:

```bash
sudo dnf install -y mock
sudo usermod -aG mock $USER
# Log out and back in, then:
mock -r fedora-41-x86_64 --init
mock -r fedora-41-x86_64 --install lorax livemedia-creator
```

---

## File Structure

```
moonlightos-meow/
├── kickstart/
│   └── moonlightos-meow.ks      ← Main kickstart file
├── i3-config/
│   └── config                   ← i3 config (soft red style)
├── docs/
│   └── BUILD.md                 ← This file
└── (future)
    ├── branding/                ← moonlightOS logos, wallpapers
    ├── sddm-theme/              ← Custom SDDM login theme
    └── rpmbuild/                ← moonlightos-branding RPM spec
```

---

## Placing the i3 Config

The i3 config goes into the kickstart's `%post` section via `/etc/moonlightos-defaults/`:

```bash
# On your build machine, create the defaults directory:
sudo mkdir -p /etc/moonlightos-defaults/i3/
sudo cp i3-config/config /etc/moonlightos-defaults/i3/config
```

The kickstart `%post` script will copy it to `/etc/skel/.config/i3/config` automatically, so every new user gets it.

---

## KDE Plasma — Optional Install

The kickstart includes `@^kde-desktop-environment` as an optional package group. During Anaconda installation, the user will see a **Software Selection** screen where they can choose:

- **i3 (default)** — minimal, fast, keyboard-driven
- **KDE Plasma** — full desktop environment, more beginner-friendly

Both can technically be installed at the same time; SDDM will let the user pick their session at login.

---

## Default User

| Field    | Value        |
|----------|--------------|
| Username | `mos`        |
| Full name | moonlightOS User |
| Password | `moonlight`  |
| Groups   | wheel, audio, video, networkmanager, input |

The user is prompted to change their password on first login. Root is locked — use `sudo`.

---

## Troubleshooting

**Build fails with "no space left on device":**  
Make sure `/var/tmp` has at least 15 GB free. Use `--tmp` to point to a larger partition.

**Package not found errors:**  
Some packages in the kickstart (like `moonlightos-branding`) don't exist yet — comment them out until you build the RPM.

**Black screen after boot:**  
It's a Nobara tradition. Check NVIDIA drivers first: `sudo dnf install akmod-nvidia`. Nobara should handle this automatically but double-check.

**i3 doesn't start:**  
Make sure `sddm` is enabled and the `.desktop` session file for i3 exists at `/usr/share/xsessions/i3.desktop`.

---

*moonlightOS Meow v4.0-pre — Named by Lucyfer. Powered by chaos. Based on Nobara.*
