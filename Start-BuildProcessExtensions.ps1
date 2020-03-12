<# ----- ----- ----- ----- ----- ----- ----- -----
   Package release 16.0.0.x
   File UUID: 19ef8402-aa99-4c10-a026-fb3f0f9d1d44
   ----- ----- ----- ----- ----- ----- ----- ----- #>

$BuildSettings = @{
    Version               = ("16.0.0");
    Build                 = 0;
    Compatibility         = ("11.2.2.0");
    Config                = ("config");
    Development           = ("development");
    Root                  = ("{0}" -f $PSScriptRoot);
    RootArchive           = ("{0}\archive" -f $PSScriptRoot);
    RootBackup            = ("{0}\backup" -f $PSScriptRoot);
    RootExport            = ("{0}\build" -f $PSScriptRoot);
    InstallerSource       = ("Import-ExtensionPackageManager.xml");
    InstallerFile         = ("Installer.xml");
    Libraries             = @{
        Ace                 = "1.4.5";
        Bootstrap           = "4.3.1-dist";
        ClipboardJS         = "2.0.4";
        FontAwesome         = "5.9.0";
        Gijgo               = "1.9.6a";
        Handlebars          = "4.1.2";
        jQuery              = "3.4.1";
        jQueryScrollingTabs = "2.5.0";
        JQueryFreezeTable   = "1.2.0";
        JSCookie            = "2.2.0";
        Lodash              = "4.17.11";
        MomentJS            = "2.24.0";
        MomentJSMSDate      = "2.0.1";
        MomentJSTimezone    = "0.5.25-2019a";
    };
    Date                  = Get-Date;
    Excludes              = @(
        "uuid.txt",
        "_build.version",
        "includes"
    );
    Includes              = @(
        "head-meta",
        "head-favicon",
        "head-stylesheet-core-basics",
        "head-stylesheet-libraries-basics",
        "head-script-core-basics",
        "head-script-libraries-basics",
        "head-script-libraries-moment",
        "head-script-controller-basics",
        "body-loading",
        "body-no-support-ie",
        "dialog-head-label-controls",
        "modal-loading",
        "modal-about", 
        "modal-processing"
    );
    IncludePath           = ("includes");
    IncludeTargets        = @(
        "components",
        "config",
        "global",
        "embedded",
        "extensions"
    );
    IncludeFileExtensions = @(
        "html",
        "xml",
        "js",
        "css",
        "asp?"
    );
    IncludeSpecialFiles   = @(
        "libraries.htm",
        "license.htm"
    );
}

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
        Write-Host -Object ("[") -NoNewline;
        Write-Host -Object ("FAILED") -NoNewline -ForegroundColor ("red");
        Write-Host -Object ("]");
    }
    else {
        Write-Host -Object ("[") -NoNewline;
        Write-Host -Object ("PASSED") -NoNewline -ForegroundColor ("green");
        Write-Host -Object ("]");
    }
}

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

$TimeScriptStart = Get-Date;

