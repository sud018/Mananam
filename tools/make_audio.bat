@echo off
rem Double-click this file to create natural-voice audio for the Mananam app.
cd /d "%~dp0\.."
where python >nul 2>nul
if errorlevel 1 (
  echo Python is not installed. Install it from https://www.python.org/downloads/ ^(tick "Add python.exe to PATH"^), then double-click this file again.
  pause
  exit /b 1
)
python -m pip install --quiet --upgrade edge-tts
python tools\make_audio.py %*
echo.
echo Finished. Now upload the new "audio" folder to GitHub ^(git add audio ^&^& git commit -m "Add audio" ^&^& git push^).
pause
