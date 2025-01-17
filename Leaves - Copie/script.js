// client-side js, loaded by index.html
// run by the browser each time the page is loaded

function myFunction1() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0, 500, 500);
}

function arrayEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function suite(d,v){
	var liste;
	if (v<-x[0]*2){
		console.log(v);
		console.log(d)
	}
    switch (v) {
		case 1 :
			liste=[x[1]+1,1,1,-x[1]+1];
			break;
		case x[1]+1 :
			liste=[1,x[1]+1,x[1]+1,x[1]];
			break;
		case x[1] :
			liste=[x[1]-1,x[1],x[1],x[1]+1];
			break;
		case x[1]-1 :
			liste=[-1,x[1]-1,x[1]-1,x[1]];
			break;
		case -1 :
			liste=[x[1]-1,-1,-1,-x[1]-1];
			break;
		case -x[1]-1 :
			liste=[-1,v,v,-x[1]];
			break;
		case -x[1] :
			liste=[-x[1]-1,v,v,-x[1]+1];
			break;
		case -x[1]+1 :
			liste=[1,v,v,-x[1]];
			break;
	}
    var N=[];
    for (k=0;k<3;k++){
        if (Math.random()>1-1/(1.01**k)){
            var elt = liste.splice(Math.floor(Math.random()*(liste.length)),1)[0]
			N.unshift(elt)
            var j=-1
            for (i=0;i<liste.length;i++){
                j++
                if (arrayEquals(liste[j],elt)){
                    liste.splice(j,1)
					j=j-1
				}
			}
            if (k!=2){
				//N[0]=[N[0]+d[0],[d[1][0],d[1][1],d[1][2]]]
				N[0]=N[0]+d
			}
            else {
                //N[0]=[N[0]+d[0],[d[1][0]+math.floor(Math.random()*3)-1,d[1][1]+math.floor(Math.random()*3)-1,d[1][2]+math.floor(Math.random()*3)-1]]
				N[0]=N[0]+d+256**2*10*x[0]*x[1]*(math.floor(Math.random()*3)-1)+256*10*x[0]*x[1]*(math.floor(Math.random()*3)-1)+10*x[0]*x[1]*(math.floor(Math.random()*3)-1)
			}
	}}
	return N
}

function blur(imageData, radius, quality) {
    var pixels = imageData.data;
    var width = imageData.width;
    var height = imageData.height;

    var rsum, gsum, bsum, asum, x, y, i, p, p1, p2, yp, yi, yw;
    var wm = width - 1;
    var hm = height - 1;
    var rad1x = radius + 1;
    var divx = radius + rad1x;
    var rad1y = radius + 1;
    var divy = radius + rad1y;
    var div2 = 1 / (divx * divy);

    var r = [];
    var g = [];
    var b = [];
    var a = [];

    var vmin = [];
    var vmax = [];

    while (quality-- > 0) {
        yw = yi = 0;

        for (y = 0; y < height; y++) {
            rsum = pixels[yw] * rad1x;
            gsum = pixels[yw + 1] * rad1x;
            bsum = pixels[yw + 2] * rad1x;
            asum = pixels[yw + 3] * rad1x;


            for (i = 1; i <= radius; i++) {
                p = yw + (((i > wm ? wm : i)) << 2);
                rsum += pixels[p++];
                gsum += pixels[p++];
                bsum += pixels[p++];
                asum += pixels[p]
            }

            for (x = 0; x < width; x++) {
                r[yi] = rsum;
                g[yi] = gsum;
                b[yi] = bsum;
                a[yi] = asum;

                if (y == 0) {
                    vmin[x] = Math.min(x + rad1x, wm) << 2;
                    vmax[x] = Math.max(x - radius, 0) << 2;
                }

                p1 = yw + vmin[x];
                p2 = yw + vmax[x];

                rsum += pixels[p1++] - pixels[p2++];
                gsum += pixels[p1++] - pixels[p2++];
                bsum += pixels[p1++] - pixels[p2++];
                asum += pixels[p1] - pixels[p2];

                yi++;
            }
            yw += (width << 2);
        }

        for (x = 0; x < width; x++) {
            yp = x;
            rsum = r[yp] * rad1y;
            gsum = g[yp] * rad1y;
            bsum = b[yp] * rad1y;
            asum = a[yp] * rad1y;

            for (i = 1; i <= radius; i++) {
                yp += (i > hm ? 0 : width);
                rsum += r[yp];
                gsum += g[yp];
                bsum += b[yp];
                asum += a[yp];
            }

            yi = x << 2;
            for (y = 0; y < height; y++) {
                pixels[yi] = (rsum * div2 + 0.5) | 0;
                pixels[yi + 1] = (gsum * div2 + 0.5) | 0;
                pixels[yi + 2] = (bsum * div2 + 0.5) | 0;
                pixels[yi + 3] = (asum * div2 + 0.5) | 0;

                if (x == 0) {
                    vmin[y] = Math.min(y + rad1y, hm) * width;
                    vmax[y] = Math.max(y - radius, 0) * width;
                }

                p1 = x + vmin[y];
                p2 = x + vmax[y];

                rsum += r[p1] - r[p2];
                gsum += g[p1] - g[p2];
                bsum += b[p1] - b[p2];
                asum += a[p1] - a[p2];

                yi += width << 2;
            }
        }
    }
    return imageData;
}

