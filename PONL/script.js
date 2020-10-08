// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var LISTER;
var Onglet=1;
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
  ctx.closePath()
  ctx.stroke(); 
  ctx.beginPath()
  ctx.moveTo(0, 500);
  ctx.strokeStyle="#3366aa";
  ctx.lineTo(0, 500*(1-LISTER[2]/MAX));
  ctx.closePath()
  ctx.stroke(); 
  ctx.beginPath() 
  ctx.strokeStyle="#11aa11";
  ctx.moveTo(0, 500*(1-LISTER[2]/MAX));
  ctx.lineTo(0, 500*(1-(LISTER[2]+LISTER[1])/MAX));
  ctx.closePath()
  ctx.stroke(); 
  ctx.beginPath()
  ctx.strokeStyle="#ffcc11";
  ctx.moveTo(0, 500*(1-(LISTER[2]+LISTER[1])/MAX));
  ctx.lineTo(0, 500*(1-(LISTER[0]+LISTER[1]+LISTER[2])/MAX));
  //ctx.closePath()
  ctx.stroke(); 
  ctx.beginPath()
  ctx.strokeStyle="#3366aa";
  ctx.moveTo(0, 500*(1-LISTER[2]/MAX));
  ctx.lineTo(500, 500*(1-LISTER[2]/MAX));
  //ctx.closePath()
  ctx.stroke(); 
  var M, MPrime;
  M=[dichotomie(function (x){return Math.sqrt(x*x+LISTER[1]**2)+1.33*Math.sqrt((x-LISTER[3])**2+LISTER[2]**2)},0,LISTER[3]),LISTER[2]];
  MPrime=[dichotomie(function (x){return Math.sqrt(x*x+(LISTER[1]+LISTER[0])**2)+1.33*Math.sqrt((x-LISTER[3])**2+LISTER[2]**2)},0,LISTER[3]),LISTER[2]];
  ctx.beginPath();
  ctx.strokeStyle="#ffcc11";
  ctx.moveTo(500*LISTER[3]/MAX, 500);
  ctx.lineTo(500*M[0]/MAX, 500*(1-M[1]/MAX));
  ctx.lineTo(0, 500*(1-(LISTER[2]+LISTER[1])/MAX));
  //ctx.closePath();
  ctx.stroke(); 
  ctx.beginPath();
  ctx.moveTo(500*LISTER[3]/MAX, 500);
  ctx.lineTo(500*MPrime[0]/MAX, 500*(1-MPrime[1]/MAX));
  ctx.lineTo(0, 500*(1-(LISTER[0]+LISTER[1]+LISTER[2])/MAX));
  //ctx.closePath();
  ctx.stroke(); 
  document.getElementById("dVal1.0").innerHTML=LISTER[0];
  document.getElementById("dVal1.0").innerHTML=LISTER[1];
  document.getElementById("dVal1.0").innerHTML=LISTER[2];
  document.getElementById("dVal1.0").innerHTML=LISTER[3];
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
	if (Onglet == 1) {myFunction1();}
	if (Onglet == 5) {myFunction5();}
	if (Onglet == 6) {myFunction6();}
}
