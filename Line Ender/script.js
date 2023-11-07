
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ActiveSigil;
ctx.font = "12px Arial";
ctx.textAlign = "center"

var ListesCheminsSoluce = [] // id = index,  [[Liste ordonée des chemins]]
var Blockers = [] // Liste des carrés noirs faisant pas partie du niveau, ne sert qu'au dessin
var CellulesVide = [] //je sais plus si je prends lui ou l'autre
var TaillePartie = [10,10] // capable de modifier
var Extremites={} // Liste des extrémités avec leur couleur et identifiant
var SolutionJoueur=[] // Liste des chemins proposés par le joueur
var BOOLERIEN = -1

function Celler(){CellClick(event)}
canvas.addEventListener("mousedown",Celler) // faire un pour le drag (queen)
canvas.addEventListener("touchstart",Celler) // faire un pour le drag (queen)
canvas.addEventListener("touchmove",function(){CellDrag(event)})
canvas.addEventListener("mousemove",function(){CellDrag(event)})
canvas.addEventListener("mouseup", function(){CellUp(event)});
canvas.addEventListener("touchend", function(){CellUp(event)});
canvas.addEventListener("touchcancel", function(){CellUp(event)});

function CellClick(e){ // à améliorer pour selection de map, de boutons
	e.preventDefault();
	BOOLERIEN = -1;
	//console.log(e.clientX, e.clientY)
	for (var X = 0; X<ListesCheminsSoluce.length; X++){ 
		//cas ou on démarre d'une extrémité
		if (Extremites[X][1][0] == parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1 && Extremites[X][1][1] == parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1){
			BOOLERIEN = X
		}
		if (Extremites[X][2][0] == parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1 && Extremites[X][2][1] == parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1){
			BOOLERIEN = X
		}
		//cas ou on démarre d'une partie de chemin déjà faite
		if (SolutionJoueur[X] && SolutionJoueur[X].find((element) => element[0] == parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1 && element[1] == parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1)){
			BOOLERIEN = X
		}
	}
		
	if (BOOLERIEN >= 0){
		//console.log("GG")
		ActiveSigil=[parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1,parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1]
		if (SolutionJoueur[BOOLERIEN]){ // cas compliqué, d'abord savoir si on démarre de la liste ou de l'extrémité.
			if (SolutionJoueur[BOOLERIEN].find((element) => element[0] == ActiveSigil[0] && element[1] == ActiveSigil[1])){ // ajouter les modifs aux listes de cases libres
				var INDEXED = SolutionJoueur[BOOLERIEN].findIndex((element) => element[0] == ActiveSigil[0] && element[1] == ActiveSigil[1])
				for (var Y = INDEXED+1; Y< SolutionJoueur[BOOLERIEN].length;Y++){
					CellulesVide.push(JSON.parse(JSON.stringify(SolutionJoueur[BOOLERIEN][Y])))
				}
				SolutionJoueur[BOOLERIEN] = SolutionJoueur[BOOLERIEN].slice(0,INDEXED+1)
			}
			else { // ajouter les modifs aux listes de cases libres
				for (var Y = 0; Y< SolutionJoueur[BOOLERIEN].length;Y++){
					CellulesVide.push(JSON.parse(JSON.stringify(SolutionJoueur[BOOLERIEN][Y])))
				}
				SolutionJoueur[BOOLERIEN] =[JSON.parse(JSON.stringify(ActiveSigil))]
				CellulesVide.splice(CellulesVide.findIndex((element) => element[0] == ActiveSigil[0] && element[1] == ActiveSigil[1]),1)
			}
		}
		else { // cas simple
			SolutionJoueur[BOOLERIEN] =[JSON.parse(JSON.stringify(ActiveSigil))]
			CellulesVide.splice(CellulesVide.findIndex((element) => element[0] == ActiveSigil[0] && element[1] == ActiveSigil[1]),1)
			
		}
	}
}

