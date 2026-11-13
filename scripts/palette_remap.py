"""Remap colours onto the user's palette: pink #EB918E, orange #DF6E4B, blue #4666BA, gray #7A7A7A, black."""
import numpy as np, re, sys
# source hue -> target hue, saturation cap, lightness pull, lightness target
CP = np.array([
 [0,   14, .70, .25, .58],
 [28,  14, .70, .25, .58],
 [40,   6, .70, .55, .74],
 [52,   2, .68, .80, .76],
 [70,   2, .25, .30, .70],
 [88,   0, .00, .00, .50],
 [165,  0, .00, .00, .50],
 [185,224, .30, .00, .50],
 [198,224, .48, .35, .50],
 [252,224, .48, .35, .50],
 [272,  2, .08, .00, .50],
 [314,  2, .60, .50, .74],
 [335,  8, .70, .25, .65],
 [360, 14, .70, .25, .58]], float)
def rgb2hls(rgb):
    r,g,b = rgb[...,0],rgb[...,1],rgb[...,2]
    mx=rgb.max(-1); mn=rgb.min(-1); l=(mx+mn)/2; d=mx-mn
    s=np.where(d==0,0,d/np.where(l<.5,mx+mn,2-mx-mn+1e-9)+0)
    dd=np.where(d==0,1,d)
    h=np.where(mx==r,((g-b)/dd)%6,np.where(mx==g,(b-r)/dd+2,(r-g)/dd+4))*60
    return np.where(d==0,0,h),l,np.clip(s,0,1)
def hls2rgb(h,l,s):
    c=(1-np.abs(2*l-1))*s; hp=(h%360)/60; x=c*(1-np.abs(hp%2-1)); m=l-c/2
    z=np.zeros_like(h); i=np.floor(hp).astype(int)%6
    r=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[c,x,z,z,x,c])
    g=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[x,c,c,x,z,z])
    b=np.select([i==0,i==1,i==2,i==3,i==4,i==5],[z,z,x,c,c,x])
    return np.stack([r+m,g+m,b+m],-1)
def smooth(x,a,b): t=np.clip((x-a)/(b-a),0,1); return t*t*(3-2*t)
def remap(rgb):
    h,l,s=rgb2hls(rgb)
    I=lambda k: np.interp(h,CP[:,0],CP[:,k])
    th,cap,pull,lt=I(1),I(2),I(3),I(4)
    warm=(th<=14.01)
    th=np.where(warm, th+(2-th)*smooth(l,.62,.74), th)   # light reds read as pink
    s2=np.minimum(s,cap)
    w=pull*smooth(l,.22,.4)*(1-smooth(l,.82,.9))         # only mid tones move toward the swatch lightness
    l2=l+(lt-l)*w
    dark=smooth(l,.06,.26); s2=s2*dark                     # deep inks become black
    out=hls2rgb(th,l2,s2)
    gray=1-smooth(s,.04,.12)
    skin=smooth(h,8,16)*(1-smooth(h,38,44))*smooth(l,.56,.66)*(1-smooth(l,.86,.9))*smooth(s,.8,.9)
    keep=np.maximum(gray,skin)[...,None]
    return np.clip(keep*rgb+(1-keep)*out,0,1)
def hexmap(m):
    t=m.group(0); hx=t[1:]
    if len(hx) in (3,4): hx=''.join(c*2 for c in hx)
    rgb=np.array([[int(hx[i:i+2],16)/255 for i in (0,2,4)]])
    o=remap(rgb)[0]; new='#'+''.join(f'{round(v*255):02x}' for v in o)
    return new+(hx[6:8] if len(hx)==8 else '')
HEX=re.compile(r'#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b')
def text_file(p):
    s=open(p).read(); s2=HEX.sub(hexmap,s)
    # rgb()/rgba() literals
    def rgbf(m):
        v=[float(x) for x in m.group(2).split(',')[:3]]; o=remap(np.array([[x/255 for x in v]]))[0]
        rest=m.group(2).split(',')[3:]
        return f"{m.group(1)}({','.join(str(round(x*255)) for x in o)}{(','+','.join(rest)) if rest else ''})"
    s2=re.sub(r'(rgba?)\(([\d.\s]+,[\d.\s]+,[\d.\s]+(?:,[\d.\s%]+)?)\)',rgbf,s2)
    open(p,'w').write(s2)
def png(p):
    from PIL import Image
    im=Image.open(p).convert('RGBA'); a=np.asarray(im).astype(float)/255
    out=a.copy(); out[...,:3]=remap(a[...,:3])
    Image.fromarray((out*255+.5).astype('uint8'),'RGBA').save(p,optimize=True)
if __name__=='__main__':
    for p in sys.argv[1:]:
        (png if p.endswith('.png') else text_file)(p); print('remapped',p)
