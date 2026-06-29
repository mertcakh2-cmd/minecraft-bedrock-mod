# How to Create a Real MCPACK File

## What You Need
- All these files from the repository:
  - manifest.json
  - pack_icon.png
  - scripts/main.js
  - scripts/ui.js

## Steps to Create Real MCPACK

### Windows Users:
1. Create a NEW FOLDER named `MobileClientMod`
2. Copy these files INTO that folder:
   - manifest.json
   - pack_icon.png
   - Create a `scripts` subfolder
   - Put main.js and ui.js in scripts folder

3. Select all 3 items (manifest.json, pack_icon.png, scripts folder)
4. Right-click → Send to → Compressed (zipped) folder
5. Rename `MobileClientMod.zip` to `MobileClientMod.mcpack`
6. Done! Double-click to install in Minecraft

### Mac/Linux Users:
```bash
mkdir MobileClientMod
cp manifest.json MobileClientMod/
cp pack_icon.png MobileClientMod/
mkdir MobileClientMod/scripts
cp scripts/main.js MobileClientMod/scripts/
cp scripts/ui.js MobileClientMod/scripts/

zip -r MobileClientMod.mcpack MobileClientMod
```

## Result
You'll have a file called `MobileClientMod.mcpack` that:
- Contains manifest.json at root
- Contains pack_icon.png at root
- Contains scripts/ folder with main.js and ui.js
- Can be double-clicked to install in Minecraft Bedrock