function CellDrag(e){ // Fini !
	e.preventDefault();
	if (BOOLERIEN >=0 && ActiveSigil && (ActiveSigil[0]!= parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1 || ActiveSigil[1]!=parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1)){
		//console.log(ActiveSigil[0]-parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)-1,ActiveSigil[1]-parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)-1)
		if (math.abs(ActiveSigil[0]-parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)-1)+math.abs(ActiveSigil[1]-parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)-1)>=2){
			//console.log("TROP GRAND !")
			CellUp(e)
		}
		else {
			var BOOLERIEN2 = true
			for (var X = 0; X<ListesCheminsSoluce.length; X++){ 
				//cas ou on démarre d'une extrémité
				if (X!= BOOLERIEN && Extremites[X][1][0] == parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1 && Extremites[X][1][1] == parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1){
					BOOLERIEN2 = false
				}
				if (X!= BOOLERIEN && Extremites[X][2][0] == parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1 && Extremites[X][2][1] == parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1){
					BOOLERIEN2 = false
				}
			}
			if (BOOLERIEN2 && CellulesVide.find((element) => element[0] == parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1 && element[1] == parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1)){
				CellulesVide.splice(CellulesVide.findIndex((element) => element[0] == parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1 && element[1] == parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1),1)
				ActiveSigil=[parseInt((e.clientX-canvas.getBoundingClientRect().left)/50)+1,parseInt((e.clientY-canvas.getBoundingClientRect().top)/50)+1]
				SolutionJoueur[BOOLERIEN].push(JSON.parse(JSON.stringify(ActiveSigil)))
			}
			else {
				//console.log("case prise !")
				CellUp(e)
			}
		}
	}
	else {
		if (BOOLERIEN >=0 && ActiveSigil && SolutionJoueur[BOOLERIEN].length>=2){
			//console.log("POG")
			if (Extremites[BOOLERIEN] && Extremites[BOOLERIEN][1][0] == ActiveSigil[0] && Extremites[BOOLERIEN][1][1] == ActiveSigil[1]){
				CellUp(e)
			}
			if (Extremites[BOOLERIEN] && Extremites[BOOLERIEN][2][0] == ActiveSigil[0] && Extremites[BOOLERIEN][2][1] == ActiveSigil[1]){
				CellUp(e)
			}
		
		}
	}
}

function CellUp(e){ // Fini ! (améliorer pour condition de victoire)
	e.preventDefault();
	//console.log("pog pog")
	ActiveSigil=undefined
	BOOLERIEN = -1
}

function drawTuyaux(){ // à améliorer pour inclure les translations
	ctx.clearRect(0, 0, 500, 500);
	//dessiner le quadrillage
	ctx.font = "20px Arial"
	ctx.strokeStyle= "#000"
	for (var X = 0; X<TaillePartie[0]+2; X++){
		ctx.beginPath();
		ctx.moveTo(50*(X-1),-50)
		ctx.lineTo(50*(X-1),50*TaillePartie[1]+2)
		ctx.stroke();
		ctx.closePath()
	}
	for (var X = 0; X<TaillePartie[1]+2; X++){
		ctx.beginPath();
		ctx.moveTo(-50,50*(X-1))
		ctx.lineTo(50*TaillePartie[0]+2,50*(X-1))
		ctx.stroke();
		ctx.closePath()
	}
	//dessiner les chemins actuellement faits
	for (var X = 0; X<ListesCheminsSoluce.length; X++){
		if (SolutionJoueur[X]){
			for (var Y = 0; Y<SolutionJoueur[X].length-1; Y++){
				DessineLien(-25+50*SolutionJoueur[X][Y][0],-25+50*SolutionJoueur[X][Y][1],-25+50*SolutionJoueur[X][Y+1][0],-25+50*SolutionJoueur[X][Y+1][1],Extremites[X][0])
				DessineDemiRond(-25+50*SolutionJoueur[X][Y][0],-25+50*SolutionJoueur[X][Y][1],Extremites[X][0])
			}
		}
	}
	//dessiner les extremites
	for (var X = 0; X<ListesCheminsSoluce.length; X++){
		DessineRond(-25+50*Extremites[X][1][0],-25+50*Extremites[X][1][1],Extremites[X][0],X)
		DessineRond(-25+50*Extremites[X][2][0],-25+50*Extremites[X][2][1],Extremites[X][0],X)
	}
	//dessiner les cases noires
	for (var X = 0; X<Blockers.length; X++){
		DessineCase(-25+50*Blockers[X][0],-25+50*Blockers[X][1])
	}
	if (CellulesVide.length == 0){ //condition de victoire
		ctx.clearRect(70, 190, 360, 80);
		ctx.font = "60px Arial"
		ctx.strokeStyle = "#000"
		ctx.beginPath();
		ctx.moveTo(70,190)
		ctx.lineTo(430,190)
		ctx.lineTo(430,270)
		ctx.lineTo(70,270)
		ctx.lineTo(70,190)
		ctx.stroke();
		ctx.closePath()
		ctx.fillStyle = "#000"
		ctx.fillText("Game won !", 250, 250)
	}
}

