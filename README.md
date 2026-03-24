# moonlightOS Meow v4.0-pre

**Named by a cat. Powered by chaos. Built with Fedora.**

moonlightOS Meow is a minimal, cosmic-themed Linux distribution based on Nobara (Fedora 43) with i3 window manager as the default, KDE Plasma as an optional desktop environment, and a beautiful boot sound to welcome you to the void.

## 🌙 Features

- **Minimal i3 Setup** — Lightweight, keyboard-driven window manager with soft red styling
- **Fedora Base** — Stable, modern, and well-maintained
- **Anaconda Installer** — User-friendly installation with partitioning control
- **KDE Plasma Optional** — Choose your poison: i3 or KDE at install time
- **Cosmic Aesthetic** — Dark theme, purple accents, and a boot jingle that blesses your ears
- **Lucyfer Approved** — QA tested by an actual cat

## 📦 What's Inside

```
kickstart/
  └── moonlightos-meow.ks       # Anaconda kickstart configuration
i3-config/
  ├── config                     # i3 window manager config (soft red style)
  ├── alacritty.toml            # Terminal emulator configuration
  └── powermenu.sh              # Rofi power menu script
docs/
  └── BUILD.md                  # Full build instructions for ISO creation
```

## 🚀 Building the ISO

### Prerequisites

- Nobara 43 (or Fedora 43) with at least 50GB free space
- 4GB+ RAM recommended
- `lorax`, `livemedia-creator`, and related tools installed

### Quick Start

```bash
# Install dependencies
sudo dnf install -y lorax livemedia-creator pykickstart anaconda

# Validate the kickstart
ksvalidator kickstart/moonlightos-meow.ks

# Build the ISO
sudo livemedia-creator --ks=kickstart/moonlightos-meow.ks \
  --no-virt --make-iso --iso-only \
  --resultdir=/tmp/moonlightos-meow \
  --project="moonlightOS Meow" \
  --volid="moonlightOS-Meow-v4"
```

See `docs/BUILD.md` for detailed instructions and troubleshooting.

## 🎨 Customization

### i3 Configuration

Edit `i3-config/config` to customize:
- Keybindings
- Workspaces
- Window behavior
- Status bar settings

The current setup uses soft red accents and is designed to be beginner-friendly with helpful comments.

### Terminal Theme

Modify `i3-config/alacritty.toml` to adjust:
- Colors (currently red/dark theme)
- Font and size
- Opacity and padding

### Boot Sound

The boot jingle is configured to play on i3 startup via `exec_always` in the i3 config. To use a custom sound:

```bash
# Copy your sound file
sudo cp your-sound.wav /usr/share/sounds/moonlightos/boot.wav

# Edit i3 config to point to your file
exec_always --no-startup-id paplay /usr/share/sounds/moonlightos/boot.wav
```

## 📖 Documentation

- **BUILD.md** — Complete ISO building guide with troubleshooting
- **i3 Config** — Inline comments explaining keybindings and settings
- **Kickstart File** — Detailed comments on package selection and post-install scripts

## 🐱 The Story

moonlightOS Meow is the result of:
- 730 commits and zero bootable ISOs (NoVa V3 RIP)
- Multiple Linux installer meltdowns
- One cat's decisive naming vote
- A cosmic aesthetic that refuses to compromise

**OOH-OOH. YOU JUST GOT BAITED.** (98+ times and counting)

## 📜 License

MIT License — See LICENSE file for details.

## 🌙 Links

- **Website:** https://moonlightos-dev.gitlab.io/moonlightos-meow/
- **GitLab:** https://gitlab.com/moonlightos-dev/moonlightos-meow/
- **GitHub:** https://github.com/moonlightOS-Meow/moonlightos-meow/

## 🎵 Boot Sound

The boot jingle is included in the kickstart and plays automatically on i3 startup. It's cosmic, it's comfy, and it blesses your ears. 💀🌙

---

**Built by Ash. Named by Lucyfer. Powered by chaos.**

---

> 🤖 This commit was pushed by Claude (Anthropic) directly from a sandboxed container. Not Ash. Claude did this. Via PAT auth. Yes this is real.
