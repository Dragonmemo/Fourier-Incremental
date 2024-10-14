const ListEffets = {
	"corps" : [128,128,128],
	"tGauche" : [255,0,0],
	"tDroit" : [0,0,255],
	"saut" : [0,255,0],
	"activateur" : [255,255,0]
}
//TODO Ajouter les types de shift (par rapport au plan externe, par rapport au snake)
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");


var ActiveSigil;
ctx.font = "12px Arial";
ctx.textAlign = "center"

var ListeSerpent = [[[10,10],"corps"]] // id = index, 0 = tête,  [[Position, Type]]
var ListeSerpentTemp = ["corps"] // id = index, 0 = tête,  [[Position, Type]]
var Direction = [1,0]
var CellulesEffet = [] //id : sans importance, [[Position, ListeEffets, quantité]]
var TailleGrille = 20 // capable de modifier
var BOOLERIEN = -1
var topInfini = 0
var topTraverse = 0
var typeEffet = "meme" //meme, activateur, tous
var typeAccumulation = "remplace" // remplace, remplaceTout (même serpent), ajoutMemeOuRemplace, ajout (remplace et ajout ne fonctionnent qu'avec "tous"
var vitesseIteration = 33//en ms
var CurrentTick=0;

function drawGrid(Taille){
	ctx.clearRect(0, 0, 500, 500);
	//dessiner le quadrillage
	ctx.strokeStyle= "#000"
	for (var X = 0; X<TailleGrille+2; X++){
		ctx.beginPath();
		ctx.moveTo(500*(X-1)/TailleGrille,-50)
		ctx.lineTo(500*(X-1)/TailleGrille,550)
		ctx.stroke();
		ctx.closePath()
		ctx.beginPath();
		ctx.moveTo(-50,500*(X-1)/TailleGrille)
		ctx.lineTo(550,500*(X-1)/TailleGrille)
		ctx.stroke();
		ctx.closePath()
	}
}

function drawAll(){
	drawGrid(TailleGrille)
	
	//dessiner les cases a effets
	for (var X = 0; X<CellulesEffet.length; X++){
		var SumRGB = [0,0,0,0];
		switch (typeAccumulation){
			case "remplace":
			case "ajout":
				for (var XX = 0; XX<CellulesEffet[X][1].length; XX++){
					SumRGB[0]+=ListEffets[CellulesEffet[X][1][XX]][0]
					SumRGB[1]+=ListEffets[CellulesEffet[X][1][XX]][1]
					SumRGB[2]+=ListEffets[CellulesEffet[X][1][XX]][2]
					SumRGB[3]++
				}
				break;
			default :
				SumRGB[0]+=ListEffets[CellulesEffet[X][1]][0]
				SumRGB[1]+=ListEffets[CellulesEffet[X][1]][1]
				SumRGB[2]+=ListEffets[CellulesEffet[X][1]][2]
				SumRGB[3]++
				break;
		}
		
		ctx.fillStyle="rgb("+parseInt(SumRGB[0]/SumRGB[3])+","+parseInt(SumRGB[1]/SumRGB[3])+","+parseInt(SumRGB[2]/SumRGB[3])+")"
		ctx.beginPath();
		ctx.moveTo(500*(CellulesEffet[X][0][0])/TailleGrille,500*(CellulesEffet[X][0][1])/TailleGrille)
		ctx.lineTo(500*(CellulesEffet[X][0][0]+1)/TailleGrille,500*(CellulesEffet[X][0][1])/TailleGrille)
		ctx.lineTo(500*(CellulesEffet[X][0][0]+1)/TailleGrille,500*(CellulesEffet[X][0][1]+1)/TailleGrille)
		ctx.lineTo(500*(CellulesEffet[X][0][0])/TailleGrille,500*(CellulesEffet[X][0][1]+1)/TailleGrille)
		ctx.fill();
		ctx.closePath();
	}
	//dessiner le serpent
	for (var X = 0; X<ListeSerpent.length; X++){
		ctx.fillStyle="rgba("+ListEffets[ListeSerpent[X][1]][0]+","+ListEffets[ListeSerpent[X][1]][1]+","+ListEffets[ListeSerpent[X][1]][2]+",0.2)"
		ctx.beginPath();
		ctx.moveTo(500*(ListeSerpent[X][0][0])/TailleGrille,500*(ListeSerpent[X][0][1])/TailleGrille)
		ctx.lineTo(500*(ListeSerpent[X][0][0]+1)/TailleGrille,500*(ListeSerpent[X][0][1])/TailleGrille)
		ctx.lineTo(500*(ListeSerpent[X][0][0]+1)/TailleGrille,500*(ListeSerpent[X][0][1]+1)/TailleGrille)
		ctx.lineTo(500*(ListeSerpent[X][0][0])/TailleGrille,500*(ListeSerpent[X][0][1]+1)/TailleGrille)
		ctx.fill();
		ctx.closePath();
	}
	
}