var x=[500,500]//x=MAGIE.size ici on connait x
    
function dessineMoiUneFeuille(){
	var T0 = Date.now()
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var nouveau_bourgeons;
	ctx.clearRect(0,0, 500, 500);
	var imageData = ctx.createImageData(500, 500); //=pixels
    var bourgeon=[[[parseInt(x[1]*x[0]/2+x[1]/2)],
		[parseInt(x[1]*x[0]/2+x[1]/2+1)+
		256**2*10*x[0]*x[1]*parseInt(Math.random()*256)+256*10*x[0]*x[1]*parseInt(Math.random()*256)+10*x[0]*x[1]*parseInt(Math.random()*256)]]]
    while (bourgeon.length!=0){
        //console.log(bourgeon)
		var Actif=bourgeon.pop()
        //console.log(Actif)
		if (imageData.data[4*Actif[1]+3]!=255 && Actif[1]%(x[0]*x[1])-Actif[0]>-x[0]*2){ //Comprendre ce bug qui me fait créer une 2e condition
            var depart=Actif[1]%(x[0]*x[1]);
			var vecteur= Actif[1]%(x[0]*x[1])-Actif[0]
			
            nouveau_bourgeons=suite(depart,vecteur)
			//console.log(nouveau_bourgeons)
			//console.log([nouveau_bourgeons[i][0]-(depart[0]-depart[0]%x[1]),nouveau_bourgeons[i][0]-(depart[0]-depart[0]%x[1])+x[1],nouveau_bourgeons[i][0]-(depart[0]-depart[0]%x[1])-x[1]])
            if(Math.floor(Actif[1]/(10*x[0]*x[1]*256))>255){
				console.log(Math.floor(Actif[1]/(10*x[0]*x[1]*256)))
			}
			//imageData.data[4*(Actif[1]%(x[0]*x[1]))]=Math.floor(Actif[1]/(10*x[0]*x[1]))%256
            //imageData.data[4*(Actif[1]%(x[0]*x[1]))+1]=Math.floor(Actif[1]/(10*x[0]*x[1]*256))%(256)
            imageData.data[4*(Actif[1]%(x[0]*x[1]))+2]=Math.floor(Actif[1]/(10*x[0]*x[1]*256))
            imageData.data[4*(Actif[1]%(x[0]*x[1]))+3]=255
            for (i=0;i<nouveau_bourgeons.length;i++){
				if (nouveau_bourgeons[i]%(5*x[0]*x[1])>=0 && 
				nouveau_bourgeons[i]%(5*x[0]*x[1])<=x[0]*x[1] && 
				![(nouveau_bourgeons[i]%(5*x[0]*x[1]))-(depart[0]-depart[0]%x[1]),
				  (nouveau_bourgeons[i]+x[1])%(5*x[0]*x[1])-(depart[0]-depart[0]%x[1]),
				  (nouveau_bourgeons[i]-x[1])%(5*x[0]*x[1])-(depart[0]-depart[0]%x[1])].includes(x[1]) && 
				![(nouveau_bourgeons[i]%(5*x[0]*x[1]))-(depart[0]-depart[0]%x[1]),
				  (nouveau_bourgeons[i]+x[1])%(5*x[0]*x[1])-(depart[0]-depart[0]%x[1]),
				  (nouveau_bourgeons[i]-x[1])%(5*x[0]*x[1])-(depart[0]-depart[0]%x[1])].includes(-1) && 
				
				imageData.data[4*(nouveau_bourgeons[i]%(256**2*10*x[0]*x[1]))+3]!=255){
					bourgeon.push([Actif[1]%(x[0]*x[1]),nouveau_bourgeons[i]])
				}
			}
		}
	}
	//imageData=blur(imageData,2,1)
    ctx.putImageData(imageData,0,0)
	console.log (Date.now()-T0)
}

function SaveLeaves(){
        var canvas = document.getElementById("myCanvas");
	var LINK=document.getElementById("DFWMB")
	LINK.download = 'Leaves'+x[0]+'x'+x[1]+'.png';
	LINK.href = canvas.toDataURL("image/jpg");
	LINK.click();
}