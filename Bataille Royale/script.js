// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x=[1000,1000]
var L1
var C1,C2
C1=[]
C2=[]
L1=[]
ctx.font = "70px Arial";
ctx.textAlign = "center"
activeTurns=0

var CoulJoueur =["#000"]
function ChoixCouleur(){ //celui là devrait fonctionner
	if (document.getElementById("Couls").value != "") {
		CoulJoueurs=(document.getElementById("Couls").value).split(",")
	}
}

function EcrireBonneCarte(Nombre,X,Y,Couleur){ //Celui là devrait fonctionner
	ctx.fillStyle=Couleur
	if (Nombre<L1.length){
		ctx.fillText(L1[Nombre],X,Y)
	}
	else {
		ctx.fillText(Nombre+1,X,Y)
	}
}

function StartNew(){
	ChoixCouleur()
	L1 = document.getElementById("Deck").value.split(",")
	DICTCARDS={}
	//faire de quoi randomiser les mains des gens
	ctx.strokeStyle="#000"
	ctx.clearRect(0,0,1000,1000)
	ctx.beginPath();
	ctx.moveTo(250,0)
	ctx.lineTo(250,500)
	ctx.stroke();
	ctx.closePath()
}

function DrawTurn(){
	var P01=[Math.random()*34,Math.random()*160]
	var P02=[Math.random()*34+250,Math.random()*160]
	ctx.clearRect(P01[0],P01[1],216,340)
	ctx.strokeStyle="#000"
	ctx.beginPath();
	ctx.moveTo(P01[0],P01[1])
	ctx.lineTo(P01[0]+216,P01[1])
	ctx.lineTo(P01[0]+216,P01[1]+340)
	ctx.lineTo(P01[0],P01[1]+340)
	ctx.lineTo(P01[0],P01[1])
	ctx.stroke();
	ctx.closePath()
	ctx.clearRect(P02[0],P02[1],216,340)
	ctx.strokeStyle="#000"
	ctx.beginPath();
	ctx.moveTo(P02[0],P02[1])
	ctx.lineTo(P02[0]+216,P02[1])
	ctx.lineTo(P02[0]+216,P02[1]+340)
	ctx.lineTo(P02[0],P02[1]+340)
	ctx.lineTo(P02[0],P02[1])
	ctx.stroke();
	ctx.closePath()
	C1=[L1.shift()]
	C2=[L2.shift()]
	
	EcrireBonneCarte(C1[C1.length-1][0],P01[0]+108,P01[1]+170,CoulJoueur[C1[C1.length-1][1]-1])
	EcrireBonneCarte(C2[C2.length-1][0],P02[0]+108,P02[1]+170,CoulJoueur[C2[C2.length-1][1]-1])
	
	if (C1[C1.length-1][0]>C2[C2.length-1][0]){
		L1.push(C1[C1.length-1])
		L1.push(C2[C2.length-1])
		C1=[]
		C2=[]
	}
	if (C1[C1.length-1][0]<C2[C2.length-1][0]){
		L2.push(C2[C2.length-1])
		L2.push(C1[C1.length-1])
		C1=[]
		C2=[]
	}
}

