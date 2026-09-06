# Contact sheet of library images so a human (or AI) LOOKS at every photo before it ships -- Unsplash
# descriptions lie (a Covid dashboard was once "numbers on a screen"). Tiles the -700 variants matching a
# prefix, labels each with its slug, writes one PNG. Windows PowerShell 5.1 + System.Drawing; no ImageMagick.
#   usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/images/contact_sheet.ps1 <prefix> <out.png> [cols]
param([string]$prefix, [string]$out, [int]$cols = 5)
Add-Type -AssemblyName System.Drawing
$lib = Join-Path $PSScriptRoot '..\..\assets\images\library'
$files = Get-ChildItem (Join-Path $lib "$prefix*-700.jpg") | Sort-Object Name
if ($files.Count -eq 0) { Write-Output "no files for prefix $prefix"; exit 1 }
$tw = 340; $th = 230; $label = 26
$rows = [Math]::Ceiling($files.Count / $cols)
$sheet = New-Object System.Drawing.Bitmap ($cols * $tw), ($rows * ($th + $label))
$g = [System.Drawing.Graphics]::FromImage($sheet)
$g.Clear([System.Drawing.Color]::FromArgb(24, 30, 38))
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$font = New-Object System.Drawing.Font('Segoe UI', 9)
$brush = [System.Drawing.Brushes]::White
$i = 0
foreach ($f in $files) {
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  $x = ($i % $cols) * $tw; $y = [Math]::Floor($i / $cols) * ($th + $label)
  $scale = [Math]::Min($tw / $img.Width, $th / $img.Height)
  $w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
  $g.DrawImage($img, [int]($x + ($tw - $w) / 2), [int]($y + ($th - $h) / 2), $w, $h)
  $name = $f.Name -replace '-700\.jpg$', ''
  $g.DrawString(("{0}  {1}x{2}" -f $name, $img.Width, $img.Height), $font, $brush, $x + 4, $y + $th + 4)
  $img.Dispose(); $i++
}
$sheet.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $sheet.Dispose()
Write-Output ("sheet: {0} images -> {1}" -f $files.Count, $out)
