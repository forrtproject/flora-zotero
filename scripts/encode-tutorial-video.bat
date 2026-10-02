@echo off
REM Windows version of scripts/encode-tutorial-video.sh - see that file for details.
REM Converts a raw screen recording (.mov) into the web-ready MP4 (H.264 + AAC audio)
REM and poster image used by the tutorial video on the website homepage.
REM
REM Usage (cmd or PowerShell, from the repo root): .\scripts\encode-tutorial-video.bat "path\to\recording.mov" [crf]
REM   crf: quality, 18 (best/largest) to 32 (smallest). Default 26.
REM Requires ffmpeg (https://ffmpeg.org/download.html) on your PATH.

setlocal
set "INPUT=%~1"
set "CRF=%~2"
if "%CRF%"=="" set "CRF=26"
set "OUT_DIR=docs\media"
set "VIDEO=%OUT_DIR%\flora-zotero-tutorial.mp4"
set "POSTER=%OUT_DIR%\flora-zotero-tutorial-poster.jpg"

if "%INPUT%"=="" goto :usage
if not exist "%INPUT%" goto :usage

where ffmpeg >nul 2>nul
if errorlevel 1 (
    echo ❌ ERROR: ffmpeg not found on PATH
    exit /b 1
)

if not exist "docs\Website.md" (
    echo ❌ ERROR: run this script from the plugin root directory
    exit /b 1
)

if not exist "%OUT_DIR%\" mkdir "%OUT_DIR%"

echo Encoding %INPUT% -^> %VIDEO% (crf %CRF%)...
ffmpeg -hide_banner -loglevel error -stats -y -i "%INPUT%" -map 0:v:0 -map "0:a:0?" -c:v libx264 -preset slow -crf %CRF% -pix_fmt yuv420p -profile:v high -vf "scale='min(1920,iw)':-2" -fpsmax 30 -c:a aac -b:a 128k -ac 2 -movflags +faststart "%VIDEO%"
if errorlevel 1 exit /b 1

echo Extracting poster frame -^> %POSTER%...
ffmpeg -hide_banner -loglevel error -y -ss 3 -i "%VIDEO%" -frames:v 1 -q:v 3 "%POSTER%"
if errorlevel 1 exit /b 1

for %%F in ("%VIDEO%") do set /a SIZE_MB=%%~zF / 1048576
echo.
echo ✓ Done: %VIDEO% (%SIZE_MB% MB)
if %SIZE_MB% GEQ 90 (
    echo ⚠️ Too large for GitHub ^(100 MB limit^). Re-run with a higher crf, e.g. 30
    exit /b 1
)
if %SIZE_MB% GEQ 50 echo ⚠️ Over 50 MB: GitHub will warn on push. Consider a higher crf, e.g. 28-30.
exit /b 0

:usage
echo ❌ ERROR: input video not found: "%INPUT%"
echo Usage: .\scripts\encode-tutorial-video.bat "path\to\recording.mov" [crf]
exit /b 1
