@echo off
setlocal

set "STATUS_FILE=D:\FEP_EPI_ThinkTank_Vault\server-status.json"
set "URL_FILE=D:\FEP_EPI_ThinkTank_Vault\public-url.txt"

if exist "%STATUS_FILE%" (
  type "%STATUS_FILE%"
) else (
  echo No server-status.json exists yet.
)

echo.
if exist "%URL_FILE%" (
  echo Public URL:
  type "%URL_FILE%"
) else (
  echo No public-url.txt exists yet.
)
