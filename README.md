# moonlightOS Meow v6.0 "Lucyfer's Resurrection" 🐱☠️
### *"He came back. He always comes back. Unfortunately."*

> ⚠️ Lucyfer (he/him) has filed complaints #8001-#8847. We ignore him. The distro exists anyway.
> NoVa V3 is still dead. Good riddance. This is its spiritual successor. Yeah, we're using Debian. Deal with it.

**Built by Ash. Reluctantly named by Lucyfer. Powered by spite and poor life choices. Based on Debian 13 Trixie because we got tired of Arch's nonsense.**

---

## What is this?

moonlightOS Meow v6.0 is a minimal Debian 13 (Trixie) based live ISO.
No desktop environment. No bloat. **No bullshit.**
Just a clean, minimal system with the tools you need and absolutely nothing else.

Pick your own desktop. Rice your own rice. If you actually know what you're doing.
If you don't — honestly? Maybe just stick with Windows. This isn't for you. Or try the Windows Edition if you want to commit to the bit.

- **Base:** Debian 13 "Trixie"
- **Desktop:** None (bring your own)
- **Installer:** Debian installer (not Calamares. never again.)
- **Philosophy:** Minimal. Chaos. Lucyfer approved (reluctantly).
- **Named by:** Lucyfer (he/him, under protest)
- **NoVa V3:** still dead

---

## Why Debian?

- **Arch?** Boring. Predictable. Same recycled takes.
- **Fedora/Nobara?** Gave us genuine PTSD. v4.0 was a mistake. We don't talk about it.
- **Ubuntu?** Please no.
- **Debian 13 Trixie?** Stable. Doesn't whine. Actually works. Revolutionary, we know.
- **live-build?** Shockingly not garbage for once.
- **Lucyfer's opinion?** He said "mrrp" at 3 AM. We took it as approval because he was already gone.

---

## Building the ISO

### GitHub Actions (the smart way)
Go to Actions. Hit the **Build moonlightOS Meow v6.0 ISO** button. Wait. Don't touch anything.
Customize packages and compression if you're feeling adventurous.
ISO drops in 7 days as a downloadable artifact. You're welcome.

### Local build (Debian/Ubuntu only — no, really)
You'll need Debian or Ubuntu. This won't work on your precious MacBook.
```bash
sudo apt install live-build
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
git checkout meow-debian
cd live-build
sudo lb build
```
Go make coffee. This takes a while. Don't ask for a progress bar.

---

## Version Lore

| Version | Status | Notes |
|---|---|---|
| AshOS v1 | 💀 DEAD | Kubuntu remaster, born from chaos |
| Phoenix v1-v2 | 💀 ARCHIVED | rm -rf survivor, GRUB trauma |
| NoVa V3 | 💀 DEAD | 730+ commits, 0 ISOs, legend |
| Meow v4.0 | 💀 RIP | Fedora era, kickstart hell |
| Meow v5.0 | ✅ ALIVE | Arch, Openbox, villain arc |
| Windows Edition | 🪟 ACTIVE | NTLite, Makka Pakka, spite |
| **Meow v6.0** | ☠️ **YOU ARE HERE** | Debian, minimal, resurrection |

---

## License

WTFPL v3 (Remastered Edition) — See [LICENSE.md](LICENSE.md)
Do whatever you want. Lucyfer doesn't care. He's sleeping. Probably plotting revenge.

---

*"I ALWAYS COME BACK" — Ash, 2026*
*Lucyfer's Resurrection. For real this time. Probably. Send help. 🌙🐱☠️*
