// client-side js, loaded by index.html
// run by the browser each time the page is loaded


// define variables that reference elements on our page
var x, y, coords, tickspeed, positives, negatives,i,FicNeg,NPOW, Zero, LCoords;
var Achieves=[0];
for (i=0;i<70;i++){
  Achieves[i]=0
}
var MAX=1;
var AchMult=1.01;
x=0; coords=[0,0]; y=0; NPOW=0; Zero=0; LCoords=[];
positives=[0,0,0,0,0,0,0,0,0,0];
negatives=[0,0,0,0,0,0,0,0,0,0];
FicNeg=[0,0,0,0,0,0,0,0,0,0];
var pbaseCost=[10,100,1000,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
var OtherQuantity=[0,0];
var qual=1, R=0, I=2*Math.PI;
var tickpart=0;
tickspeed=1000;
function myFunction() {
  var i; 
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 500, 500);
  ctx.strokeStyle="#000099";
  ctx.moveTo(250, 0);
  ctx.lineTo(250, 500);
  ctx.stroke(); 
  ctx.moveTo(0, 250);
  ctx.lineTo(500, 250);
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
  if (tickspeed>33){x+=MAX*1.01**math.sum(Achieves)*1.5**math.sum(positives)*2**OtherQuantity[1]*(1+NPOW);}
  else {x+=MAX*1.01**math.sum(Achieves)*1.5**math.sum(positives)*2**OtherQuantity[1]*(1+NPOW)*33/tickspeed;}
  ctx.beginPath();
  ctx.strokeStyle="#000000";
  document.getElementById("MCur").innerHTML = "Drawing points (DP) : "+x.toExponential(3);
  document.getElementById("DPS").innerHTML = (MAX*1.01**math.sum(Achieves)*1.5**math.sum(positives)*2**OtherQuantity[1]*(1+NPOW)*1000/tickspeed).toExponential(2);
  if (Achieves[62]!=0){document.getElementById("PCur").innerHTML = "Negative points (NP) : "+y.toExponential(3);}
  FourierCalculation(MAX);
  MAX=Math.max(MAX,Math.abs(coords[0]),Math.abs(coords[1]));
  LCoords.push(coords);
  if (Achieves[51]==0 && positives==[2,1,0,0,0,0,0,0,0,0] && negatives==[2,1,0,0,0,0,0,0,0,0] && parseInt(document.getElementById("Phi1").value)==100 && parseInt(document.getElementById("PhiM1").value)==100 && ((48<parseInt(document.getElementById("Phi2").value)<52 && parseInt(document.getElementById("PhiM2").value)==100)||(48<parseInt(document.getElementById("PhiM2").value)<52 && parseInt(document.getElementById("Phi2").value)==100))){
	Achieves[51]++;
	document.getElementById("A6C2").setAttribute("style","background-color: #5B5;");
	pbaseCost[1]=9e1
  }
  if (Achieves[65]==0 && x>=1e2520){
    Achieves[65]++;
    document.getElementById("A7C6").setAttribute("style","background-color: #5B5;");
  };
  if (Achieves[66]==0 && y>=1e2520){
    Achieves[66]++;
    document.getElementById("A7C7").setAttribute("style","background-color: #5B5;");
  }
};

function FourierCalculation(MAX) {
  var p,n,i;
  var TempVar=math.complex({r:Zero,phi:I/2});
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.moveTo(coords[0]/MAX*250+250,coords[1]/MAX*250+250);
  p = positives.length; n=negatives.length; 
  for (i=0; i<p;i++){
    TempVar=math.add(TempVar,math.multiply(math.complex({r: 1, phi:R*(i+1)*I/qual+I*parseInt(document.getElementById("Phi"+(i+1)).value)/100}),positives[i]));
  };
  for (i=0; i<n;i++){
    TempVar=math.add(TempVar,math.multiply(math.complex({r: 1, phi:-R*(i+1)*I/qual+I*parseInt(document.getElementById("PhiM"+(i+1)).value)/100}),negatives[i]));
  };
  R=R%qual + 1;
  coords=[TempVar.re,TempVar.im];
  ctx.lineTo(coords[0]/MAX*250+250,coords[1]/MAX*250+250);
  ctx.stroke();
};

