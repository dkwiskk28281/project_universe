@echo off
setlocal
cd /d "%~dp0"

set "EPI_VAULT_PASSWORD=9175"
set "EPI_VAULT_HOST=127.0.0.1"
set "EPI_VAULT_PORT=4180"
set "EPI_VAULT_ROOT=D:\FEP_EPI_ThinkTank_Vault"
set "EPI_PUBLIC_SUBDOMAIN=fep-epi-vault-9175"
set "EPI_PUBLIC_URL_POINTER_ROOT=D:\Codex_project_260518\deploy_project_universe"
set "EPI_PUBLIC_POINTER_PAGE=https://dkwiskk28281.github.io/project_universe/amat-fep-epi-trainer/current-vault-url.html"
set "EPI_PUBLIC_PROXY_URL=https://projectuniverse.chang2058.workers.dev/"

node server-supervisor.js
