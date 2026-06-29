# Deployment Guide - Creating .mcpack/.mcaddon Files

## 📦 What You Need

Your mod folder structure:
```
mobile-client-mod/
├── manifest.json
├── pack_icon.png
├── scripts/
│   ├── main.js
│   └── ui.js
└── README.md
```

## 🔧 Creating .MCPACK File

### Windows (Automatic)
```bash
# Double-click: build/create_mcpack.bat
```

### Manual (All Platforms)
1. Select all files in root directory
2. Compress/Create ZIP
3. Rename from `.zip` to `.mcpack`
4. Done!

### Result
- File: `MobileClientMod.mcpack`
- Size: ~50KB
- Install: Double-click in Windows/Download on Mobile

---

## 📦 Creating .MCADDON File

### Mac/Linux
```bash
# Run: build/create_mcaddon.sh
chmod +x build/create_mcaddon.sh
./build/create_mcaddon.sh
```

### Windows (Manual)
1. Compress all files to ZIP
2. Rename to `.mcaddon`
3. Place in: `%LOCALAPPDATA%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\behavior_packs/`

### Result
- File: `MobileClientMod.mcaddon`
- Install: Via behavior_packs folder or double-click

---

## ✨ Adding Texture Pack Support (Optional)

Create `textures/` folder for PvP 18.5 textures:

```
scripts/
textures/
├── blocks.json
├── items.json
└── terrain.png
```

### terrain.json example:
```json
{
  "resource_pack_name": "PvP_Textures_18.5",
  "definition": {
    "minecraft:block": [
      { "textures": "textures/terrain" }
    ]
  }
}
```

---

## 🎮 Distribution

### Option 1: Direct Download
- Upload `.mcpack` to GitHub Releases
- Users double-click to install
- Easiest method ✓

### Option 2: GitHub Releases
```bash
git tag v26.23
git push origin v26.23
# Upload files in releases tab
```

### Option 3: Manual Distribution
- Share `.mcaddon` file
- Include install instructions from INSTALL_GUIDE.md
- Support multiple platforms

---

## 🚀 Final Checklist

- ✓ `manifest.json` is valid
- ✓ `pack_icon.png` exists (64x64 PNG)
- ✓ All scripts are in `scripts/` folder
- ✓ File compressed to ZIP
- ✓ Renamed to `.mcpack` or `.mcaddon`
- ✓ Tested installation
- ✓ File size reasonable (~50KB)

---

## 🔗 File Locations

**Windows:**
- Download: `C:\Users\Username\Downloads\`
- Install: Double-click or place in behavior_packs

**Mobile:**
- Minecraft handles installation automatically
- User taps file → Import → Create World

**Mac/Linux:**
- Similar to Windows
- Use file manager to place in behavior_packs

---

## 📝 Version Management

Update manifest.json for new versions:
```json
"version": [26, 24, 0]  // v26.24
"version": [27, 0, 0]  // v27.0
```

Then recreate .mcpack/.mcaddon with updated files.

---

## 🏃 Quick Start Command

**For Windows (PowerShell):**
```powershell
# Navigate to mod folder
cd C:\path\to\mod

# Create ZIP and rename
Compression-Archive -Path . -DestinationPath MobileClientMod.zip
Rename-Item MobileClientMod.zip MobileClientMod.mcpack

# Done!
```

**For Mac/Linux:**
```bash
cd /path/to/mod
zip -r MobileClientMod.mcpack . -x ".*"
```

---

You now have a ready-to-install mod file! 🎉
