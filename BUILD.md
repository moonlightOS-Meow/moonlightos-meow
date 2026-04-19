# Building moonlightOS v7.0

## 🖥️ System Requirements

- **Arch Linux** (or any Arch-based system like EndeavourOS, Manjaro, pearlOS)
- **8GB RAM minimum** (16GB+ recommended)
- **30GB free disk space** (archiso uses a lot during build)
- **sudo access** (required for building)

## 📦 Installation

### Install archiso

```bash
sudo pacman -S archiso
```

## 🔨 Building

### Quick Build (Default)

```bash
cd moonlightos-meow
sudo mkarchiso -v -w /tmp/iso -o ./out releng
```

### Custom Build Options

```bash
# Verbose build with custom work directory
sudo mkarchiso -v -w /tmp/mybuild -o ./output releng
```

### Output

The ISO will be in `./out/`:
- `moonlightos-YYYY.MM.DD-x86_64.iso`

## ⚙️ Customization

### Adding Packages

Edit `releng/packages.x86_64`:
```
# Add one package per line
vim
git
neofetch
```

### Modifying Boot

Edit `releng/profiledef.sh`:
- `iso_name` - ISO filename
- `iso_label` - Volume label
- `iso_publisher` - Publisher info

### Custom airootfs

Add files to `releng/airootfs/` - they will be included in the live system.

## 🚀 Usage

1. Write ISO to USB:
   ```bash
   sudo dd if=moonlightos-*.iso of=/dev/sdX bs=4M conv=fsync
   ```

2. Or use Ventoy/Rufus

3. Boot and install with Calamares (if included) or manual chroot

## 🐛 Troubleshooting

### "Command not found: mkarchiso"
```bash
sudo pacman -S archiso
```

### Out of disk space
- Clear `/tmp`: `sudo rm -rf /tmp/*`
- Use external drive
- Check with: `df -h`

### Build fails
- Check pacman.conf in releng/
- Ensure network connectivity for package downloads
- Try: `sudo mkarchiso -v -w /tmp/iso -o ./out releng 2>&1 | tail -50`

## 📊 Build Times (Approximate)

- **First build**: 20-40 minutes
- **Subsequent builds**: 10-20 minutes (cached)
- **With KDE packages**: +10-20 minutes

## 🎯 What's Included

- Arch Linux base
- KDE Plasma Desktop
- Essential GUI tools
- Rolling release (you break it, you fix it)

---

*Built by Ash. Named by Lucifer. Powered by rice. 🌙🐱*
*v7.0 - The Return*