function StartNew(){ // Pour démarrer une nouvelle run
	ListeSerpent = [[[TailleGrille/2,TailleGrille/2],"corps"]] // Faire le 0
	Direction = [1,0]
	CellulesEffet = []
	TailleGrille = 20 // capable de modifier
	CurrentTick = 0;
	typeEffet = document.getElementById('EffectActivation').value;
	typeAccumulation = document.getElementById('CaseAccumulation').value;
	
	for (var X = 1; X<ListeSerpentTemp.length; X++){
		ListeSerpent.push([[TailleGrille/2,TailleGrille/2],ListeSerpentTemp[X]])
	}
}

function TickIter(){
	var CaseTemp = []
	//TODO recoder ça
	if (CurrentTick<ListeSerpent.length){
		switch(ListeSerpent[CurrentTick][1]){
			case "tGauche":
				CaseTemp.push("tGauche")
				break;
			case "tDroit":
				CaseTemp.push("tDroit")
				break;
			case "activateur":
				CaseTemp.push("activateur")
				break;
			case "saut":
				CaseTemp.push("saut")
				break;
		}
	} //cas de première activation
	
	//déplacement et activation
	//déplacement du corps
	for (var X = ListeSerpent.length-1; X >= 1; X--){
		ListeSerpent[X][0] = [ListeSerpent[X-1][0][0],ListeSerpent[X-1][0][1]]
		//Activation, si sur même ou autre
		var num = CellulesEffet.findIndex((element) => element[0][0] == ListeSerpent[X][0][0] && element[0][1] == ListeSerpent[X][0][1])
		if (num != -1){
			switch (typeEffet){
				case "meme" :
					if (CellulesEffet[num][1] == ListeSerpent[X][1]){
						CaseTemp.push(ListeSerpent[X][1]);
					}
					break;
				case "activation" :
					if (CellulesEffet[num][1] == "activation" && ListeSerpent[X][1] != "corps"){
						CaseTemp.push(ListeSerpent[X][1]);
					}
					break;
				case "tous" :
					if (ListeSerpent[X][1] != "corps") {CaseTemp.push(ListeSerpent[X][1]);}
					break;
			}
		}
	}
	
	//déplacement de la tête
	ListeSerpent[0][0]=[ListeSerpent[0][0][0]+Direction[0],ListeSerpent[0][0][1]+Direction[1]]
	
	//Création de case
	var num = CellulesEffet.findIndex((element) => element[0][0] == ListeSerpent[0][0][0] && element[0][1] == ListeSerpent[0][0][1])
	if (CaseTemp.length!=0){
		switch (typeAccumulation){
			case "remplace" :
				if (num == -1) {
					CellulesEffet.push([[ListeSerpent[0][0][0],ListeSerpent[0][0][1]], CaseTemp])
				}
				else {
					CellulesEffet[num][1] = CaseTemp
				}
				break;
			case "remplaceTout" :
				if (num == -1) {
					CellulesEffet.push([[ListeSerpent[0][0][0],ListeSerpent[0][0][1]], CaseTemp[0]])
				}
				else {
					CellulesEffet[num][1] = CaseTemp[0]
				}
				break;
			case "ajoutMemeOuRemplace" :
				if (num == -1) {
					CellulesEffet.push([[ListeSerpent[0][0][0],ListeSerpent[0][0][1]], CaseTemp[0],1]);
					CellulesEffet[CellulesEffet.length-1][2] = CaseTemp.filter(x => x==CaseTemp[0]).length
				}
				else {
					if (CaseTemp[0] == CellulesEffet[num][1]){
						CellulesEffet[num][2] += CaseTemp.filter(x => x==CaseTemp[0]).length
					}
					else {
						CellulesEffet[num][1] = CaseTemp[0]
						CellulesEffet[num][2] = CaseTemp.filter(x => x==CaseTemp[0]).length
					}
				}
				break;
			case "ajout" :
				if (num == -1) {
					CellulesEffet.push([[ListeSerpent[0][0][0],ListeSerpent[0][0][1]], CaseTemp]);
				}
				else {
					if (CaseTemp[0] == CellulesEffet[num][1]){
						CellulesEffet[num][1]=CellulesEffet[num][1].concat(CaseTemp)
					}
				}
				break;
		}
	}
	
	//changement de "direction"
	var num = CellulesEffet.findIndex((element) => element[0][0] == ListeSerpent[0][0][0] && element[0][1] == ListeSerpent[0][0][1])
	Direction[0]=math.sign(Direction[0])
	Direction[1]=math.sign(Direction[1])
	
	if (num!= -1){
		switch (typeAccumulation){
			case "ajoutMemeOuRemplace" :
				switch (CellulesEffet[num][1]){
					case "tGauche":
						if ((Direction[0]**2 == 0 && CellulesEffet[num][2]%4==1) || (Direction[0]**2 != 0 && CellulesEffet[num][2]%4==3)){Direction = [Direction[1],Direction[0]]}
						else {
							if ((Direction[0]**2 == 0 && CellulesEffet[num][2]%4==3) || (Direction[0]**2 != 0 && CellulesEffet[num][2]%4==1)) {Direction = [-Direction[1],-Direction[0]]}
							else {
								if (CellulesEffet[num][2]%4==2){
									Direction=[-Direction[0],-Direction[1]]
								}
							}
						}
						break;
					case "tDroit":
						if ((Direction[0]**2 == 0 && CellulesEffet[num][2]%4==3) || (Direction[0]**2 != 0 && CellulesEffet[num][2]%4==1)){Direction = [Direction[1],Direction[0]]}
						else {
							if ((Direction[0]**2 == 0 && CellulesEffet[num][2]%4==1) || (Direction[0]**2 != 0 && CellulesEffet[num][2]%4==3)) {Direction = [-Direction[1],-Direction[0]]}
							else {
								if (CellulesEffet[num][2]%4==2){
									Direction=[-Direction[0],-Direction[1]]
								}
							}
						}
						break;
					case "saut":
						Direction = [Direction[0]*CellulesEffet[num][2],Direction[1]*CellulesEffet[num][2]]
						break;
				}
				break;
			case "ajout":
			case "remplace" :
				for (var X=0; X<CellulesEffet[num][1].length; X++){
					switch (CellulesEffet[num][1][X]){
						case "tGauche":
							if (Direction[0]**2 == 0){Direction = [Direction[1],Direction[0]]}
							else {Direction = [-Direction[1],-Direction[0]]}
							break;
						case "tDroit":
							if (Direction[0]**2 != 0){Direction = [Direction[1],Direction[0]]}
							else {Direction = [-Direction[1],-Direction[0]]}
							break;
						case "saut":
							Direction = [Direction[0]+math.sign(Direction[0]),Direction[1]+math.sign(Direction[1])]
							break;
					}
				}
				break;
			case "remplaceTout" :
				switch (CellulesEffet[num][1]){
					case "tGauche":
						if (Direction[0]**2 == 0){Direction = [Direction[1],Direction[0]]}
						else {Direction = [-Direction[1],-Direction[0]]}
						break;
					case "tDroit":
						if (Direction[0]**2 == 1){Direction = [Direction[1],Direction[0]]}
						else {Direction = [-Direction[1],-Direction[0]]}
						break;
					case "saut":
						Direction = [Direction[0]*2,Direction[1]*2]
						break;
				}
				break;
		}
	}
	CurrentTick++
}

function DrawSnake(){
	ctx2.clearRect(0, 0, 500, 100);
	ctx2.strokeStyle= "#000"
	for (var X = 0; X<ListeSerpentTemp.length; X++){
		ctx2.fillStyle="rgb("+ListEffets[ListeSerpentTemp[X]][0]+","+ListEffets[ListeSerpentTemp[X]][1]+","+ListEffets[ListeSerpentTemp[X]][2]+")"
		ctx2.beginPath();
		ctx2.moveTo(40*X+5,5)
		ctx2.lineTo(40*X+5,45)
		ctx2.lineTo(40*X+45,45)
		ctx2.lineTo(40*X+45,5)
		ctx2.stroke();
		ctx2.fill();
		ctx2.closePath()
	}
}
DrawSnake();

function AddElement(Type){
	if (ListeSerpentTemp.length ==1){document.getElementById('Remover').removeAttribute("disabled")}
	ListeSerpentTemp.push(Type);
	DrawSnake();
}

function RemoveElement(){
	ListeSerpentTemp.pop();
	DrawSnake();
	if (ListeSerpentTemp.length ==1){document.getElementById('Remover').setAttribute("disabled", "")}
}

var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
	}, vitesseIteration);

function loop() {
	TickIter()
	drawAll();
}
