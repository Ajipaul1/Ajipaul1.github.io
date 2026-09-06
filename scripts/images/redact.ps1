# Pixelates rectangles of a screenshot before it goes on a public page (names, amounts, contact details).
#   usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/images/redact.ps1 <in.png> <out.png> "x,y,w,h;x,y,w,h;..."
# Each rectangle is downscaled 1/14 and drawn back with nearest-neighbour sampling: a coarse mosaic that
# cannot be read or reversed, and that still looks like a screen rather than a black bar.
param([string]$src, [string]$out, [string]$rects)
Add-Type -AssemblyName System.Drawing
$img = New-Object System.Drawing.Bitmap $src
$g = [System.Drawing.Graphics]::FromImage($img)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
foreach ($r in ($rects -split ';')) {
  if (-not $r.Trim()) { continue }
  $p = $r -split ','; $x = [int]$p[0]; $y = [int]$p[1]; $w = [int]$p[2]; $h = [int]$p[3]
  $x = [Math]::Max(0, $x); $y = [Math]::Max(0, $y); $w = [Math]::Min($w, $img.Width - $x); $h = [Math]::Min($h, $img.Height - $y)
  $sw = [Math]::Max(1, [int]($w / 14)); $sh = [Math]::Max(1, [int]($h / 14))
  $small = New-Object System.Drawing.Bitmap $sw, $sh
  $gs = [System.Drawing.Graphics]::FromImage($small)
  $gs.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBilinear
  $gs.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $sw, $sh), (New-Object System.Drawing.Rectangle $x, $y, $w, $h), [System.Drawing.GraphicsUnit]::Pixel)
  $g.DrawImage($small, (New-Object System.Drawing.Rectangle $x, $y, $w, $h), (New-Object System.Drawing.Rectangle 0, 0, $sw, $sh), [System.Drawing.GraphicsUnit]::Pixel)
  $gs.Dispose(); $small.Dispose()
}
$img.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $img.Dispose()
Write-Output ("redacted -> {0}" -f $out)
