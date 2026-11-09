@echo off
rem Double-click: sends the app to GitHub (https://github.com/sud018/Mananam).
cd /d "%~dp0\.."
where git >nul 2>nul
if errorlevel 1 (
  echo Git is not installed. Install it from https://git-scm.com/download/win  ^(keep all the default options^), then double-click this again.
  pause
  exit /b 1
)
git add -A
git -c user.name="Sudheer" -c user.email="manikantaganti@gmail.com" commit -m "Update" >nul 2>nul
git push -u origin main
echo.
echo If you saw no error above, it is on GitHub. Your app: https://sud018.github.io/Mananam/
pause
