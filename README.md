# moonlightOS Meow v5.0 "Lucyfer's Revenge"

Arch-based chaos distro built by Ash.
Named by Lucyfer the cat. Powered by chaos. Villain Arc activated. 😈

## What is Meow?

A lightweight, cosmic-themed Linux distro. Minimal. Dark. Unhinged.
No bloat. No telemetry. Just Openbox, stars, and chaos.

- **Base:** Arch Linux (rolling release)
- **WM:** Openbox (rice from Archcraft repo)
- **Installer:** archinstall
- **Packages:** mos-meow-repo (custom pacman repo)
- **Named by:** Lucyfer (the cat)
- **NoVa V3:** dead (730+ commits, 0 ISOs, S3RL bait legacy)
- **Meow v4.0:** Fedora/Nobara era, RIP 🪦

## Project Structure
```
moonlightos-meow/
├── airootfs/           # Live environment root filesystem
├── efiboot/            # EFI boot entries
├── grub/               # GRUB bootloader config
├── syslinux/           # Syslinux bootloader config
├── utilities/          # Build helper scripts
├── website/            # Landing page (Vite + React + Tailwind)
├── docs/               # Build guides, lore, ideas.md
├── kickstart/          # Legacy Fedora kickstart (v4.0 archive)
├── build.sh            # Main ISO build script
├── packages.x86_64     # Package list
├── pacman.conf         # Pacman configuration
├── profiledef.sh       # ISO profile definition
├── bootstrap_packages  # Bootstrap package list
└── README.md
```

## Building the ISO

### Locally
```bash
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
git checkout v5.0-meow
sudo ./build.sh
```

### GitHub Actions
Trigger the **Build moonlightOS Meow ISO** workflow from the Actions tab.
You can customize version, extra packages, and compression format before building.
The ISO will be available as a downloadable artifact for 7 days.

## Quick Start – Website
```bash
cd website
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # outputs to dist/
```

GitHub Pages auto-deploys from branch v5.0-meow.
Live at: https://moonlightos-meow.github.io/moonlightos-meow

## Adding mos-meow-repo

Add to `/etc/pacman.conf`:
```ini
[mos-meow-repo]
SigLevel = Optional TrustAll
Server = https://gitlab.com/moonlightos-dev/mos-meow-repo/-/raw/master/x86_64
```

Then:
```bash
pacman -Sy meow-branding
```

## License

MIT License — do whatever you want, just keep the cat named Lucyfer.

Made with pain, chaos, and a lot of "WHY... WHY!!!"
© 2026 Ash & Lucyfer the cat
Long live Meow. NoVa V3 stays dead. Lucyfer's Revenge is real. 🐱🌙
