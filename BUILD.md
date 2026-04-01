# Building moonlightOS Meow v6.0

## 🖥️ System Requirements

- **Ubuntu 22.04 LTS or later** (or any Debian-based system)
- **8GB RAM minimum** (16GB+ recommended)
- **20GB free disk space minimum** (live-build can use 50GB during compilation)
- **sudo access** (required for building)

## 📦 Automatic Installation (Recommended)

### On Ubuntu via GitHub Actions

1. Go to **Actions** tab
2. Select **🐱 Build moonlightOS Meow v6.0 ISO**
3. Click **Run workflow**
4. Configure options:
   - **Compression**: xz (default), zstd, or lz4
   - **Extra packages**: space-separated list (optional)
   - **Upload artifact**: true
5. Wait for build to complete (~30-45 minutes)
6. Download ISO from artifacts (available 7 days)

### Local Build (Ubuntu/Debian)

#### Quick Start
```bash
sudo ./build-local.sh
```

#### With Custom Compression
```bash
sudo ./build-local.sh zstd
```

#### With Extra Packages
```bash
sudo ./build-local.sh xz "vim git curl"
```

## 🔧 Manual Build

If you prefer to control every step:

```bash
# Install dependencies
sudo apt-get update
sudo apt-get install -y live-build debootstrap squashfs-tools xorriso

# Navigate to build directory
cd live-build

# Make scripts executable
chmod +x auto/config auto/build auto/clean

# Clean any previous builds
sudo ./auto/clean --all

# Configure
sudo ./auto/config --compression xz

# Build
sudo ./auto/build

# Find your ISO
ls -lh *.iso
```

## 📝 Customization

### Adding Packages

Edit `live-build/config/package-lists/meow.list.chroot`:
```
# Add one package per line
vim
git
curl
firefox
```

### Modifying Boot Parameters

Edit `live-build/auto/config`:
- Change `--bootappend-live` for kernel parameters
- Change `--compression` for different compression (xz/zstd/lz4)

### Custom Hooks

Place shell scripts in `live-build/config/hooks/` to run during ISO build

## 🚀 Usage

Once built:

1. Write ISO to USB:
   ```bash
   sudo dd if=moonlightos-meow-v6.0-*.iso of=/dev/sdX bs=4M conv=fsync
   ```

2. Or burn with Etcher/Ventoy

3. Boot and run Debian installer (no desktop pre-installed - bring your own)

## 🐛 Troubleshooting

### "Permission denied" on auto scripts
```bash
chmod +x live-build/auto/*
```

### Build fails with "debootstrap not found"
```bash
sudo apt-get install debootstrap
```

### Out of disk space
- Clear `/tmp`: `sudo rm -rf /tmp/*`
- Use external drive
- Check with: `df -h`

### ISO not found after build
- Check build output for errors
- Ensure squashfs-tools is installed
- Try manual build with verbose output:
  ```bash
  sudo lb build --verbose
  ```

## 📊 Build Times (Approximate)

- **First build**: 45-60 minutes
- **Subsequent builds**: 30-45 minutes (cached)
- **With extra packages**: +5-15 minutes per package

## 🎯 What's Included

- Debian 13 "Trixie" minimal base
- No desktop environment (bring your own)
- Debian installer (live variant)
- Essential tools only
- ~700MB ISO

---

*Built by Ash. Named by Lucyfer. Powered by chaos. 🌙🐱*