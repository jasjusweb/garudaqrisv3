// Core QRIS functions
if(typeof QRCode==='undefined'){
    let s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
    document.head.appendChild(s);
}

function isMobileDevice(){
    return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function parseQrisMerchantName(q){
    const t='59';
    const i=q.indexOf(t);
    if(i===-1)return null;
    const l=i+t.length;
    const n=q.substring(l,l+2);
    const a=parseInt(n,10);
    if(isNaN(a))return null;
    const s=l+2;
    return q.substring(s,s+a);
}

function generateQrisPayload(o,a){
    function c(d){
        let c=0xFFFF;
        for(let b=0;b<d.length;b++){
            c^=d.charCodeAt(b)<<8;
            for(let e=0;e<8;e++)c=(c&0x8000)?(c<<1)^0x1021:c<<1;
        }
        return('0000'+(c&0xFFFF).toString(16).toUpperCase()).slice(-4);
    }
    const t='5802ID';
    const i=o.indexOf(t);
    if(i===-1)throw new Error("Format qrisString tidak valid.");
    const p=o.substring(0,i);
    const s=o.substring(i);
    const m=a.toString();
    const l=m.length.toString().padStart(2,'0');
    const n=`54${l}${m}`;
    const r=`${p}${n}${s}6304`;
    const u=c(r);
    return `${p}${n}${s}6304${u}`;
}

function compressImage(file,maxSizeInMB=1){
    return new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(event)=>{
            const img=new Image();
            img.src=event.target.result;
            img.onload=()=>{
                const canvas=document.createElement('canvas');
                const ctx=canvas.getContext('2d');
                const MAX_WIDTH=1920;
                const MAX_HEIGHT=1080;
                let width=img.width;
                let height=img.height;
                if(width>height){
                    if(width>MAX_WIDTH){
                        height*=MAX_WIDTH/width;
                        width=MAX_WIDTH;
                    }
                }else{
                    if(height>MAX_HEIGHT){
                        width*=MAX_HEIGHT/height;
                        height=MAX_HEIGHT;
                    }
                }
                canvas.width=width;
                canvas.height=height;
                ctx.drawImage(img,0,0,width,height);
                canvas.toBlob((blob)=>{
                    if(blob.size<file.size){
                        resolve(blob);
                    }else{
                        resolve(file);
                    }
                },'image/jpeg',0.7);
            };
            img.onerror=(error)=>reject(error);
        };
        reader.onerror=(error)=>reject(error);
    });
}