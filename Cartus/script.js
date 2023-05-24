// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var KAPPALUNKA=[500,500];
var Partie;
Partie = [];
var ActiveSigil;
var Score = 0;
var BScore = 0;
ctx.font = "12px Arial";
ctx.textAlign = "center"
N = 36
var AUTO = false

var BOOLERIEN = false;

function Celler(){CellClick(event)}
canvas.addEventListener("click",Celler)
function CellClick(e){
	//console.log(e.clientX, e.clientY)
	if (BOOLERIEN && !(AUTO)){
		if (ActiveSigil){
			var IDX = parseInt((e.clientX-canvas.getBoundingClientRect().left)/200)
			var IDY = parseInt((e.clientY-canvas.getBoundingClientRect().top)/100)
			var IDZ = Partie[IDX][IDY][Partie[IDX][IDY].length - 1]
			if ((IDX != ActiveSigil[0] || IDY != ActiveSigil[1]) && Partie[IDX][IDY].length !=20 && (Partie[IDX][IDY].length == 0 || IDZ == Partie[ActiveSigil[0]][ActiveSigil[1]][Partie[ActiveSigil[0]][ActiveSigil[1]].length - 1])){
				Partie[IDX][IDY].push(Partie[ActiveSigil[0]][ActiveSigil[1]].pop())
			}
			CheckWin()
			DrawGame()
			ActiveSigil=undefined
		}
		else {
			ActiveSigil=[parseInt((e.clientX-canvas.getBoundingClientRect().left)/200),parseInt((e.clientY-canvas.getBoundingClientRect().top)/100)]
			ctx.fillStyle=CouleursPartie[Partie[ActiveSigil[0]][ActiveSigil[1]][Partie[ActiveSigil[0]][ActiveSigil[1]].length - 1]]
			ctx.strokeStyle="#000"
			ctx.beginPath();
			ctx.moveTo(ActiveSigil[0]*200,ActiveSigil[1]*100)
			ctx.lineTo(ActiveSigil[0]*200+200,ActiveSigil[1]*100)
			ctx.lineTo(ActiveSigil[0]*200+200,ActiveSigil[1]*100+100)
			ctx.lineTo(ActiveSigil[0]*200,ActiveSigil[1]*100+100)
			ctx.lineTo(ActiveSigil[0]*200,ActiveSigil[1]*100)
			ctx.stroke();
			ctx.fill();
			ctx.closePath()
		}
	}
}

var CouleursPartie =[[217,  35, 205],[ 95,  95,  29],[193,  26, 123],[ 36, 210,  34],[185, 152,  93],[171, 153, 191],[ 92, 146, 214],[ 23, 205, 211],[142,  28, 216],[144, 221,  37],
       [ 76, 223, 208],
       [ 31,  31, 208],
       [ 32,  34, 115],
       [219, 210, 211],
       [146,  92, 182],
       [ 25, 121, 209],
       [216, 205,  35],
       [ 89, 217,  88],
       [ 38,  34,  35],
       [166, 221, 134],
       [146, 214, 220],
       [100,  29, 145],
       [126,  70,  91],
       [214,  35,  40],
       [104, 199, 154],
       [218,  96, 123],
       [131,  28,  35],
       [115, 161,  31],
       [ 28, 123,  45],
       [226, 204, 124],
       [218, 115, 214],
       [ 27, 200, 125],
       [105, 138, 112],
       [ 83,  71, 216],
       [202, 113,  31],
       [ 38, 108, 132]]
function ChoixCouleur(){
	for (var k=0; k<N; k++){
		CouleursPartie[k] = "rgb("+CouleursPartie[k][0]+","+CouleursPartie[k][1]+","+CouleursPartie[k][2]+")"
	}
}
ChoixCouleur()
function DessineCarte(x,y,Couleur){
	ctx.fillStyle=CouleursPartie[Couleur]
	ctx.strokeStyle="#000"
	ctx.beginPath();
	ctx.moveTo(x-18,y-40)
	ctx.lineTo(x+18,y-40)
	ctx.lineTo(x+18,y+40)
	ctx.lineTo(x-18,y+40)
	ctx.lineTo(x-18,y-40)
	ctx.stroke();
	ctx.fill();
	ctx.closePath()
}

