// client-side js, loaded by index.html
// run by the browser each time the page is loaded


// define variables that reference elements on our page
var x, coords, tickspeed, positives, negatives,i;
var Achieves=[0];
for (i=0;i<50;i++){
  Achieves[i]=0
}
var MAX=1;
var AchMult=1.01;
x=0; coords=[0,0];
positives=[0,0,0,0,0,0,0,0,0,0];
negatives=[0,0,0,0,0,0,0,0,0,0];
var pbaseCost=[10,100,1000,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
var nbaseCost=[10,100,1000,1e4];
var OtherQuantity=[0,0];
var qual=1, R=0, I=2*Math.PI;
var tickpart=0;
tickspeed=1000;
function myFunction() {
  var i; 
  var DPps;
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
  if (qual<100){
  for (i=0;i<qual;i++) {
    FourierCalculation(MAX)
    MAX=Math.max(MAX,Math.abs(coords[0]),Math.abs(coords[1]))
  }}
  ctx.closePath();
  x+=MAX*1.01**math.sum(Achieves)*1.5**math.sum(positives)*qual;
  ctx.beginPath();
  ctx.strokeStyle="#000000";
  document.getElementById("MCur").innerHTML = "Drawing points (DP) : "+x.toExponential(3);
  FourierCalculation(MAX);
};

function FourierCalculation(MAX) {
  var p,n,i,TempVar=math.complex(0,0);
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.moveTo(coords[0]/MAX*250+250,coords[1]/MAX*250+250);
  p = positives.length; n=negatives.length; 
  for (i=0; i<p;i++){
    TempVar=math.add(TempVar,math.multiply(math.complex({r: 1, phi:R*(i+1)*I/qual}),positives[i]));
  };
  for (i=0; i<n;i++){
    TempVar=math.add(TempVar,math.multiply(math.complex({r: 1, phi:-R*(i+1)*I/qual}),negatives[i]));
  };
  R=R%qual + 1;
  coords=[TempVar.re,TempVar.im];
  ctx.lineTo(coords[0]/MAX*250+250,coords[1]/MAX*250+250);/////
  ctx.stroke();
};

function ImproveQuality() {
  if (x>5**((OtherQuantity[1]+1)**1.5)) {
    x-=5**((OtherQuantity[1]+1)**1.5);
  }  else{return};
  qual*=2;
  OtherQuantity[1]++;
  document.getElementById("QC").innerHTML = "Cost : "+(5**((OtherQuantity[1]+1)**1.5)).toExponential(3)+"DP";
};
function ReduceTickspeed() {
  if (x>10**OtherQuantity[0]) {
    x-=10**OtherQuantity[0];
  }  else{return};
  tickspeed*=10/11;
  OtherQuantity[0]++;
  document.getElementById("TC").innerHTML = "Cost : "+(10**OtherQuantity[0]).toExponential(3)+"DP";
};
function IncrementCn(n) {
  if (x>pbaseCost[n]**(positives[n]+1)) {
    x-=pbaseCost[n]**(positives[n]+1);
  }  else{return};
  positives[n]++;
  if (positives[n]==1){
    document.getElementById("A1C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n]++;
    if (n!=9){document.getElementById("C"+(n+2)+"Tab").removeAttribute("hidden");}
  }
  if (positives[n]==10){
    document.getElementById("A2C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n+10]++;
    if (n!=9){AchMult+=0.01;}
  }
  if (positives[n]==25){
    document.getElementById("A3C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n+20]++;
  }
  if (positives[n]==100){
    document.getElementById("A4C"+(n+1)).setAttribute("style","background-color: #5B5;");
    Achieves[n+30]++;
  }
  FormulaRewriter()
};
function GetAchieves(){
  for (i=0;i<50;i++){
    if (Achieves[i]!=0){
      document.getElementById("A"+math.floor(1+(i+1)/10)+"C"+((i+1)%10)).setAttribute("style","background-color: #5B5;");
      if (i<10) {
        document.getElementById("C"+(i+2)+"Tab").removeAttribute("hidden");
      }
      if (10<i && i<20){
        AchMult+=0.01;
      }
    }
  }
}
function FormulaRewriter(){
  var S="0";
  document.getElementById('ACH').innerHTML =AchMult**math.sum(Achieves);
  for (i=0;i<10;i++){
    if (positives[i]!=0){
    document.getElementById("C"+(i+1)).innerHTML = positives[i];
    document.getElementById("C"+(i+1)+"V").innerHTML = positives[i];
    document.getElementById("C"+(i+1)+"T").removeAttribute("hidden");
    document.getElementById("C"+(i+1)+"c").innerHTML = "Cost : "+(pbaseCost[i]**(positives[i]+1)).toExponential(2)+"DP";
    document.getElementById("QC").innerHTML = "Cost : "+(5**((OtherQuantity[1]+1)**1.5)).toExponential(3)+"DP";
    document.getElementById("TC").innerHTML = "Cost : "+(10**OtherQuantity[0]).toExponential(3)+"DP";
    };
  };
};

var mainGameLoop = window.setInterval(function() { // runs the loop
  tickpart += 33
  if (tickpart>=tickspeed) {
    tickpart -= tickspeed
    loop();
  }
}, 33);

function loop() { // production
  myFunction()
}

function save() 
{ 
  localStorage.setItem('Max',MAX);
  localStorage.setItem("MCur",x);
  localStorage.setItem("Coords",coords);
  localStorage.setItem("PCN",positives);
  localStorage.setItem("NCN",negatives);
  localStorage.setItem("PBC",pbaseCost);
  localStorage.setItem("NBC",nbaseCost);
  localStorage.setItem("Other",OtherQuantity);
  localStorage.setItem("R",R);
  localStorage.setItem("Achieves",Achieves)
} 
function SReset(){
  MAX=1;
  x=0;
  coords=[0,0];
  positives=[0,0,0,0,0,0,0,0,0,0];
  negatives=[0,0,0,0,0,0,0,0,0,0];
  pbaseCost=[10,100,1000,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
  nbaseCost=[10,100,1000,10000];
  OtherQuantity=[0,0];
  qual=1, R=0;
  tickspeed=1000;
}
function HReset(){
  for (i=0;i<50;i++){Achieves[i]=[0];}
  MAX=1;
  x=0;
  coords=[0,0];
  positives=[0,0,0,0,0,0,0,0,0,0];
  pbaseCost=[10,100,1000,1e4,1e5,1e6,1e7,1e8,1e9,1e10];
  negatives=[0,0,0,0,0,0,0,0,0,0];
  nbaseCost=[10,100,1000,10000];
  OtherQuantity=[0,0];
  qual=1, R=0;
  tickspeed=1000;
}
//loading all the stuff...
if(localStorage.getItem('MCur')) {
  MAX=parseFloat(localStorage.getItem('Max'));
  x=parseFloat(localStorage.getItem("MCur"));
  coords=((localStorage.getItem("Coords")).split(",")).map(Number);
  positives=localStorage.getItem("PCN").split(",").map(Number);
  negatives=localStorage.getItem("NCN").split(",").map(Number);
  pbaseCost=localStorage.getItem("PBC").split(",").map(Number);
  nbaseCost=localStorage.getItem("NBC").split(",").map(Number);
  OtherQuantity=localStorage.getItem("Other").split(",").map(Number);
  R=parseInt(localStorage.getItem("R"));
  Achieves=localStorage.getItem("Achieves").split(",").map(Number);
  tickspeed*=(10/11)**OtherQuantity[0];
  qual=2**OtherQuantity[1];
  GetAchieves();
  FormulaRewriter();
}
document.getElementById("MCur").innerHTML = "Drawing points (DP) : "+x;
//document.getElementById("PCur").innerHTML = i;
