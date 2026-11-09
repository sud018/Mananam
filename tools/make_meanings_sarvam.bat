@echo off
rem Double-click: makes all Telugu meanings with Sarvam's natural "Bulbul" voice.
cd /d "%~dp0\.."
where python >nul 2>nul
if errorlevel 1 (
  echo Python is not installed. Install it from https://www.python.org/downloads/ ^(tick "Add python.exe to PATH"^), then try again.
  pause
  exit /b 1
)
python -m pip install --quiet --upgrade sarvamai lameenc
set /p SARVAM_API_KEY=Paste your Sarvam API key and press Enter: 
set /p SPK=Voice name (for example shubh, manan, shreya, ishita) [shubh]: 
if "%SPK%"=="" set SPK=shubh
python tools\make_audio.py --only a --engine sarvam --speaker %SPK% --parallel 2 --redo
echo.
echo Finished. Open the app and tap "Listen to meaning".  To upload:  git add audio  ^&^&  git commit -m "Add meaning audio"  ^&^&  git push
pause
