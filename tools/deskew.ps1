# Measures how much a product photo is tilted (from its long straight edges) and, with -Apply, rotates it level.
# Usage: powershell -ExecutionPolicy Bypass -File tools\deskew.ps1 -In assets\img\ia-0047\box.jpg [-Apply] [-Max 6]
# Prints the angle in degrees (+ = needs clockwise rotation). Only small tilts (within -Max) are considered.
param([string]$In, [switch]$Apply, [double]$Max = 6, [string]$Out = '')
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System; using System.Drawing; using System.Drawing.Drawing2D; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class Deskew {
  public static double Measure(string src, double maxDeg){
    int SW=480; Bitmap small; using (var t=new Bitmap(src)) { int SH=(int)Math.Round(t.Height*(double)SW/t.Width); small=new Bitmap(SW,SH); using(var g=Graphics.FromImage(small)){ g.InterpolationMode=InterpolationMode.HighQualityBilinear; g.DrawImage(t,0,0,SW,SH);} }
    int W=small.Width,H=small.Height; var d=small.LockBits(new Rectangle(0,0,W,H),ImageLockMode.ReadOnly,PixelFormat.Format24bppRgb); int st=d.Stride; byte[] px=new byte[st*H]; Marshal.Copy(d.Scan0,px,0,px.Length); small.UnlockBits(d); small.Dispose();
    double[] L=new double[W*H]; for(int y=0;y<H;y++) for(int x=0;x<W;x++){ int i=y*st+x*3; L[y*W+x]=0.299*px[i+2]+0.587*px[i+1]+0.114*px[i]; }
    // strong edge points with their gradient direction
    var ex=new System.Collections.Generic.List<int>(); var ey=new System.Collections.Generic.List<int>(); var vert=new System.Collections.Generic.List<bool>();
    for(int y=1;y<H-1;y++) for(int x=1;x<W-1;x++){ double gx=L[y*W+x+1]-L[y*W+x-1], gy=L[(y+1)*W+x]-L[(y-1)*W+x]; double m=Math.Sqrt(gx*gx+gy*gy); if(m<40) continue;
      double ang=Math.Atan2(Math.Abs(gy),Math.Abs(gx))*180/Math.PI; if(ang<maxDeg+2){ ex.Add(x); ey.Add(y); vert.Add(true);} else if(ang>90-maxDeg-2){ ex.Add(x); ey.Add(y); vert.Add(false);} }
    double best=0,bestScore=-1;
    for(double a=-maxDeg;a<=maxDeg+1e-9;a+=0.1){ double r=a*Math.PI/180, c=Math.Cos(r), s=Math.Sin(r);
      var hv=new double[W*2+H*2]; var hh=new double[W*2+H*2]; int off=W+H;
      for(int k=0;k<ex.Count;k++){ double x=ex[k], y=ey[k];
        if(vert[k]){ int b=(int)Math.Round(x*c - y*s)+off; if(b>=0&&b<hv.Length) hv[b]++; } else { int b=(int)Math.Round(x*s + y*c)+off; if(b>=0&&b<hh.Length) hh[b]++; } }
      double sc=0; foreach(var v in hv) sc+=v*v; foreach(var v in hh) sc+=v*v; if(sc>bestScore){bestScore=sc;best=a;} }
    return best;
  }
  public static void Rotate(string src, string dst, double angle){
    Bitmap bmp; using (var t=new Bitmap(src)) { bmp=new Bitmap(t.Width,t.Height); using(var g=Graphics.FromImage(bmp)){ g.Clear(Color.White); g.InterpolationMode=InterpolationMode.HighQualityBicubic; g.PixelOffsetMode=PixelOffsetMode.HighQuality;
      g.TranslateTransform(t.Width/2f,t.Height/2f); g.RotateTransform((float)angle); g.TranslateTransform(-t.Width/2f,-t.Height/2f); g.DrawImage(t,0,0,t.Width,t.Height);} }
    var enc=Array.Find(ImageCodecInfo.GetImageEncoders(),c=>c.MimeType=="image/jpeg"); var ep=new EncoderParameters(1); ep.Param[0]=new EncoderParameter(System.Drawing.Imaging.Encoder.Quality,90L); bmp.Save(dst,enc,ep); bmp.Dispose();
  }
}
'@
$p=(Resolve-Path $In).Path; $a=[Deskew]::Measure($p,$Max)
# the measured angle is the rotation that makes edges line up; applying it straightens the photo
if ($Apply) { $o = if ($Out) { [IO.Path]::GetFullPath($Out) } else { $p }; [Deskew]::Rotate($p,$o,$a) }
'{0:0.0}' -f $a
