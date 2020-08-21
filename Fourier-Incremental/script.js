// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// define variables that reference elements on our page
//Decimal.toExpPos= 2;
var coords, tickspeed, positives, negatives,i,FicNeg, Zero, LCoords, ARROWSOFHELL;
var Achieves=[0];
var BOOLEAN;
var DPSCALC;
for (i=0;i<70;i++){
  Achieves[i]=0
}
var Skills=[0];
for (i=0;i<65;i++){
  Skills[i]=0
}

var AUDIOFUCK = new AudioContext();
var O= AUDIOFUCK.createOscillator();
O.frequency.setValueAtTime(110, AUDIOFUCK.currentTime)
O.connect(AUDIOFUCK.destination)
O.start()
var MAX=1;
var SOUND=document.getElementById("AnnoyingSound")
var AchMult=1.01;
x=new Decimal(0); coords=[0,0]; y=new Decimal(0); NPOW=new Decimal(0); Zero=0; LCoords=[];
positives=[0,0,0,0,0,0,0,0,0,0];
negatives=[0,0,0,0,0,0,0,0,0,0];
FicNeg=[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)];
var pbaseCost=[10,100,1000,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
var OtherQuantity=[0,0];
var qual=1, R=0, I=2*Math.PI;
var tickpart=0;
tickspeed=1000;
function myFunction() {
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
  DPSCALC=Decimal.mul(MAX**(1+Skills[28]+Skills[40]+Skills[3]+Skills[30]+Skills[41]+Skills[53]+Skills[47]+Skills[24]+Skills[38])*(AchMult**math.sum(Achieves))*(2**OtherQuantity[1]),NPOW.plus(1).pow(1+Achieves[66]*0.1));
  DPSCALC=Decimal.mul(Decimal.add(1,Decimal.mul(0.1*Skills[27]+0.2*Skills[42]+0.3*Skills[20]+0.4*Skills[57],y.plus(1).log(10-8*Skills[14]))),Decimal.mul(Decimal.mul(Decimal.pow(1.5+0.1*Skills[0],positives[0]*(1+Achieves[30]*0.01*math.log10(negatives[9]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[29],positives[1]*(1+Achieves[31]*0.01*math.log10(negatives[8]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[31],positives[2]*(1+Achieves[32]*0.01*math.log10(negatives[7]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[7],positives[3]*(1+Achieves[33]*0.01*math.log10(negatives[6]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[34],positives[4]*(1+Achieves[34]*0.01*math.log10(negatives[5]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[35],positives[5]*(1+Achieves[35]*0.01*math.log10(negatives[4]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[9],positives[6]*(1+Achieves[36]*0.01*math.log10(negatives[3]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[48],positives[7]*(1+Achieves[37]*0.01*math.log10(negatives[2]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[49],positives[8]*(1+Achieves[38]*0.01*math.log10(negatives[1]+1))),Decimal.pow(1.5+0.1*Skills[26],positives[9]*(1+Achieves[39]*0.01*math.log10(negatives[0]+1)))))))))))),DPSCALC));
  if (tickspeed>33){x=x.plus(DPSCALC);}
  else {x=x.plus(DPSCALC.mul(33/tickspeed));}
  ctx.beginPath();
  ctx.strokeStyle="#000000";
  document.getElementById("MCur").innerHTML = "Drawing points (DP) : "+x.toPrecision(4);
  document.getElementById("DPS").innerHTML = Decimal.mul(DPSCALC,1000/tickspeed).toPrecision(4);
  if (Achieves[62]!=0){document.getElementById("PCur").innerHTML = "Negative points (NP) : "+y.toPrecision(4);}
  FourierCalculation(MAX);
  var real =([0,1,2,3,4,5,6,7,8,9]).map(t =>positives[t]*math.cos(parseInt(document.getElementById("Phi"+(t+1)).value)/50*Math.PI)/(2*math.sum(positives)+1)+negatives[t]*math.cos(parseInt(document.getElementById("PhiM"+(t+1)).value)/50*Math.PI)/(2*math.sum(negatives)+1));
  var imag =([0,1,2,3,4,5,6,7,8,9]).map(t =>positives[t]*math.sin(parseInt(document.getElementById("Phi"+(t+1)).value)/50*Math.PI)/(2*math.sum(positives)+1)-negatives[t]*math.sin(parseInt(document.getElementById("PhiM"+(t+1)).value)/50*Math.PI)/(2*math.sum(negatives)+1))
  real.unshift(0);imag.unshift(0);
  O.setPeriodicWave(AUDIOFUCK.createPeriodicWave(Float32Array.from(real),Float32Array.from(imag),{disableNormalization: true}));
  MAX=Math.max(MAX,Math.abs(coords[0]),Math.abs(coords[1]));
  LCoords.push(coords);
  if (document.getElementById("AUTOBUY").checked == true){  
	  if (Skills[58]==1){ReduceTickspeed();}
	  if (Skills[51]==1){ImproveQuality();}
	  if (Skills[63]==1){IncrementCMn(9);}
	  if (Skills[39]==1){IncrementCMn(8);}
	  if (Skills[61]==1){IncrementCMn(7);}
	  if (Skills[10]==1){IncrementCMn(6);}
	  if (Skills[8]==1){IncrementCMn(5);}
	  if (Skills[55]==1){IncrementCMn(4);}
	  if (Skills[5]==1){IncrementCMn(3);}
	  if (Skills[4]==1){IncrementCMn(2);}
	  if (Skills[17]==1){IncrementCMn(1);}
	  if (Skills[2]==1){IncrementCMn(0);}
	  if (Skills[1]==1){IncrementCn(0);}
	  if (Skills[52]==1){IncrementCn(1);}
	  if (Skills[21]==1){IncrementCn(2);}
	  if (Skills[33]==1){IncrementCn(3);}
	  if (Skills[45]==1){IncrementCn(4);}
	  if (Skills[56]==1){IncrementCn(5);}
	  if (Skills[12]==1){IncrementCn(6);}
	  if (Skills[60]==1){IncrementCn(7);}
	  if (Skills[13]==1){IncrementCn(8);}
	  if (Skills[50]==1){IncrementCn(9);}}
  
  if (Achieves[51]==0 && positives.toString()==[2,1,0,0,0,0,0,0,0,0].toString() && negatives.toString()==[2,1,0,0,0,0,0,0,0,0].toString() && parseInt(document.getElementById("Phi1").value)==100 && parseInt(document.getElementById("PhiM1").value)==100 && ((46<parseInt(document.getElementById("Phi2").value)<54 && parseInt(document.getElementById("PhiM2").value)==100)||(46<parseInt(document.getElementById("PhiM2").value)<54 && parseInt(document.getElementById("Phi2").value)==100))){
	Achieves[51]++;
	document.getElementById("A6C2").setAttribute("style","background-color: #5B5;");
	pbaseCost[1]=8.2e1
	SOUND.pause();SOUND.play();
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
  if (Achieves[65]==0 && x.gt('1e2520')){
    Achieves[65]++;
	SOUND.pause();SOUND.play();
    document.getElementById("A7C6").setAttribute("style","background-color: #5B5;");
  };
  if (Achieves[66]==0 && y.gt('1e2520')){
    Achieves[66]++;
	SOUND.pause();SOUND.play();
    document.getElementById("A7C7").setAttribute("style","background-color: #5B5;");
  };
  if (Achieves[67]==0 && positives.toString()==[1,1,2,3,5,8,13,21,34,55].toString() && negatives.toString()==[1,1,2,3,5,8,13,21,34,55].toString() && parseInt(document.getElementById("Phi1").value)==100 && parseInt(document.getElementById("PhiM1").value)==100 && parseInt(document.getElementById("Phi2").value)==100 && parseInt(document.getElementById("PhiM2")).value==50 && parseInt(document.getElementById("PhiM3").value)==100 && parseInt(document.getElementById("Phi3").value)==100 && parseInt(document.getElementById("Phi4").value)==100 && parseInt(document.getElementById("PhiM4").value)==50 && parseInt(document.getElementById("Phi5").value)==100 && parseInt(document.getElementById("PhiM5").value)==100 && parseInt(document.getElementById("PhiM6").value)==50 && parseInt(document.getElementById("Phi6").value)==100 && parseInt(document.getElementById("Phi7").value)==100 && parseInt(document.getElementById("PhiM7").value)==100 && parseInt(document.getElementById("PhiM8").value)==50 && parseInt(document.getElementById("Phi8").value)==100 && parseInt(document.getElementById("PhiM9").value)==100 && parseInt(document.getElementById("Phi9").value)==100 && parseInt(document.getElementById("PhiM10").value)==50 && parseInt(document.getElementById("Phi10").value)==100){
	Achieves[67]++;
	SOUND.pause();SOUND.play();
	document.getElementById("A7C8").setAttribute("style","background-color: #5B5;");
	document.getElementById("A7C8").removeAttribute("hidden");
  }
  for (i=0; i<10;i++){
	  document.getElementById("Phi"+(i+1)+"V").innerHTML = document.getElementById("Phi"+(i+1)).value/50+"&#960"
	  document.getElementById("PhiM"+(i+1)+"V").innerHTML = document.getElementById("PhiM"+(i+1)).value/50+"&#960"
  }
  document.getElementById("Phi0V").innerHTML = document.getElementById("Phi0").value/50+"&#960"
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
};

function ImproveQuality() {
  if (x.gte(Decimal.pow(5,(OtherQuantity[1]/(1+Achieves[61])+1)**1.5))) {
    x=x.minus(Decimal.pow(5,(OtherQuantity[1]/(1+Achieves[61])+1)**1.5));
  }  else{return};
  if (OtherQuantity[1]<8){qual*=2;}
  OtherQuantity[1]++;
if (Achieves[60]==0 && OtherQuantity[1]==5 && math.sum(positives)+math.sum(negatives)==0){
	Achieves[60]++;
	SOUND.pause();SOUND.play();
	document.getElementById("A7C1").setAttribute("style","background-color: #5B5;");
	document.getElementById("Help").removeAttribute("hidden");
}
	FormulaRewriter();
};
function ReduceTickspeed() {
  if (x.gte(Decimal.pow(10,OtherQuantity[0]))) {
    x=x.minus(Decimal.pow(10,OtherQuantity[0]));
  }  else{return};
  tickspeed*=10/11;
  OtherQuantity[0]++;
  FormulaRewriter();
};
function IncrementCn(n) {
  if (x.gte(Decimal.pow(pbaseCost[n],positives[n]+1))) {
    x=x.minus(Decimal.pow(pbaseCost[n],positives[n]+1));
  }  else{return};
  positives[n]++;
  if (positives[n]==1 && Achieves[n]==0){
    document.getElementById("A1C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n]++;
	SOUND.pause();SOUND.play();
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
	SOUND.pause();SOUND.play();
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
	SOUND.pause();SOUND.play();
	GetSkillTree();
	if (math.sum(Achieves.slice(20,30))==10){AchMult+=0.1}
  }
  if (positives[n]==100 && Achieves[n+30]==0){
    document.getElementById("A4C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n+30]++;
	SOUND.pause();SOUND.play();
	if (math.sum(Achieves.slice(30,40))==10){
	AchMult+=0.1  
  }
  }
  if (Achieves[50]==0 && math.max(positives)==1 && math.min(positives)==1 && math.max(negatives)==1 && math.min(negatives)==1){
	  document.getElementById("A6C1").setAttribute("style","background-color: #5B5;");
	  Achieves[50]++;
	SOUND.pause();SOUND.play();
	  pbaseCost[0]=9.1;
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
  if (Achieves[53]==0 && positives.toString()==[1,3,3,7,0,0,0,0,0,0].toString()){
	  Achieves[53]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C4").setAttribute("style","background-color: #5B5;");
	  pbaseCost[3]=6.4e3
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
	if (Achieves[54]==0 && positives.toString()==[2,18,5,1,4,0,0,0,0,0].toString()){
	  Achieves[54]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C5").setAttribute("style","background-color: #5B5;");
	  pbaseCost[4]=5.5e4
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
	if (Achieves[57]==0 && positives.toString()==[2,1,7,21,5,20,20,5,0,0].toString()){
	  Achieves[57]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C8").setAttribute("style","background-color: #5B5;");
	  pbaseCost[7]=2.8e7
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
    if (Achieves[55]==0 && positives.toString()==[6,6,6,6,6,6,0,0,0,0].toString() && negatives.toString()==[6,6,6,6,6,6,0,0,0,0].toString()){
	  Achieves[55]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C6").setAttribute("style","background-color: #5B5;");
	  pbaseCost[5]=4.6e5
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
    if (Achieves[56]==0 && positives.toString()==[7,0,0,7,0,0,7,0,0,0].toString()){
	  Achieves[56]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C7").setAttribute("style","background-color: #5B5;");
	  pbaseCost[6]=3.7e6
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
  if (Achieves[52]==0 && positives.toString()==[3,1,4,1,5,9,2,6,5,3].toString()){
	  Achieves[52]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C3").setAttribute("style","background-color: #5B5;");
	  pbaseCost[2]=7.3e2
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
  if (Achieves[58]==0 && negatives.toString()==[0,0,0,0,0,0,0,0,9,0].toString() && positives.toString()==[0,0,0,0,0,0,0,0,9,0].toString()){
	  Achieves[58]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C9").setAttribute("style","background-color: #5B5;");
	  pbaseCost[8]=1.9e8
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
  FormulaRewriter()
};
function IncrementCMn(n) {
  if (y.gte(Decimal.pow(pbaseCost[n],negatives[n]+1))) {
    y=y.minus(Decimal.pow(pbaseCost[n],negatives[n]+1));
  }  else{return};
  negatives[n]++;
  if (negatives[n]==1 && Achieves[n+40]==0){
    document.getElementById("A5C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n+40]++;
	SOUND.pause();SOUND.play();
    if (n!=9){document.getElementById("CM"+(n+2)+"Tab").removeAttribute("hidden");}
	else {document.getElementById("NullUnlock").removeAttribute("hidden");}
	if (math.sum(Achieves.slice(40,50))==10){
	AchMult+=0.1  
  }
  }
  if (Achieves[50]==0 && math.max(positives)==1 && math.min(positives)==1 && math.max(negatives)==1 && math.min(negatives)==1){
	  document.getElementById("A6C1").setAttribute("style","background-color: #5B5;");
	  Achieves[50]++;
	SOUND.pause();SOUND.play();
	  pbaseCost[0]=9.1;
	  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }
  }
  if (Achieves[55]==0 && positives.toString()==[6,6,6,6,6,6,0,0,0,0].toString() && negatives.toString()==[6,6,6,6,6,6,0,0,0,0].toString()){
	  Achieves[55]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C6").setAttribute("style","background-color: #5B5;");
	  pbaseCost[5]=4.6e5
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
  if (Achieves[58]==0 && negatives.toString()==[0,0,0,0,0,0,0,0,9,0].toString() && positives.toString()==[0,0,0,0,0,0,0,0,9,0].toString()){
	  Achieves[58]++;
	SOUND.pause();SOUND.play();
	  document.getElementById("A6C9").setAttribute("style","background-color: #5B5;");
	  pbaseCost[8]=1.9e8
  if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
  FormulaRewriter()
};
function PrestigeNegative(){
	if (x.lt(1e10)){return};
	y=y.plus(Decimal.pow(2.5+0.1*Achieves[65],x.log10()-10));
	if (Achieves[62]==0) {
		Achieves[62]++;
	SOUND.pause();SOUND.play();
		document.getElementById("A7C3").setAttribute("style","background-color: #5B5;");
        document.getElementById("CM1Tab").removeAttribute("hidden");		
		};
	if (Achieves[61]==0 && OtherQuantity[1]==0){
		Achieves[61]++;
	SOUND.pause();SOUND.play();
		document.getElementById("A7C2").setAttribute("style","background-color: #5B5;");
	}
	if (Achieves[59]==0 && math.max(positives.slice(1,10))==0){
		Achieves[59]++;
	SOUND.pause();SOUND.play();
		document.getElementById("A6C10").setAttribute("style","background-color: #5B5;");
		pbaseCost[9]=1e9
	if (math.sum(Achieves.slice(50,60))==10){
		AchMult+=0.1  
	  }}
	MAX=1;
	x=new Decimal(0);
	coords=[0,0];
	LCoords=[]
	positives=[0,0,0,0,0,0,0,0,0,0];
	FicNeg=[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)];
	OtherQuantity=[0,0];
	NPOW=new Decimal(0);
	qual=1, R=0;
	tickspeed=1000;
	tickpart=0;
	FormulaRewriter();
}
function NPowIncrease(){
	FicNeg[8]=FicNeg[8].plus(FicNeg[9].plus(negatives[9]).mul((1.33+0.17*Skills[15])**(negatives[9]*(1+Achieves[30]*0.01*math.log10(1+positives[0])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	FicNeg[7]=FicNeg[7].plus(FicNeg[8].plus(negatives[8]).mul((1.33+0.17*Skills[62])**(negatives[8]*(1+Achieves[31]*0.01*math.log10(1+positives[1])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	FicNeg[6]=FicNeg[6].plus(FicNeg[7].plus(negatives[7]).mul((1.33+0.17*Skills[59])**(negatives[7]*(1+Achieves[32]*0.01*math.log10(1+positives[2])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	FicNeg[5]=FicNeg[5].plus(FicNeg[6].plus(negatives[6]).mul((1.33+0.17*Skills[11])**(negatives[6]*(1+Achieves[33]*0.01*math.log10(1+positives[3])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	FicNeg[4]=FicNeg[4].plus(FicNeg[5].plus(negatives[5]).mul((1.33+0.17*Skills[23])**(negatives[5]*(1+Achieves[34]*0.01*math.log10(1+positives[4])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	FicNeg[3]=FicNeg[3].plus(FicNeg[4].plus(negatives[4]).mul((1.33+0.17*Skills[46])**(negatives[4]*(1+Achieves[35]*0.01*math.log10(1+positives[5])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	FicNeg[2]=FicNeg[2].plus(FicNeg[3].plus(negatives[3]).mul((1.33+0.17*Skills[22])**(negatives[3]*(1+Achieves[36]*0.01*math.log10(1+positives[6])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	FicNeg[1]=FicNeg[1].plus(FicNeg[2].plus(negatives[2]).mul((1.33+0.17*Skills[19])**(negatives[2]*(1+Achieves[37]*0.01*math.log10(1+positives[7])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	FicNeg[0]=FicNeg[0].plus(FicNeg[1].plus(negatives[1]).mul((1.33+0.17*Skills[43])**(negatives[1]*(1+Achieves[38]*0.01*math.log10(1+positives[8])*math.log(2+8*Skills[25])/math.log(2)))*0.033))
	NPOW=NPOW.plus(FicNeg[0].plus(negatives[0]).mul((1.33+0.17*Skills[18])**(negatives[0]*(1+Achieves[39]*0.01*math.log10(1+positives[9])*math.log(2+8*Skills[25])/math.log(2)))*0.033));
	if (x.lt(1e10)){document.getElementById('PrestigeN').innerHTML ="Need 1e10 DP";}
	else {
		document.getElementById('PrestigeN').innerHTML =Decimal.pow(2.5+0.1*Achieves[65],x.log10()-10).toExponential(3);
		y=y.plus(Decimal.mul(Decimal.pow(2.5+0.1*Achieves[65],x.log10()-10),(0.01*(Skills[16]+Skills[32]+Skills[44]+Skills[6]+Skills[36]+5*Skills[37]))*0.033));
	}
}
function PrestigeNull(){
	if (math.min(positives)>Zero && math.min(negatives)>Zero) {
		Zero++;
		if (Skills[54]==1){
		for (i=Zero;i<math.min([math.min(positives),math.min(negatives)]);i++){
			Zero++;
		}}
		MAX=1;
		x=new Decimal(0);
		y=new Decimal(0);
		NPOW=new Decimal(0);
		coords=[0,0];
		LCoords=[]
		tickpart=0;
		positives=[0,0,0,0,0,0,0,0,0,0];
		negatives=[0,0,0,0,0,0,0,0,0,0];
		FicNeg=[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)];
		OtherQuantity=[0,0];
		qual=1, R=0;
		tickspeed=1000;
		if (Zero==1 && Achieves[63]==0){
			document.getElementById("A7C4").setAttribute("style","background-color: #5B5;");
			document.getElementById("SkillTreeB").removeAttribute("hidden");
			Achieves[63]++;
	SOUND.pause();SOUND.play();
		};
		if (Zero==6 && Achieves[64]==0){
			document.getElementById("A7C5").setAttribute("style","background-color: #5B5;");
			document.getElementById("Slider0").removeAttribute("hidden");
			Achieves[64]++;
	SOUND.pause();SOUND.play();
		};
  		FormulaRewriter();
	}
	else {return}
}

function GetSkill(n){
	if (Zero-math.sum(Skills.slice(0,64))>=1){
		document.getElementById("SB"+n).setAttribute("hidden",true);
		Skills[n]=1
		if (Achieves[69]==0 && Skills.slice(0,64).toString()==[1,1,1,0,1,1,0,0,0,0,0,1,1,1,1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,0,0,1,1,0,0,0,1,0,1,1,1,0,0,1,1,0,0,0,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,1].toString()){
		Achieves[69]++;
	SOUND.pause();SOUND.play();}
		if (n==0){//C1 pow
			document.getElementById("ST1").removeAttribute("hidden");
			document.getElementById("SV1").setAttribute("style","display:none");
			document.getElementById("Slider1").setAttribute("hidden",true);
			document.getElementById("Phi1").value=75;
		}
		if (n==1){//C1.s
			document.getElementById("SV2").setAttribute("style","display:none");
			document.getElementById("ST2").removeAttribute("hidden");
		}
		if (n==3){//DistMult
			document.getElementById("SV18").setAttribute("style","display:none");
			document.getElementById("ST18").removeAttribute("hidden");
		}
		if (n==6){//1% NP.s
			document.getElementById("SV21").setAttribute("style","display:none");
			document.getElementById("SV7").setAttribute("style","display:none");
			document.getElementById("ST21").removeAttribute("hidden");
			document.getElementById("ST7").removeAttribute("hidden");
		}
		if (n==7){//C4 pow
			document.getElementById("SV22").setAttribute("style","display:none");
			document.getElementById("ST22").removeAttribute("hidden");
		    document.getElementById("Slider4").setAttribute("hidden",true);
			document.getElementById("Phi4").value=25+50/4;
		}
		if (n==9){//C7 pow
			document.getElementById("SV8").setAttribute("style","display:none");
			document.getElementById("SV10").setAttribute("style","display:none");
			document.getElementById("ST8").removeAttribute("hidden");
		    document.getElementById("ST10").removeAttribute("hidden");
		    document.getElementById("Slider7").setAttribute("hidden",true);
			document.getElementById("Phi7").value=25+50/7;
		}
		if (n==11){//NEW C-7 pow
			document.getElementById("SV12").setAttribute("style","display:none");
			document.getElementById("ST12").removeAttribute("hidden");
		    document.getElementById("SliderM7").setAttribute("hidden",true);
			document.getElementById("PhiM7").value=50/7;
		}
		if (n==12){//NEW C7.s
			document.getElementById("SV13").setAttribute("style","display:none");
			document.getElementById("ST13").removeAttribute("hidden");
		}
		if (n==14){//NEW Log2 change
			document.getElementById("SV25").setAttribute("style","display:none");
			document.getElementById("ST25").removeAttribute("hidden");
		}
		if (n==15){//NEW C-10 pow
			document.getElementById("SliderM10").setAttribute("hidden",true);
			document.getElementById("PhiM10").value=50/10;
		}
		if (n==16){//1% NP.s
			document.getElementById("SV0").setAttribute("style","display:none");
			document.getElementById("ST0").removeAttribute("hidden");
		}
		if (n==18){//C-1 pow
			document.getElementById("SV30").setAttribute("style","display:none");
			document.getElementById("ST30").removeAttribute("hidden");
			document.getElementById("SliderM1").setAttribute("hidden",true);
			document.getElementById("PhiM1").value=50;
		}
		if (n==19){//C-3 pow
			document.getElementById("SV4").setAttribute("style","display:none");
			document.getElementById("ST4").removeAttribute("hidden");
			document.getElementById("SliderM3").setAttribute("hidden",true);
			document.getElementById("PhiM3").value=50/3;
		}
		if (n==20){//NP log 0.3
			document.getElementById("SV5").setAttribute("style","display:none");
			document.getElementById("ST5").removeAttribute("hidden");
		}
		if (n==21){//C3.s
			document.getElementById("SV33").setAttribute("style","display:none");
			document.getElementById("ST33").removeAttribute("hidden");
		}
		if (n==22){//C-4 pow
			document.getElementById("SV34").setAttribute("style","display:none");
			document.getElementById("ST34").removeAttribute("hidden");
			document.getElementById("SliderM4").setAttribute("hidden",true);
			document.getElementById("PhiM4").value=50/4;
		}
		if (n==23){//C-6 pow
			document.getElementById("SV9").setAttribute("style","display:none");
			document.getElementById("ST9").removeAttribute("hidden");
			document.getElementById("SliderM6").setAttribute("hidden",true);
			document.getElementById("PhiM6").value=50/6;
		}
		if (n==24){//NEW DistMult
			document.getElementById("SV11").setAttribute("style","display:none");
			document.getElementById("ST11").removeAttribute("hidden");
		}
		if (n==25){//NEW DistMult
			document.getElementById("SV38").setAttribute("style","display:none");
			document.getElementById("ST38").removeAttribute("hidden");
		}
		if (n==26){//NEW C10 pow
			document.getElementById("SV15").setAttribute("style","display:none");
			document.getElementById("ST15").removeAttribute("hidden");
			document.getElementById("Slider10").setAttribute("hidden",true);
			document.getElementById("Phi10").value=25+50/10;
		}
		if (n==27){//NP log 0.1
			document.getElementById("SV16").setAttribute("style","display:none");
			document.getElementById("SV40").setAttribute("style","display:none");
			document.getElementById("ST16").removeAttribute("hidden");
			document.getElementById("ST40").removeAttribute("hidden");
		}
		if (n==28){//DistMult
			document.getElementById("SV27").setAttribute("style","display:none");
			document.getElementById("ST27").removeAttribute("hidden");
		}
		if (n==29){//C2 Pow
			document.getElementById("SV17").setAttribute("style","display:none");
			document.getElementById("ST17").removeAttribute("hidden");
			document.getElementById("Slider2").setAttribute("hidden",true);
			document.getElementById("Phi2").value=25+50/2;
		}
		if (n==30){//DistMult
			document.getElementById("SV42").setAttribute("style","display:none");
			document.getElementById("ST42").removeAttribute("hidden");
		}
		if (n==31){//C3 Pow
			document.getElementById("SV19").setAttribute("style","display:none");
			document.getElementById("ST19").removeAttribute("hidden");
		    document.getElementById("Slider3").setAttribute("hidden",true);
			document.getElementById("Phi3").value=25+50/3;
			}
		if (n==32){//1% NP.s
			document.getElementById("SV20").setAttribute("style","display:none");
			document.getElementById("ST20").removeAttribute("hidden");
		}		
		if (n==33){//C4.s
			document.getElementById("SV45").setAttribute("style","display:none");
			document.getElementById("ST45").removeAttribute("hidden");
		}
		if (n==34){//C5 pow
			document.getElementById("SV46").setAttribute("style","display:none");
			document.getElementById("ST46").removeAttribute("hidden");
			document.getElementById("Slider5").setAttribute("hidden",true);
			document.getElementById("Phi5").value=25+50/5;
		}
		if (n==35){//C6 pow
			document.getElementById("SV23").setAttribute("style","display:none");
			document.getElementById("SV47").setAttribute("style","display:none");
			document.getElementById("ST47").removeAttribute("hidden");
			document.getElementById("ST23").removeAttribute("hidden");
			document.getElementById("Slider6").setAttribute("hidden",true);
			document.getElementById("Phi6").value=25+50/6;
		}
		if (n==36){//NEW 1% NP.s
			document.getElementById("SV37").setAttribute("style","display:none");
			document.getElementById("SV24").setAttribute("style","display:none");
			document.getElementById("SV48").setAttribute("style","display:none");
			document.getElementById("ST37").removeAttribute("hidden");
			document.getElementById("ST24").removeAttribute("hidden");
			document.getElementById("ST48").removeAttribute("hidden");
		}
		if (n==38){//NEW C7.s
			document.getElementById("SV39").setAttribute("style","display:none");
			document.getElementById("SV49").setAttribute("style","display:none");
			document.getElementById("ST39").removeAttribute("hidden");
			document.getElementById("ST49").removeAttribute("hidden");
		}
		if (n==39){//NEW C-9.s
			document.getElementById("SV26").setAttribute("style","display:none");
			document.getElementById("SV50").setAttribute("style","display:none");
			document.getElementById("ST26").removeAttribute("hidden");
			document.getElementById("ST50").removeAttribute("hidden");
		}
		if (n==40){//DistMult
			document.getElementById("SV51").setAttribute("style","display:none");
			document.getElementById("ST51").removeAttribute("hidden");
		}
		if (n==41){//DistMult
			document.getElementById("SV29").setAttribute("style","display:none");
			document.getElementById("ST29").removeAttribute("hidden");
		}
		if (n==42){//NP log 0.2
			document.getElementById("SV52").setAttribute("style","display:none");
			document.getElementById("ST52").removeAttribute("hidden");
		}
		if (n==43){//C-2 Pow
			document.getElementById("SV31").setAttribute("style","display:none");
			document.getElementById("ST31").removeAttribute("hidden");
			document.getElementById("SliderM2").setAttribute("hidden",true);
			document.getElementById("PhiM2").value=50/2;
		}
		if (n==44){//1% NP.s
			document.getElementById("SV32").setAttribute("style","display:none");
			document.getElementById("ST32").removeAttribute("hidden");
		}
		if (n==45){//C5.s
			document.getElementById("SV54").setAttribute("style","display:none");
			document.getElementById("ST54").removeAttribute("hidden");
		}
		if (n==46){//C-5 pow
			document.getElementById("SV55").setAttribute("style","display:none");
			document.getElementById("ST55").removeAttribute("hidden");
			document.getElementById("SliderM5").setAttribute("hidden",true);
			document.getElementById("PhiM5").value=50/5;
		}
		if (n==47){//DistMult
			document.getElementById("SV57").setAttribute("style","display:none");
			document.getElementById("ST57").removeAttribute("hidden");
		}
		if (n==48){//NEW C8 pow
			document.getElementById("SV59").setAttribute("style","display:none");
			document.getElementById("ST59").removeAttribute("hidden");
			document.getElementById("Slider8").setAttribute("hidden",true);
			document.getElementById("Phi8").value=25+50/8;
		}
		if (n==49){//NEW C9 pow
			document.getElementById("SV62").setAttribute("style","display:none");
			document.getElementById("ST62").removeAttribute("hidden");
			document.getElementById("Slider9").setAttribute("hidden",true);
			document.getElementById("Phi9").value=25+50/9;
		}
		if (n==50){//NEW C10.s
			document.getElementById("SV63").setAttribute("style","display:none");
			document.getElementById("ST63").removeAttribute("hidden");
		}
		if (n==52){//C2.s
			document.getElementById("SV41").setAttribute("style","display:none");
			document.getElementById("ST41").removeAttribute("hidden");
		}
		if (n==53){//DistMult
			document.getElementById("SV43").setAttribute("style","display:none");
			document.getElementById("SV44").setAttribute("style","display:none");
			document.getElementById("ST43").removeAttribute("hidden");
		    document.getElementById("ST44").removeAttribute("hidden");
		}
		if (n==57){//NP log 0.4
			document.getElementById("SV56").setAttribute("style","display:none");
			document.getElementById("SV58").setAttribute("style","display:none");
			document.getElementById("ST56").removeAttribute("hidden");
			document.getElementById("ST58").removeAttribute("hidden");
		}
		if (n==59){//NEW C-8 pow
			document.getElementById("SV60").setAttribute("style","display:none");
			document.getElementById("ST60").removeAttribute("hidden");
			document.getElementById("SliderM8").setAttribute("hidden",true);
			document.getElementById("PhiM8").value=50/8;
		}
		if (n==60){//NEW C8.s
			document.getElementById("SV61").setAttribute("style","display:none");
			document.getElementById("ST61").removeAttribute("hidden");
		}
		if (n==62){//NEW C-9 pow
			document.getElementById("SliderM9").setAttribute("hidden",true);
			document.getElementById("PhiM9").value=50/9;
		}
		if (n==2 || n==63 || n==62 || n==15 || n==51 || n==17 || n==4 || n==5 || n==54 || n==55 || n==8 || n==10 || n==56 || n==58 || n==13 || n==37 || n==61){
			if (Skills[64]==0 && Skills[2]==1 && Skills[51]==1){
				Skills[64]++;
				document.getElementById("SV3").setAttribute("style","display:none");
				document.getElementById("ST3").removeAttribute("hidden");
			}
			if (Skills[64]==1 && Skills[2]==1 && Skills[51]==1 && Skills[17]==1){
				Skills[64]++;
				document.getElementById("SV53").setAttribute("style","display:none");
				document.getElementById("ST53").removeAttribute("hidden");
			}
			if (Skills[64]==2 && Skills[2]==1 && Skills[51]==1 && Skills[17]==1 && Skills[4]==1 && Skills[5]==1 ){
				Skills[64]++;
				document.getElementById("SV6").setAttribute("style","display:none");
				document.getElementById("ST6").removeAttribute("hidden");
			}
			if (Skills[64]==3 && Skills[2]==1 && Skills[51]==1 && Skills[17]==1 && Skills[4]==1 && Skills[5]==1 && Skills[54]==1 && Skills[55]==1){
				Skills[64]++;
				document.getElementById("SV35").setAttribute("style","display:none");
				document.getElementById("ST35").removeAttribute("hidden");
			}
			if (Skills[64]==4 && Skills[2]==1 && Skills[51]==1 && Skills[17]==1 && Skills[4]==1 && Skills[5]==1 && Skills[54]==1 && Skills[55]==1 && Skills[56]==1 && Skills[58]==1 && Skills[8]==1 && Skills[10]==1){
				Skills[64]++;
				document.getElementById("SV36").setAttribute("style","display:none");
				document.getElementById("ST36").removeAttribute("hidden");
			}
			if (Skills[64]==5 && Skills[2]==1 && Skills[51]==1 && Skills[17]==1 && Skills[4]==1 && Skills[5]==1 && Skills[54]==1 && Skills[55]==1 && Skills[56]==1 && Skills[58]==1 && Skills[8]==1 && Skills[10]==1 && Skills[13]==1 && Skills[37]==1 && Skills[61]==1){
				Skills[64]++;
				document.getElementById("SV14").setAttribute("style","display:none");
				document.getElementById("ST14").removeAttribute("hidden");
			}
			if (math.sum(Skills.slice(0,64))==64){
				document.getElementById("THELASTBUTTON").removeAttribute("hidden");
			}
		}
		document.getElementById("NBNullif").innerHTML=(Zero-math.sum(Skills.slice(0,64)));
	}
	else {return}
}

function GetAchieves(){
  for (i=0;i<70;i++){
    if (Achieves[i]!=0){
		Achieves[i]=1;
	  //document.getElementById("PCur").innerHTML = i+" "+"A"+math.floor(1+i/10)+"C"+((i)%10+1);
      document.getElementById("A"+math.floor(1+i/10)+"C"+((i)%10+1)).setAttribute("style","background-color: #5B5;");
      document.getElementById("A"+math.floor(1+i/10)+"C"+((i)%10+1)).removeAttribute("hidden");
      if (i<9) {document.getElementById("C"+(i+2)+"Tab").removeAttribute("hidden");}
	  if (i==9) {document.getElementById("PUnlock").removeAttribute("hidden");}
      if (9<i && i<19){AchMult+=0.01;}
	  if (i==19) {document.getElementById("MaxAll").removeAttribute("hidden");}
	  if (19<i && i<=29){
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
	if (i==63){
		document.getElementById("SkillTreeB").removeAttribute("hidden");
	};
	if (i==64){
		document.getElementById("Slider0").removeAttribute("hidden");
	};
	if (i==50){
		pbaseCost[0]=9.1;
	}
	if (i==51){
		pbaseCost[1]=82;
	}
	if (i==52){
		pbaseCost[2]=7.3e2;
	}
	if (i==53){
		pbaseCost[3]=6.4e3;
	}
	if (i==54){
		pbaseCost[4]=5.5e4;
	}
	if (i==55){
		pbaseCost[5]=4.6e5;
	}
	if (i==56){
		pbaseCost[6]=3.7e6;
	}
	if (i==57){
		pbaseCost[7]=2.8e7;
	}
	if (i==58){
		pbaseCost[8]=1.9e8;
	}
	if (i==59){
		pbaseCost[9]=1e9;
	}
    }
  }
  for (i=0;i<7;i++){
  if (math.sum(Achieves.slice(10*i,10*i+10))==10){
	AchMult+=0.1  
  }}
}
function GetSkillTree(){
	Zero++;
	for (i=0;i<64;i++){
		if (Skills[i]==1){GetSkill(i)}
	}
	Zero--;
	document.getElementById("NBNullif").innerHTML=(Zero-math.sum(Skills.slice(0,64)));
	if (Skills[64]>0){
		document.getElementById("SV3").setAttribute("style","display:none");
		document.getElementById("ST3").removeAttribute("hidden");
		if (Skills[64]>1){
			document.getElementById("SV53").setAttribute("style","display:none");
			document.getElementById("ST53").removeAttribute("hidden");
		if (Skills[64]>2){
			document.getElementById("SV6").setAttribute("style","display:none");
			document.getElementById("ST6").removeAttribute("hidden");
		if (Skills[64]>3){
			document.getElementById("SV35").setAttribute("style","display:none");
			document.getElementById("ST35").removeAttribute("hidden");
		if (Skills[64]>4){
			document.getElementById("SV36").setAttribute("style","display:none");
			document.getElementById("ST36").removeAttribute("hidden");
		if (Skills[64]>5){
			document.getElementById("SV14").setAttribute("style","display:none");
			document.getElementById("ST14").removeAttribute("hidden");
		}}}}}
	}
}
function FormulaRewriter(){
  document.getElementById('ACH').innerHTML =AchMult**math.sum(Achieves);
  document.getElementById('AcMult').innerHTML =AchMult;
  document.getElementById('C0V').innerHTML =-Zero;
  for (i=0;i<10;i++){
		document.getElementById("C"+(i+1)+"V").innerHTML = positives[i];
		document.getElementById("C"+(i+1)+"T").removeAttribute("hidden");
		document.getElementById("CM"+(i+1)+"V").innerHTML = negatives[i];
		document.getElementById("CM"+(i+1)+"T").removeAttribute("hidden");
		document.getElementById("C"+(i+1)).innerHTML = positives[i];
		document.getElementById("C"+(i+1)+"c").innerHTML = "Cost : "+Decimal.pow(pbaseCost[i],positives[i]+1).toPrecision(4)+"DP";
		document.getElementById("CM"+(i+1)).innerHTML = negatives[i];
		document.getElementById("CM"+(i+1)+"c").innerHTML = "Cost : "+Decimal.pow(pbaseCost[i],negatives[i]+1).toPrecision(4)+"NP";
	};
	if (Achieves[61]==0){document.getElementById("QC").innerHTML = "Cost : "+Decimal.pow(5,(OtherQuantity[1]+1)**1.5).toPrecision(4)+"DP";}
	else {document.getElementById("QC").innerHTML = "Cost : "+Decimal.pow(5,(OtherQuantity[1]/2+1)**1.5).toPrecision(4)+"DP";}
	document.getElementById("TC").innerHTML = "Cost : "+Decimal.pow(10,OtherQuantity[0]).toPrecision(4)+"DP";
	document.getElementById('C0V').innerHTML =-Zero;
	document.getElementById('Prestige0').innerHTML ="Need at least "+(Zero+1)+" of each other C";
};

function MaxAll(){
	var j,k;
	for (k=0;k<10;k++){
		ImproveQuality();
		ReduceTickspeed();
		for (j=0;j<10;j++){
			IncrementCn(9-k);
			IncrementCMn(9-k);
		}
	}
}
function THELASTCLICK(){
	if (math.sum(Skills.slice(0,64))==64 && Zero>=100){
	SOUND.pause();SOUND.play();
		document.getElementById("CODES").removeAttribute("hidden")
		for (i=0;i<10;i++){
			document.getElementById("Slider"+(i+1)).removeAttribute("hidden");
			document.getElementById("SliderM"+(i+1)).removeAttribute("hidden");
		}
	}
	else {return}
}
var tickpart2=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
	tickpart += 33;
	tickpart2+=33;
	//var d = new Date();
	//var n = d.getTime();
	if (tickpart>=tickspeed) {
	//d=new Date();
	//n=d.getTime();
		tickpart -= tickspeed;
		loop();
	}
	if (tickpart2>=10000){
		tickpart2-=10000
		if (document.getElementById("Autosave").checked == true){save();}
	//console.log((new Date().getTime())-n);
	}
}, 33);

function loop() { // production
  NPowIncrease();
  myFunction();
}

function ResetST(){
	MAX=1;
	x=new Decimal(0);
	y=new Decimal(0);
	NPOW=new Decimal(0);
	coords=[0,0];
	LCoords=[]
	positives=[0,0,0,0,0,0,0,0,0,0];
	negatives=[0,0,0,0,0,0,0,0,0,0];
	FicNeg=[new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)];
	OtherQuantity=[0,0];
	qual=1, R=0;
	tickspeed=1000;
	FormulaRewriter();
	for (i=0;i<64;i++){
		Skills[i]=0;
		document.getElementById("SB"+i).removeAttribute("hidden");
		if (i!=28){
		document.getElementById("SV"+i).removeAttribute("style");
		document.getElementById("ST"+i).setAttribute("hidden",true);}
	}
	for (i=0;i<10;i++){
	document.getElementById("Slider"+(i+1)).removeAttribute("hidden");
	document.getElementById("SliderM"+(i+1)).removeAttribute("hidden");
	}
	document.getElementById("NBNullif").innerHTML=(Zero-math.sum(Skills.slice(0,64)));
	if (Skills[64]>0){
		document.getElementById("SV3").setAttribute("style","display:none");
		document.getElementById("ST3").removeAttribute("hidden");
		if (Skills[64]>1){
			document.getElementById("SV53").setAttribute("style","display:none");
			document.getElementById("ST53").removeAttribute("hidden");
			if (Skills[64]>2){
				document.getElementById("SV6").setAttribute("style","display:none");
				document.getElementById("ST6").removeAttribute("hidden");
				if (Skills[64]>3){
					document.getElementById("SV35").setAttribute("style","display:none");
					document.getElementById("ST35").removeAttribute("hidden");
					if (Skills[64]>4){
						document.getElementById("SV36").setAttribute("style","display:none");
						document.getElementById("ST36").removeAttribute("hidden");
						if (Skills[64]>5){
							document.getElementById("SV14").setAttribute("style","display:none");
							document.getElementById("ST14").removeAttribute("hidden");
						}
					}
				}
			}
		}
	}
}
if(!(localStorage.lastTick)){localStorage.lastTick=Date.now();}
function save() { 
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
  localStorage.setItem("Achieves",Achieves);
  localStorage.setItem("Skills",Skills);
  localStorage.setItem("lastTick",Date.now());
  localStorage.setItem("AutoBuy",document.getElementById("AUTOBUY").checked)
} 
function SReset(){
	BOOLEAN=confirm("Are you sure you want to Soft Reset?")
	if (BOOLEAN){
  Zero=0;
  ResetST();
  Skills=[0];
	for (i=0;i<65;i++){
	Skills[i]=0
	}
	GetSkillTree()
	}}
function HReset(){
  BOOLEAN=confirm("Are you sure you want to Hard Reset?")
	if (BOOLEAN){
  for (i=0;i<70;i++){Achieves[i]=[0];}
  Zero=0;
  pbaseCost=[10,100,1000,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
  ResetST();
  Skills=[0];
	for (i=0;i<65;i++){
	Skills[i]=0
	}
	GetSkillTree()
}}
//loading all the stuff...
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
  if (loadgame=="Fermat" && Achieves[68]==0){
	  Achieves[68]++;
	SOUND.pause();SOUND.play();
	document.getElementById("A7C9").setAttribute("style","background-color: #5B5;");
	document.getElementById("A7C9").removeAttribute("hidden");
  }
  else {
	  if (loadgame !="" ) {
	  AchMult=1.01;
	  LCoords=[];
	  R=0;
	  tickpart=0;
	  tickspeed=1000;
	  loadgame=JSON.parse(atob(loadgame));
	  MAX=parseFloat(loadgame.Max);
	  x=new Decimal(loadgame.MCur);
	  y=new Decimal(loadgame.PCur);
	  Zero=parseFloat(loadgame.Zero);
	  NPOW=new Decimal(loadgame.NPOW);
	  coords=loadgame.Coords.split(",").map(Number);
	  positives=loadgame.PCN.split(",").map(Number);
	  negatives=loadgame.NCN.split(",").map(Number);
	  pbaseCost=loadgame.PBC.split(",").map(Number);
	  FicNeg=loadgame.NFIC.split(",").map(DECTIMAL);
	  OtherQuantity=loadgame.Other.split(",").map(Number);
	  R=parseInt(loadgame.R);
	  Achieves=loadgame.Achieves.split(",").map(Number);
	  if (loadgame.Skills) {Skills=loadgame.Skills.split(",").map(Number);}
	  if (Boolean(loadgame.AutoBuy)){document.getElementById("AUTOBUY").setAttribute("checked",true)}
		tickspeed*=(10/11)**OtherQuantity[0];
	  if (OtherQuantity[1]<8){qual=2**OtherQuantity[1];}
	  else{qual=2**8}
	  if (Achieves.length<70) {
		  for (i=Achieves.length; i<70; i++){Achieves[i]=[0];}
	  } 
	  var diff =(Date.now()-parseInt(loadgame.lastTick))/33;
	  GetAchieves();
	  GetSkillTree();
	  FormulaRewriter();
	FicNeg[8]=FicNeg[8].plus(FicNeg[9].plus(negatives[9]).mul((1.33+0.17*Skills[15])**(negatives[9]*(1+Achieves[30]*0.01*math.log10(1+positives[0])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[7]=FicNeg[7].plus(FicNeg[8].plus(negatives[8]).mul((1.33+0.17*Skills[62])**(negatives[8]*(1+Achieves[31]*0.01*math.log10(1+positives[1])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[6]=FicNeg[6].plus(FicNeg[7].plus(negatives[7]).mul((1.33+0.17*Skills[59])**(negatives[7]*(1+Achieves[32]*0.01*math.log10(1+positives[2])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[5]=FicNeg[5].plus(FicNeg[6].plus(negatives[6]).mul((1.33+0.17*Skills[11])**(negatives[6]*(1+Achieves[33]*0.01*math.log10(1+positives[3])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[4]=FicNeg[4].plus(FicNeg[5].plus(negatives[5]).mul((1.33+0.17*Skills[23])**(negatives[5]*(1+Achieves[34]*0.01*math.log10(1+positives[4])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[3]=FicNeg[3].plus(FicNeg[4].plus(negatives[4]).mul((1.33+0.17*Skills[46])**(negatives[4]*(1+Achieves[35]*0.01*math.log10(1+positives[5])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[2]=FicNeg[2].plus(FicNeg[3].plus(negatives[3]).mul((1.33+0.17*Skills[22])**(negatives[3]*(1+Achieves[36]*0.01*math.log10(1+positives[6])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[1]=FicNeg[1].plus(FicNeg[2].plus(negatives[2]).mul((1.33+0.17*Skills[19])**(negatives[2]*(1+Achieves[37]*0.01*math.log10(1+positives[7])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[0]=FicNeg[0].plus(FicNeg[1].plus(negatives[1]).mul((1.33+0.17*Skills[43])**(negatives[1]*(1+Achieves[38]*0.01*math.log10(1+positives[8])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	NPOW=NPOW.plus(FicNeg[0].plus(negatives[0]).mul((1.33+0.17*Skills[18])**(negatives[0]*(1+Achieves[39]*0.01*math.log10(1+positives[9])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff));
	if (x.lt(1e10)){document.getElementById('PrestigeN').innerHTML ="Need 1e10 DP";}
	else {
		document.getElementById('PrestigeN').innerHTML =Decimal.pow(2.5+0.1*Achieves[65],x.log10()-10).toExponential(3);
		y=y.plus(Decimal.mul(Decimal.pow(2.5+0.1*Achieves[65],x.log10()-10),(0.01*(Skills[16]+Skills[32]+Skills[44]+Skills[6]+Skills[36]+5*Skills[37]))*0.033*diff));
	}
	DPSCALC=Decimal.mul(MAX**(1+Skills[28]+Skills[40]+Skills[3]+Skills[30]+Skills[41]+Skills[53]+Skills[47]+Skills[24]+Skills[38])*(AchMult**math.sum(Achieves))*(2**OtherQuantity[1]),NPOW.plus(1).pow(1+Achieves[66]*0.1));
    DPSCALC=Decimal.mul(Decimal.add(1,Decimal.mul(0.1*Skills[27]+0.2*Skills[42]+0.3*Skills[20]+0.4*Skills[57],y.plus(1).log(10-8*Skills[14]))),Decimal.mul(Decimal.mul(Decimal.pow(1.5+0.1*Skills[0],positives[0]*(1+Achieves[30]*0.01*math.log10(negatives[9]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[29],positives[1]*(1+Achieves[31]*0.01*math.log10(negatives[8]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[31],positives[2]*(1+Achieves[32]*0.01*math.log10(negatives[7]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[7],positives[3]*(1+Achieves[33]*0.01*math.log10(negatives[6]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[34],positives[4]*(1+Achieves[34]*0.01*math.log10(negatives[5]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[35],positives[5]*(1+Achieves[35]*0.01*math.log10(negatives[4]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[9],positives[6]*(1+Achieves[36]*0.01*math.log10(negatives[3]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[48],positives[7]*(1+Achieves[37]*0.01*math.log10(negatives[2]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[49],positives[8]*(1+Achieves[38]*0.01*math.log10(negatives[1]+1))),Decimal.pow(1.5+0.1*Skills[26],positives[9]*(1+Achieves[39]*0.01*math.log10(negatives[0]+1)))))))))))),DPSCALC));
    x=x.plus(DPSCALC.mul(33*diff/tickspeed));
  }}
}
function DECTIMAL(x){
	return new Decimal(x);
}
if(localStorage.MCur) {
  MAX=parseFloat(localStorage.Max);
  x=new Decimal(localStorage.MCur);
  y=new Decimal(localStorage.PCur);
  Zero=parseFloat(localStorage.Zero);
  NPOW=new Decimal(localStorage.NPOW);
  coords=localStorage.Coords.split(",").map(Number);
  positives=localStorage.PCN.split(",").map(Number);
  negatives=localStorage.NCN.split(",").map(Number);
  pbaseCost=localStorage.PBC.split(",").map(Number);
  FicNeg=localStorage.NFIC.split(",").map(DECTIMAL);
  OtherQuantity=localStorage.Other.split(",").map(Number);
  R=parseInt(localStorage.R);
  Achieves=localStorage.Achieves.split(",").map(Number);
  if (localStorage.Skills) {Skills=localStorage.Skills.split(",").map(Number);}
  if (!localStorage.AutoBuy){localStorage.setItem("AutoBuy",true)} 
  if (Boolean(localStorage.AutoBuy)){document.getElementById("AUTOBUY").setAttribute("checked",true)}
  tickspeed*=(10/11)**OtherQuantity[0];
  if (OtherQuantity[1]<8){qual=2**OtherQuantity[1];}
  else{qual=2**8}
  if (Achieves.length<70) {
	  for (i=Achieves.length; i<70; i++){Achieves[i]=[0];}
  }
  var diff=(Date.now()-parseInt(localStorage.lastTick))/33;
  GetAchieves();
  GetSkillTree();
  FormulaRewriter();
	FicNeg[8]=FicNeg[8].plus(FicNeg[9].plus(negatives[9]).mul((1.33+0.17*Skills[15])**(negatives[9]*(1+Achieves[30]*0.01*math.log10(1+positives[0])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[7]=FicNeg[7].plus(FicNeg[8].plus(negatives[8]).mul((1.33+0.17*Skills[62])**(negatives[8]*(1+Achieves[31]*0.01*math.log10(1+positives[1])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[6]=FicNeg[6].plus(FicNeg[7].plus(negatives[7]).mul((1.33+0.17*Skills[59])**(negatives[7]*(1+Achieves[32]*0.01*math.log10(1+positives[2])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[5]=FicNeg[5].plus(FicNeg[6].plus(negatives[6]).mul((1.33+0.17*Skills[11])**(negatives[6]*(1+Achieves[33]*0.01*math.log10(1+positives[3])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[4]=FicNeg[4].plus(FicNeg[5].plus(negatives[5]).mul((1.33+0.17*Skills[23])**(negatives[5]*(1+Achieves[34]*0.01*math.log10(1+positives[4])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[3]=FicNeg[3].plus(FicNeg[4].plus(negatives[4]).mul((1.33+0.17*Skills[46])**(negatives[4]*(1+Achieves[35]*0.01*math.log10(1+positives[5])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[2]=FicNeg[2].plus(FicNeg[3].plus(negatives[3]).mul((1.33+0.17*Skills[22])**(negatives[3]*(1+Achieves[36]*0.01*math.log10(1+positives[6])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[1]=FicNeg[1].plus(FicNeg[2].plus(negatives[2]).mul((1.33+0.17*Skills[19])**(negatives[2]*(1+Achieves[37]*0.01*math.log10(1+positives[7])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	FicNeg[0]=FicNeg[0].plus(FicNeg[1].plus(negatives[1]).mul((1.33+0.17*Skills[43])**(negatives[1]*(1+Achieves[38]*0.01*math.log10(1+positives[8])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff))
	NPOW=NPOW.plus(FicNeg[0].plus(negatives[0]).mul((1.33+0.17*Skills[18])**(negatives[0]*(1+Achieves[39]*0.01*math.log10(1+positives[9])*math.log(2+8*Skills[25])/math.log(2)))*0.033*diff));
	if (x.lt(1e10)){document.getElementById('PrestigeN').innerHTML ="Need 1e10 DP";}
	else {
		document.getElementById('PrestigeN').innerHTML =Decimal.pow(2.5+0.1*Achieves[65],x.log10()-10).toExponential(3);
		y=y.plus(Decimal.mul(Decimal.pow(2.5+0.1*Achieves[65],x.log10()-10),(0.01*(Skills[16]+Skills[32]+Skills[44]+Skills[6]+Skills[36]+5*Skills[37]))*0.033*diff));
	}
	DPSCALC=Decimal.mul(MAX**(1+Skills[28]+Skills[40]+Skills[3]+Skills[30]+Skills[41]+Skills[53]+Skills[47]+Skills[24]+Skills[38])*(AchMult**math.sum(Achieves))*(2**OtherQuantity[1]),NPOW.plus(1).pow(1+Achieves[66]*0.1));
    DPSCALC=Decimal.mul(Decimal.add(1,Decimal.mul(0.1*Skills[27]+0.2*Skills[42]+0.3*Skills[20]+0.4*Skills[57],y.plus(1).log(10-8*Skills[14]))),Decimal.mul(Decimal.mul(Decimal.pow(1.5+0.1*Skills[0],positives[0]*(1+Achieves[30]*0.01*math.log10(negatives[9]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[29],positives[1]*(1+Achieves[31]*0.01*math.log10(negatives[8]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[31],positives[2]*(1+Achieves[32]*0.01*math.log10(negatives[7]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[7],positives[3]*(1+Achieves[33]*0.01*math.log10(negatives[6]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[34],positives[4]*(1+Achieves[34]*0.01*math.log10(negatives[5]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[35],positives[5]*(1+Achieves[35]*0.01*math.log10(negatives[4]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[9],positives[6]*(1+Achieves[36]*0.01*math.log10(negatives[3]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[48],positives[7]*(1+Achieves[37]*0.01*math.log10(negatives[2]+1))),Decimal.mul(Decimal.pow(1.5+0.1*Skills[49],positives[8]*(1+Achieves[38]*0.01*math.log10(negatives[1]+1))),Decimal.pow(1.5+0.1*Skills[26],positives[9]*(1+Achieves[39]*0.01*math.log10(negatives[0]+1)))))))))))),DPSCALC));
    x=x.plus(DPSCALC.mul(33*diff/tickspeed));
}
document.getElementById("MCur").innerHTML = "Drawing points (DP) : "+x.toExponential(3);
