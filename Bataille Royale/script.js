// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x=[1000,1000]
var L1
var C1,C2
CardsGameOn=[]
CardsToGive=[]
L1=[]
ctx.font = "35px Arial";
ctx.textAlign = "center"
activeTurns=0
var CardIndex=[0]
var CardType=-1;

var CoulJoueur =["#000"]
function ChoixCouleur(){ //celui là devrait fonctionner
	if (document.getElementById("Couls").value != "") {
		CoulJoueur=(document.getElementById("Couls").value).split(",")
	}
}

function EcrireBonneCarte(Nombre,angle,Couleur, HIDDEN){ //FAIT
	ctx.fillStyle=Couleur
	
	var PosCarte=[475+300*Math.cos(angle)+Math.random()*50,475+300*Math.sin(angle)+Math.random()*50]
	ctx.clearRect(PosCarte[0]-54,PosCarte[1]-85,108,170)
	ctx.strokeStyle="#000"
	ctx.beginPath();
	ctx.moveTo(PosCarte[0]-54,PosCarte[1]-85)
	ctx.lineTo(PosCarte[0]+54,PosCarte[1]-85)
	ctx.lineTo(PosCarte[0]+54,PosCarte[1]+85)
	ctx.lineTo(PosCarte[0]-54,PosCarte[1]+85)
	ctx.lineTo(PosCarte[0]-54,PosCarte[1]-85)
	ctx.stroke();
	ctx.closePath()
	
	if (HIDDEN){
		ctx.fillRect(PosCarte[0]-54,PosCarte[1]-85,108,170);
	}
	else {
		if (Nombre<L1.length){
			ctx.fillText(L1[Nombre],PosCarte[0],PosCarte[1])
		}
		else {
			ctx.fillText(Nombre+1,PosCarte[0],PosCarte[1])
		}
	}
}

var Mains=[] ;

function mainRandom(n) {
var preMain=[] 
for (var o=0;o<n;o++){preMain[o]=o} 
var goMain=[] 
for (var o=0;o<n;o++){
goMain[o] = preMain.splice(parseInt(Math.random()*preMain.length),1)[0]
}
return goMain;
} 

function StartNew(){
	ChoixCouleur()
	L1 = document.getElementById("Deck").value.split(",")
	Mains=[]
	activeTurns=0
	CardIndex=[0]
	CardType=-1;
	CardsGameOn=[]
	CardsToGive=[]
	for (var k=0; k<parseInt(document.getElementById("Players").value); k++){
		Mains[k] = mainRandom(13) ;
		for (var o=0; o<Mains[k].length; o++){
			Mains[k][o]=[Mains[k][o],k]
		}
	} ;
	//faire de quoi randomiser les mains des gens (FAIT)
	ctx.clearRect(0,0,1000,1000)
}

function DrawTurn(){ //FAIT
	for (var k=0;k<document.getElementById("Players").value;k++){
		if (Mains[k].length>0){
			CardsGameOn[k]=[Mains[k].shift()]
			EcrireBonneCarte(CardsGameOn[k][0][0],2*Math.PI*(k/document.getElementById("Players").value),CoulJoueur[CardsGameOn[k][0][1]],false)
		}
	}
	
	//Version sans variante, les cartes en bataille la plus forte sont les seules à rester
	CardIndex=[-1]
	var comptine=0
	while (CardIndex[0]==-1){
		if (CardsGameOn[comptine]){
			CardIndex[0]=comptine
		}
		comptine++
	}
	CardType=-1
	for (var k=0; k<CardsGameOn.length;k++){ //tout ça fonctionne
		if (CardsGameOn[k]){
			if (CardType==-1){
				if (CardsGameOn[CardIndex[0]][0][0]<CardsGameOn[k][0][0]){
					CardIndex=[k]
				}
			}
			if (CardType==CardsGameOn[k][0][0]){
				CardIndex.push(k)
			}
			if (CardType<CardsGameOn[k][0][0]) {
				var CardTester= CardsGameOn.slice(k+1,CardsGameOn.length)
				
				for (var o=0; o<CardTester.length;o++){
					if (CardTester[o]){
						CardTester[o]=CardTester[o][0][0]
					}
				}
				if (CardTester.includes(CardsGameOn[k][0][0])){
					CardType=CardsGameOn[k][0][0];
					CardIndex=[k]
					console.log("Je change !")
				}
			}
		}
	}
	if (CardIndex.length>1){ //au moins deux cartes sont en bataille | FAIT
		var CardsQuantity=CardsGameOn.length
		for (var k=0; k<CardsQuantity;k++){
			if (!(CardIndex.includes(CardsQuantity-1-k)) && (CardsGameOn[CardsQuantity-1-k])){
			CardsToGive.push(CardsGameOn.splice(CardsQuantity-1-k,1)[0][0])
			}
		}
		while (!(CardsGameOn[CardsGameOn.length-1])){
			CardsGameOn.pop()
		}
	}
	else { //toutes les cartes sont différentes | FAIT
		var LONGUEUR=CardsGameOn.length
		for (var k=0;k<LONGUEUR; k++){
			if (CardsGameOn[CardsGameOn.length-1]){Mains[CardIndex[0]].push(CardsGameOn.pop()[0])
				}
			else {CardsGameOn.pop()}
		}
	}
}