Write-Host ("`r`nBuild process is running.`r`n") -ForegroundColor ("red");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-Host ("`r`nCommon actions:`r`n") -ForegroundColor ("yellow");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage -Message ("Load the current central build counter from disk and count up");
if (Test-Path -Path ("{0}\{1}\_build.version" -f $BuildSettings.Root, $BuildSettings.Development)) {
    $BuildSettings.Build = Import-Clixml -Path ("{0}\{1}\_build.version" -f $BuildSettings.Root, $BuildSettings.Development);
    $BuildSettings.Build++;
}
else {
    Export-Clixml -InputObject $BuildSettings.Build -Path ("{0}\{1}\_build.version" -f $BuildSettings.Root, $BuildSettings.Development) -Force;
    $BuildSettings.Build++;
}
Write-BuildMessageState;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage -Message ("Create configuration for build packages");
$BuildPackages = @(
    @{ #OWUG (Development & Testing)
        Name                  = "owug";
        PackageLabel          = " (owug)";
        PackageExtensions     = "Package-Extensions.xml";
        PackageInformation    = "Package-Information.xml";
        Files                 = @();
        ImportXmlFiles        = @();
        Libraries             = $BuildSettings.Libraries;
        Date                  = $BuildSettings.Date;
        Version               = $BuildSettings.Version;
        Build                 = $BuildSettings.Build;
        Compatibility         = $BuildSettings.Compatibility;
        Config                = $BuildSettings.Config;
        Development           = $BuildSettings.Development;
        Root                  = $BuildSettings.Root;
        RootArchive           = $BuildSettings.RootArchive;
        RootExport            = $BuildSettings.RootExport;
        InstallerSource       = $BuildSettings.InstallerSource;
        InstallerFile         = $BuildSettings.InstallerFile;
        Excludes              = $BuildSettings.Excludes + @(
            "embedded"
        );
        Includes              = $BuildSettings.Includes;
        IncludePath           = $BuildSettings.IncludePath;
        IncludeTargets        = $BuildSettings.IncludeTargets;
        IncludeFileExtensions = $BuildSettings.IncludeFileExtensions;
        IncludeSpecialFiles   = $BuildSettings.IncludeSpecialFiles;
        UUIDs                 = @();
    },
    @{ #OWUG-CUX2 (Development & Testing) incl. OpenText Common UX2.0
        Name                  = "owug-cux2";
        PackageLabel          = " (owug-cux2)";
        PackageExtensions     = "Package-Extensions.xml";
        PackageInformation    = "Package-Information.xml";
        Files                 = @();
        ImportXmlFiles        = @();
        Libraries             = $BuildSettings.Libraries;
        Date                  = $BuildSettings.Date;
        Version               = $BuildSettings.Version;
        Build                 = $BuildSettings.Build;
        Compatibility         = $BuildSettings.Compatibility;
        Config                = $BuildSettings.Config;
        Development           = $BuildSettings.Development;
        Root                  = $BuildSettings.Root;
        RootArchive           = $BuildSettings.RootArchive;
        RootExport            = $BuildSettings.RootExport;
        InstallerSource       = $BuildSettings.InstallerSource;
        InstallerFile         = $BuildSettings.InstallerFile;
        Excludes              = $BuildSettings.Excludes + @(
            "embedded"
        );
        Includes              = $BuildSettings.Includes + @(
            "head-stylesheet-theme-opentext-cux2-extension"
        );
        IncludePath           = $BuildSettings.IncludePath;
        IncludeTargets        = $BuildSettings.IncludeTargets;
        IncludeFileExtensions = $BuildSettings.IncludeFileExtensions;
        IncludeSpecialFiles   = $BuildSettings.IncludeSpecialFiles;
        UUIDs                 = @();
    },
    @{ #BETA (Ready for Production)
        Name                  = "beta";
        PackageLabel          = ""; #" (beta)";
        PackageExtensions     = "Package-Extensions.xml";
        PackageInformation    = "Package-Information.xml";
        Files                 = @();
        ImportXmlFiles        = @();
        Libraries             = $BuildSettings.Libraries;
        Date                  = $BuildSettings.Date;
        Version               = $BuildSettings.Version;
        Build                 = $BuildSettings.Build;
        Compatibility         = $BuildSettings.Compatibility;
        Config                = $BuildSettings.Config;
        Development           = $BuildSettings.Development;
        Root                  = $BuildSettings.Root;
        RootArchive           = $BuildSettings.RootArchive;
        RootExport            = $BuildSettings.RootExport;
        InstallerSource       = $BuildSettings.InstallerSource;
        InstallerFile         = $BuildSettings.InstallerFile;
        Excludes              = $BuildSettings.Excludes + @(
            "embedded",
            "extensions\cache-monitor",
            "extensions\Import-CacheMonitor.xml",
            "extensions\cluster-log-viewer",
            "extensions\Import-ClusterLogViewer.xml",
            "extensions\config-file-viewer",
            "extensions\Import-ConfigFileViewer.xml",
            "extensions\copy-metadata",
            "extensions\Import-CopyMetadata.xml",
            "extensions\delete-by-clipboard",
            "extensions\Import-DeleteByClipboard.xml",
            "extensions\publish-by-clipboard",
            "extensions\Import-PublishByClipboard.xml",
            "extensions\publishing-manager",
            "extensions\Import-PublishingManager.xml"
        );
        Includes              = $BuildSettings.Includes;
        IncludePath           = $BuildSettings.IncludePath;
        IncludeTargets        = $BuildSettings.IncludeTargets;
        IncludeFileExtensions = $BuildSettings.IncludeFileExtensions;
        IncludeSpecialFiles   = $BuildSettings.IncludeSpecialFiles;
        UUIDs                 = @();
    },
    @{ #BETA-CUX2 (Ready for Production) incl. OpenText Common UX2.0
        Name                  = "beta-cux2";
        PackageLabel          = " (cux2)"; #" (beta-cux2)";
        PackageExtensions     = "Package-Extensions.xml";
        PackageInformation    = "Package-Information.xml";
        Files                 = @();
        ImportXmlFiles        = @();
        Libraries             = $BuildSettings.Libraries;
        Date                  = $BuildSettings.Date;
        Version               = $BuildSettings.Version;
        Build                 = $BuildSettings.Build;
        Compatibility         = $BuildSettings.Compatibility;
        Config                = $BuildSettings.Config;
        Development           = $BuildSettings.Development;
        Root                  = $BuildSettings.Root;
        RootArchive           = $BuildSettings.RootArchive;
        RootExport            = $BuildSettings.RootExport;
        InstallerSource       = $BuildSettings.InstallerSource;
        InstallerFile         = $BuildSettings.InstallerFile;
        Excludes              = $BuildSettings.Excludes + @(
            "embedded",
            "extensions\cache-monitor",
            "extensions\Import-CacheMonitor.xml",
            "extensions\cluster-log-viewer",
            "extensions\Import-ClusterLogViewer.xml",
            "extensions\config-file-viewer",
            "extensions\Import-ConfigFileViewer.xml",
            "extensions\copy-metadata",
            "extensions\Import-CopyMetadata.xml",
            "extensions\delete-by-clipboard",
            "extensions\Import-DeleteByClipboard.xml",
            "extensions\publish-by-clipboard",
            "extensions\Import-PublishByClipboard.xml",
            "extensions\publishing-manager",
            "extensions\Import-PublishingManager.xml"
        );
        Includes              = $BuildSettings.Includes + @(
            "head-stylesheet-theme-opentext-cux2-extension"
        );
        IncludePath           = $BuildSettings.IncludePath;
        IncludeTargets        = $BuildSettings.IncludeTargets;
        IncludeFileExtensions = $BuildSettings.IncludeFileExtensions;
        IncludeSpecialFiles   = $BuildSettings.IncludeSpecialFiles;
        UUIDs                 = @();
    }
    @{ #embedded (Ready for Production)
        Name                  = "embedded";
        PackageLabel          = " (embedded)";
        PackageExtensions     = "Package-Embedded.xml";
        PackageInformation    = "Package-Information.xml";
        Files                 = @();
        ImportXmlFiles        = @();
        Libraries             = $BuildSettings.Libraries;
        Date                  = $BuildSettings.Date;
        Version               = $BuildSettings.Version;
        Build                 = $BuildSettings.Build;
        Compatibility         = $BuildSettings.Compatibility;
        Config                = $BuildSettings.Config;
        Development           = $BuildSettings.Development;
        Root                  = $BuildSettings.Root;
        RootArchive           = $BuildSettings.RootArchive;
        RootExport            = $BuildSettings.RootExport;
        InstallerSource       = $BuildSettings.InstallerSource;
        InstallerFile         = $BuildSettings.InstallerFile;
        Excludes              = $BuildSettings.Excludes + @(
            "extensions"
        );
        Includes              = $BuildSettings.Includes;
        IncludePath           = $BuildSettings.IncludePath;
        IncludeTargets        = $BuildSettings.IncludeTargets;
        IncludeFileExtensions = $BuildSettings.IncludeFileExtensions;
        IncludeSpecialFiles   = $BuildSettings.IncludeSpecialFiles;
        UUIDs                 = @();
    },
    @{ #embedded-CUX2 (Ready for Production) incl. OpenText Common UX2.0
        Name                  = "embedded-cux2";
        PackageLabel          = " (embedded-cux2)";
        PackageExtensions     = "Package-Embedded.xml";
        PackageInformation    = "Package-Information.xml";
        Files                 = @();
        ImportXmlFiles        = @();
        Libraries             = $BuildSettings.Libraries;
        Date                  = $BuildSettings.Date;
        Version               = $BuildSettings.Version;
        Build                 = $BuildSettings.Build;
        Compatibility         = $BuildSettings.Compatibility;
        Config                = $BuildSettings.Config;
        Development           = $BuildSettings.Development;
        Root                  = $BuildSettings.Root;
        RootArchive           = $BuildSettings.RootArchive;
        RootExport            = $BuildSettings.RootExport;
        InstallerSource       = $BuildSettings.InstallerSource;
        InstallerFile         = $BuildSettings.InstallerFile;
        Excludes              = $BuildSettings.Excludes + @(
            "extensions"
        );
        Includes              = $BuildSettings.Includes + @(
            "head-stylesheet-theme-opentext-cux2-embedded"
        );
        IncludePath           = $BuildSettings.IncludePath;
        IncludeTargets        = $BuildSettings.IncludeTargets;
        IncludeFileExtensions = $BuildSettings.IncludeFileExtensions;
        IncludeSpecialFiles   = $BuildSettings.IncludeSpecialFiles;
        UUIDs                 = @();
    }
);
Write-BuildMessageState;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-Host ("`r`n`r`nCreate parallel jobs in the queue for each package:`r`n") -ForegroundColor ("yellow");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

