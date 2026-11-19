# Makes a card version of a listing photo: finds the camera on the white background,
# centres it on a white 4:5 canvas with a margin all round, so the Archive card never crops or touches it.
# -Clean "x,y,w,h" paints a stray dark strip of the source photo white first.
# -Box "x,y,w,h" gives the camera's box by hand when the automatic detection gets it wrong.
# -Angle straightens a leaning camera (degrees, + = clockwise); -ColT 0.85+ ignores a long strap hanging beside the body.
# Usage: powershell -ExecutionPolicy Bypass -File tools\card-crop.ps1 -In assets\img\ia-0044\front.jpg -Out assets\img\ia-0044\front-card.jpg [-Margin 0.1]
param([string]$In, [string]$Out, [double]$Margin = 0.13, [int]$W = 1000, [int]$H = 1250, [double]$Angle = 0, [double]$ColT = 0.55, [double]$RowT = 0.14, [string]$Box = '', [double]$Feather = 0.07, [string]$Clean = '')
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System; using System.Drawing; using System.Drawing.Drawing2D; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class CardCrop {
  static double Sm(double a,double b,double x){ double q=Math.Max(0,Math.Min(1,(x-a)/(b-a))); return q*q*(3-2*q); }
  public static string Run(string src, string dst, double margin, int OW, int OH, double angle, double colT, double rowT, string box, double featherK, string clean){
    Bitmap bmp; using (var t = new Bitmap(src)) { bmp = new Bitmap(t.Width, t.Height); using (var g0 = Graphics.FromImage(bmp)) { g0.Clear(Color.White); g0.InterpolationMode = InterpolationMode.HighQualityBicubic; g0.TranslateTransform(t.Width / 2f, t.Height / 2f); g0.RotateTransform((float)angle); g0.TranslateTransform(-t.Width / 2f, -t.Height / 2f); g0.DrawImage(t, 0, 0, t.Width, t.Height); } }
    if (!string.IsNullOrEmpty(clean)) { var cb = clean.Split(new[]{','}); using (var gc = Graphics.FromImage(bmp)) gc.FillRectangle(Brushes.White, int.Parse(cb[0]), int.Parse(cb[1]), int.Parse(cb[2]), int.Parse(cb[3])); } // paint a stray strip white
    int W=bmp.Width,H=bmp.Height; var d=bmp.LockBits(new Rectangle(0,0,W,H),ImageLockMode.ReadOnly,PixelFormat.Format24bppRgb);
    int st=d.Stride; byte[] px=new byte[st*H]; Marshal.Copy(d.Scan0,px,0,px.Length); bmp.UnlockBits(d);
    int[] col=new int[W], row=new int[H];
    for(int y=0;y<H;y++) for(int x=0;x<W;x++){ int i=y*st+x*3; int B=px[i],G=px[i+1],R=px[i+2];
      double L=0.299*R+0.587*G+0.114*B; int mx=Math.Max(R,Math.Max(G,B)), mn=Math.Min(R,Math.Min(G,B));
      if (L<236 || mx-mn>24) { col[x]++; row[y]++; } }
    // the body: rows where the camera spans a good part of the width (a strap is thin, so its rows drop out)
    int y0=0,y1=H-1; int ry=(int)(W*rowT);
    while(y0<H-1 && row[y0]<ry) y0++; while(y1>0 && row[y1]<ry) y1--;
    // then columns that are filled for most of the body's height (a strap beside the body is only partly filled)
    int bodyH=Math.Max(1,y1-y0+1); int[] col2=new int[W];
    for(int y=y0;y<=y1;y++) for(int x=0;x<W;x++){ int i=y*st+x*3; int B=px[i],G=px[i+1],R=px[i+2];
      double L=0.299*R+0.587*G+0.114*B; int mx=Math.Max(R,Math.Max(G,B)), mn=Math.Min(R,Math.Min(G,B)); if (L<236 || mx-mn>24) col2[x]++; }
    int x0=0,x1=W-1; int cxT=(int)(bodyH*colT);
    while(x0<W-1 && col2[x0]<cxT) x0++; while(x1>0 && col2[x1]<cxT) x1--;
    if (!string.IsNullOrEmpty(box)) { var b = box.Split(','); x0 = int.Parse(b[0]); y0 = int.Parse(b[1]); x1 = x0 + int.Parse(b[2]) - 1; y1 = y0 + int.Parse(b[3]) - 1; } // manual camera box x,y,w,h
    int bw=x1-x0+1, bh=y1-y0+1;
    // box around the camera + margin, grown to 4:5, centred on the camera
    double ar=(double)OW/OH, cw=bw*(1+2*margin), ch=bh*(1+2*margin);
    if (cw/ch > ar) ch=cw/ar; else cw=ch*ar;
    double mx2=x0+bw/2.0, my2=y0+bh/2.0;
    var outBmp=new Bitmap(OW,OH);
    double s=OW/cw; // source px -> output px
    float destX=(float)(OW/2.0-(mx2)*s), destY=(float)(OH/2.0-(my2)*s);
    using (var g=Graphics.FromImage(outBmp)) {
      g.Clear(Color.White); g.InterpolationMode=InterpolationMode.HighQualityBicubic; g.PixelOffsetMode=PixelOffsetMode.HighQuality;
      g.DrawImage(bmp,new RectangleF(destX,destY,(float)(W*s),(float)(H*s)));
    }
    // fade the photo's own edges into the white canvas so its rectangle never shows (only edges that fall inside the card)
    { double fx0=destX, fy0=destY, fx1=destX+W*s, fy1=destY+H*s, feather=OW*featherK;
      var od=outBmp.LockBits(new Rectangle(0,0,OW,OH),ImageLockMode.ReadWrite,PixelFormat.Format24bppRgb); int ost=od.Stride; byte[] op=new byte[ost*OH]; Marshal.Copy(od.Scan0,op,0,op.Length);
      for(int y=0;y<OH;y++) for(int x=0;x<OW;x++){
        double d2=1e9; if (fx0>0.5) d2=Math.Min(d2,x-fx0); if (fx1<OW-0.5) d2=Math.Min(d2,fx1-x); if (fy0>0.5) d2=Math.Min(d2,y-fy0); if (fy1<OH-0.5) d2=Math.Min(d2,fy1-y);
        if (d2>=feather) continue; double a=d2<=0?1:1-d2/feather; a=a*a*(3-2*a);
        int i=y*ost+x*3; int pB=op[i],pG=op[i+1],pR=op[i+2]; double pl=0.299*pR+0.587*pG+0.114*pB; int psat=Math.Max(pR,Math.Max(pG,pB))-Math.Min(pR,Math.Min(pG,pB));
        double bgLike=Sm(150,215,pl)*(1-Sm(18,40,psat)); a*=bgLike; // only the light, neutral background fades; the camera keeps its tones
        for(int c=0;c<3;c++) op[i+c]=(byte)(op[i+c]+(255-op[i+c])*a); }
      Marshal.Copy(op,0,od.Scan0,op.Length); outBmp.UnlockBits(od); }
    var enc=Array.Find(ImageCodecInfo.GetImageEncoders(),c=>c.MimeType=="image/jpeg"); var ep=new EncoderParameters(1); ep.Param[0]=new EncoderParameter(System.Drawing.Imaging.Encoder.Quality,86L);
    outBmp.Save(dst,enc,ep); outBmp.Dispose(); bmp.Dispose();
    return string.Format("bbox {0},{1} {2}x{3} of {4}x{5}", x0,y0,bw,bh,W,H);
  }
}
'@
[CardCrop]::Run((Resolve-Path $In).Path, [IO.Path]::GetFullPath($Out), $Margin, $W, $H, $Angle, $ColT, $RowT, $Box, $Feather, $Clean)
