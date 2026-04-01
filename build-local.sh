#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running as root (required for live-build)
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}[ERROR]${NC} This script must be run as root (use sudo)"
   exit 1
fi

echo -e "${BLUE}🐱 moonlightOS Meow v6.0 Builder${NC}"
echo -e "${BLUE}================================${NC}"

# Install dependencies if needed
echo -e "${YELLOW}[*] Checking dependencies...${NC}"
if ! command -v lb &> /dev/null; then
    echo -e "${YELLOW}[!] Installing live-build and dependencies...${NC}"
    apt-get update
    apt-get install -y live-build debootstrap squashfs-tools xorriso
else
    echo -e "${GREEN}[✓] Dependencies already installed${NC}"
fi

# Parse arguments
COMPRESSION="${1:-xz}"
EXTRA_PACKAGES="${2:-}"

# Validate compression
if [[ ! "$COMPRESSION" =~ ^(xz|zstd|lz4)$ ]]; then
    echo -e "${RED}[ERROR]${NC} Invalid compression: $COMPRESSION"
    echo "Valid options: xz, zstd, lz4"
    exit 1
fi

echo -e "${GREEN}[✓] Compression: $COMPRESSION${NC}"

# Navigate to live-build directory
cd "[0m"$(dirname "$0")/live-build" || exit 1

# Make auto scripts executable
echo -e "${YELLOW}[*] Setting up build scripts...${NC}"
chmod +x auto/config auto/build auto/clean

# Clean previous builds
echo -e "${YELLOW}[*] Cleaning previous builds...${NC}"
./auto/clean --all 2>/dev/null || true

# Add extra packages if provided
if [ -n "$EXTRA_PACKAGES" ]; then
    echo -e "${YELLOW}[*] Adding extra packages: $EXTRA_PACKAGES${NC}"
    {
        echo ""
        echo "# Extra packages added by build script"
        for pkg in $EXTRA_PACKAGES; do
            echo "$pkg"
        done
    } >> config/package-lists/meow.list.chroot
fi

# Configure
echo -e "${YELLOW}[*] Configuring live-build...${NC}"
./auto/config --compression "$COMPRESSION"

# Build
echo -e "${YELLOW}[*] Building ISO (this may take 30-60 minutes)...${NC}"
START_TIME=$(date +%s)
./auto/build

END_TIME=$(date +%s)
BUILD_TIME=$((END_TIME - START_TIME))

# Find and rename ISO
echo -e "${YELLOW}[*] Finalizing build...${NC}"
ISO=$(find . -name "*.iso" -type f | head -1)

if [ -z "$ISO" ]; then
    echo -e "${RED}[ERROR]${NC} ISO file not found!"
    exit 1
fi

# Generate timestamp
TIMESTAMP=$(date +%Y%m%d)
NEW_NAME="../moonlightos-meow-v6.0-lucyfers-resurrection-${TIMESTAMP}-amd64.iso"

mv "$ISO" "$NEW_NAME"
echo -e "${GREEN}[✓] ISO created: $NEW_NAME${NC}"

# Generate checksums
echo -e "${YELLOW}[*] Generating checksums...${NC}"
SHA256_FILE="${NEW_NAME}.sha256"
MD5_FILE="${NEW_NAME}.md5"

cd ..
sha256sum "$(basename "$NEW_NAME")" > "$SHA256_FILE"
md5sum "$(basename "$NEW_NAME")" > "$MD5_FILE"

echo -e "${GREEN}[✓] Build completed successfully!${NC}"
echo ""
echo -e "${BLUE}Build Summary:${NC}"
echo -e "  ISO: $(basename "$NEW_NAME")"
echo -e "  Size: $(du -h "$(basename "$NEW_NAME")" | cut -f1)"
echo -e "  Time: $(printf '%02d:%02d:%02d' $((BUILD_TIME/3600)) $((BUILD_TIME%3600/60)) $((BUILD_TIME%60)))"
echo -e "  SHA256: $(cat "$SHA256_FILE" | cut -d' ' -f1)"
echo -e "  MD5: $(cat "$MD5_FILE" | cut -d' ' -f1)"
echo ""
echo -e "${GREEN}To burn to USB:${NC}"
echo -e "  sudo dd if=$(basename "$NEW_NAME") of=/dev/sdX bs=4M conv=fsync"
echo ""
echo -e "${BLUE}I ALWAYS COME BACK${NC} 🌙🐱"