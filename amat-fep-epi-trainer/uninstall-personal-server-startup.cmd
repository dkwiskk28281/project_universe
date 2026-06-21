@echo off
setlocal

set "TASK_NAME=FEP EPI Personal Server"

schtasks /End /TN "%TASK_NAME%" > nul 2> nul
schtasks /Delete /TN "%TASK_NAME%" /F
call "%~dp0stop-personal-server.cmd"

echo.
echo Personal server startup task removed.
