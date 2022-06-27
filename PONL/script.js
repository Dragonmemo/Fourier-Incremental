// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var LISTER;
var Onglet=6;
var SETTER = false;

function myFunction1() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0, 500, 500);
  ctx.strokeStyle="#000000";
  LISTER = [0];
  LISTER[0] = parseInt(document.getElementById("Slider1").value)
  LISTER[1] = parseInt(document.getElementById("Slider2").value)
  LISTER[2] = parseInt(document.getElementById("Slider3").value)
  LISTER[3] = parseInt(document.getElementById("Slider4").value)
  var MAX = Math.max(LISTER[3], LISTER[0]+LISTER[1]+LISTER[2]);
  ctx.moveTo(0, 500);
  ctx.lineTo(500*LISTER[3]/MAX, 500);
  ctx.stroke(); 
  ctx.beginPath()
  ctx.moveTo(0, 500);
  ctx.strokeStyle="#3366aa";
  ctx.lineTo(0, 500*(1-LISTER[2]/MAX));
  ctx.stroke(); 
  ctx.beginPath() 
  ctx.strokeStyle="#11aa11";
  ctx.moveTo(0, 500*(1-LISTER[2]/MAX));
  ctx.lineTo(0, 500*(1-(LISTER[2]+LISTER[1])/MAX));
  ctx.stroke(); 
  ctx.beginPath()
  ctx.strokeStyle="#ccaa11";
  ctx.moveTo(0, 500*(1-(LISTER[2]+LISTER[1])/MAX));
  ctx.lineTo(0, 500*(1-(LISTER[0]+LISTER[1]+LISTER[2])/MAX));
  ctx.stroke(); 
  ctx.beginPath()
  ctx.strokeStyle="#3366aa";
  ctx.moveTo(0, 500*(1-LISTER[2]/MAX));
  ctx.lineTo(500, 500*(1-LISTER[2]/MAX));
  ctx.stroke(); 
  var M, MPrime;
  M=[dichotomie(function (x){return Math.sqrt(x*x+LISTER[1]**2)+1.33*Math.sqrt((x-LISTER[3])**2+LISTER[2]**2)},0,LISTER[3]),LISTER[2]];
  MPrime=[dichotomie(function (x){return Math.sqrt(x*x+(LISTER[1]+LISTER[0])**2)+1.33*Math.sqrt((x-LISTER[3])**2+LISTER[2]**2)},0,LISTER[3]),LISTER[2]];
  ctx.beginPath();
  ctx.strokeStyle="#ccaa11";
  ctx.moveTo(500*LISTER[3]/MAX, 500);
  ctx.lineTo(500*M[0]/MAX, 500*(1-M[1]/MAX));
  ctx.lineTo(0, 500*(1-(LISTER[2]+LISTER[1])/MAX));
  ctx.stroke(); 
  ctx.beginPath();
  ctx.moveTo(500*LISTER[3]/MAX, 500);
  ctx.lineTo(500*MPrime[0]/MAX, 500*(1-MPrime[1]/MAX));
  ctx.lineTo(0, 500*(1-(LISTER[0]+LISTER[1]+LISTER[2])/MAX));
  ctx.stroke(); 
  document.getElementById("dVal1.0").innerHTML=LISTER[0];
  document.getElementById("eVal1.0").innerHTML=LISTER[1];
  document.getElementById("pVal1.0").innerHTML=LISTER[2];
  document.getElementById("xVal1.0").innerHTML=LISTER[3];
}

function derivee(f,x){
	var h = 1e-6;
	return (f(x+h)-f(x-h))/(2*h)
}

function dichotomie(f,a,b){
	eps=1e-6
	while (b-a>eps){
		if (derivee(f,a)*derivee(f,(a+b)/2)>0){a=(a+b)/2}
		else {b=(a+b)/2}
	}
	return (a+b)/2
}
var L=[]
var Movement=[]
var n=100
var ticker=0
function Reset(){
	if (Onglet==5){
		var k;
		n=document.getElementById("NumDot").value;
		for (k=0;k<n;k++){
			L[k]=[math.floor(math.random()*501),math.floor(math.random()*501)]
			Movement[k]=[math.random()*4-2,math.random()*4-2]
		}
	}
	if (Onglet==6){
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		//ctx.fillStyle = "#FFFFFF";
		//ctx.fillRect(0,0,500,500);
		ticker=0;
		n=100*document.getElementById("NumDot").value;
		var k=0;
		L=[];
		for (k=0;k<500*500;k++){
			L[k]=[]
		}
		k=0
		while (k<n){
			var t=parseInt(math.random()*(n-k)/2+1);
			k+=t;
			//canvas is 500*500
			L[parseInt(math.random()*500*500)].push([t,[parseInt(math.random()*255),parseInt(math.random()*255),parseInt(math.random()*255)]])
		}
		for (k=0;k<500*500;k++){
			if (L[k].length){
				var t=0
				for (var element of L[k]){
					element[0]=element[0]+t
					t=element[0]
				}
				L[k].push([parseInt(t/L[k].length)+t,[255,255,255]])
				L[k].reverse()
			}
		}
	}
}

