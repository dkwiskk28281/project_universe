@echo off
setlocal

set "URL_FILE=D:\FEP_EPI_ThinkTank_Vault\public-url.txt"
set "POINTER_URL=https://dkwiskk28281.github.io/project_universe/amat-fep-epi-trainer/current-vault-url.html"

if exist "%URL_FILE%" (
  set /p CURRENT_URL=<"%URL_FILE%"
  if not "%CURRENT_URL%"=="" (
    start "" "%CURRENT_URL%"
    exit /b 0
  )
)

start "" "%POINTER_URL%"