function ImproveQuality() {
  if (Achieves[61]==0){if (x>=5**((OtherQuantity[1]+1)**1.5)) {
    x-=5**((OtherQuantity[1]+1)**1.5);
  }  else{return};}
  else{
	  if (x>=5**((OtherQuantity[1]/2+1)**1.5)) {
    x-=5**((OtherQuantity[1]/2+1)**1.5);
  }  else{return};
  }
  if (OtherQuantity[1]<8){qual*=2;}
  OtherQuantity[1]++;
if (Achieves[60]==0 && OtherQuantity[1]==5 && math.sum(positives)+math.sum(negatives)==0){
	Achieves[60]++;
	document.getElementById("A7C1").setAttribute("style","background-color: #5B5;");
	document.getElementById("Help").removeAttribute("hidden");
}
  if (Achieves[61]==0){document.getElementById("QC").innerHTML = "Cost : "+(5**((OtherQuantity[1]+1)**1.5)).toExponential(3)+"DP";}
  else {document.getElementById("QC").innerHTML = "Cost : "+(5**((OtherQuantity[1]/2+1)**1.5)).toExponential(3)+"DP";}
};
function ReduceTickspeed() {
  if (x>=10**OtherQuantity[0]) {
    x-=10**OtherQuantity[0];
  }  else{return};
  tickspeed*=10/11;
  OtherQuantity[0]++;
  document.getElementById("TC").innerHTML = "Cost : "+(10**OtherQuantity[0]).toExponential(3)+"DP";
};
function IncrementCn(n) {
  if (x>=pbaseCost[n]**(positives[n]+1)) {
    x-=pbaseCost[n]**(positives[n]+1);
  }  else{return};
  positives[n]++;
  if (positives[n]==1 && Achieves[n]==0){
    document.getElementById("A1C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n]++;
    if (n!=9){document.getElementById("C"+(n+2)+"Tab").removeAttribute("hidden");}
	else {
		document.getElementById("PUnlock").removeAttribute("hidden");
	}
	if (math.sum(Achieves.slice(0,10))==10){
	AchMult+=0.1  
  }
  }
  if (positives[n]==10 && Achieves[n+10]==0){
    document.getElementById("A2C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n+10]++;
    if (n!=9){AchMult+=0.01;}
	else {document.getElementById("MaxAll").removeAttribute("hidden");}
	if (math.sum(Achieves.slice(10,20))==10){
	AchMult+=0.1  
  }
  }
  if (positives[n]==25 && Achieves[n+20]==0){
    document.getElementById("A3C"+(n+1)).setAttribute("style","background-color: #5B5;");
	document.getElementById("Slider"+(n+1)).removeAttribute("hidden");
	document.getElementById("SliderM"+(n+1)).removeAttribute("hidden");
    Achieves[n+20]++;
	if (math.sum(Achieves.slice(20,30))==10){AchMult+=0.1}
  }
  if (positives[n]==100 && Achieves[n+30]==0){
    document.getElementById("A4C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n+30]++;
	if (math.sum(Achieves.slice(30,40))==10){
	AchMult+=0.1  
  }
  }
  if (Achieves[50]==0 && Math.max(positives)==1 && math.min(positives)==1 && Math.max(negatives)==1 && math.min(negatives)==1){
	  document.getElementById("A6C1").setAttribute("style","background-color: #5B5;");
	  Achieves[50]++;
	  pbaseCost[0]=9;
  }
  if (Achieves[53]==0 && positives==[1,3,3,7,0,0,0,0,0,0]){
	  Achieves[53]++;
	  document.getElementById("A6C4").setAttribute("style","background-color: #5B5;");
	  pbaseCost[3]=9e3
  }
	if (Achieves[54]==0 && positives==[2,18,5,1,4,0,0,0,0,0]){
	  Achieves[54]++;
	  document.getElementById("A6C5").setAttribute("style","background-color: #5B5;");
	  pbaseCost[4]=9e4
  }
	if (Achieves[57]==0 && positives==[2,1,7,21,5,20,20,5,0,0]){
	  Achieves[57]++;
	  document.getElementById("A6C8").setAttribute("style","background-color: #5B5;");
	  pbaseCost[3]=9e7
  }
  FormulaRewriter()
};
function IncrementCMn(n) {
  if (y>=pbaseCost[n]**(negatives[n]+1)) {
    y-=pbaseCost[n]**(negatives[n]+1);
  }  else{return};
  negatives[n]++;
  if (negatives[n]==1 && Achieves[n+40]==0){
    document.getElementById("A5C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n+40]++;
    if (n!=9){document.getElementById("CM"+(n+2)+"Tab").removeAttribute("hidden");}
	else {document.getElementById("NullUnlock").removeAttribute("hidden");}
	if (math.sum(Achieves.slice(40,50))==10){
	AchMult+=0.1  
  }
  }
  if (Achieves[50]==0 && math.max(positives)==1 && math.min(positives)==1 && math.max(negatives)==1 && math.min(negatives)==1){
	  document.getElementById("A6C1").setAttribute("style","background-color: #5B5;");
	  Achieves[50]++;
	  pbaseCost[0]=9;
  }
  FormulaRewriter()
};
function PrestigeNegative(){
	if (x<1e10){return};
	y+=math.floor(2**(math.log10(x)-10));
	if (Achieves[62]==0) {
		Achieves[62]++;
		document.getElementById("A7C3").setAttribute("style","background-color: #5B5;");
        document.getElementById("CM1Tab").removeAttribute("hidden");		
		};
	if (Achieves[61]==0 && OtherQuantity[1]==0){
		Achieves[61]++;
		document.getElementById("A7C2").setAttribute("style","background-color: #5B5;");
	}
	if (Achieves[59]==0 && math.max(positives.slice(1,10))==0){
		Achieves[59]++;
		document.getElementById("A6C10").setAttribute("style","background-color: #5B5;");
		pbaseCost[9]=9e9
	}
	MAX=1;
	x=0;
	coords=[0,0];
	LCoords=[]
	positives=[0,0,0,0,0,0,0,0,0,0];
	FicNeg=[0,0,0,0,0,0,0,0,0,0];
	OtherQuantity=[0,0];
	NPOW=0;
	qual=1, R=0;
	tickspeed=1000;
	FormulaRewriter();
}
function NPowIncrease(){
	for (i=9;0<i;i--){
		FicNeg[i-1]+=(FicNeg[i]+negatives[i])*negatives[i]*1e-4*tickspeed
	}
	NPOW+=(FicNeg[0]+negatives[0])*negatives[0]*1e-4*tickspeed
	if (x<1e10){document.getElementById('PrestigeN').innerHTML ="Need 1e10 DP";}
	else {document.getElementById('PrestigeN').innerHTML =(math.floor(2**(math.log10(x)-10))).toExponential(2);}
}
function PrestigeNull(){
	if (math.min(positives)>Zero && math.min(negatives)>Zero) {
		Zero++;
		MAX=1;
		x=0;
		y=0;
		NPOW=0;
		coords=[0,0];
		LCoords=[]
		positives=[0,0,0,0,0,0,0,0,0,0];
		negatives=[0,0,0,0,0,0,0,0,0,0];
		FicNeg=[0,0,0,0,0,0,0,0,0,0];
		pbaseCost=[10,100,1000,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
		OtherQuantity=[0,0];
		qual=1, R=0;
		tickspeed=1000;
		document.getElementById('C0V').innerHTML =-Zero;
		document.getElementById('Prestige0').innerHTML ="Need at least "+(Zero+1)+" of each other C";
		if (Zero==1 && Achieves[63]==0){
			document.getElementById("A7C4").setAttribute("style","background-color: #5B5;");
			Achieves[63]++;
		};
		if (Zero==6 && Achieves[64]==0){
			document.getElementById("A7C5").setAttribute("style","background-color: #5B5;");
			Achieves[64]++;
		};
  		FormulaRewriter();
	}
	else {return}
}

function GetAchieves(){
  for (i=0;i<70;i++){
    if (Achieves[i]!=0){
		Achieves[i]=1;
	  //document.getElementById("PCur").innerHTML = i+" "+"A"+math.floor(1+i/10)+"C"+((i)%10+1);
      document.getElementById("A"+math.floor(1+i/10)+"C"+((i)%10+1)).setAttribute("style","background-color: #5B5;");
      if (i<9) {document.getElementById("C"+(i+2)+"Tab").removeAttribute("hidden");}
	  if (i==9) {document.getElementById("PUnlock").removeAttribute("hidden");}
      if (9<i && i<19){AchMult+=0.01;}
	  if (i==19) {document.getElementById("MaxAll").removeAttribute("hidden");}
	  if (19<i && i<29){
		document.getElementById("Slider"+(i+1-20)).removeAttribute("hidden");
		document.getElementById("SliderM"+(i+1-20)).removeAttribute("hidden");
	  }
	  if (i<49 && 39<i) {document.getElementById("CM"+(i+2-40)+"Tab").removeAttribute("hidden");}
	  if (i==49) {
		  document.getElementById("NullUnlock").removeAttribute("hidden");
	  }
	if (i==60){
		document.getElementById("Help").removeAttribute("hidden");
	}
	  if (i==62){
		  document.getElementById("CM1Tab").removeAttribute("hidden");
	  }
    }
  }
  for (i=0;i<7;i++){
  if (math.sum(Achieves.slice(10*i,10*i+10))==10){
	AchMult+=0.1  
  }}
}
function FormulaRewriter(){
  document.getElementById('ACH').innerHTML =AchMult**math.sum(Achieves);
  document.getElementById('AcMult').innerHTML =AchMult;
  document.getElementById('C0V').innerHTML =-Zero;
  for (i=0;i<10;i++){
		if (positives[i]!=0){
		document.getElementById("C"+(i+1)+"V").innerHTML = positives[i];
		document.getElementById("C"+(i+1)+"T").removeAttribute("hidden");
		};
		if (negatives[i]!=0){
		document.getElementById("CM"+(i+1)+"V").innerHTML = negatives[i];
		document.getElementById("CM"+(i+1)+"T").removeAttribute("hidden");
		};
		document.getElementById("C"+(i+1)).innerHTML = positives[i];
		document.getElementById("C"+(i+1)+"c").innerHTML = "Cost : "+(pbaseCost[i]**(positives[i]+1)).toExponential(2)+"DP";
		document.getElementById("CM"+(i+1)).innerHTML = negatives[i];
		document.getElementById("CM"+(i+1)+"c").innerHTML = "Cost : "+(pbaseCost[i]**(negatives[i]+1)).toExponential(2)+"NP";
	};
	if (Achieves[61]==0){document.getElementById("QC").innerHTML = "Cost : "+(5**((OtherQuantity[1]+1)**1.5)).toExponential(3)+"DP";}
	else {document.getElementById("QC").innerHTML = "Cost : "+(5**((OtherQuantity[1]/2+1)**1.5)).toExponential(3)+"DP";}
	document.getElementById("TC").innerHTML = "Cost : "+(10**OtherQuantity[0]).toExponential(3)+"DP";
};

function MaxAll(){
	var j,k;
	for (k=0;k<10;k++){
		for (j=0;j<10;j++){
			IncrementCn(k);
		}
	}
}

var mainGameLoop = window.setInterval(function() { // runs the loop
	tickpart += 33;
	//var d = new Date();
	//var n = d.getTime();
	if (tickpart>=tickspeed) {
	//d=new Date();
	//n=d.getTime();
		tickpart -= tickspeed;
		loop();
	//console.log((new Date().getTime())-n);
	}
}, 33);

function loop() { // production
  NPowIncrease();
  myFunction();
}

function save() 
{ 
  localStorage.setItem('Max',MAX);
  localStorage.setItem("MCur",x);
  localStorage.setItem("PCur",y);
  localStorage.setItem("Zero",Zero);
  localStorage.setItem("Coords",coords);
  localStorage.setItem("PCN",positives);
  localStorage.setItem("NCN",negatives);
  localStorage.setItem("PBC",pbaseCost);
  localStorage.setItem("NPOW",NPOW);
  localStorage.setItem("NFIC",FicNeg);  
  localStorage.setItem("Other",OtherQuantity);
  localStorage.setItem("R",R);
  localStorage.setItem("Achieves",Achieves)
} 
function SReset(){
  MAX=1;
  x=0;
  y=0;
  Zero=0;
  NPOW=0;
  coords=[0,0];
  LCoords=[]
  positives=[0,0,0,0,0,0,0,0,0,0];
  negatives=[0,0,0,0,0,0,0,0,0,0];
  FicNeg=[0,0,0,0,0,0,0,0,0,0];
  OtherQuantity=[0,0];
  qual=1, R=0;
  tickspeed=1000;
}
function HReset(){
  for (i=0;i<70;i++){Achieves[i]=[0];}
  MAX=1;
  x=0;
  y=0;
  Zero=0;
  NPOW=0;
  coords=[0,0];
  LCoords=[]
  positives=[0,0,0,0,0,0,0,0,0,0];
  FicNeg=[0,0,0,0,0,0,0,0,0,0];
  pbaseCost=[10,100,1000,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
  negatives=[0,0,0,0,0,0,0,0,0,0];
  OtherQuantity=[0,0];
  qual=1, R=0;
  tickspeed=1000;
}
//loading all the stuff...
if(localStorage.MCur) {
  MAX=parseFloat(localStorage.Max);
  x=parseFloat(localStorage.MCur);
  y=parseFloat(localStorage.PCur);
  Zero=parseFloat(localStorage.Zero);
  NPOW=parseFloat(localStorage.NPOW);
  coords=localStorage.Coords.split(",").map(Number);
  positives=localStorage.PCN.split(",").map(Number);
  negatives=localStorage.NCN.split(",").map(Number);
  pbaseCost=localStorage.PBC.split(",").map(Number);
  FicNeg=localStorage.NFIC.split(",").map(Number);
  OtherQuantity=localStorage.Other.split(",").map(Number);
  R=parseInt(localStorage.R);
  Achieves=localStorage.Achieves.split(",").map(Number);
  tickspeed*=(10/11)**OtherQuantity[0];
  if (OtherQuantity[1]<8){qual=2**OtherQuantity[1];}
  else{qual=2**8}
  if (Achieves.length<70) {
	  for (i=Achieves.length; i<70; i++){Achieves[i]=[0];}
  }
  GetAchieves();
  FormulaRewriter();
}
document.getElementById("MCur").innerHTML = "Drawing points (DP) : "+x;
