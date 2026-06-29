#!/bin/bash
# Create MCADDON file from mod files
# Run this on Mac/Linux to package the mod

echo "Creating Mobile Client Mod Package..."
echo ""

# Create temporary directory
rm -rf temp_pack
mkdir temp_pack

# Copy all necessary files
echo "Copying mod files..."
cp manifest.json temp_pack/
cp pack_icon.png temp_pack/ 2>/dev/null || echo "Warning: pack_icon.png not found"
mkdir -p temp_pack/scripts
cp scripts/* temp_pack/scripts/ 2>/dev/null || true

# Create ZIP archive (rename to .mcaddon)
echo "Creating package..."
cd temp_pack
zip -r ../MobileClientMod.mcaddon . > /dev/null 2>&1
cd ..

# Cleanup
rm -rf temp_pack

echo ""
echo "✓ Successfully created MobileClientMod.mcaddon"
echo "✓ File ready for installation!"
echo ""
