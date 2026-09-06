# Fallback resizer for fetch_stock.js on machines without ImageMagick (System.Drawing, Windows PowerShell 5.1).
# usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/images/resize.ps1 <src> <libdir> <slug>
# Writes <slug>.jpg (2400 long edge), <slug>-1400.jpg, <slug>-700.jpg. Re-encoding drops EXIF; the EXIF
# orientation tag is honoured before resizing; JPEG quality 82. Prints one line per file: "<file> <w> <h> <kb>".
param([string]$src, [string]$lib, [string]$slug)
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile($src)
try {
  if ($img.PropertyIdList -contains 0x0112) {
    $o = $img.GetPropertyItem(0x0112).Value[0]
    switch ($o) {
      3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  }
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)
  foreach ($t in @(@(2400, "$slug.jpg"), @(1400, "$slug-1400.jpg"), @(700, "$slug-700.jpg"))) {
    $max = $t[0]; $name = $t[1]
    $long = [Math]::Max($img.Width, $img.Height)
    $scale = 1.0
    if ($long -gt $max) { $scale = $max / $long }
    $w = [int][Math]::Round($img.Width * $scale); $h = [int][Math]::Round($img.Height * $scale)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)))
    $dest = Join-Path $lib $name
    $bmp.Save($dest, $codec, $ep)
    $g.Dispose(); $bmp.Dispose()
    $kb = [int][Math]::Round((Get-Item $dest).Length / 1024)
    Write-Output "$name $w $h $kb"
  }
} finally { $img.Dispose() }
