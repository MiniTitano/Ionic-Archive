# Whitens the edges of listing photos: light neutral greys near the border (and near-white greys anywhere)
# are lifted to white; the camera's darker or coloured parts are left alone.
# Run it ONCE on each new listing folder, e.g.:
#   powershell -ExecutionPolicy Bypass -File tools\whiten-listing-photos.ps1 -Files assets\img\ia-0058\front.jpg
# or on a whole folder:  ... -Files (Get-ChildItem assets\img\ia-0058\*.jpg).FullName
# Running it twice on the same photo lightens the greys a little more each time.
param([string[]]$Files, [string]$OutDir = '', [string]$Root = '')
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System; using System.Drawing; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class Whiten {
  static double S(double a, double b, double x){ double t=Math.Max(0,Math.Min(1,(x-a)/(b-a))); return t*t*(3-2*t); }
  public static void Run(string src, string dst){
    Bitmap bmp; using (var tmp = new Bitmap(src)) { bmp = new Bitmap(tmp); }
    int W=bmp.Width,H=bmp.Height; var r=new Rectangle(0,0,W,H);
    var d=bmp.LockBits(r,ImageLockMode.ReadWrite,PixelFormat.Format24bppRgb);
    int st=d.Stride; byte[] px=new byte[st*H]; Marshal.Copy(d.Scan0,px,0,px.Length);
    double m=Math.Min(W,H);
    for(int y=0;y<H;y++) for(int x=0;x<W;x++){
      int i=y*st+x*3; double B=px[i],G=px[i+1],R=px[i+2];
      double L=0.299*R+0.587*G+0.114*B, mx=Math.Max(R,Math.Max(G,B)), mn=Math.Min(R,Math.Min(G,B)), Sat=mx-mn;
      double edge=Math.Min(Math.Min(x,y),Math.Min(W-1-x,H-1-y))/m;           // 0 at the border
      double band=1-S(0.0,0.22,edge);                                        // strong near edges, fades inwards
      double neutral=1-S(16,42,Sat);                                         // greys only, not coloured parts
      double bgEdge=band*S(95,190,L)*neutral;                                // light-ish greys near the edge
      double bgAll=S(196,236,L)*(1-S(8,26,Sat))*0.9;                         // near-white greys anywhere
      double a=Math.Max(bgEdge,bgAll);
      px[i]=(byte)(B+(255-B)*a); px[i+1]=(byte)(G+(255-G)*a); px[i+2]=(byte)(R+(255-R)*a);
    }
    Marshal.Copy(px,0,d.Scan0,px.Length); bmp.UnlockBits(d);
    var enc=Array.Find(ImageCodecInfo.GetImageEncoders(),c=>c.MimeType=="image/jpeg");
    var ep=new EncoderParameters(1); ep.Param[0]=new EncoderParameter(Encoder.Quality,88L);
    bmp.Save(dst,enc,ep); bmp.Dispose();
  }
}
'@
if ($Root) { $Files = Get-ChildItem $Root -Directory | ? Name -like 'ia-*' | % { Get-ChildItem $_.FullName -Filter *.jpg | % FullName } }
foreach ($f in $Files) {
  $dst = if ($OutDir) { Join-Path $OutDir ((Split-Path (Split-Path $f) -Leaf) + '-' + (Split-Path $f -Leaf)) } else { $f }
  [Whiten]::Run($f, $dst); "$dst $((Get-Item $dst).Length)"
}
