// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvasS = document.getElementById("myCanvas0");
var canvas = document.getElementById("myCanvas");
var canvasB = document.getElementById("myCanvas1");
var canvasComet = document.getElementById("myCanvas2");
var ctxS = canvasS.getContext("2d");
var ctx = canvas.getContext("2d");
var ctxB = canvasB.getContext("2d");
var ctxComet = canvasComet.getContext("2d");
var nouveau_bourgeons;
var imageData = ctx.createImageData(256, 256); //=pixels
var bourgeon=[[[128,128],[128,129,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
	
var tickspeed=1000
var tickspeed2=1000
var leaves=0
var LeavesUp=[0,0,0]
var bolts=0
var stade=0
var BoltsUp=[0,0,0,0]
var StarPoints=new Decimal(0)
var StarUp=[0,0,0,0]
var L=[]
var Movement=[]
var n
var LeafPower=0
var leavesMult=1

var Dusts = 0;
var CometUp=[0,0,0]
// 10% leaves par sec 10x | 10% Bolts par sec 10x | Upgrade Vitesse affecte gain

var Ice = 0;
var IceUp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// SLBCI - 50 - réduction du nerf
// SCI - 6 ; 1-4 achète chaque upgrade par tick ; 5 n'est plus reset ; 6 ne coute plus de StarPow
// LCI - 2 - ne reset plus les up plante PUIS génère des points auto basé sur les points gagnés sur l'image si complète
// BCI - 1 - Ne reset plus les up
// CI - 11 - Gagne 10% comet par pts, puis ne reset plus les up
// SLI - 100 - Boost le gain de LP de X% en fonc de la vitesse totale des étoiles
// BI - 1 - Si BCI 1 alors gagne le dernier niv d'étoiles
// SI - X - La quantité de glace +1 multiplie le gain en SP
// LI - X - La quantité de glace +1 multiplie le gain en LP


var StarRank=["#fff","#ff0","#0f0","#f00","#0ff"]

function StarReset(){
	var k;
	L=[]
	Movement=[]
	n=StarUp[0]+2;
	for (k=0;k<n;k++){
		var RANK=math.random();
		if (RANK<0.2 && BoltsUp[0]>=1){RANK=2}
		else { 
			if (RANK>0.2 && RANK<0.4 && BoltsUp[0]>=2){RANK=3}
			else {
				if (RANK>0.4 && RANK<0.6 && BoltsUp[0]>=3){RANK=4}
				else {
					RANK=1
			     	}
			}
		}
		L[k]=[math.floor(math.random()*513),math.floor(math.random()*513),RANK];
		Movement[k]=[math.random()*0.5*(1+StarUp[1])-0.25*(1+StarUp[1]),math.random()*0.5*(1+StarUp[1])-0.25*(1+StarUp[1])]
	}
	IMDATA=ctxComet.createImageData(512,512)
}

function NERF(DECI){
	if (DECI.exponent<11){
		return DECI
	}
	else{
		var DeciOpt=new Decimal(1e11)
		DECI=DECI.divide(1e11)
		DECI=DECI.pow((1/2))
		while (DECI.exponent>0)	{
			DeciOpt=DeciOpt.mul(10)
			DECI=DECI.divide(10)
			DECI=DECI.pow((1/2))
		}
		return DeciOpt.mul(DECI)
	}
}

function myFunction0() {
	ctxS.clearRect(0,0, 512, 512);
	ctxS.strokeStyle="#FFFFFF";
	var k;
	var lks= StarUp[2]+1
	for (k=0;k<n;k++){
		L[k]=[(L[k][0]+Movement[k][0]+512)%512,(L[k][1]+Movement[k][1]+512)%512,L[k][2]]
	}
	var LISTE =[];
	for (k=0;k<n;k++){
		var LL=[];
		var i;
		for (i=0;i<n;i++){
			LL[i]=[math.sqrt((L[i][0]-L[k][0])**2+(L[i][1]-L[k][1])**2),[k,i].sort(function(a,b){return a-b})]
		}
		LL.sort(function(a,b){return a[0]-b[0]})
		LL.shift()
		LISTE[k]=LL
	}
	//console.log(LISTE)
	//Ensemble de listes triés dans l'ordre croissant
	var BOOLER=true;
	var COMPTEUR=[];
	for (k=0;k<n;k++){COMPTEUR[k]=0}
	var Lignage=[];
	while (BOOLER){
	  BOOLER=false;
	  L_Liens_Tour=[]
	  for (k=0;k<n;k++){
		  if (LISTE[k].length!=0 && LISTE[LISTE[k][0][1][0]].length!=0 && LISTE[LISTE[k][0][1][1]].length!=0 && LISTE[k][0][0]==LISTE[LISTE[k][0][1][0]][0][0] && LISTE[k][0][0]==LISTE[LISTE[k][0][1][1]][0][0]){
			  L_Liens_Tour.push(LISTE[k][0][1])
			  BOOLER=true
		  }
	  }
	  //L_Liens a tout en double 
	  L_Liens_Tour.sort(function(a,b){return a[0]-b[0]})
	  for (k=0;k<L_Liens_Tour.length-1;k++){
		  if (L_Liens_Tour[k][0]==L_Liens_Tour[k+1][0]){
			  k--;
			  L_Liens_Tour.splice(k,1);
		  }
	  }
	  //console.log(LISTE)
		//console.log(L_Liens_Tour)
	  //Maintenant on remplit la liste pour le dessin et on ajoute au compteur en retirant les éléments :
	  for (var element of L_Liens_Tour){
		  Lignage.push(element);
		  COMPTEUR[element[0]]++;
		  COMPTEUR[element[1]]++;
		  LISTE[element[0]].shift();
		  LISTE[element[1]].shift();
	  }
	  //console.log(COMPTEUR)
	  //Enfin, check si le compteur dépasse un seuil :
	  for (k=0;k<n;k++){
		  if (COMPTEUR[k]>=lks){
			  while (LISTE[k].length!=0){
				  //console.log(LISTE[k][0])
				  var M1=LISTE[k][0][1][0]
				  var M2=LISTE[k][0][1][1]
				  var LGT=LISTE[k][0][0]
				  var LOST1=[]
				  for (i=0;i<LISTE[M1].length;i++){
					  LOST1[i]=LISTE[M1][i][0]
				  }
				  //console.log(LOST1)
				  //console.log(JSON.parse(JSON.stringify(LISTE[M1])))
				  var LOST2=[]
				  for (i=0;i<LISTE[M2].length;i++){
					  LOST2[i]=LISTE[M2][i][0]
				  }
				  //console.log(LOST2)
				  //console.log(JSON.parse(JSON.stringify(LISTE[M2])))
				  LISTE[M1].splice(LOST1.indexOf(LGT),1)
				  LISTE[M2].splice(LOST2.indexOf(LGT),1)
			  }
			  LISTE[k]=[]
		  }
	  }
  }
  //on dessine le fameux bordel :D
  var StarPointGain = new Decimal(0);
  if (LeavesUp[0]==0){
	  for (var element of Lignage){
		  var SGrad=ctxS.createLinearGradient(L[element[0]][0], L[element[0]][1], L[element[1]][0], L[element[1]][1]);
		  SGrad.addColorStop(0, StarRank[L[element[0]][2]-1]);
			SGrad.addColorStop(1, StarRank[L[element[1]][2]-1]);
			ctxS.strokeStyle = SGrad;
		  ctxS.beginPath()
		  ctxS.moveTo(L[element[0]][0], L[element[0]][1]);
		  ctxS.lineTo(L[element[1]][0], L[element[1]][1]);
		  ctxS.stroke(); 
		  StarPointGain=StarPointGain.plus((new Decimal((1+math.pow(LeafPower,1/2))*leavesMult*math.sqrt(bolts+1)*(Dusts+1))).pow(L[element[0]][2]*L[element[1]][2]*Math.log10(10+Math.sqrt(Movement[element[0]][0]**2+Movement[element[0]][1]**2)+Math.sqrt(Movement[element[1]][0]**2+Movement[element[1]][1]**2))**CometUp[2]))
	  }
  }
  if (LeavesUp[0]==1){
	  for (var element of Lignage){
		  var SGrad=ctxS.createLinearGradient(L[element[0]][0], L[element[0]][1], L[element[1]][0], L[element[1]][1]);
		  SGrad.addColorStop(0, StarRank[L[element[0]][2]-1]);
			SGrad.addColorStop(1, StarRank[L[element[1]][2]-1]);
			ctxS.strokeStyle = SGrad;
		  ctxS.beginPath()
		  ctxS.moveTo(L[element[0]][0], L[element[0]][1]);
		  ctxS.lineTo(L[element[1]][0], L[element[1]][1]);
		  ctxS.stroke();
			if (parseInt(1+math.log10((L[element[0]][0]-L[element[1]][0])**2+(L[element[0]][1]-L[element[1]][1])**2)/2) < 1){
				StarPointGain=StarPointGain.plus((new Decimal((1+math.pow(LeafPower,1/2))*leavesMult*math.sqrt(bolts+1)*(Dusts+1))).pow(L[element[0]][2]*L[element[1]][2]*Math.log10(10+Math.sqrt(Movement[element[0]][0]**2+Movement[element[0]][1]**2)+Math.sqrt(Movement[element[1]][0]**2+Movement[element[1]][1]**2))**CometUp[2]))
			}
		    else {StarPointGain=StarPointGain.plus((new Decimal((1+math.log10((L[element[0]][0]-L[element[1]][0])**2+(L[element[0]][1]-L[element[1]][1])**2)/2)*(1+math.pow(LeafPower,1/2))*leavesMult*math.sqrt(bolts+1)*(Dusts+1))).pow(L[element[0]][2]*L[element[1]][2]*Math.log10(10+Math.sqrt(Movement[element[0]][0]**2+Movement[element[0]][1]**2)+Math.sqrt(Movement[element[1]][0]**2+Movement[element[1]][1]**2))**CometUp[2]))}
	  }
  }
  if (LeavesUp[0]==2){
	  for (var element of Lignage){
		  var SGrad=ctxS.createLinearGradient(L[element[0]][0], L[element[0]][1], L[element[1]][0], L[element[1]][1]);
		  SGrad.addColorStop(0, StarRank[L[element[0]][2]-1]);
			SGrad.addColorStop(1, StarRank[L[element[1]][2]-1]);
			ctxS.strokeStyle = SGrad;
		  ctxS.beginPath()
		  ctxS.moveTo(L[element[0]][0], L[element[0]][1]);
		  ctxS.lineTo(L[element[1]][0], L[element[1]][1]);
		  ctxS.stroke(); 
		  if (parseInt(1+math.log2((L[element[0]][0]-L[element[1]][0])**2+(L[element[0]][1]-L[element[1]][1])**2)/2) < 1){
				StarPointGain=StarPointGain.plus((new Decimal((1+math.pow(LeafPower,1/2))*leavesMult*math.sqrt(bolts+1)*(Dusts+1))).pow(L[element[0]][2]*L[element[1]][2]*Math.log10(10+Math.sqrt(Movement[element[0]][0]**2+Movement[element[0]][1]**2)+Math.sqrt(Movement[element[1]][0]**2+Movement[element[1]][1]**2))**CometUp[2]))
			}
		    else {StarPointGain=StarPointGain.plus((new Decimal((1+math.log2((L[element[0]][0]-L[element[1]][0])**2+(L[element[0]][1]-L[element[1]][1])**2)/2)*(1+math.pow(LeafPower,1/2))*leavesMult*math.sqrt(bolts+1)*(Dusts+1))).pow(L[element[0]][2]*L[element[1]][2]*Math.log10(10+Math.sqrt(Movement[element[0]][0]**2+Movement[element[0]][1]**2)+Math.sqrt(Movement[element[1]][0]**2+Movement[element[1]][1]**2))**CometUp[2]))}
	  }
  }
	if (LeavesUp[0]>2){
		for (var element of Lignage){
			var SGrad=ctxS.createLinearGradient(L[element[0]][0], L[element[0]][1], L[element[1]][0], L[element[1]][1]);
			SGrad.addColorStop(0, StarRank[L[element[0]][2]-1]);
			SGrad.addColorStop(1, StarRank[L[element[1]][2]-1]);
			ctxS.strokeStyle = SGrad;
			ctxS.beginPath()
			ctxS.moveTo(L[element[0]][0], L[element[0]][1]);
			ctxS.lineTo(L[element[1]][0], L[element[1]][1]);
			ctxS.stroke(); 
			if (parseInt(((L[element[0]][0]-L[element[1]][0])**2+(L[element[0]][1]-L[element[1]][1])**2)**0.5) < 1){
				StarPointGain=StarPointGain.plus((new Decimal((1+math.pow(LeafPower,1/2))*leavesMult*math.sqrt(bolts+1)*(Dusts+1))).pow(L[element[0]][2]*L[element[1]][2]*Math.log10(10+Math.sqrt(Movement[element[0]][0]**2+Movement[element[0]][1]**2)+Math.sqrt(Movement[element[1]][0]**2+Movement[element[1]][1]**2))**CometUp[2]))
			}
			else {StarPointGain=StarPointGain.plus((new Decimal((((L[element[0]][0]-L[element[1]][0])**2+(L[element[0]][1]-L[element[1]][1])**2)**0.5)*(1+math.pow(LeafPower,1/2))*leavesMult*math.sqrt(bolts+1)*(Dusts+1))).pow(L[element[0]][2]*L[element[1]][2]*Math.log10(10+Math.sqrt(Movement[element[0]][0]**2+Movement[element[0]][1]**2)+Math.sqrt(Movement[element[1]][0]**2+Movement[element[1]][1]**2))**CometUp[2]))}
		}
	}
	StarPoints=StarPoints.plus(NERF(StarPointGain))
	document.getElementById("STARRED").innerHTML=StarPoints.toPrecision(4)+" Star Points"
	document.getElementById("SGAIN").innerHTML=NERF(StarPointGain).toPrecision(4)
	if (stade==0 && StarPoints>=1000){
		stade++
		document.getElementById("PresStar").removeAttribute("hidden")
	}
	if (stade>1){
		document.getElementById("PresStar").innerHTML="gather some more leaves and<br>Get "+parseInt(NERF(new Decimal(StarPoints.div(1000).pow(1/2)*((StarUp[0]+2)**LeavesUp[2])*(math.sqrt(1+bolts)**BoltsUp[2])))).toPrecision(4)+" leaves"
	}
}

function AddStars(){
	if (StarPoints.gte(new Decimal("1e"+(1+StarUp[0])))){
		StarPoints=StarPoints.minus(new Decimal("1e"+(1+StarUp[0])))
		StarUp[0]++
		document.getElementById("S1Cost").innerHTML=(new Decimal("1e"+(1+StarUp[0]))).toPrecision(4)
		document.getElementById("STARRED").innerHTML=StarPoints.toPrecision(4)+" Star Points"
		StarReset()
	} 
	if (StarUp[0]>125){
		document.getElementById("S1Cost").innerHTML="MAXED"
		document.getElementById("AS").disabled=true
	}
}

function StarSpeed(){
	if (StarPoints.gte(new Decimal("1e"+(1+StarUp[1])))){
		StarPoints=StarPoints.minus(new Decimal("1e"+(1+StarUp[1])))
		StarUp[1]++
		document.getElementById("S2Cost").innerHTML=(new Decimal("1e"+(1+StarUp[1]))).toPrecision(4)
		document.getElementById("STARRED").innerHTML=StarPoints.toPrecision(4)+" Star Points"
	}
}

function StarLinks(){
	if (StarPoints.gte(new Decimal("1e"+(2**StarUp[2])))){
		StarPoints=StarPoints.minus(new Decimal("1e"+(2**StarUp[2])))
		StarUp[2]++
		document.getElementById("S3Cost").innerHTML=(new Decimal("1e"+(2**StarUp[2]))).toPrecision(4)
		document.getElementById("STARRED").innerHTML=StarPoints.toPrecision(4)+" Star Points"
	}
}

function StarStruck(){
	if (StarPoints.gte(new Decimal("1e"+(1+StarUp[3])))){
		StarPoints=StarPoints.minus(new Decimal("1e"+(1+StarUp[3])))
		StarUp[3]++
		tickspeed2=tickspeed2*0.9
		document.getElementById("S4Cost").innerHTML=(new Decimal("1e"+(1+StarUp[3]))).toPrecision(4)
		document.getElementById("STARRED").innerHTML=StarPoints.toPrecision(4)+" Star Points"
	} 
	if (tickspeed2<100){
		document.getElementById("S4Cost").innerHTML="MAXED"
		document.getElementById("TSS").disabled=true
	}
}

function myFunction1() {
	DrawIt(leaves);
	document.getElementById("LM").innerHTML=LeafPower.toPrecision(4)
	document.getElementById("LM2").innerHTML=(1+math.pow(LeafPower,1/2)).toPrecision(4)
}

function DrawIt(g){
	document.getElementById("NL").disabled = true;
	for (var f=0;f<math.min(g,400);f++){
		if (bourgeon.length!=0){
			Actif=bourgeon.pop()
			if (imageData.data[4*(Actif[1][0]*256+Actif[1][1])+3]!=255){
				var depart=Actif[1];
				var vecteur= [Actif[1][0]-Actif[0][0], Actif[1][1]-Actif[0][1]]
				nouveau_bourgeons=suite(depart,vecteur)
				imageData.data[4*(Actif[1][0]*256+Actif[1][1])]=Actif[1][2][0]
				imageData.data[4*(Actif[1][0]*256+Actif[1][1])+1]=Actif[1][2][1]
				imageData.data[4*(Actif[1][0]*256+Actif[1][1])+2]=Actif[1][2][2]
				imageData.data[4*(Actif[1][0]*256+Actif[1][1])+3]=255
				for (i=0;i<nouveau_bourgeons.length;i++){
					if (nouveau_bourgeons[i][0]!=-1 && nouveau_bourgeons[i][1]!=-1 && nouveau_bourgeons[i][0]!=256 && nouveau_bourgeons[i][1]!=256 && imageData.data[4*(nouveau_bourgeons[i][0]*256+nouveau_bourgeons[i][1])+3]!=255){
						bourgeon.push([Actif[1],nouveau_bourgeons[i]])
					}
				}
				LeafPower=LeafPower+2*math.max(1,g/400)
			}
			else{
				LeafPower=LeafPower+1*math.max(1,g/400)
			}
			//imageData=blur(imageData,2,1)
			ctx.putImageData(imageData,0,0)
		}
		else{
			document.getElementById("NL").disabled = false;
		}
	}
	if (stade==2 && leaves>=100){
		stade++
	}
	if (stade>3){
		document.getElementById("PresBud").innerHTML="Call the thunder and<br>Get "+NERF(new Decimal(parseInt(Math.pow(leaves/100,1/2)*((Math.log10(StarPoints+1)+1)**BoltsUp[1])*((math.log10(1+LeafPower)+1)**BoltsUp[3])))).toPrecision(4)+" bolts"
	}
}

function drawBolts(){
	ctxB.clearRect(0,0, 512, 512);
	var imageDataB = ctxB.createImageData(512, 512);
    var Point=[255,255]
    var col=[parseInt(256*Math.random()),parseInt(256*Math.random()),parseInt(256*Math.random())]
    for (var m=0;m<math.min(bolts,100);m++){
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

function myFunction7() {
	
	var CometTail=1-math.exp(-Dusts/10);
	ctxComet.clearRect(0,0, 512, 512);
	var k;
	var LISTE =[];
	
	for (var element of L){
		if (element[2]==1){
			IMDATA.data[4*(parseInt(element[0])+512*parseInt(element[1]))]=255
			IMDATA.data[4*(parseInt(element[0])+512*parseInt(element[1]))+1]=255
			IMDATA.data[4*(parseInt(element[0])+512*parseInt(element[1]))+2]=255
		}
		if (element[2]==2){
			IMDATA.data[4*(parseInt(element[0])+512*parseInt(element[1]))]=255
			IMDATA.data[4*(parseInt(element[0])+512*parseInt(element[1]))+1]=255
		}
		if (element[2]==3){
			IMDATA.data[4*(parseInt(element[0])+512*parseInt(element[1]))+1]=255
		}
		if (element[2]==4){
			IMDATA.data[4*(parseInt(element[0])+512*parseInt(element[1]))]=255
		}
	}
	
	var IMNEW=ctxComet.createImageData(IMDATA);
	
	for (k=0;k<512*512;k++){
		IMNEW.data[k*4+3]=255
	}
	
	for (k=0;k<512*512;k++){
		IMNEW.data[4*k]=parseInt((IMDATA.data[4*k]*4+IMDATA.data[4*((k+1)%(512*512))]*2+IMDATA.data[4*((k-1+512*512)%(512*512))]*2+IMDATA.data[4*((k+512)%(512*512))]*2+IMDATA.data[4*((k-512+512*512)%(512*512))]*2+IMDATA.data[4*((k-512+1+512*512)%(512*512))]*1+IMDATA.data[4*((k-512-1+512*512)%(512*512))]*1+IMDATA.data[4*((k+512+1+512*512)%(512*512))]*1+IMDATA.data[4*((k+512-1+512*512)%(512*512))]*1)/16*CometTail)
		IMNEW.data[4*k+1]=parseInt((IMDATA.data[4*k+1]*4+IMDATA.data[4*((k+1)%(512*512))+1]*2+IMDATA.data[4*((k-1+512*512)%(512*512))+1]*2+IMDATA.data[4*((k+512)%(512*512))+1]*2+IMDATA.data[4*((k-512+512*512)%(512*512))+1]*2+IMDATA.data[4*((k-512+1+512*512)%(512*512))+1]*1+IMDATA.data[4*((k-512-1+512*512)%(512*512))+1]*1+IMDATA.data[4*((k+512+1+512*512)%(512*512))+1]*1+IMDATA.data[4*((k+512-1+512*512)%(512*512))+1]*1)/16*CometTail)
		IMNEW.data[4*k+2]=parseInt((IMDATA.data[4*k+2]*4+IMDATA.data[4*((k+1)%(512*512))+2]*2+IMDATA.data[4*((k-1+512*512)%(512*512))+2]*2+IMDATA.data[4*((k+512)%(512*512))+2]*2+IMDATA.data[4*((k-512+512*512)%(512*512))+2]*2+IMDATA.data[4*((k-512+1+512*512)%(512*512))+2]*1+IMDATA.data[4*((k-512-1+512*512)%(512*512))+2]*1+IMDATA.data[4*((k+512+1+512*512)%(512*512))+2]*1+IMDATA.data[4*((k+512-1+512*512)%(512*512))+2]*1)/16*CometTail)
	}
	
	ctxComet.putImageData(IMNEW,0,0)
	IMDATA=IMNEW
}


function LeafUp1(){
	if (leaves>=parseInt(10**LeavesUp[0])){
		leaves=leaves-parseInt(10**LeavesUp[0])
		LeavesUp[0]++
		document.getElementById("LU1").innerHTML=parseInt(10**LeavesUp[0])
		document.getElementById("BUDDING").innerHTML=", "+leaves+" leaf(ves)"
	}
	if (LeavesUp[0]>=3){
		document.getElementById("BU").disabled=true
	}
}

function twigUp(){
	if (leaves>=parseInt(2**(LeavesUp[1]+1))){
		leaves=leaves-parseInt(2**(LeavesUp[1]+1))
		LeavesUp[1]++
		tickspeed*=0.9
		document.getElementById("TCost").innerHTML=parseInt(2**(LeavesUp[1]+1))
		document.getElementById("BUDDING").innerHTML=", "+leaves+" leaf(ves)"
	} 
	if (tickspeed<100){
		document.getElementById("TCost").innerHTML="MAXED"
		document.getElementById("SpeedU2").disabled=true
	}
}

function LeafUp2(){
	if (leaves>=10){
		leaves=leaves-10
		LeavesUp[2]++
		document.getElementById("LU").disabled=true
		document.getElementById("BUDDING").innerHTML=", "+leaves+" leaf(ves)"
	}
}

function TSUp(){
	if (bolts>=1){
		BoltsUp[0]++
		document.getElementById("BOLTS").innerHTML=", "+bolts+" bolt(s)"
		document.getElementById("BoltUp1").disabled=true
		document.getElementById("BoltUp1.2").disabled=false
		document.getElementById("BoltUp1.2").removeAttribute("hidden")
	}
}

function TSUp2(){
	if (leaves>=1e6 && BoltsUp[0]==1){
		BoltsUp[0]++
		document.getElementById("BUDDING").innerHTML=", "+leaves+" leaf(ves)"
		document.getElementById("BoltUp1.2").disabled=true
		document.getElementById("BoltUp1.3").disabled=false
	}
}

function BoltUp2(){
	if (bolts>=10){
		bolts=bolts-10
		BoltsUp[1]++
		document.getElementById("BoltUp2").disabled=true
		document.getElementById("BOLTS").innerHTML=", "+bolts+" bolt(s)"
	}
}
function BoltUp3(){
	if (bolts>=20){
		bolts=bolts-20
		BoltsUp[2]++
		document.getElementById("BoltUp3").disabled=true
		document.getElementById("BOLTS").innerHTML=", "+bolts+" bolt(s)"
	}
}
function BoltUp4(){
	if (bolts>=50){
		bolts=bolts-50
		BoltsUp[3]++
		document.getElementById("BoltUp4").disabled=true
		document.getElementById("BOLTS").innerHTML=", "+bolts+" bolt(s)"
	}
}

function newReset(){
	leavesMult*=1.5
	ctx.clearRect(0,0, 256, 256);
	imageData = ctx.createImageData(256, 256);
	bourgeon=[[[128,128],[128,129,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
}

function PrestigeStars(){
	if (StarPoints.gte(1000)){
		if (stade==1){
			stade++
			document.getElementById("BudTab").removeAttribute("hidden")
			document.getElementById("BUDDING").removeAttribute("hidden")
		}
		leaves+=parseInt(NERF(new Decimal(StarPoints.div(1000).pow(1/2)*((StarUp[0]+2)**LeavesUp[2])*(math.sqrt(1+bolts)**BoltsUp[2]))))
		tickspeed2=1000
		ticks2=0
		ticks=0
		StarPoints=new Decimal(0)
		StarUp=[0,0,0,0]
		L=[]
		Movement=[]
		document.getElementById("S1Cost").innerHTML=parseInt(10**(1+StarUp[0]))
		document.getElementById("S2Cost").innerHTML=parseInt(10**(1+StarUp[1]))
		document.getElementById("AS").disabled=false
		document.getElementById("S3Cost").innerHTML=parseInt(10**(2**StarUp[2]))
		document.getElementById("S4Cost").innerHTML=parseInt(10**(1+StarUp[3]))
		document.getElementById("TSS").disabled=false
		ctxS.clearRect(0,0, 512, 512);
		document.getElementById("BUDDING").innerHTML=", "+leaves+" leaf(ves)"
		StarReset()
	}
}

function GetBolts(){
	if (leaves>100){
		if (stade==3){
			stade++
			document.getElementById("BoltTab").removeAttribute("hidden")
			document.getElementById("BOLTS").removeAttribute("hidden")
		}
		bolts+=parseInt(NERF(new Decimal(Math.pow(leaves/100,1/2)*((Math.log10(StarPoints.plus(1))+1)**BoltsUp[1])*((math.log10(1+LeafPower)+1)**BoltsUp[3]))))
		imageData = ctx.createImageData(256, 256); //=pixels
		var bourgeon=[[[128,128],[128,129,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
		tickspeed=1000
		tickspeed2=1000;
		ticks=0
		leaves=0
		LeavesUp=[0,0,0]
		LeafPower=0
		leavesMult=1
		document.getElementById("LU1").innerHTML=1
		document.getElementById("TCost").innerHTML=2
		document.getElementById("LU").disabled=false
		ctx.clearRect(0,0, 256, 256);
		ticks2=0
		StarPoints=new Decimal(0)
		StarUp=[0,0,0,0]
		L=[]
		Movement=[]
		document.getElementById("S1Cost").innerHTML=parseInt(10**(1+StarUp[0]))
		document.getElementById("S2Cost").innerHTML=parseInt(10**(1+StarUp[1]))
		document.getElementById("AS").disabled=false
		document.getElementById("S3Cost").innerHTML=parseInt(10**(2**StarUp[2]))
		document.getElementById("S4Cost").innerHTML=parseInt(10**(1+StarUp[3]))
		document.getElementById("TSS").disabled=false
		document.getElementById("SpeedU2").disabled=false
		document.getElementById("BU").disabled=false
		ctxS.clearRect(0,0, 512, 512);
		document.getElementById("BUDDING").innerHTML=", "+leaves+" leaf(ves)"
		StarReset()
	}
}

function PrestigeComet(){
	if (bolts>1e6){
		if (stade==4){
			stade++
			document.getElementById("LavaTab").removeAttribute("hidden")
			document.getElementById("COMET").removeAttribute("hidden")
		}
		Dusts+=parseInt(NERF(new Decimal(Math.pow(bolts/1e6,1/2))))
		imageData = ctx.createImageData(256, 256); //=pixels
		var bourgeon=[[[128,128],[128,129,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
		tickspeed=1000
		tickspeed2=1000;
		ticks=0
		leaves=0
		LeavesUp=[0,0,0]
		LeafPower=0
		leavesMult=1
		bolts=0
		if (BoltsUp[0]<3){
			BoltsUp=[0,0,0,0]
			document.getElementById("BoltUp1").disabled=false
                	document.getElementById("BoltUp1.2").disabled=true
		}
		else {
			BoltsUp=[3,0,0,0]
		}
		document.getElementById("LU1").innerHTML=1
		document.getElementById("TCost").innerHTML=2
		document.getElementById("LU").disabled=false
		ctx.clearRect(0,0, 256, 256);
                document.getElementById("BoltUp2").disabled=false
                document.getElementById("BoltUp3").disabled=false
                document.getElementById("BoltUp4").disabled=false
		document.getElementById("BOLTS").innerHTML=", "+bolts+" bolt(s)"
		ticks2=0
		StarPoints=new Decimal(0)
		StarUp=[0,0,0,0]
		L=[]
		Movement=[]
		document.getElementById("S1Cost").innerHTML=parseInt(10**(1+StarUp[0]))
		document.getElementById("S2Cost").innerHTML=parseInt(10**(1+StarUp[1]))
		document.getElementById("AS").disabled=false
		document.getElementById("S3Cost").innerHTML=parseInt(10**(2**StarUp[2]))
		document.getElementById("S4Cost").innerHTML=parseInt(10**(1+StarUp[3]))
		document.getElementById("TSS").disabled=false
		document.getElementById("SpeedU2").disabled=false
		document.getElementById("BU").disabled=false
		ctxS.clearRect(0,0, 512, 512);
		document.getElementById("BUDDING").innerHTML=", "+leaves+" leaf(ves)"
		StarReset()
	}
}

//upgrades Comet tout fait
function TSUp3(){
	if (Dusts>=1 && BoltsUp[0]==2){
		BoltsUp[0]++
		document.getElementById("BoltUp1.3").disabled=true
	}
}

function CometUp1(){
	if (Dusts>=10**CometUp[0]){
		CometUp[0]++
		document.getElementById("C1Cost").innerHTML=parseInt(10**CometUp[0])
		if (CometUp[0]==10){document.getElementById("CometUp1").disabled=true}
	}
}
function CometUp2(){
	if (Dusts>=10*10**CometUp[1]){
		CometUp[1]++
		document.getElementById("C2Cost").innerHTML=parseInt(10*10**CometUp[1])
		if (CometUp[1]==10){document.getElementById("CometUp2").disabled=true}
	}
}
function CometUp3(){
	if (Dusts>=10){
		CometUp[2]++
		document.getElementById("CometUp3").disabled=true
	}
}

function BUYMAX(){
	AddStars()
	StarLinks()
	StarStruck()
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

function Mutedness(){
	document.getElementById("Audio1").volume=document.getElementById("MUSICISHERE").value/1000;
	document.getElementById("Audio2").volume=document.getElementById("MUSICISHERE").value/1000;
	document.getElementById("Audio3").volume=document.getElementById("MUSICISHERE").value/1000;
	document.getElementById("Audio4").volume=document.getElementById("MUSICISHERE").value/1000;
	document.getElementById("Audio5").volume=document.getElementById("MUSICISHERE").value/1000;
	document.getElementById("VOL").innerHTML="Volume : "+document.getElementById("MUSICISHERE").value+"%"
}

var ticks=0;
var ticks2=0
var saveticks=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, 33);

function loop() { // production
	//var T0=Date.now()
	ticks+=33;
	ticks2+=33;
	saveticks+=33;
	drawBolts()
	Mutedness()
	
	if (StarPoints.div(1000).pow(1/2)*((StarUp[0]+2)**LeavesUp[2])*(math.sqrt(1+bolts)**BoltsUp[2])>0){
		leaves=leaves+NERF((new Decimal(StarPoints.div(1000).pow(1/2))).mul((StarUp[0]+2)**LeavesUp[2]).mul(math.sqrt(1+bolts)**BoltsUp[2]))*33/10000*CometUp[0]
	}
	document.getElementById("BUDDING").innerHTML=", "+parseFloat(leaves).toPrecision(4)+" leaf(ves)"
	
	if ((Math.pow(leaves/100,1/2)*((Math.log10(StarPoints.plus(1))+1)**BoltsUp[1])*((math.log10(1+LeafPower)+1)**BoltsUp[3]))>0){
		bolts=bolts+NERF((new Decimal(Math.pow(leaves/100,1/2))).mul((Math.log10(StarPoints.plus(1))+1)**BoltsUp[1]).mul((math.log10(1+LeafPower)+1)**BoltsUp[3]))*33/10000*CometUp[1]
	}
	document.getElementById("BOLTS").innerHTML=", "+parseFloat(bolts).toPrecision(4)+" bolt(s)"
		
	if (tickspeed<ticks && stade>1){
		myFunction1();
		//myFunction7();
		ticks=ticks-tickspeed
		document.getElementById("COMET").innerHTML=", "+Dusts.toPrecision(4)+" comet dust(s)"
		if (stade>4){
			myFunction7()
			document.getElementById("PresComet").innerHTML="Tear up stars and<br>Get "+parseInt(Math.pow(bolts/1e6,1/2)).toPrecision(4)+" dusts"
		}
	}
	if (tickspeed2<ticks2){
		myFunction0();
		ticks2=ticks2-tickspeed2
	}
	if (saveticks>10000){
		if (document.getElementById("Autosave").checked == true){save();}
		saveticks-=10000
	}
	
	if (CometUp[2]>0){
		BUYMAX()
		StarSpeed()
	}
	//console.log(Date.now()-T0)
}

function save() { 
  localStorage.setItem('StarP',StarPoints);
  localStorage.setItem("StarUp",StarUp);
  localStorage.setItem("Leaves",leaves);
  localStorage.setItem("LeavesUp",LeavesUp);
  localStorage.setItem("LeafPower",LeafPower);
  localStorage.setItem("LeafMult",leavesMult);
  localStorage.setItem("TS",tickspeed);
  localStorage.setItem("TS2",tickspeed2);
  localStorage.setItem("Bolts",bolts);
  localStorage.setItem("Stade",stade);
  localStorage.setItem("BoltsUp",BoltsUp);
  localStorage.setItem("Dusts",Dusts);
  localStorage.setItem("CometUp",CometUp);
  localStorage.setItem("Ice",Ice);
  localStorage.setItem("IceUp",IceUp);
} 

function HReset(){
	var BOOLEAN=confirm("Are you sure you want to Hard Reset?")
	if (BOOLEAN){
		imageData = ctx.createImageData(256, 256); //=pixels
		bourgeon=[[[128,128],[128,129,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
		tickspeed=1000
		tickspeed2=1000
		leaves=0
		LeavesUp=[0,0,0]
		bolts=0
		stade=0
		BoltsUp=[0,0,0,0]
		StarPoints=new Decimal(0)
		StarUp=[0,0,0,0]
		LeafPower=0
		leavesMult=1
		Dusts = 0;
		CometUp=[0,0,0]
		Ice = 0;
		IceUp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		StarReset()
		document.getElementById("S1Cost").innerHTML=parseInt(10**(1+StarUp[0]))
		document.getElementById("AS").disabled=false
		document.getElementById("S2Cost").innerHTML=parseInt(10**(1+StarUp[1]))
		document.getElementById("S3Cost").innerHTML=parseInt(10**(2**StarUp[2]))
		document.getElementById("S4Cost").innerHTML=parseInt(10**(1+StarUp[3]))
		document.getElementById("TSS").disabled=false
		document.getElementById("LU1").innerHTML=parseInt(10**LeavesUp[0])
		document.getElementById("TCost").innerHTML=parseInt(2**(LeavesUp[1]+1))
		document.getElementById("LU").disabled=false
		document.getElementById("BoltUp1").disabled=false
		document.getElementById("BoltUp1.2").disabled=false
		document.getElementById("BoltUp1.3").disabled=false
		document.getElementById("BoltUp2").disabled=false
		document.getElementById("BoltUp3").disabled=false
		document.getElementById("BoltUp4").disabled=false
		document.getElementById("BudTab").setAttribute("hidden",true)
		document.getElementById("BUDDING").setAttribute("hidden",true)
		document.getElementById("BoltTab").setAttribute("hidden",true)
		document.getElementById("BOLTS").setAttribute("hidden",true)
		document.getElementById("LavaTab").setAttribute("hidden",true)
		document.getElementById("COMET").setAttribute("hidden",true)
		document.getElementById("C1Cost").innerHTML=parseInt(10**CometUp[0])
		document.getElementById("CometUp1").disabled=false
		document.getElementById("CometUp2").disabled=false
		document.getElementById("C2Cost").innerHTML=parseInt(10*10**CometUp[1])
		document.getElementById("CometUp3").disabled=false
		
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
		StarPoints=new Decimal(parseInt(loadgame.StarP));
		leaves=parseInt(loadgame.Leaves);
		LeafPower=parseInt(loadgame.LeafPower);
		leavesMult=parseInt(loadgame.LeafMult);
		tickspeed2=parseInt(loadgame.TS2);
		tickspeed=parseInt(loadgame.TS);
		bolts=parseInt(loadgame.Bolts);
		StarUp=loadgame.StarUp.split(",").map(Number);
		if (StarUp[0]<=125){
			document.getElementById("S1Cost").innerHTML=parseInt(10**(1+StarUp[0]))
			document.getElementById("AS").disabled=false
		} 
		if (StarUp[0]>125){
			document.getElementById("S1Cost").innerHTML="MAXED"
			document.getElementById("AS").disabled=true
		}
		document.getElementById("S2Cost").innerHTML=parseInt(10**(1+StarUp[1]))
		document.getElementById("S3Cost").innerHTML=parseInt(10**(2**StarUp[2]))
		if (tickspeed2>=100){
			document.getElementById("S4Cost").innerHTML=parseInt(10**(1+StarUp[3]))
			document.getElementById("TSS").disabled=false
		} 
		if (tickspeed2<100){
			document.getElementById("S4Cost").innerHTML="MAXED"
			document.getElementById("TSS").disabled=true
		}
		LeavesUp=loadgame.LeavesUp.split(",").map(Number);
		document.getElementById("LU1").innerHTML=parseInt(10**LeavesUp[0])
		document.getElementById("TCost").innerHTML=parseInt(2**(LeavesUp[1]+1))
		if (LeavesUp[2]==1){
			document.getElementById("LU").disabled=true
		}
		else {
			document.getElementById("LU").disabled=false
		}
		BoltsUp=loadgame.BoltsUp.split(",").map(Number);
		if (BoltsUp[0]>=1){
			document.getElementById("BoltUp1").disabled=true
			document.getElementById("BoltUp1.2").removeAttribute("hidden")
			document.getElementById("BoltUp1.2").disabled=false
		}
		else {
			document.getElementById("BoltUp1").disabled=false
		}
		if (BoltsUp[0]>=2){
			document.getElementById("BoltUp1.2").disabled=true
			document.getElementById("BoltUp1.3").disabled=false
		}
		else {
			document.getElementById("BoltUp1.2").disabled=false
		}
		if (BoltsUp[1]==1){
			document.getElementById("BoltUp2").disabled=true
		}
		else {
			document.getElementById("BoltUp2").disabled=false
		}
		if (BoltsUp[2]==1){
			document.getElementById("BoltUp3").disabled=true
		}
		else {
			document.getElementById("BoltUp3").disabled=false
		}
		if (BoltsUp[3]==1){
			document.getElementById("BoltUp4").disabled=true
		}
		else {
			document.getElementById("BoltUp4").disabled=false
		}
		document.getElementById("STARRED").innerHTML=StarPoints.toPrecision(4)+" Star Points"
		ctx.clearRect(0,0, 256, 256);
		imageData = ctx.createImageData(256, 256);
		bourgeon=[[[128,128],[128,129,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
		if (loadgame.Stade){stade=parseInt(loadgame.Stade)}
		if (stade>0){
			if (stade>1){
				document.getElementById("BUDDING").innerHTML=", "+leaves.toPrecision(4)+" leaf(ves)"
				document.getElementById("BudTab").removeAttribute("hidden")
				document.getElementById("BUDDING").removeAttribute("hidden")
				if (stade>2){
					if (stade>3){
						document.getElementById("BoltTab").removeAttribute("hidden")
						document.getElementById("BOLTS").removeAttribute("hidden")
						if (stade>4){
							Dusts = parseInt(loadgame.Dusts);
							CometUp=loadgame.CometUp.split(",").map(Number);
							document.getElementById("LavaTab").removeAttribute("hidden")
							document.getElementById("COMET").removeAttribute("hidden")
							if (BoltsUp[0]>=3){
								document.getElementById("BoltUp1.3").disabled=true
							}
							if (CometUp[0]==10){
								document.getElementById("CometUp1").disabled=true
							}
							else{
								document.getElementById("C1Cost").innerHTML=parseInt(10**CometUp[0])
							}
							if (CometUp[1]==10){
								document.getElementById("CometUp2").disabled=true
							}
							else{
								document.getElementById("C2Cost").innerHTML=parseInt(10*10**CometUp[1])
							}
							if (CometUp[2]==1){
								document.getElementById("CometUp3").disabled=true
							}
							if (stade>5){
								Ice = parseInt(loadgame.Ice);;
								IceUp = loadgame.IceUp.split(",").map(Number);
							}
						}
					}
				}
			}
		}
		StarReset()
	}
}

function SaveLeaves(){
	var LINK=document.getElementById("DFWMB")
	LINK.download = 'Leaves256x256.png';
	LINK.href = canvas.toDataURL("image/jpg");
	LINK.click();
}

StarReset()

if(localStorage.LeafMult) {
	StarPoints=new Decimal(parseInt(localStorage.StarP));
	leaves=parseInt(localStorage.Leaves);
	LeafPower=parseInt(localStorage.LeafPower);
	leavesMult=parseInt(localStorage.LeafMult);
	tickspeed2=parseInt(localStorage.TS2);
	tickspeed=parseInt(localStorage.TS);
	bolts=parseInt(localStorage.Bolts);
	Dusts=parseInt(localStorage.Dusts);
	StarUp=localStorage.StarUp.split(",").map(Number);
	if (StarUp[0]<=125){
		document.getElementById("S1Cost").innerHTML=(new Decimal("1e"+(1+StarUp[0]))).toPrecision(4)
		document.getElementById("AS").disabled=false
	} 
	if (StarUp[0]>125){
		document.getElementById("S1Cost").innerHTML="MAXED"
		document.getElementById("AS").disabled=true
	}
	document.getElementById("S2Cost").innerHTML=(new Decimal("1e"+(1+StarUp[1]))).toPrecision(4)
	document.getElementById("S3Cost").innerHTML=(new Decimal("1e"+(2**StarUp[2]))).toPrecision(4)
	if (tickspeed2>=100){
		document.getElementById("S4Cost").innerHTML=(new Decimal("1e"+(1+StarUp[3]))).toPrecision(4)
		document.getElementById("TSS").disabled=false
	} 
	if (tickspeed2<100){
		document.getElementById("S4Cost").innerHTML="MAXED"
		document.getElementById("TSS").disabled=true
	}
	LeavesUp=localStorage.LeavesUp.split(",").map(Number);
	document.getElementById("LU1").innerHTML=parseInt(10**LeavesUp[0])
	if (LeavesUp[2]==1){
		document.getElementById("LU").disabled=true
	}
	else {
		document.getElementById("LU").disabled=false
	}
	if (tickspeed>=100){
		document.getElementById("TCost").innerHTML=parseInt(2**(LeavesUp[1]+1)).toPrecision(4)
		document.getElementById("SpeedU2").disabled=false
	} 
	if (tickspeed<100){
		document.getElementById("TCost").innerHTML="MAXED"
		document.getElementById("SpeedU2").disabled=true
	}
	BoltsUp=localStorage.BoltsUp.split(",").map(Number);
	if (BoltsUp[0]>=1){
		document.getElementById("BoltUp1").disabled=true
		document.getElementById("BoltUp1.2").removeAttribute("hidden")
		document.getElementById("BoltUp1.2").disabled=false
	}
	else {
		document.getElementById("BoltUp1").disabled=false
	}
	if (BoltsUp[0]>=2){
		document.getElementById("BoltUp1.2").disabled=true
		document.getElementById("BoltUp1.3").disabled=false
	}
	else {
		document.getElementById("BoltUp1.2").disabled=false
	}
	if (BoltsUp[1]==1){
		document.getElementById("BoltUp2").disabled=true
	}
	else {
		document.getElementById("BoltUp2").disabled=false
	}
	if (BoltsUp[2]==1){
		document.getElementById("BoltUp3").disabled=true
	}
	else {
		document.getElementById("BoltUp3").disabled=false
	}
	if (BoltsUp[3]==1){
		document.getElementById("BoltUp4").disabled=true
	}
	else {
		document.getElementById("BoltUp4").disabled=false
	}
	document.getElementById("STARRED").innerHTML=StarPoints+" Star Points"
	ctx.clearRect(0,0, 256, 256);
	imageData = ctx.createImageData(256, 256);
	bourgeon=[[[128,128],[128,129,[parseInt(Math.random()*256),parseInt(Math.random()*256),parseInt(Math.random()*256)]]]]
	if (localStorage.Stade){stade=parseInt(localStorage.Stade)}
	if (stade>0){
		document.getElementById("PresStar").removeAttribute("hidden")
		if (stade>1){
			document.getElementById("BUDDING").innerHTML=", "+leaves+" leaf(ves)"
			document.getElementById("BudTab").removeAttribute("hidden")
			document.getElementById("BUDDING").removeAttribute("hidden")
			document.getElementById("PresStar").innerHTML="gather some more leaves and<br>Get "+parseInt((Math.log10(StarPoints)-2)*((StarUp[0]+2)**LeavesUp[2]))+" leaves"
			drawBolts()
			if (stade>2){
				document.getElementById("PresBud").removeAttribute("hidden")
				if (stade>3){
					document.getElementById("BoltTab").removeAttribute("hidden")
					document.getElementById("BOLTS").removeAttribute("hidden")
					document.getElementById("PresBud").innerHTML="Call the thunder and<br>Get "+parseInt(Math.log10(leaves)-1)+" bolts"
					if (stade>4){
						document.getElementById("LavaTab").removeAttribute("hidden")
						document.getElementById("COMET").removeAttribute("hidden")
						document.getElementById("PresComet").innerHTML="Tear up stars and<br>Get "+parseInt(Math.log10(bolts)-2)+" dusts"
						CometUp=localStorage.CometUp.split(",").map(Number);
						if (BoltsUp[0]>=3){
							document.getElementById("BoltUp1.3").disabled=true
						}
						if (CometUp[0]==10){
							document.getElementById("CometUp1").disabled=true
						}
						else{
							document.getElementById("C1Cost").innerHTML=parseInt(10**CometUp[0])
						}
						if (CometUp[1]==10){
							document.getElementById("CometUp2").disabled=true
						}
						else{
							document.getElementById("C2Cost").innerHTML=parseInt(10*10**CometUp[1])
						}
						if (CometUp[2]==1){
							document.getElementById("CometUp3").disabled=true
						}
						if (stade>5){
							Ice = parseInt(loadgame.Ice);;
							IceUp = localStorage.IceUp.split(",").map(Number);
						}
					}
				}
			}
		}
	}
	StarReset()
}
