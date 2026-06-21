$ErrorActionPreference = "SilentlyContinue"

$patterns = @(
  "server-supervisor.js",
  "vault-server.js",
  "localtunnel",
  "lt.js",
  "fep-epi-vault-9175"
)

for ($round = 0; $round -lt 3; $round++) {
  $targets = Get-CimInstance Win32_Process | Where-Object {
    $cmd = $_.CommandLine
    $_.Name -in @("node.exe", "cmd.exe") -and
    $cmd -and
    (($patterns | Where-Object { $cmd -like "*$_*" }).Count -gt 0)
  }

  foreach ($target in $targets) {
    Write-Host ("Stopping PID {0} {1}" -f $target.ProcessId, $target.Name)
    Stop-Process -Id $target.ProcessId -Force -ErrorAction SilentlyContinue
  }

  Start-Sleep -Milliseconds 700
}

Remove-Item "D:\FEP_EPI_ThinkTank_Vault\server-supervisor.pid" -Force -ErrorAction SilentlyContinue
Write-Host ""
Write-Host "Personal server stop command completed."
