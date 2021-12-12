// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(500, 500); //=pixels
var x=[500,500]
var L1,L2
var C1,C2
C1=[]
C2=[]
L1=[]
L2=[]
ctx.font = "70px Arial";
ctx.textAlign = "center"

var CoulJoueur =["#000","#000"]
function ChoixCouleur(){
	if (document.getElementById("Coul1").value != "") {
		CoulJoueur[0]=document.getElementById("Coul1").value
	}
	if (document.getElementById("Coul2").value != "") {
		CoulJoueur[1]=document.getElementById("Coul2").value
	}
}

function EcrireBonneCarte(Nombre,X,Y,Couleur){
	ctx.fillStyle=Couleur
	if (Nombre<10){
		ctx.fillText(Nombre+1,X,Y)
	}
	if (Nombre==10){
		ctx.fillText("Valet",X,Y)
	}
	if (Nombre==11){
		ctx.fillText("Dame",X,Y)
	}
	if (Nombre==12){
		ctx.fillText("Roi",X,Y)
	}
	if (Nombre==13){
		ctx.fillText("As",X,Y)
	}
}

function StartNew(){
	ChoixCouleur()
	L1 = document.getElementById("Deck1").value.split(",")
	L2 = document.getElementById("Deck2").value.split(",")
	for(var k=0; k<L1.length;k++){
		L1[k]=[parseInt(L1[k]),1]
		L2[k]=[parseInt(L2[k]),2]
	}
	ctx.strokeStyle="#000"
	ctx.clearRect(0,0,500,500)
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

var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, 1000);

function loop() { // production
	if (L1.length != 0 && L2.length !=0){
		if(C1.length == 0) {DrawTurn();}
		else{DrawNext()}
	}
	document.getElementById("J1C").innerHTML=L1.length
	document.getElementById("J2C").innerHTML=L2.length
	if (L1.length == 0) {
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
}