function DrawNext(){ // à refaire entièrement
	var compteur = 0
	for (var k=0;k<CardIndex.length;k++){
		//NE PAS OUBLIER LA CONDITION SI PLUS DE CARTES DANS LA MAIN = JOUEUR MORT
		if (Mains[CardIndex[k]].length>0){
			while(!(CardsGameOn[k+compteur]) && compteur<parseInt(document.getElementById("Players").value)){
				compteur++
				console.log(compteur)
			}
			CardsGameOn[k+compteur].push(Mains[CardIndex[k]].shift())
			EcrireBonneCarte(CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][0],2*Math.PI*(CardIndex[k]/document.getElementById("Players").value),CoulJoueur[CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][1]],true)
		}
		else { // Joueur perdant la bataille car plus de cartes
			for (var o=0;o<CardsGameOn[k].length;o++){
				CardsToGive.push(CardsGameOn[k].pop())
				o--
			}
			CardsGameOn.splice(k,1)
			CardIndex.splice(k,1)
			k--
		}
	}
	compteur=0
	for (var k=0;k<CardIndex.length;k++){
		//NE PAS OUBLIER LA CONDITION SI PLUS DE CARTES DANS LA MAIN = JOUEUR MORT
		if (Mains[CardIndex[k]].length>0){
			while(!(CardsGameOn[k+compteur]) && compteur<parseInt(document.getElementById("Players").value)){
				compteur++
				console.log(compteur)
			}
			CardsGameOn[k+compteur].push(Mains[CardIndex[k]].shift())
			EcrireBonneCarte(CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][0],2*Math.PI*(CardIndex[k]/document.getElementById("Players").value),CoulJoueur[CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][1]],false)
		}
		else { // Joueur perdant la bataille car plus de cartes
			for (var o=0;o<CardsGameOn[k].length;o++){
				CardsToGive.push(CardsGameOn[k].pop())
				o--
			}
			CardsGameOn.splice(k,1)
			CardIndex.splice(k,1)
			k--
		}
	}
	var CardIndexTemp=[-1]
	var comptine=0
	while (CardIndexTemp[0]==-1){
		if (CardsGameOn[comptine]){
			CardIndexTemp[0]=comptine
		}
		comptine++
	}
	var CardTypeTemp=-1
	compteur=0
	for (var k=0; k<CardIndex.length;k++){ 
		while(!(CardsGameOn[k+compteur]) && compteur<parseInt(document.getElementById("Players").value)){
				compteur++
				console.log(compteur)
		}
		if (CardTypeTemp==-1){
			if (CardsGameOn[CardIndexTemp[0]][CardsGameOn[CardIndexTemp[0]].length-1][0]<CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][0]){
				CardIndexTemp=[k]
			}
		}
		if (CardTypeTemp==CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][0]){
			CardIndexTemp.push(k)
		}
		if (CardTypeTemp<CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][0]) {
			var CardTester= CardsGameOn.slice(k+compteur+1,CardsGameOn.length)
			
			for (var o=0; o<CardTester.length;o++){
				if (CardTester[o]){
					CardTester[o]=CardTester[o][CardTester[o].length-1][0]
				}
			}
			if (CardTester.includes(CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][0])){
				CardTypeTemp=CardsGameOn[k+compteur][CardsGameOn[k+compteur].length-1][0];
				CardIndexTemp=[k]
				console.log("Je change temporairement!")
			}
		}
	}
	//console.log(CardIndexTemp)
	//console.log(CardTypeTemp)
	if (CardIndexTemp.length>1){ //au moins deux cartes sont en bataille | FAIT
		var CardsQuantity=CardsGameOn.length
		for (var k=0; k<CardsQuantity;k++){
			if (!(CardIndexTemp.includes(CardsQuantity-1-k)) && (CardsGameOn[CardsQuantity-1-k])){
				for (var o=0;o<CardsGameOn[CardsQuantity-1-k].length;o++){
					CardsToGive.push(CardsGameOn[CardsQuantity-1-k].pop())
					o--
				}
				CardsGameOn.splice(CardsQuantity-1-k,1)
				CardIndex.splice(CardsQuantity-1-k,1)
			}
		}
		while (!(CardsGameOn[CardsGameOn.length-1])){
			CardsGameOn.pop()
		}
	}
	else { //toutes les cartes sont différentes | FAIT
		Mains[CardIndex[CardIndexTemp[0]]]=Mains[CardIndex[CardIndexTemp[0]]].concat(CardsToGive)
		CardsToGive=[]
		var LONGUEUR=CardsGameOn.length
		for (var k=0;k<LONGUEUR; k++){
			if (CardsGameOn[CardsGameOn.length-1]){Mains[CardIndex[CardIndexTemp[0]]]=Mains[CardIndex[CardIndexTemp[0]]].concat(CardsGameOn.pop())}
			else{CardsGameOn.pop()}
		}
	}
}

