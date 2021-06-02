// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var canvasB = document.getElementById("myCanvas1");
var canvasL = document.getElementById("myCanvas2");
var ctx = canvas.getContext("2d");
var ctxB = canvasB.getContext("2d");
var ctxL = canvasL.getContext("2d");
var nouveau_bourgeons;
var imageData = ctx.createImageData(16, 16); //=pixels
var x=[16,16]//x=MAGIE.size ici on connait x
var bourgeon=[[[parseInt(x[0]/2),parseInt(x[1]/2)],[parseInt(x[0]/2),parseInt(x[1]/2)+1,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
var tickspeed=1000
var t=1;
var buds=0
var twigs=0
var leaves=0
var bolts=0
var stade=0
var BoltsUp=[0,0,0,0]

function myFunction1() {
	DrawIt(t*(bolts+1));
	document.getElementById("TITLE").innerHTML=buds+" bud(s), "+twigs+" twig(s), "+leaves+" leaf(ves)"
}

function DrawIt(g){
	document.getElementById("NL").disabled = true;
	for (var f=0;f<g;f++){
		if (bourgeon.length!=0){
			Actif=bourgeon.pop()
			if (imageData.data[4*(Actif[1][0]*x[0]+Actif[1][1])+3]!=255){
				var depart=Actif[1];
				var vecteur= [Actif[1][0]-Actif[0][0], Actif[1][1]-Actif[0][1]]
				nouveau_bourgeons=suite(depart,vecteur)
				imageData.data[4*(Actif[1][0]*x[0]+Actif[1][1])]=Actif[1][2][0]
				imageData.data[4*(Actif[1][0]*x[0]+Actif[1][1])+1]=Actif[1][2][1]
				imageData.data[4*(Actif[1][0]*x[0]+Actif[1][1])+2]=Actif[1][2][2]
				imageData.data[4*(Actif[1][0]*x[0]+Actif[1][1])+3]=255
				for (i=0;i<nouveau_bourgeons.length;i++){
					if (nouveau_bourgeons[i][0]!=-1 && nouveau_bourgeons[i][1]!=-1 && nouveau_bourgeons[i][0]!=x[0] && nouveau_bourgeons[i][1]!=x[1] && imageData.data[4*(nouveau_bourgeons[i][0]*x[0]+nouveau_bourgeons[i][1])+3]!=255){
						bourgeon.push([Actif[1],nouveau_bourgeons[i]])
					}
				}
				twigs=twigs+parseInt(Math.sqrt(x[0]*x[1])/16)
			}
			else{
				buds=buds+parseInt(Math.sqrt(x[0]*x[1])/16)
			}
			//imageData=blur(imageData,2,1)
			ctx.putImageData(imageData,0,0)
		}
		else{
			document.getElementById("NL").disabled = false;
		}
	}
	if (stade==0 && twigs>=10000){
		stade++
		document.getElementById("PresBud").removeAttribute("hidden")
	}
	if (stade>1){
		document.getElementById("PresBud").innerHTML="Call the thunder and<br>Get "+parseInt((Math.log10(twigs)-3)*(Math.log10(buds+1)**BoltsUp[1]+1)*(Math.log10(leaves+1)**BoltsUp[2]+1))+" bolts"
	}
}

function drawBolts(){
	ctxB.clearRect(0,0, 512, 512);
	var imageDataB = ctxB.createImageData(512, 512);
    var Point=[255,255]
    var col=[parseInt(256*Math.random()),parseInt(256*Math.random()),parseInt(256*Math.random())]
    for (var m=0;m<bolts;m++){
        for (var n=0;n<255;n++){
            imageDataB.data[4*(512*Point[0]+Point[1])]++
            var L=[[Point[0]-1,Point[1]],[Point[0]+1,Point[1]],[Point[0],Point[1]-1],[Point[0],Point[1]+1],[Point[0]+1,Point[1]+1],[Point[0]-1,Point[1]+1],[Point[0]+1,Point[1]-1],[Point[0]-1,Point[1]-1]]
            var Lprime=[]
            for (var mu=0;mu<8;mu++){
                if (Math.sqrt((L[mu][0]-255)**2+(L[mu][1]-255)**2)>Math.sqrt((Point[0]-255)**2+(Point[1]-255)**2)-0.45)
                    Lprime.push(L[mu])
			}
            Point=popXeEl(Lprime,Math.floor(Math.random()*Lprime.length))[0]
        }
		Point=[255,255]
	}
    for (var m=0;m<512*512;m++){
		imageDataB.data[4*m+1]=parseInt((1-0.9**imageDataB.data[4*m])*col[1])
        imageDataB.data[4*m+2]=parseInt((1-0.9**imageDataB.data[4*m])*col[2])
		imageDataB.data[4*m]=parseInt((1-0.9**imageDataB.data[4*m])*col[0])
        imageDataB.data[4*m+3]=255
	}    
    ctxB.putImageData(imageDataB,0,0)
}


function budUp(){
	if (buds>=parseInt(2**((1040-tickspeed)/10))){
		buds=buds-parseInt(2**((1040-tickspeed)/10))
		tickspeed=tickspeed-10
		document.getElementById("BCost").innerHTML=parseInt(2**((1040-tickspeed)/10))
	} 
	if (tickspeed<40){
		document.getElementById("BCost").innerHTML="MAXED"
		document.getElementById("BU").disabled=true
	}
}

function twigUp(){
	if (twigs>=parseInt(2**(t+3))){
		twigs=twigs-parseInt(2**(t+3))
		t++
		document.getElementById("TCost").innerHTML=parseInt(2**(t+3))
	} 
}

function TSUp(){
	if (bolts>=5*10**BoltsUp[0]){
		bolts=bolts-5*10**BoltsUp[0]
		BoltsUp[0]++
		document.getElementById("TSUp").innerHTML=5*10**BoltsUp[0]
	} 
	if (BoltsUp[0]==2){
		document.getElementById("TSUp").innerHTML="MAXED"
		document.getElementById("BoltUp1").disabled=true
	}
}
function BoltUp2(){
	if (bolts>=20){
		bolts=bolts-20
		BoltsUp[1]++
		document.getElementById("BoltUp2").disabled=true
	}
}
function BoltUp3(){
	if (bolts>=50){
		bolts=bolts-50
		BoltsUp[2]++
		document.getElementById("BoltUp3").disabled=true
	}
}
function BoltUp4(){
	if (bolts>=50){
		bolts=bolts-50
		BoltsUp[3]++
		document.getElementById("BoltUp4").disabled=true
	}
}

function newReset(){
	leaves=leaves+parseInt(Math.sqrt(x[0]*x[1])/16);
	ctx.clearRect(0,0, x[0], x[1]);
	imageData = ctx.createImageData(x[0], x[1]);
	bourgeon=[[[parseInt(x[0]/2),parseInt(x[1]/2)],[parseInt(x[0]/2),parseInt(x[1]/2)+1,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
}

function increaseSize(){
	if (leaves>=parseInt(2**(Math.log2(x[0]/8)-BoltsUp[3]))){
		leaves=leaves-parseInt(2**(Math.log2(x[0]/8)-BoltsUp[3]))
		x[0]*=2
		x[1]*=2
		ctx.clearRect(0,0, x[0], x[1]);
		imageData = ctx.createImageData(x[0], x[1]);
		bourgeon=[[[parseInt(x[0]/2),parseInt(x[1]/2)],[parseInt(x[0]/2),parseInt(x[1]/2)+1,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
		document.getElementById("LCost").innerHTML=parseInt(2**(Math.log2(x[0]/8)-BoltsUp[3]))
		canvas.width=x[0]
		canvas.height=x[1]
	}
}

function GetBolts(){
	if (twigs>10000){
		if (stade==1){
			stade++
			document.getElementById("BoltTab").removeAttribute("hidden")
			document.getElementById("BOLTS").removeAttribute("hidden")
		}
		bolts+=parseInt((Math.log10(twigs)-3)*Math.log10(buds+1)**BoltsUp[1]*Math.log10(leaves+1)**BoltsUp[2])
		drawBolts()
		imageData = ctx.createImageData(16, 16); //=pixels
		x=[16,16]//x=MAGIE.size ici on connait x
		bourgeon=[[[parseInt(x[0]/2),parseInt(x[1]/2)],[parseInt(x[0]/2),parseInt(x[1]/2)+1,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
		tickspeed=1000
		t=1;
		buds=0
		twigs=0
		leaves=0
		document.getElementById("TCost").innerHTML=parseInt(2**(t+3))
		document.getElementById("BCost").innerHTML=parseInt(2**((1040-tickspeed)/10))
		document.getElementById("BU").disabled=false
		document.getElementById("LCost").innerHTML=parseInt(2**Math.log2(x[0]/8))
		ctx.clearRect(0,0, x[0], x[1]);
		canvas.width=x[0]
		canvas.height=x[1]
	}
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
    if (v[0]==0){
		if (v[1]==1){liste=[[1,1],[0,1],[0,1],[-1,1]]}
		else {liste=[[1,-1],[0,-1],[0,-1],[-1,-1]]}
	}
    else{
		if (v[0]==1){
			if (v[1]==1){liste=[[0,1],[1,1],[1,1],[1,0]]}
			else{
				if (v[1]==0){liste=[[1,-1],[1,0],[1,0],[1,1]]}
				else {liste=[[0,-1],[1,-1],[1,-1],[1,0]]}
			}
		}
		else{
			if (v[1]==1){liste=[[0,1],[-1,1],[-1,1],[-1,0]]}
			else{
				if (v[1]==0){liste=[[-1,-1],[-1,0],[-1,0],[-1,1]]}
				else{liste=[[0,-1],[-1,-1],[-1,-1],[-1,0]]}
			}
		}
	}
    var N=[];
    for (k=0;k<3;k++){
        if (Math.random()>1-1/(1.01**k)){
            var x=liste.splice(Math.floor(Math.random()*(liste.length)),1)[0]
			N.unshift(x)
            var j=-1
            for (i=0;i<liste.length;i++){
                j++
                if (liste[j][0]==x[0] && liste[j][1]==x[1]){
                    liste.splice(j,1)
                    j=j-1
				}
			}
            if (k!=2){
				N[0]=[N[0][0]+d[0],N[0][1]+d[1],[d[2][0],d[2][1],d[2][2]]]
			}
            else {
                N[0]=[N[0][0]+d[0],N[0][1]+d[1],[d[2][0]+math.floor(Math.random()*3)-1,d[2][1]+math.floor(Math.random()*3)-1,d[2][2]+math.floor(Math.random()*3)-1]]
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
	ctx.clearRect(0,0, 500, 500);
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

var ticks=0;
var saveticks=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, 33);

function loop() { // production
	ticks+=33;
	saveticks+=33
	if (tickspeed-1000+1000/(2**BoltsUp[0])<ticks){
		myFunction1();
		ticks=ticks-tickspeed+1000-1000/(2**BoltsUp[0])
		document.getElementById("BOLTS").innerHTML=", "+bolts+" bolt(s)"
	}
	if (saveticks>10000){
		if (document.getElementById("Autosave").checked == true){save();}
		saveticks-=10000
	}
}

function save() { 
  localStorage.setItem('Buds',buds);
  localStorage.setItem("Twigs",twigs);
  localStorage.setItem("Leaves",leaves);
  localStorage.setItem("Size",x);
  localStorage.setItem("prod",t);
  localStorage.setItem("TS",tickspeed);
  localStorage.setItem("Bolts",bolts);
  localStorage.setItem("Stade",stade);
  localStorage.setItem("BoltsUp",BoltsUp);
} 

function HReset(){
	var BOOLEAN=confirm("Are you sure you want to Hard Reset?")
	if (BOOLEAN){
		imageData = ctx.createImageData(16, 16); //=pixels
		x=[16,16]//x=MAGIE.size ici on connait x
		bourgeon=[[[parseInt(x[0]/2),parseInt(x[1]/2)],[parseInt(x[0]/2),parseInt(x[1]/2)+1,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
		tickspeed=1000
		t=1;
		buds=0
		twigs=0
		leaves=0
		bolts=0
		stade=0
		BoltsUp=[0,0,0,0]
}}

function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el);
  document.body.removeChild(el);
  alert("Copied to clipboard");
}

function copyToClipboard(el) {
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    el.select();
  }
  document.execCommand("copy");
}
function Export(){
	copyStringToClipboard(btoa(JSON.stringify(localStorage)));
}
function Import(){
	let loadgame = "";
	loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE");
	if (loadgame !="" ) {
		loadgame=JSON.parse(atob(loadgame));
		buds=parseInt(loadgame.Buds);
		twigs=parseInt(loadgame.Twigs);
		x=loadgame.Size.split(",").map(Number);
		leaves=parseInt(loadgame.Leaves);
		t=parseInt(loadgame.prod);
		tickspeed=parseInt(loadgame.TS);
		bolts=parseInt(loadgame.Bolts);
		if (loadgame.BoltsUp){
			BoltsUp=loadgame.BoltsUp.split(",").map(Number);
			if (BoltsUp[0]==1){
				document.getElementById("TSUp").innerHTML=50
			}
			if (BoltsUp[0]==2){
				document.getElementById("TSUp").innerHTML="MAXED"
				document.getElementById("BoltUp1").disabled=true
			}
			if (BoltsUp[1]==1){
				document.getElementById("BoltUp2").disabled=true
			}
			if (BoltsUp[2]==1){
				document.getElementById("BoltUp3").disabled=true
			}
			if (BoltsUp[3]==1){
				document.getElementById("BoltUp4").disabled=true
			}
		}
		ctx.clearRect(0,0, x[0], x[1]);
		imageData = ctx.createImageData(x[0], x[1]);
		bourgeon=[[[parseInt(x[0]/2),parseInt(x[1]/2)],[parseInt(x[0]/2),parseInt(x[1]/2)+1,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
		document.getElementById("LCost").innerHTML=parseInt(2**Math.log2(x[0]/8))
		canvas.width=x[0]
		canvas.height=x[1]
		document.getElementById("TCost").innerHTML=parseInt(2**(t+3))
		document.getElementById("BCost").innerHTML=parseInt(2**((1040-tickspeed)/10))
		if (loadgame.Stade){stade=parseInt(loadgame.Stade)}
		if (stade>0){
			document.getElementById("PresBud").removeAttribute("hidden")
			if (stade>1){
				document.getElementById("BoltTab").removeAttribute("hidden")
				document.getElementById("BOLTS").removeAttribute("hidden")
				document.getElementById("PresBud").innerHTML="Call the thunder and<br>Get "+parseInt(Math.log10(twigs)-3)+" bolts"
				drawBolts()
			}
		}
	}
}

function SaveLeaves(){
	var LINK=document.getElementById("DFWMB")
	LINK.download = 'Leaves'+x[0]+'x'+x[1]+'.png';
	LINK.href = canvas.toDataURL("image/jpg");
	LINK.click();
}

function SaveBolts(){
	var LINK=document.getElementById("DFWMB2")
	LINK.download = 'Bolts'+x[0]+'x'+x[1]+'.png';
	LINK.href = canvasB.toDataURL("image/jpg");
	LINK.click();
}


if(localStorage.prod) {
	buds=parseInt(localStorage.Buds);
	twigs=parseInt(localStorage.Twigs);
	x=localStorage.Size.split(",").map(Number);
	leaves=parseInt(localStorage.Leaves);
	t=parseInt(localStorage.prod);
	tickspeed=parseInt(localStorage.TS);
	bolts=parseInt(localStorage.Bolts);
	ctx.clearRect(0,0, x[0], x[1]);
	imageData = ctx.createImageData(x[0], x[1]);
	bourgeon=[[[parseInt(x[0]/2),parseInt(x[1]/2)],[parseInt(x[0]/2),parseInt(x[1]/2)+1,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
	document.getElementById("LCost").innerHTML=parseInt(2**Math.log2(x[0]/8))
	canvas.width=x[0]
	canvas.height=x[1]
	document.getElementById("TCost").innerHTML=parseInt(2**(t+3))
	document.getElementById("BCost").innerHTML=parseInt(2**((1040-tickspeed)/10))
	if (localStorage.Stade){stade=parseInt(localStorage.Stade)}
	if (stade>0){
		document.getElementById("PresBud").removeAttribute("hidden")
		if (stade>1){
			document.getElementById("BoltTab").removeAttribute("hidden")
			document.getElementById("BOLTS").removeAttribute("hidden")
			document.getElementById("PresBud").innerHTML="Call the thunder and<br>Get "+parseInt(Math.log10(twigs)-3)+" bolts"
			drawBolts()
		}
	}
	if (localStorage.BoltsUp){
		BoltsUp=localStorage.BoltsUp.split(",").map(Number);
		if (BoltsUp[0]==1){
			document.getElementById("TSUp").innerHTML=50
		}
		if (BoltsUp[0]==2){
			document.getElementById("TSUp").innerHTML="MAXED"
			document.getElementById("BoltUp1").disabled=true
		}
		if (BoltsUp[1]==1){
			document.getElementById("BoltUp2").disabled=true
		}
		if (BoltsUp[2]==1){
			document.getElementById("BoltUp3").disabled=true
		}
		if (BoltsUp[3]==1){
			document.getElementById("BoltUp4").disabled=true
		}
	}
}