# moonlightOS Meow — Windows Edition 🪟😈
### *"If you can't beat them, debloat them."*

> ⚠️ **WARNING:** This is a Windows build. Lucyfer (he/him) does not approve. He has filed complaint #7749. The build proceeded anyway.
> NoVa V3 is still dead. This is what happens when Linux fails you.

**Built by Ash. Named by Lucyfer. Powered by spite. Running on NTFS and telemetry.**

---

## What even is this?

It's Windows 11. But less terrible.

moonlightOS Meow Windows Edition is a debloated Windows 11 build made with NTLite.
We removed the garbage Microsoft bundles, added a tiling window manager, a status bar,
an audio visualizer, and set Makka Pakka as the wallpaper. Because why not.

**If you don't know what NTLite is:** it's a tool that lets you strip Windows down before installing it. Like surgery, but for an OS that desperately needed it.

---

## What's included

| Thing | What it does |
|---|---|
| 🪟 **Windows 11 Pro + Home** | Both editions in one ISO |
| 🔧 **NTLite debloat** | 139 components yeeted |
| ⬛ **GlazeWM** | Tiling window manager (like i3 but on Windows, don't ask) |
| 📊 **Zebar** | Status bar because the default taskbar is a war crime |
| 🎵 **CAVA** | Audio visualizer that has no business being on Windows |
| 🪨 **Makka Pakka wallpaper** | Non-negotiable. Do not question it. |
| 🕵️ **No telemetry** | Microsoft is not watching. Probably. |
| 🐱 **Lucyfer's disapproval** | Comes pre-installed. Cannot be removed. |

---

## What we removed

- Telemetry services (bye Microsoft, don't miss you)
- Cortana (nobody asked)
- Xbox services (you can add them back, we don't judge... actually we do)
- Tips & Suggestions (we know how to use Windows, thanks)
- Advertising IDs (no)
- Unused language packs (saves space)
- Some legacy apps (they were old and sad)
- Edge PDF viewer (idk if i did that)
- Clipchamp (absolutely not)
- OneDrive (actually NTLite didn't let me remove it fully, skill issue)

**Nothing essential has been removed. Probably.**

---

## How to install

1. **Download the ISO** from the [Releases page](https://github.com/moonlightOS-Meow/moonlightos-meow/releases)
2. **Verify the checksum** (SHA-256 is in the release notes, please do this)
3. **Flash it to a USB** using [Rufus](https://rufus.ie) — use GPT + UEFI mode
4. **Boot from USB** (spam F12, F11, DEL, or whatever your BIOS key is)
5. **Install Windows** like normal — pick Home or Pro when asked
6. **Don't blame us** if something goes wrong

> 💡 **Tip for noobs:** If your PC won't boot from USB, Google "[your motherboard name] boot from USB" and follow the instructions. We believe in you.

---


---

## After installing

Everything is already set up. That's the point. 😈

GlazeWM, Zebar, CAVA, and the Makka Pakka wallpaper are all baked into the ISO via post-install scripts. You don't need to do anything extra. Just install and vibe.

> 💡 **If something didn't install:** blame NTLite. Or Lucyfer. Probably Lucyfer.

---

## Adding mos-meow-repo (optional)

If you somehow also use the Arch Linux version of moonlightOS, add to `/etc/pacman.conf`:
```ini
[mos-meow-repo]
SigLevel = Optional TrustAll
Server = https://gitlab.com/moonlightos-dev/mos-meow-repo/-/raw/master/x86_64
```
This is irrelevant on Windows. We just thought you should know it exists.

---

## Why does this exist?

- Calamares kept crying
- RTX 5080 needed proprietary drivers
- Dad's GIGABYTE AI TOP mobo LCD only works on Windows
- YAML hell claimed another victim
- NoVa V3 was already dead anyway
- Linux will return. It always does.

---

## Known issues

- None yet — report if you find any gremlins 👀
- If you find Lucyfer (he/him), he is not a bug. He is a feature.

---

## License

WTFPL — See [LICENSE.md](LICENSE.md)
Do whatever you want. Lucyfer doesn't care anymore.

---

*Long live the moon... even if it's running on NTFS.*
*moonlightOS Linux will return. It always does.* 🐱🌙
*"I ALWAYS COME BACK" — Ash, 2026*