function AddTurn(){activeTurns++}
function AddFiveTurn(){activeTurns+=5}
function AddTenTurn(){activeTurns+=10}

function situationActuelle(){
	var TEXTUAL="<br>"
	for (var k=0; k<parseInt(document.getElementById("Players").value); k++){
		TEXTUAL=TEXTUAL+'<span class="tooltip" style="color:'+CoulJoueur[k]+'">Joueur '+String(k)+' : '+String(Mains[k].length)+'<span class="tooltiptext">'
		for (var o=0; o<Mains[k].length;o++){
			TEXTUAL=TEXTUAL+'<span style="color:'+CoulJoueur[Mains[k][o][1]]+'">'+String(Mains[k][o][0])+'</span>,'
		}		
		TEXTUAL=TEXTUAL+'</span></span><br>'
	}
	//Changer le script pour inclure les joueurs différents (Fait)
	//leurs couleur et leur quantité de cartes (Fait)
	//peut-être passer la souris dessus pour avoir les différentes cartes avec leur couleur (Fait, mais peut être amélioré pour afficher le vrai nom de la carte)
	document.getElementById("JC").innerHTML=TEXTUAL
}

var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, 200);

function loop() { // production
	if (activeTurns>0) {
		if (Mains.reduce((acc,element) => acc + (element.length>0), 0)){
			if(CardsGameOn.length == 0) {DrawTurn();}
			else{DrawNext()}
		}
		if (Mains.reduce((acc,element) => acc + (element.length>0), 0)==1) { //changer ça et la prochaine : Condition de victoire
			var Gagnant = document.getElementById("Players").value - Mains.reduce((acc,element) => acc + (acc>0 || element.length>0), 0)
			ctx.fillStyle=CoulJoueur[Gagnant]
			ctx.font = "30px Arial";
			ctx.fillText("Joueur "+String(Gagnant)+" Gagne !",500,500)
			ctx.font = "70px Arial";
		}
		activeTurns--
	}
	situationActuelle()
}

