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
├── docs/               # Build guides, lore, ideas.md
├── openbox-config/     # Openbox rice (from Archcraft repo)
├── kickstart/          # Legacy Fedora kickstart (v4.0 archive)
├── website/            # Landing page (Vite + React + Tailwind)
├── .gitignore
├── LICENSE
└── README.md
```

## Quick Start – Website
```bash
cd website
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # outputs to dist/
```

GitLab Pages auto-deploys from branch v5.0-meow.

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

## Building ISO
```bash
git clone https://github.com/gsanhueza/ArchISOMaker
cd ArchISOMaker
sudo ./build.sh -v
```

ISO will be available as a GitLab Release.

## License

MIT License — do whatever you want, just keep the cat named Lucyfer.

Made with pain, chaos, and a lot of "WHY... WHY!!!"
© 2026 Ash & Lucyfer the cat
Long live Meow. NoVa V3 stays dead. Lucyfer's Revenge is real. 🐱🌙
