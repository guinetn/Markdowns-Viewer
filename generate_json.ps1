param ($pathToExplore=$PWD, $outFilename="md-files.json")

   $data = @{ files= @() }

   # Extract files    
   Write-host "Exploring $pathToExplore" 
   get-Childitem $pathToExplore | Sort-Object | ForEach-Object { $data.files += $_.FullName | Resolve-Path -Relative}     

   # Save
   $out = [System.IO.Path]::Combine($PSScriptRoot, $outFilename) 
   [IO.File]::WriteAllText($out, ($data | ConvertTo-Json)) 
    
   Write-host $data.files.length "Files found" 
   Write-host "     \____ Saved to " $out 

# Usage: 
# .\generate_json.ps1 $PWD/md
# .\generate_json.ps1 $PWD/md "md-files.json" 
#
# - 1st arg.                Folder to explore (must be in the current ($pwd) folder)
# - 2nd (optional) arg.     Output filename