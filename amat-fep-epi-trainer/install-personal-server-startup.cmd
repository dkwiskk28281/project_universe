@echo off
setlocal

set "TASK_NAME=FEP EPI Personal Server"
set "RUNNER=%~dp0run-personal-server.cmd"

schtasks /Create /TN "%TASK_NAME%" /TR "\"%RUNNER%\"" /SC ONLOGON /RL LIMITED /F
if errorlevel 1 (
  echo Failed to register startup task.
  exit /b 1
)

schtasks /Run /TN "%TASK_NAME%"
echo.
echo Personal server startup task installed and started.
echo Local URL:  http://127.0.0.1:4180/
echo Public URL: https://fep-epi-vault-9175.loca.lt
echo Data root:  D:\FEP_EPI_ThinkTank_Vault