function DessineRond(x,y,Couleur, id){ // à améliorer pour avoir plus de modes
	ctx.fillStyle= Couleur
	ctx.beginPath();
	ctx.moveTo(x-20,y)
	ctx.lineTo(x,y-20)
	ctx.lineTo(x+20,y)
	ctx.lineTo(x,y+20)
	ctx.lineTo(x-20,y)
	ctx.fill();
	ctx.fillStyle = "#fff"
	ctx.fillText(id, x, y+8)
	ctx.closePath()
}

function DessineDemiRond(x,y,Couleur){ // à améliorer pour avoir plus de modes
	ctx.fillStyle= Couleur
	ctx.beginPath();
	ctx.moveTo(x-10,y)
	ctx.lineTo(x,y-10)
	ctx.lineTo(x+10,y)
	ctx.lineTo(x,y+10)
	ctx.lineTo(x-10,y)
	ctx.fill();
	ctx.closePath()
}

function DessineCase(x,y){ 
	ctx.fillStyle= "#000"
	ctx.beginPath();
	ctx.moveTo(x-25,y-25)
	ctx.lineTo(x+25,y-25)
	ctx.lineTo(x+25,y+25)
	ctx.lineTo(x-25,y+25)
	ctx.lineTo(x-25,y-25)
	ctx.fill();
	ctx.closePath()
}

function DessineLien(x1,y1,x2,y2,Couleur){ // à améliorer pour avoir plus de modes
	ctx.fillStyle=Couleur
	ctx.beginPath();
	ctx.moveTo(x1-10,y1)
	ctx.lineTo(x1+10,y1)
	ctx.lineTo(x2-10,y2)
	ctx.lineTo(x2+10,y2)
	ctx.lineTo(x1-10,y1)
	ctx.fill();
	ctx.closePath()
	ctx.beginPath();
	ctx.moveTo(x1,y1-10)
	ctx.lineTo(x1,y1+10)
	ctx.lineTo(x2,y2-10)
	ctx.lineTo(x2,y2+10)
	ctx.lineTo(x1,y1-10)
	ctx.fill();
	ctx.closePath()
}