function DrawNext(){
	var P01=[Math.random()*34,Math.random()*160]
	var P02=[Math.random()*34+250,Math.random()*160]
	ctx.clearRect(P01[0],P01[1],216,340)
	C1.push(L1.shift());
	C2.push(L2.shift());
ctx.strokeStyle="#000";
ctx.fillStyle=CoulJoueur[C1[C1.length-1][1]-1];
ctx.beginPath();
	ctx.moveTo(P01[0],P01[1]);
	ctx.lineTo(P01[0]+216,P01[1])
	ctx.lineTo(P01[0]+216,P01[1]+340)
	ctx.lineTo(P01[0],P01[1]+340)
	ctx.lineTo(P01[0],P01[1]);
ctx.fillRect(P01[0],P01[1],216,340);
	ctx.stroke();
	ctx.closePath()
	ctx.clearRect(P02[0],P02[1],216,340)
	ctx.strokeStyle="#000"
ctx.fillStyle=CoulJoueur[C2[C2.length-1][1]-1];
	ctx.beginPath();
	ctx.moveTo(P02[0],P02[1])
	ctx.lineTo(P02[0]+216,P02[1])
	ctx.lineTo(P02[0]+216,P02[1]+340)
	ctx.lineTo(P02[0],P02[1]+340)
	ctx.lineTo(P02[0],P02[1]);
ctx.fillRect(P02[0],P02[1],216,340);
	ctx.stroke();
	ctx.closePath()
	
	P01=[Math.random()*34,Math.random()*160]
	P02=[Math.random()*34+250,Math.random()*160]
	ctx.clearRect(P01[0],P01[1],216,340)
	ctx.strokeStyle="#000"
	ctx.beginPath();
	ctx.moveTo(P01[0],P01[1])
	ctx.lineTo(P01[0]+216,P01[1])
	ctx.lineTo(P01[0]+216,P01[1]+340)
	ctx.lineTo(P01[0],P01[1]+340)
	ctx.lineTo(P01[0],P01[1])
	ctx.stroke();
	ctx.closePath()
	ctx.clearRect(P02[0],P02[1],216,340)
	ctx.strokeStyle="#000"
	ctx.beginPath();
	ctx.moveTo(P02[0],P02[1])
	ctx.lineTo(P02[0]+216,P02[1])
	ctx.lineTo(P02[0]+216,P02[1]+340)
	ctx.lineTo(P02[0],P02[1]+340)
	ctx.lineTo(P02[0],P02[1])
	ctx.stroke();
	ctx.closePath()
	C1.push(L1.shift())
	C2.push(L2.shift())
	
	EcrireBonneCarte(C1[C1.length-1][0],P01[0]+108,P01[1]+170,CoulJoueur[C1[C1.length-1][1]-1])
	EcrireBonneCarte(C2[C2.length-1][0],P02[0]+108,P02[1]+170,CoulJoueur[C2[C2.length-1][1]-1])
	
	if (C1[C1.length-1][0]>C2[C2.length-1][0]){
		for(var k=0;k<C1.length;k++){
			L1.push(C1[k])
		}
		for(var k=0;k<C2.length;k++){
			L1.push(C2[k])
		}
		C1=[]
		C2=[]
	}
	if (C1[C1.length-1][0]<C2[C2.length-1][0]){
		for(var k=0;k<C2.length;k++){
			L2.push(C2[k])
		}
		for(var k=0;k<C1.length;k++){
			L2.push(C1[k])
		}
		C1=[]
		C2=[]
	}
}

function AddTurn(){activeTurns++}
function AddFiveTurn(){activeTurns+=5}
function AddTenTurn(){activeTurns+=10}

var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, 1000);

function loop() { // production
	if (activeTurns>0) {
		if (L1.length != 0){ //changer ça aussi : conditions de continuation de partie
			if(C1.length == 0) {DrawTurn();}
			else{DrawNext()}
		}
		document.getElementById("JC").innerHTML=L1.length // Changer le script pour inclure les joueurs différents, leurs couleur et leur quantité de cartes, peut-être passer la souris dessus pour avoir les différentes cartes avec leur couleur
		if (L1.length == 0) { //changer ça et la prochaine : Condition de victoire
			ctx.strokeStyle=CoulJoueur[1]
			ctx.font = "30px Arial";
			ctx.fillText("Joueur 2 Gagne !",250,250)
			ctx.font = "70px Arial";
		}
		else{if (L2.length == 0) {
			ctx.strokeStyle=CoulJoueur[0]
			ctx.font = "30px Arial";
			ctx.fillText("Joueur 1 Gagne !",250,250)
			ctx.font = "70px Arial";
		}}
		activeTurns--}
}

