//var Pointer =[330,220]
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//var BOOLER= false;
var SETTINGS = false;
var SETTINGS2 = false;
var i,j; var OldI;
var GlassesLevel=0;
var Chapter=0;
var Pointer = [0,0]
var Player = [500,250]
//canvas.addEventListener("mousedown", function(){BOOLER=true;x=[event.clientX,Pointer[0]];y=[event.clientY,Pointer[1]]});
//canvas.addEventListener("mouseup", function(){BOOLER=false});

canvas.addEventListener("mousemove",function(){POINT(event)})

function Ballsy(){if (SETTINGS){PRESS(event)} else {CellClick(event)}}
canvas.addEventListener("click",Ballsy)

//document.getElementById("HAND1").addEventListener("click",function(){SelectIt(1)})
//document.getElementById("HAND2").addEventListener("click",function(){SelectIt(2)})

function POINT(event){
	Pointer[0]=event.clientX
	Pointer[1]=event.clientY
}

document.onkeydown = function (e){
	if (e.keyCode==68 || e.keyCode == 39){Player[0]++}
	if (e.keyCode==81 || e.keyCode == 37 || e.keyCode == 65){Player[0]--}
	if (e.keyCode==38 || e.keyCode == 90 || e.keyCode == 87){Player[1]--}
	if (e.keyCode==40 || e.keyCode == 83){Player[1]++}
}
var CELLAR=[];//Xe elem = Xe emplacement, puis une matrice de bordel. un bordel = Cellule [Objet, niveau]
var ActiveSigil;// Cellule cliqué [num emplacement, coords]

function Player_Vector(){
	var Vect = [Player[0]-Pointer[0],Player[1]-Pointer[1]]
	return [Vect[0]/math.sqrt(Vect[0]**2+Vect[1]**2),Vect[1]/math.sqrt(Vect[0]**2+Vect[1]**2)]
}

function draw_canon(Size, Position, Color, Context, Angle){
	Context.fillStyle=Color;
	Context.strokeStyle="#eee";
	Context.beginPath()
	Context.moveTo(Position[0]-Angle[0]*5+2*Angle[1],Position[1]-Angle[1]*5-2*Angle[0])
	Context.lineTo(Position[0]-Angle[0]*15+2*Angle[1],Position[1]-Angle[1]*15-2*Angle[0])
	Context.lineTo(Position[0]-Angle[0]*15+4*Angle[1],Position[1]-Angle[1]*15-4*Angle[0])
	Context.lineTo(Position[0]-Angle[0]*18+4*Angle[1],Position[1]-Angle[1]*18-4*Angle[0])
	Context.lineTo(Position[0]-Angle[0]*18-4*Angle[1],Position[1]-Angle[1]*18+4*Angle[0])
	Context.lineTo(Position[0]-Angle[0]*15-4*Angle[1],Position[1]-Angle[1]*15+4*Angle[0])
	Context.lineTo(Position[0]-Angle[0]*15-2*Angle[1],Position[1]-Angle[1]*15+2*Angle[0])
	Context.lineTo(Position[0]-Angle[0]*5-2*Angle[1],Position[1]-Angle[1]*5+2*Angle[0])
	Context.lineTo(Position[0]-Angle[0]*5+2*Angle[1],Position[1]-Angle[1]*5-2*Angle[0])
	Context.closePath()
	Context.fill()
	Context.stroke()
	
	Context.beginPath()
	Context.moveTo(Position[0],Position[1]+Size)
	for (var i=0;i<101;i++){
		Context.lineTo(Position[0]+Size*math.sin(2*math.PI*i/100),Position[1]+Size*math.cos(2*math.PI*i/100))
	}
	Context.closePath()
	Context.fill()
	Context.stroke()
}

function DrawScreen(){
	draw_canon(10, Player, "#e90", ctx, Player_Vector())
	ctx.beginPath()
	ctx.moveTo(Pointer[0]-5,Pointer[1])
	ctx.lineTo(Pointer[0]+5,Pointer[1])
	ctx.moveTo(Pointer[0],Pointer[1]-5)
	ctx.lineTo(Pointer[0],Pointer[1]+5)
	ctx.closePath()
	ctx.stroke()
}

function myFunction() {
	ctx.clearRect(0, 0, 1000, 750);
	DrawScreen()
};


var tickpart=0;
var tickpart2=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
	tickpart += 33;
	tickpart2+=33;
	if (tickpart>=33) {
		tickpart -= 33;
		loop();
	}
}, 33);

function loop() {
  myFunction();
}