function StartNew(){ // générateur de niveaux dedans, à améliorer pour inclure cgt de taille pour avoir 0 bugs
	ListesCheminsSoluce = [] // id = index,  [[Liste ordonée des chemins]]
	Blockers = [] // Liste des carrés noirs faisant pas partie du niveau, ne sert qu'au dessin
	CellulesVide = [] //je sais plus si je prends lui ou l'autre
	TaillePartie = [10,10] // capable de modifier
	Extremites={} // Liste des extrémités avec leur couleur et identifiant
	SolutionJoueur=[]
	
	for (var X = 0; X<TaillePartie[0]; X++){
		Blockers.push([X+1,0])
		Blockers.push([X+1,TaillePartie[1]+1])
		for (var Y = 0; Y<TaillePartie[1]; Y++){ 
			CellulesVide.push([X+1,Y+1])
		}
	}
	for (var Y = 0; Y<TaillePartie[1]+2; Y++){ 
		Blockers.push([0,Y])
		Blockers.push([TaillePartie[0]+1,Y])
	}
	
	var Tries = 0
	//Générateur de Niveau
	while (Tries<100){
		Tries++
		LISTING = [JSON.parse(JSON.stringify(CellulesVide[math.randomInt(CellulesVide.length)]))]
		//Boucle while générer un chemin : Taille médiane = Racine Zone x 2 : Proba stopper = 1/taille médiane
		while(LISTING.length<3 || math.random()>1/(2*math.sqrt(TaillePartie[0]*TaillePartie[1]))){
			Options = []
			//console.log("test 1 ", LISTING.find((element) => JSON.parse(JSON.stringify(element)) == [LISTING[LISTING.length-1][0],LISTING[LISTING.length-1][1]]))
			//console.log("test 2 ", LISTING.find((element) => element == [LISTING[LISTING.length-1][0],LISTING[LISTING.length-1][1]]))
			//console.log("test 3 ", LISTING.find((element) => element[0] == LISTING[LISTING.length-1][0] && element[1] == LISTING[LISTING.length-1][1]))
			if (!(LISTING.find((element) => element[0] == LISTING[LISTING.length-1][0]-1 && element[1] == LISTING[LISTING.length-1][1])) && CellulesVide.find((element) => element[0] == LISTING[LISTING.length-1][0]-1 && element[1] == LISTING[LISTING.length-1][1])){
				Options.push(JSON.parse(JSON.stringify([LISTING[LISTING.length-1][0]-1,LISTING[LISTING.length-1][1]])))
			}
			if (!(LISTING.find((element) => element[0] == LISTING[LISTING.length-1][0]+1 && element[1] == LISTING[LISTING.length-1][1])) && CellulesVide.find((element) => element[0] == LISTING[LISTING.length-1][0]+1 && element[1] == LISTING[LISTING.length-1][1])){
				Options.push(JSON.parse(JSON.stringify([LISTING[LISTING.length-1][0]+1,LISTING[LISTING.length-1][1]])))
			}
			if (!(LISTING.find((element) => element[0] == LISTING[LISTING.length-1][0] && element[1] == LISTING[LISTING.length-1][1]+1)) && CellulesVide.find((element) => element[0] == LISTING[LISTING.length-1][0] && element[1] == LISTING[LISTING.length-1][1]+1)){
				Options.push(JSON.parse(JSON.stringify([LISTING[LISTING.length-1][0],LISTING[LISTING.length-1][1]+1])))
			}
			if (!(LISTING.find((element) => element[0] == LISTING[LISTING.length-1][0] && element[1] == LISTING[LISTING.length-1][1]-1)) && CellulesVide.find((element) => element[0] == LISTING[LISTING.length-1][0] && element[1] == LISTING[LISTING.length-1][1]-1)){
				Options.push(JSON.parse(JSON.stringify([LISTING[LISTING.length-1][0],LISTING[LISTING.length-1][1]-1])))
			}
			if (Options.length!=0){
				//Choisir et ajouter à LISTING
				LISTING.push(JSON.parse(JSON.stringify(Options[math.randomInt(Options.length)])))
			}
			else {
				if (LISTING.length == 1){
					//ajouter au blockers et retirer aux options
					Blockers.push(JSON.parse(JSON.stringify(LISTING[0])))
					CellulesVide.splice(CellulesVide.findIndex((element) => element[0] == LISTING[0][0] && element[1] == LISTING[0][1]),1)
					Tries = 0
				}
				break
			}
		}
		if (LISTING.length>2){
			ListesCheminsSoluce.push(JSON.parse(JSON.stringify(LISTING)))
			for (var X = 0; X < LISTING.length; X++){
				CellulesVide.splice(CellulesVide.findIndex((element) => element[0] == LISTING[X][0] && element[1] == LISTING[X][1]),1)
			}
			Tries = 0
		}
		
		//fin si plus de cases vides
		if (CellulesVide.length == 0){break}
	}
	//Ajouter toutes les cases encore vides à Blockers
	for (var X = 0; X < CellulesVide.length; X++){
		Blockers.push(JSON.parse(JSON.stringify(CellulesVide[X])))
	}
	//fin de la génération d'une solution
	
	//Génération des constantes du niveau (pour dessiner et utiliser) Les blockers sont déjà initialisés. Le tableau vide est généré en premier, et en second les départs/fins, puis viennent les couleurs.
	CellulesVide = []
	for (var X = 0; X<TaillePartie[0]; X++){
		for (var Y = 0; Y<TaillePartie[1]; Y++){ 
			CellulesVide.push([X+1,Y+1])
		}
	}
	for (var X = 0; X<Blockers.length; X++){
		if (CellulesVide.find((element) => element[0] == Blockers[X][0] && element[1] == Blockers[X][1])){ 
			CellulesVide.splice(CellulesVide.findIndex((element) => element[0] == Blockers[X][0] && element[1] == Blockers[X][1]),1)
		}
	}
	for (var X = 0; X<ListesCheminsSoluce.length; X++){
		Extremites[X]= ["rgb("+math.randomInt(200)+","+math.randomInt(200)+","+math.randomInt(200)+")", JSON.parse(JSON.stringify(ListesCheminsSoluce[X][0])),JSON.parse(JSON.stringify(ListesCheminsSoluce[X][ListesCheminsSoluce[X].length-1]))]
	}
}

function VISUALISERMATRICESOLUTION(){
	var TEST = Array(TaillePartie[0]+2).fill().map(() => Array(TaillePartie[1]+2).fill(0))
	for (var X = 0; X<Blockers.length; X++){
		TEST[Blockers[X][0]][Blockers[X][1]] -= 100
	}
	for (var X = 0; X<ListesCheminsSoluce.length; X++){
		for (var Y = 0; Y<ListesCheminsSoluce[X].length; Y++){
			TEST[ListesCheminsSoluce[X][Y][0]][ListesCheminsSoluce[X][Y][1]] += X+1
		}
	}
	console.log(TEST)
}

var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, 33);

function loop() {
	drawTuyaux()
}
