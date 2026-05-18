@echo off
echo ============================================
echo  SmartHire - Setup Script
echo ============================================

:: Check if Node.js is installed
where node >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js from: https://nodejs.org/
    echo Choose the LTS version (18.x or 20.x).
    echo.
    echo After installing, close this window and run setup.bat again.
    pause
    exit /b 1
)

echo.
echo [OK] Node.js found:
node --version
echo [OK] npm found:
npm --version

echo.
echo ============================================
echo  Installing Backend Dependencies...
echo ============================================
cd backend
npm install
if errorlevel 1 ( echo [ERROR] Backend install failed. & pause & exit /b 1 )
echo [OK] Backend dependencies installed!

echo.
echo ============================================
echo  Installing Frontend Dependencies...
echo ============================================
cd ..\frontend
npm install
if errorlevel 1 ( echo [ERROR] Frontend install failed. & pause & exit /b 1 )
echo [OK] Frontend dependencies installed!

echo.
echo ============================================
echo  Generating Sample Resumes...
echo ============================================
cd ..\sample-resumes
node generate-samples.js

echo.
echo ============================================
echo  Setup Complete!
echo ============================================
echo.
echo To START the application:
echo.
echo   Terminal 1 (Backend):
echo     cd backend
echo     npm start
echo.
echo   Terminal 2 (Frontend):
echo     cd frontend
echo     npm run dev
echo.
echo Then open: http://localhost:5173
echo Login with ANY email and password.
echo.
pause
