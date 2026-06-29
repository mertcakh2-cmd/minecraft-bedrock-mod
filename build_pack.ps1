# PowerShell Script to Create Proper MCPACK File
# Run this to generate a valid Minecraft Bedrock addon package

$ErrorActionPreference = "Stop"

Write-Host "Creating proper MobileClientMod.mcpack..." -ForegroundColor Green
Write-Host ""

# Create temp directory
if (Test-Path "temp_mcpack") {
    Remove-Item "temp_mcpack" -Recurse -Force
}
New-Item -ItemType Directory -Path "temp_mcpack" | Out-Null

# Copy files
Write-Host "Copying files..."
Copy-Item "manifest.json" "temp_mcpack\"
Copy-Item "pack_icon.png" "temp_mcpack\"
New-Item -ItemType Directory -Path "temp_mcpack\scripts" -Force | Out-Null
Copy-Item "scripts\*" "temp_mcpack\scripts\" -Recurse

# Create ZIP file
Write-Host "Creating ZIP archive..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory((Resolve-Path "temp_mcpack").Path, (Resolve-Path ".").Path + "\MobileClientMod.zip")

# Rename to .mcpack
Write-Host "Renaming to .mcpack format..."
if (Test-Path "MobileClientMod.mcpack") {
    Remove-Item "MobileClientMod.mcpack" -Force
}
Rename-Item "MobileClientMod.zip" "MobileClientMod.mcpack"

# Cleanup
Write-Host "Cleaning up..."
Remove-Item "temp_mcpack" -Recurse -Force

Write-Host ""
Write-Host "✓ SUCCESS! MobileClientMod.mcpack created!" -ForegroundColor Green
Write-Host "✓ Ready to download and double-click to install!" -ForegroundColor Green
Write-Host ""
