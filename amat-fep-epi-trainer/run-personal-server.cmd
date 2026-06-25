@echo off
setlocal
cd /d "%~dp0"

set "EPI_VAULT_PASSWORD=9175"
set "EPI_VAULT_HOST=127.0.0.1"
set "EPI_VAULT_PORT=4180"
set "EPI_VAULT_ROOT=D:\FEP_EPI_ThinkTank_Vault"
set "EPI_PUBLIC_SUBDOMAIN=fep-epi-vault-9175"
set "EPI_PUBLIC_PROXY_URL=https://projectuniverse.chang2058.workers.dev/"

node server-supervisor.js