foreach ($BuildPackage in $BuildPackages) {

    Start-Sleep -Milliseconds 500;

    $Scriptblock = {

        param($BuildPackage)

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
                Write-Host -Object ("[") -NoNewline;
                Write-Host -Object ("FAILED") -NoNewline -ForegroundColor ("red");
                Write-Host -Object ("]");
            }
            else {
                Write-Host -Object ("[") -NoNewline;
                Write-Host -Object ("PASSED") -NoNewline -ForegroundColor ("green");
                Write-Host -Object ("]");
            }
        }

        $TimeBuildStart = Get-Date;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-Host ("`r`nPackaging actions for {0}:`r`n" -f $BuildPackage.Name) -ForegroundColor ("yellow");

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Check and clean up previous build");
        if (Test-Path -Path ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name)) {
            Remove-Item -Path ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name) -Recurse -Force;
        }
        while (Test-Path -Path ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name)) {
            Start-Sleep -Milliseconds 500;
        }
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Create a complete image of {0}" -f $BuildPackage.Development);
        Copy-Item -Path ("{0}\{1}" -f $BuildPackage.Root, $BuildPackage.Development) -Destination ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name) -Recurse;
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        if ($BuildPackage.Excludes.count -ne 0) {
            Write-BuildMessage -Message ("Clean up image .\{0} for customer delivery" -f $BuildPackage.Name);
            foreach ($Item in $BuildPackage.Excludes) {
                Remove-Item -Path ("{0}\{1}\{2}" -f $BuildPackage.RootExport, $BuildPackage.Name, $Item) -Force -Recurse;
            }
            Write-BuildMessageState;
        }

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Find all files or directories for the build process");
        $AllDirectories = Get-ChildItem -Path ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name) -Directory -Recurse;
        $AllFiles = Get-ChildItem -Path ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name) -File -Recurse;
        Out-File -InputObject ($AllDirectories.FullName) -FilePath ("{0}\{1}\_list-directories.txt" -f $BuildPackage.RootExport, $BuildPackage.Name) -Force;
        Out-File -InputObject ($AllFiles.FullName) -FilePath ("{0}\{1}\_list-files.txt" -f $BuildPackage.RootExport, $BuildPackage.Name) -Force;
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Find all files for modification within the build process");
        foreach ($Target in $BuildPackage.IncludeTargets) {
            foreach ($Extension in $BuildPackage.IncludeFileExtensions) {
                $Results = Get-ChildItem -Path ("{0}\{1}\{2}" -f $BuildPackage.RootExport, $BuildPackage.Name, $Target) -Filter ("*.{0}" -f $Extension) -Exclude ("*.min.{0}" -f $Extension) -Recurse;
                $BuildPackage.Files += $Results;
                if ($Extension -eq "xml" -and $Target -ne "config") {
                    $BuildPackage.ImportXmlFiles += $Results;
                }
            }
        }
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Find all special files for modification within the build process");
        foreach ($SpecialFile in $BuildPackage.IncludeSpecialFiles) {
            $Results = Get-ChildItem -Path ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name) -Filter ("{0}" -f $SpecialFile) -Recurse;
            $BuildPackage.Files += $Results;
        }
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Inject all fragments & values into the ({0}) target files" -f $BuildPackage.Files.Count);
        $OutfileUUID = ("");
        $OutfileNonUUID = ("");
        foreach ($File in $BuildPackage.Files) {
            $FileContent = Get-Content -Path $File.FullName;
            $FileContentRaw = $FileContent | Out-String;
            $Result = @{ UUID = ($FileContent | Where-Object { $_ -match "File UUID: " }); File = ($File.FullName); };
            if ($Result.UUID) {
                $Result.UUID = $Result.UUID.Substring($Result.UUID.Length - 36);
                $BuildPackage.UUIDs += $Result;
                $OutfileUUID += ("{0} => {1}`r`n" -f $Result.UUID, $Result.File);
            }
            else {
                $OutfileNonUUID += ("N/A => {0}`r`n" -f $File.FullName);
            }
            foreach ($Include in $BuildPackage.Includes) {
                $FileContentRaw = $FileContentRaw -replace (("<!-- Build-Include: {0} -->" -f $Include), (Get-Content -Path ("{0}\{1}\{2}\{3}.htm" -f $BuildPackage.Root, $BuildPackage.Development, $BuildPackage.IncludePath, $Include) -Raw));
            }
            foreach ($Library in $BuildPackage.Libraries.GetEnumerator()) {
                $SearchString = "{" + ("build-library-{0}-release" -f $Library.Name.ToLower()) + "}";
                $FileContentRaw = $FileContentRaw -replace ($SearchString, $Library.Value);
            }
            $FileContentRaw = $FileContentRaw -replace ("\s*(<\/include>|<include>)\s");
            $FileContentRaw = $FileContentRaw -replace ("{build-release}", ("{0}.{1}" -f $BuildPackage.Version, $BuildPackage.Build));
            $FileContentRaw = $FileContentRaw -replace ("{build-package}", $BuildPackage.Name);
            $FileContentRaw = $FileContentRaw -replace ("{build-package-label}", $BuildPackage.PackageLabel);
            $FileContentRaw = $FileContentRaw -replace ("{build-package-extensions}", $BuildPackage.PackageExtensions);
            $FileContentRaw = $FileContentRaw -replace ("{build-package-information}", $BuildPackage.PackageInformation);
            $FileContentRaw = $FileContentRaw -replace ("{build-compatibility}", $BuildPackage.Compatibility);
            $FileContentRaw = $FileContentRaw -replace ("{build-date}", (Get-Date -Date $BuildPackage.Date -Format ("dd.MM.yyyy HH:mm:ss")));
            $FileContentRaw = $FileContentRaw -replace ("{build-copyright-date}", (Get-Date -Date $BuildPackage.Date -Format ("yyyy")));
            if ($File.Name -match ".xml") {
                Set-Content -Value $FileContentRaw -Path $File.FullName -NoNewline -Force -Encoding ("unicode");
            }
            else {
                Set-Content -Value $FileContentRaw -Path $File.FullName -NoNewline -Force;
            }
        }
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        if (Test-Path -Path ("{0}\{1}\extensions\{2}" -f $BuildPackage.RootExport, $BuildPackage.Name, $InstallerSource.InstallerSource)) {
            Write-BuildMessage -Message ("Create the {0} for {1}" -f $BuildPackage.InstallerFile, $BuildPackage.Name);
            Copy-Item -Path ("{0}\{1}\extensions\{2}" -f $BuildPackage.RootExport, $BuildPackage.Name, $BuildPackage.InstallerSource) -Destination ("{0}\{1}\{2}" -f $BuildPackage.RootExport, $BuildPackage.Name, $BuildPackage.InstallerFile) -Recurse -Force;
            Write-BuildMessageState;
        }

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Create the {0} bundle for {1}" -f $BuildPackage.PackageExtensions, $BuildPackage.Name);
        foreach ($ImportXmlFile in $BuildPackage.ImportXmlFiles) {
            $FileContentRaw = (Get-Content -Path $ImportXmlFile.FullName -Raw);
            $ImportXmlPackage += $FileContentRaw;
        }
        Set-Content -Value ($ImportXmlPackage -replace ("\s*</plugins>\s*<plugins>") -replace ("</plugins>\s*", ("</plugins>").ToUpper())) -Path ("{0}\{1}\config\{2}" -f $BuildPackage.RootExport, $BuildPackage.Name, $BuildPackage.PackageExtensions) -NoNewline -Force -Encoding ("unicode");
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Create file list for UUID of each file");
        Out-File -InputObject $OutfileUUID -FilePath ("{0}\{1}\_list-files-uuid.txt" -f $BuildPackage.RootExport, $BuildPackage.Name) -NoNewline -Force;
        Out-File -InputObject $OutfileNonUUID -FilePath ("{0}\{1}\_list-files-without-uuid.txt" -f $BuildPackage.RootExport, $BuildPackage.Name) -NoNewline -Force;
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Check for unique identifiers in the identified files");
        $ErrorState = $false;
        $Results = $BuildPackage.UUIDs | Group-Object { $_.UUID } | Where-Object { $_.Count -gt 1 };
        if ($Results.Count -gt 1) {
            $ErrorState = $true;
        }
        Write-BuildMessageState -ErrorState ($ErrorState);

        # Error Output
        if ($ErrorState) {
            foreach ($Result in $Results) {
                Write-Host ("   > UUID: {0}" -f $Result.Name) -ForegroundColor ("darkcyan");
                $Result.Group.File | ForEach-Object { Write-Host ("     > {0}" -f $_) -ForegroundColor ("darkcyan"); };
            }
        }

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Check for zero byte files after build process");
        $Results = $AllFiles | Where-Object { $_.Length -eq 0 };
        if ($Results.Count -ne 0) {
            Out-File -InputObject ($Results.FullName) -FilePath ("{0}\{1}\_list-zerobytefiles.txt" -f $BuildPackage.RootExport, $BuildPackage.Name) -Force;
            $ErrorState = $true;
        }
        else {
            $ErrorState = $false;
        }
        Write-BuildMessageState -ErrorState ($ErrorState);

        # Error Output
        if ($ErrorState) {
            foreach ($Result in $Results) {
                Write-Host ("   > {0}" -f $Result.Name) -ForegroundColor ("darkcyan");
            }
        }

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Create package, creation and version data");
        Export-Clixml -InputObject $BuildPackage.Date -Path ("{0}\{1}\_build.creation" -f $BuildPackage.RootExport, $BuildPackage.Name) -Force;
        Export-Clixml -InputObject $BuildPackage.Build -Path ("{0}\{1}\_build.version" -f $BuildPackage.RootExport, $BuildPackage.Name) -Force;
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Determine all elements for the final package creation");
        $AllItems = Get-ChildItem -Path ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name) -Recurse;
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Set the creation date for the entire package");
        $ErrorState = $false;
        try {
            foreach ($Item in $AllItems) {
                $Item.LastWriteTime = $BuildPackage.Date;
            }
        }
        catch {
            $ErrorState = $true;
        }
        Write-BuildMessageState -ErrorState ($ErrorState);

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Create a compressed archive of the complete build");
        $global:ProgressPreference = ("SilentlyContinue");
        Compress-Archive -Path ("{0}\{1}" -f $BuildPackage.RootExport, $BuildPackage.Name) -DestinationPath ("{0}\build-{1}-{2}.{3}.zip" -f $BuildPackage.RootArchive, $BuildPackage.Name, $BuildPackage.Version, $BuildPackage.Build) -CompressionLevel Optimal -Force;
        $global:ProgressPreference = ("Continue");
        Write-BuildMessageState;

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>

        Write-BuildMessage -Message ("Created build is available here .\{0} [{1}.{2}]" -f $BuildPackage.Name, $BuildPackage.Version, $BuildPackage.Build);
        Write-BuildMessageState;
        $TimeBuildFinished = Get-Date;
        Write-Host ("`r`n -> Package ({0}) was built in {1} seconds with {2} items.`r`n" -f $BuildPackage.Name, ($TimeBuildFinished - $TimeBuildStart).TotalSeconds, $AllItems.Count) -ForegroundColor ("cyan");

        <# ----- ----- ----- ----- ----- ----- ----- ----- #>
    }

    Write-BuildMessage -Message ("Start job for build package .\{0}" -f $BuildPackage.Name);
    Start-Job -ScriptBlock $Scriptblock -Name $BuildPackage.Name -ArgumentList $BuildPackage | Out-Null;
    Write-BuildMessageState;

}

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-Host ("`r`n -> Running for build {0}.{1}`r`n" -f $BuildSettings.Version, $BuildSettings.Build) -ForegroundColor ("cyan");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage -Message ("Waiting for response from each build job");
while (Get-Job -State ("Running")) {
    Start-Sleep -Milliseconds 1000;
}
Write-BuildMessageState;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage -Message ("Get console output from each build job");
Write-BuildMessageState;
Write-Host ("`r`n") -NoNewline;
Get-Job | Receive-Job;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-Host ("`r`nCommon actions:`r`n") -ForegroundColor ("yellow");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage -Message ("Clean up build job queue");
Get-Job -State ("Complete") | Remove-Job;
Write-BuildMessageState;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage -Message ("Save the current central build counter to disk");
Export-Clixml -InputObject $BuildSettings.Build -Path ("{0}\{1}\_build.version" -f $BuildSettings.Root, $BuildSettings.Development) -Force;
Write-BuildMessageState;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-BuildMessage -Message ("Create backup of the development");
$global:ProgressPreference = ("SilentlyContinue");
Compress-Archive -Path ("{0}\{1}" -f $BuildSettings.Root, $BuildSettings.Development) -DestinationPath ("{0}\backup-{1}-{2}.{3}.zip" -f $BuildSettings.RootBackup, $BuildSettings.Development, $BuildSettings.Version, $BuildSettings.Build) -CompressionLevel Optimal -Force;
$global:ProgressPreference = ("Continue");
Write-BuildMessageState;

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

$TimeScriptFinished = Get-Date;
Write-Host ("`r`n -> The complete runtime for build {0}.{1} was {2} for {3} packages.`r`n" -f $BuildSettings.Version, $BuildSettings.Build, ($TimeScriptFinished - $TimeScriptStart).TotalSeconds, $BuildPackages.Count) -ForegroundColor ("cyan");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>

Write-Host ("`r`nBuild process is completed`r`n") -ForegroundColor ("red");

<# ----- ----- ----- ----- ----- ----- ----- ----- #>
