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
N = 33

function Celler(){CellClick(event)}
canvas.addEventListener("click",Celler)
function CellClick(e){
	//console.log(e.clientX, e.clientY)
	if (ActiveSigil){
		var IDX = parseInt((e.clientX-11)/200)
		var IDY = parseInt((e.clientY-52)/100)
		var IDZ = Partie[IDX][IDY][Partie[IDX][IDY].length - 1]
		if ((IDX != ActiveSigil[0] || IDY != ActiveSigil[1]) && Partie[IDX][IDY].length !=20 && (Partie[IDX][IDY].length == 0 || IDZ == Partie[ActiveSigil[0]][ActiveSigil[1]][Partie[ActiveSigil[0]][ActiveSigil[1]].length - 1])){
			Partie[IDX][IDY].push(Partie[ActiveSigil[0]][ActiveSigil[1]].pop())
		}
		CheckWin()
		DrawGame()
		ActiveSigil=undefined
	}
	else {
		ActiveSigil=[parseInt((e.clientX-11)/200),parseInt((e.clientY-52)/100)]
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

var CouleursPartie =[]
function ChoixCouleur(){
	for (var k=0; k<N/3; k++){
		CouleursPartie[3*k] = "hsl("+parseInt(360 * 3 * k / N)+", 100%, 50%)"
		CouleursPartie[3*k+1] = "hsl("+parseInt(360 * 3 * k / N)+", 100%, 25%)"
		CouleursPartie[3*k+2] = "hsl("+parseInt(360 * 3 * k / N)+", 100%, 75%)"
	}
}

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
	ChoixCouleur()
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
	Score = 0;
	DrawGame()
}

function DrawTurn(){
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
				// Fin de partie
			}
		}
	}
}

function CheckWin(){
	for (var X = 0; X<5; X++){ 
		for (var Y = 0; Y<5; Y++){ 
			var XYZ = Partie[X][Y]
			var t = XYZ.length
			if (t>9 && XYZ[t-1]==XYZ[t-2] && XYZ[t-1]==XYZ[t-3] && XYZ[t-1]==XYZ[t-4] && XYZ[t-1]==XYZ[t-5] && XYZ[t-1]==XYZ[t-6] && XYZ[t-1]==XYZ[t-7] && XYZ[t-1]==XYZ[t-8] && XYZ[t-1]==XYZ[t-9] && XYZ[t-1]==XYZ[t-10]){
				for (var k=0; k<10; k++){Partie[X][Y].pop()}
				Score ++
				if (BScore<Score){BScore = Score}
			}
		}
	}
}