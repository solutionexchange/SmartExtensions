<# ----- ----- ----- ----- ----- ----- ----- ----- #>

function Write-BuildMessage ($Message) {
    $LineLengthMin = 72;
    $MessageLengthMax = 68;
    if ($Message.Length -gt $MessageLengthMax) {
        $Message = ("{0}..." -f $Message.Substring(0, 67));
    }
    Write-Host -Object (" - {0}" -f $Message) -NoNewline;
    Write-Host -Object (" " * ($LineLengthMin - $Message.Length)) -NoNewline;
}

function Write-BuildMessageState ($ErrorState) {
    if ($ErrorState -eq $true) {
        Write-Host -Object ("[FAILED]") -ForegroundColor ("red");
    }
    else {
        Write-Host -Object ("[PASSED]") -ForegroundColor ("green");
    }
}

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-Host ("`r`nDeployment process is running.`r`n") -ForegroundColor ("red");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage ("Remove current build version");
Remove-Item -Path C:\OpenText\WS\MS\ASP\PlugIns\beta*\ -Recurse -Force -ErrorAction SilentlyContinue -ErrorVariable $ErrorResult;
if ($ErrorResult) {
    Write-Information $ErrorResult;
}
Remove-Item -Path C:\OpenText\WS\MS\ASP\PlugIns\embedded*\ -Recurse -Force -ErrorAction SilentlyContinue -ErrorVariable $ErrorResult;
if ($ErrorResult) {
    Write-Information $ErrorResult;
}
Remove-Item -Path C:\OpenText\WS\MS\ASP\PlugIns\owug*\ -Recurse -Force -ErrorAction SilentlyContinue -ErrorVariable $ErrorResult;
if ($ErrorResult) {
    Write-Information $ErrorResult;
}
Write-BuildMessageState;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage ("Copy new build version");
Copy-Item -Path .\build\beta*\ -Destination C:\OpenText\WS\MS\ASP\PlugIns\ -Recurse -Force;
Copy-Item -Path .\build\embedded*\ -Destination C:\OpenText\WS\MS\ASP\PlugIns\ -Recurse -Force;
Copy-Item -Path .\build\owug*\ -Destination C:\OpenText\WS\MS\ASP\PlugIns\ -Recurse -Force;
Write-BuildMessageState;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-Host ("`r`nDeployment process is completed`r`n") -ForegroundColor ("red");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>