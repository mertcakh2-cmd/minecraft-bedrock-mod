@echo off
REM Create MCPACK file from mod files
REM This batch file packages the mod for installation

echo Creating Mobile Client Mod Package...
echo.

REM Create temporary directory
if exist "temp_pack" rmdir /s /q "temp_pack"
mkdir temp_pack

REM Copy all necessary files
echo Copying mod files...
copy manifest.json temp_pack\
copy pack_icon.png temp_pack\ 2>nul || echo Warning: pack_icon.png not found
mkdir temp_pack\scripts
copy scripts\* temp_pack\scripts\

REM Create ZIP archive (rename to .mcpack)
echo Creating package...
cd temp_pack
tar -a -c -f "..\MobileClientMod.mcpack" .
cd ..

REM Cleanup
rmdir /s /q temp_pack

echo.
echo ✓ Successfully created MobileClientMod.mcpack
echo ✓ File ready for installation!
echo.
pause
