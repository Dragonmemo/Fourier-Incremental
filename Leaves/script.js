// client-side js, loaded by index.html
// run by the browser each time the page is loaded

function myFunction1() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0, 500, 500);
  /*	ctx.beginPath()
  ctx.strokeStyle="#ccaa11";
  ctx.moveTo(0, 250);
  ctx.lineTo(500, 250);
  ctx.moveTo(0, 251);
  ctx.lineTo(500, 251);
  ctx.moveTo(0, 252);
  ctx.lineTo(500, 252);
  ctx.closePath()
  ctx.stroke(); */
}
function popXeEl(Liste,Nombre){
	var LTemp=[];
	for (i=0;i<Nombre;i++){LTemp.push(Liste.shift())}
	var X=Liste.shift();
	return [X,LTemp.concat(Liste)]
}

function arrayEquals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function suite(d,v){
	var liste;
    if (arrayEquals(v,[0,1])){liste=[[1,1],[0,1],[0,1],[-1,1]]}
    if (arrayEquals(v,[1,1])){liste=[[0,1],[1,1],[1,1],[1,0]]}
    if (arrayEquals(v,[1,0])){liste=[[1,-1],[1,0],[1,0],[1,1]]}
    if (arrayEquals(v,[1,-1])){liste=[[0,-1],[1,-1],[1,-1],[1,0]]}
	if (arrayEquals(v,[0,-1])){liste=[[1,-1],[0,-1],[0,-1],[-1,-1]]}
    if (arrayEquals(v,[-1,-1])){liste=[[0,-1],[-1,-1],[-1,-1],[-1,0]]}
    if (arrayEquals(v,[-1,0])){liste=[[-1,-1],[-1,0],[-1,0],[-1,1]]}
    if (arrayEquals(v,[-1,1])){liste=[[0,1],[-1,1],[-1,1],[-1,0]]}
    var N=[];
    for (k=0;k<3;k++){
        if (Math.random()>1-1/(1.01**k)){
            var x=popXeEl(liste,Math.floor(Math.random()*(liste.length)))
			liste=x[1];
			x=x[0];
            N.unshift(x)
            var j=-1
            for (i=0;i<liste.length;i++){
                j++
                if (arrayEquals(liste[j],x)){
                    liste=popXeEl(liste,j)[1]
                    j=j-1
				}
			}
            if (k!=2){
				N[0]=[N[0][0]+d[0],N[0][1]+d[1],[d[2][0],d[2][1],d[2][2],255]]
			}
            else {
                N[0]=[N[0][0]+d[0],N[0][1]+d[1],[d[2][0]+math.floor(Math.random()*3)-1,d[2][1]+math.floor(Math.random()*3)-1,d[2][2]+math.floor(Math.random()*3)-1]]
				N[0]=[N[0][0],N[0][1],[N[0][2][0],N[0][2][1],N[0][2][2],255]]
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

function dessineMoiUneFeuille(){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var nouveau_bourgeons;
	ctx.clearRect(0,0, 500, 500);
	var imageData = ctx.createImageData(500, 500); //=pixels
    x=[500,500]//x=MAGIE.size ici on connait x
    var bourgeon=[[[parseInt(x[0]/2),parseInt(x[1]/2)],[parseInt(x[0]/2),parseInt(x[1]/2)+1,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256),255]]]]
    while (bourgeon.length!=0){
        //console.log(bourgeon)
		Actif=bourgeon.pop()
        //console.log(Actif)
		if (imageData.data[4*(Actif[1][0]*500+Actif[1][1])+3]!=255){
            var depart=Actif[1];
			var vecteur= [Actif[1][0]-Actif[0][0], Actif[1][1]-Actif[0][1]]
            nouveau_bourgeons=suite(depart,vecteur)
            imageData.data[4*(Actif[1][0]*500+Actif[1][1])]=Actif[1][2][0]
            imageData.data[4*(Actif[1][0]*500+Actif[1][1])+1]=Actif[1][2][1]
            imageData.data[4*(Actif[1][0]*500+Actif[1][1])+2]=Actif[1][2][2]
            imageData.data[4*(Actif[1][0]*500+Actif[1][1])+3]=255
            for (i=0;i<nouveau_bourgeons.length;i++){
				if (nouveau_bourgeons[i][0]!=-1 && nouveau_bourgeons[i][1]!=-1 && nouveau_bourgeons[i][0]!=x[0] && nouveau_bourgeons[i][1]!=x[1] && imageData.data[4*(nouveau_bourgeons[i][0]*500+nouveau_bourgeons[i][1])+3]!=255){
					bourgeon.push([Actif[1],nouveau_bourgeons[i]])
				}
			}
		}
	}
	imageData=blur(imageData,2,1)
    ctx.putImageData(imageData,0,0)
}

  /*ctx.lineTo(500, 250);
  ctx.stroke();
  ctx.strokeStyle="#BBBBBB";
  ctx.beginPath();
  if (LCoords.length<qual){
	  if (LCoords.length>0) {ctx.moveTo(LCoords[0][0]/MAX*250+250,LCoords[0][1]/MAX*250+250);}
	  for (i=0;i<LCoords.length;i++){
		  ctx.lineTo(LCoords[i][0]/MAX*250+250,LCoords[i][1]/MAX*250+250);
	      ctx.stroke();
  }}
	  
  else{
	  ctx.moveTo(LCoords[0][0]/MAX*250+250,LCoords[0][1]/MAX*250+250);
	  for (i=0;i<LCoords.length;i++){
		  ctx.lineTo(LCoords[i][0]/MAX*250+250,LCoords[i][1]/MAX*250+250);
	      ctx.stroke();
	  }
	  LCoords.shift();
  }
  ctx.closePath();
  if (tickspeed>33){x=x.plus(DPSCALC);}
  else {x=x.plus(DPSCALC.mul(33/tickspeed));}
  ctx.beginPath();
  ctx.strokeStyle="#000000";
  document.getElementById("MCur").innerHTML = "Drawing points (DP) : "+x.toPrecision(4);
  document.getElementById("DPS").innerHTML = Decimal.mul(DPSCALC,1000/tickspeed).toPrecision(4);
  if (Achieves[62]!=0){document.getElementById("PCur").innerHTML = "Negative points (NP) : "+y.toPrecision(4);}
  FourierCalculation(MAX);
  MAX=Math.max(MAX,Math.abs(coords[0]),Math.abs(coords[1]));
  LCoords.push(coords);
};

function FourierCalculation(MAX) {
  var TempVar=math.complex({r:Zero,phi:I*parseInt(document.getElementById("Phi0").value)/100});
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.moveTo(coords[0]/MAX*250+250,coords[1]/MAX*250+250);
  ARROWSOFHELL=[[TempVar.re,TempVar.im]]
  for (i=0; i<10;i++){
    TempVar=math.add(TempVar,math.multiply(math.complex({r: 1, phi:R*(i+1)*I/qual+I*parseInt(document.getElementById("Phi"+(i+1)).value)/100}),positives[i]));
	ARROWSOFHELL[1+2*i]=[TempVar.re,TempVar.im]
	TempVar=math.add(TempVar,math.multiply(math.complex({r: 1, phi:-R*(i+1)*I/qual+I*parseInt(document.getElementById("PhiM"+(i+1)).value)/100}),negatives[i]));
    ARROWSOFHELL[2+2*i]=[TempVar.re,TempVar.im]
  };
  R=R%qual + 1;
  coords=[TempVar.re,TempVar.im];
  ctx.lineTo(coords[0]/MAX*250+250,coords[1]/MAX*250+250);
  ctx.stroke();
  if (document.getElementById("Arrows").checked == true){
	  ctx.strokeStyle="#009900";
	  ctx.moveTo(250,250);
	  for (i=0;i<ARROWSOFHELL.length;i++){
		  ctx.lineTo(ARROWSOFHELL[i][0]/MAX*250+250,ARROWSOFHELL[i][1]/MAX*250+250);
			ctx.stroke();
	}}
};*/

var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, 33);

function loop() { // production
	//myFunction1();
}
