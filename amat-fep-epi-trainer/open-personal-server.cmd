@echo off
setlocal

set "URL_FILE=D:\FEP_EPI_ThinkTank_Vault\public-url.txt"
set "POINTER_URL=https://projectuniverse.chang2058.workers.dev/personal-server/"

if exist "%URL_FILE%" (
  set /p CURRENT_URL=<"%URL_FILE%"
  if not "%CURRENT_URL%"=="" (
    start "" "%POINTER_URL%"
    exit /b 0
  )
)

start "" "%POINTER_URL%"
