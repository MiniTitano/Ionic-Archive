# Makes the "ink" layers for the homepage category cards: the photo turned grey, with the same contrast and brightness
# the CSS filters used, saved as black ink on a transparent background (alpha = darkness). Laid over any paper this looks
# exactly like the old multiply blend, but needs no blend mode, so Safari on iPhone shows it the same as desktop.
# Usage: powershell -ExecutionPolicy Bypass -File tools\riso-ink.ps1 -In assets\img\ia-0056\front.jpg -Out assets\img\riso\camcorders-r1.png -Contrast 1.35 -Brightness 1.08 [-Width 900]
param([string]$In, [string]$Out, [double]$Contrast = 1.35, [double]$Brightness = 1.08, [int]$Width = 900)
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System; using System.Drawing; using System.Drawing.Drawing2D; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class RisoInk {
  public static string Run(string src, string dst, double c, double b, int w){
    Bitmap s; using (var t = new Bitmap(src)) { int h = (int)Math.Round(t.Height * (double)w / t.Width); s = new Bitmap(w, h, PixelFormat.Format24bppRgb);
      using (var g = Graphics.FromImage(s)) { g.InterpolationMode = InterpolationMode.HighQualityBicubic; g.PixelOffsetMode = PixelOffsetMode.HighQuality; g.DrawImage(t, 0, 0, w, h); } }
    int W = s.Width, H = s.Height; var sd = s.LockBits(new Rectangle(0,0,W,H), ImageLockMode.ReadOnly, PixelFormat.Format24bppRgb); int ss = sd.Stride; byte[] sp = new byte[ss*H]; Marshal.Copy(sd.Scan0, sp, 0, sp.Length); s.UnlockBits(sd); s.Dispose();
    var o = new Bitmap(W, H, PixelFormat.Format32bppArgb); var od = o.LockBits(new Rectangle(0,0,W,H), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb); int os = od.Stride; byte[] op = new byte[os*H];
    for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) {
      int i = y*ss + x*3; double R = sp[i+2]/255.0, G = sp[i+1]/255.0, B = sp[i]/255.0;
      double v = 0.2126*R + 0.7152*G + 0.0722*B;              // grayscale(1)
      v = Math.Max(0, Math.Min(1, (v - 0.5)*c + 0.5));         // contrast(c)
      v = Math.Max(0, Math.Min(1, v*b));                       // brightness(b)
      int j = y*os + x*4; op[j] = 0; op[j+1] = 0; op[j+2] = 0; op[j+3] = (byte)Math.Round((1 - v)*255);  // black ink, alpha = darkness
    }
    Marshal.Copy(op, 0, od.Scan0, op.Length); o.UnlockBits(od); o.Save(dst, ImageFormat.Png); o.Dispose();
    return string.Format("{0}x{1}", W, H);
  }
}
'@
$o = [IO.Path]::GetFullPath($Out); [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($o)) | Out-Null
[RisoInk]::Run((Resolve-Path $In).Path, $o, $Contrast, $Brightness, $Width)
