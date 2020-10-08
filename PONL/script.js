// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// define variables that reference elements on our page
//Decimal.toExpPos= 2;
var LISTER;
var Onglet=1;
var SETTER = false;

function myFunction1() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 500, 500);
  ctx.strokeStyle="#000000";
  LISTER = [0];
  LISTER[0] = parseInt(document.getElementById("Slider1").value)
  LISTER[1] = parseInt(document.getElementById("Slider2").value)
  LISTER[2] = parseInt(document.getElementById("Slider3").value)
  LISTER[3] = parseInt(document.getElementById("Slider4").value)
  var MAX = Math.max(LISTER[3], LISTER[0]+LISTER[1]+LISTER[2]);
  ctx.moveTo(500, 0);
  ctx.lineTo(500, 500*LISTER[3]/MAX);
  ctx.stroke(); 
  ctx.moveTo(500, 0);
  ctx.strokeStyle="#33AAFF";
  ctx.lineTo(500*(1-LISTER[2]/MAX), 0);
  ctx.stroke(); 
  ctx.strokeStyle="#00FF00";
  ctx.lineTo(500*(1-(LISTER[2]+LISTER[1])/MAX), 0);
  ctx.stroke(); 
  ctx.strokeStyle="#aacc00";
  ctx.lineTo(500*(1-(LISTER[0]+LISTER[1]+LISTER[2])/MAX), 0);
  ctx.stroke(); 
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