function myFunction5() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0, 500, 500);
	ctx.strokeStyle="#000000";
	var k;
	var lks= document.getElementById("LINKS").value;
	for (k=0;k<n;k++){
		L[k]=[(L[k][0]+Movement[k][0]+500)%500,(L[k][1]+Movement[k][1]+500)%500]
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
  for (var element of Lignage){
	  ctx.beginPath()
	  ctx.moveTo(L[element[0]][0], L[element[0]][1]);
	  ctx.lineTo(L[element[1]][0], L[element[1]][1]);
	  ctx.stroke(); 
  }
}

function myFunction6(){
	var k;
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var IMDATA=ctx.getImageData(0,0,500,500)
	for (k=0;k<500*500;k++){
		if (L[k].length){
			for (var element of L[k]){
				if (ticker%L[k][0][0]<element[0]){
					IMDATA.data[4*k]=element[1][0]
					IMDATA.data[4*k+1]=element[1][1]
					IMDATA.data[4*k+2]=element[1][2]
				}
			}
		}
	}
	
	var IMNEW=ctx.createImageData(IMDATA);
	
	for (k=0;k<500*500;k++){
		IMNEW.data[k*4+3]=255
	}
	
	for (k=0;k<500*500;k++){
		IMNEW.data[4*k]=parseInt((IMDATA.data[4*k]*4+IMDATA.data[4*((k+1)%(500*500))]*2+IMDATA.data[4*((k-1+500*500)%(500*500))]*2+IMDATA.data[4*((k+500)%(500*500))]*2+IMDATA.data[4*((k-500+500*500)%(500*500))]*2+IMDATA.data[4*((k-500+1+500*500)%(500*500))]*1+IMDATA.data[4*((k-500-1+500*500)%(500*500))]*1+IMDATA.data[4*((k+500+1+500*500)%(500*500))]*1+IMDATA.data[4*((k+500-1+500*500)%(500*500))]*1)/16)
		IMNEW.data[4*k+1]=parseInt((IMDATA.data[4*k+1]*4+IMDATA.data[4*((k+1)%(500*500))+1]*2+IMDATA.data[4*((k-1+500*500)%(500*500))+1]*2+IMDATA.data[4*((k+500)%(500*500))+1]*2+IMDATA.data[4*((k-500+500*500)%(500*500))+1]*2+IMDATA.data[4*((k-500+1+500*500)%(500*500))+1]*1+IMDATA.data[4*((k-500-1+500*500)%(500*500))+1]*1+IMDATA.data[4*((k+500+1+500*500)%(500*500))+1]*1+IMDATA.data[4*((k+500-1+500*500)%(500*500))+1]*1)/16)
		IMNEW.data[4*k+2]=parseInt((IMDATA.data[4*k+2]*4+IMDATA.data[4*((k+1)%(500*500))+2]*2+IMDATA.data[4*((k-1+500*500)%(500*500))+2]*2+IMDATA.data[4*((k+500)%(500*500))+2]*2+IMDATA.data[4*((k-500+500*500)%(500*500))+2]*2+IMDATA.data[4*((k-500+1+500*500)%(500*500))+2]*1+IMDATA.data[4*((k-500-1+500*500)%(500*500))+2]*1+IMDATA.data[4*((k+500+1+500*500)%(500*500))+2]*1+IMDATA.data[4*((k+500-1+500*500)%(500*500))+2]*1)/16)
	}
	
	ctx.putImageData(IMNEW,0,0)
	ticker++;
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

Reset()
//myFunction5()

var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, 33);

function loop() { // production
	if (document.getElementById("Anim").checked){
		//var T0=Date.now()
		if (Onglet == 1) {myFunction1();}
		if (Onglet == 5) {myFunction5();}
		if (Onglet == 6) {myFunction6();}
		//console.log(Date.now()-T0)
	}
}