function DrawGame(){
	ctx.clearRect(0,0,1000,500)
	ctx.strokeStyle="#000"
	for (var k = 0; k<4; k++){
		ctx.beginPath();
		ctx.moveTo(0,k * 100 + 100)
		ctx.lineTo(1000,k * 100 + 100)
		ctx.stroke();
		ctx.closePath()
		ctx.beginPath();
		ctx.moveTo(k * 200 + 200, 0)
		ctx.lineTo(k * 200 + 200, 500)
		ctx.stroke();
		ctx.closePath()
	}
	for (var X = 0; X<5; X++){ 
		for (var Y = 0; Y<5; Y++){ 
			for (var Z = 0; Z<Partie[X][Y].length; Z++){ 
				DessineCarte(20 + X * 200 + Z * 8, 50 + Y * 100, Partie[X][Y][Z])
				ctx.strokeText(Partie[X][Y][Z], 19 + X * 200 + Z * 8, 30 + Y * 100)
				ctx.strokeText(Partie[X][Y].length, 19 + X * 200 + Z * 8, 70 + Y * 100)
			}
		}
	}
	document.getElementById("Scorer").innerHTML = "Best Score : "+BScore+" | Score : "+Score
}

function StartNew(){
	for (var X = 0; X<5; X++){ 
		Partie[X] = []
		for (var Y = 0; Y<5; Y++){ 
			Partie[X][Y] = []
			for (var Z = 0; Z<9; Z++){ 
				//console.log(X,Y,Z)
				Partie[X][Y][Z] = math.randomInt(N)
			}
		}
	}
	BOOLERIEN = true
	AUTO = false
	Score = 0;
	DrawGame()
}

function StartAuto(){
	for (var X = 0; X<5; X++){ 
		Partie[X] = []
		for (var Y = 0; Y<5; Y++){ 
			Partie[X][Y] = []
			for (var Z = 0; Z<9; Z++){ 
				//console.log(X,Y,Z)
				Partie[X][Y][Z] = math.randomInt(N)
			}
		}
	}
	BOOLERIEN = true
	AUTO = true
	Score = 0;
	DrawGame()
}

function DrawTurn(){
	if (BOOLERIEN){
		for (var X = 0; X<5; X++){ 
			for (var Y = 0; Y<5; Y++){ 
				Partie [X][Y].push(math.randomInt(N))
			}
		}
		CheckWin()
		DrawGame()
		for (var X = 0; X<5; X++){ 
			for (var Y = 0; Y<5; Y++){ 
				if (Partie[X][Y].length == 21) {
					ctx.clearRect(0,0,1000,500)
					BOOLERIEN = false
					// Fin de partie
				}
			}
		}
	}
}

function CheckWin(){
	for (var X = 0; X<5; X++){ 
		for (var Y = 0; Y<5; Y++){ 
			var XYZ = Partie[X][Y]
			var t = XYZ.length
			if (t>9/(1+AUTO) && XYZ[t-1]==XYZ[t-2] && XYZ[t-1]==XYZ[t-3] && XYZ[t-1]==XYZ[t-4] && XYZ[t-1]==XYZ[t-5] && ((XYZ[t-1]==XYZ[t-6] && XYZ[t-1]==XYZ[t-7] && XYZ[t-1]==XYZ[t-8] && XYZ[t-1]==XYZ[t-9] && XYZ[t-1]==XYZ[t-10]) || AUTO)){
				for (var k=0; k<10/(1+AUTO); k++){Partie[X][Y].pop()}
				Score ++
				if (BScore<Score && !(AUTO)){
					BScore = Score;
					localStorage.setItem('BS',BScore);
				}
			}
		}
	}
}

var mainGameLoop = window.setInterval(function() { // runs the loop
	if (AUTO && BOOLERIEN){
		var MOVEMENTS = [];
		for (var i = 0; i<25;i++){
			for (var j = 0; j<25;j++){
				if (i!=j && Partie[parseInt(i/5)][i%5].length!=0 && Partie[parseInt(j/5)][j%5].length!=20 && (Partie[parseInt(j/5)][j%5].length==0 || Partie[parseInt(i/5)][i%5][Partie[parseInt(i/5)][i%5].length-1] == Partie[parseInt(j/5)][j%5][Partie[parseInt(j/5)][j%5].length-1])){
					MOVEMENTS.push([i,j])
				}
			}	
		}
		if (MOVEMENTS.length !=0){
			var TULISTE = MOVEMENTS[math.randomInt(MOVEMENTS.length)]
			Partie[parseInt(TULISTE[1]/5)][TULISTE[1]%5].push(Partie[parseInt(TULISTE[0]/5)][TULISTE[0]%5].pop())
			CheckWin()
			DrawGame()
		}
		else {DrawTurn();DrawGame()}
	}
}, 300);

if (localStorage.BS){BScore=parseInt(localStorage.BS)}
