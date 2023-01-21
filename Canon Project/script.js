var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var SETTINGS = false;
var i,j;
var Pointer = [0,0]
var Player = [500,250]
var Player_Speed = [0,0]
var Player_Projectiles=[] // Position, Direction, Durée
var spawntime=100
var Enemies=[]
var EnemiesObst=[] //[[999, math.PI, [538,135], [520, 100], [520, 150] ]] // Durée, angle, Forme
var Enemy_Projectiles=[]
var Score=0

canvas.addEventListener("mousemove",function(){POINT(event)})
canvas.addEventListener("click",function(){Ballsy()})

function RESTART(){
	var Player = [500,250]
	Player_Speed = [0,0]
	Player_Projectiles=[]
	spawntime=100
	Enemies=[]
	EnemiesObst=[]
	Enemy_Projectiles=[]
	Score=0
	SETTINGS = true
}

function POINT(event){
	Pointer[0]=event.clientX
	Pointer[1]=event.clientY
}

function Ballsy(){
	Player_Projectiles.push([[Player[0]-Player_Vector()[0]*15,Player[1]-Player_Vector()[1]*15], Complex([-Player_Vector()[0],-Player_Vector()[1]]),200])
	Player_Speed[0]+=Player_Vector()[0]*parseInt((Score/25)**2)
	Player_Speed[1]+=Player_Vector()[1]*parseInt((Score/25)**2)
}

function EnemyFunction(){
	Enemies.push([[math.randomInt(1000),math.randomInt(500)], math.randomInt(360), 50+math.randomInt(50),50])
	spawntime=100+math.randomInt(100)
}

document.onkeydown = function (e){
	if (e.keyCode==68 || e.keyCode == 39){Player_Speed[0]++}
	if (e.keyCode==81 || e.keyCode == 37 || e.keyCode == 65){Player_Speed[0]--}
	if (e.keyCode==38 || e.keyCode == 90 || e.keyCode == 87){Player_Speed[1]--}
	if (e.keyCode==40 || e.keyCode == 83){Player_Speed[1]++}
}


function Movement(){
	Player[0]+=Player_Speed[0]
	Player[1]+=Player_Speed[1]
	Player[0]=(Player[0]+1000)%1000
	Player[1]=(Player[1]+500)%500
	Player_Speed[0]*=1-math.exp(-Score/50)
	Player_Speed[1]*=1-math.exp(-Score/50)
	document.getElementById("scoreUpdt").innerHTML="Score : "+Score+"<br>Slipperiness : "+parseInt(100*(1-math.exp(-Score/50)))+"%"+"<br>Recoil Power : "+parseInt((Score/25)**2)
	//Projectiles' movements
	for (i=0; i<Player_Projectiles.length;i++){
		Player_Projectiles[i][0]=[Player_Projectiles[i][0][0]+Player_Projectiles[i][1].re,Player_Projectiles[i][0][1]+Player_Projectiles[i][1].im]
		Player_Projectiles[i]=COLLISION(EnemiesObst, Player_Projectiles[i])
		Player_Projectiles[i][2]--
		if (Player_Projectiles[i][2]<=0){
			Player_Projectiles.splice(i,1)
			i-=1
		}
	}
	for (i=0; i<Enemy_Projectiles.length;i++){
		Enemy_Projectiles[i][0]=[Enemy_Projectiles[i][0][0]+Enemy_Projectiles[i][1].re,Enemy_Projectiles[i][0][1]+Enemy_Projectiles[i][1].im]
		Enemy_Projectiles[i]=COLLISION(EnemiesObst, Enemy_Projectiles[i])
		Enemy_Projectiles[i][2]--
		if (Enemy_Projectiles[i][2]<=0){
			Enemy_Projectiles.splice(i,1)
			i-=1
		}
	}
	//Enemy projectile creation
	for (i=0; i<Enemies.length;i++){
		Enemies[i][3]--
		if (Enemies[i][3]<=0){
			Enemies[i][3]=Enemies[i][2]
			Enemy_Projectiles.push([[Enemies[i][0][0]-math.cos(Enemies[i][1]*(2*math.PI/360))*15,Enemies[i][0][1]-math.sin(Enemies[i][1]*(2*math.PI/360))*15], Complex([-math.cos(Enemies[i][1]*(2*math.PI/360)),-math.sin(Enemies[i][1]*(2*math.PI/360))]),200])
		}
	}
	
	spawntime--
	if (spawntime<=0){EnemyFunction()}
}

function DIST(A,B){
	return math.sqrt((A[0]-B[0])**2+(A[1]-B[1])**2)
}

function SCALAR(A,B){
	return A[0]*B[0]+A[1]*B[1]
}

function Hitter(){
	for (j=0; j<Enemies.length;j++){
		var Boulier = false
		for (i=0; i<Player_Projectiles.length;i++){
			if (DIST(Player_Projectiles[i][0],Enemies[j][0])<=14){
				Player_Projectiles.splice(i,1)
				i-=1
				Boulier = true
			}
		}
		if (Boulier){// inclure le code pour créer un obstacle à la mort
			Enemies.splice(j,1)
			j-=1
			Score++
		}
	}
	
	for (i=0; i<Enemy_Projectiles.length;i++){
		if (DIST(Enemy_Projectiles[i][0],Player)<=14){
			Enemy_Projectiles.splice(i,1)
			i-=1
			SETTINGS = false
		}
	}
}


function COLLISION(OBST_LIST, Ball) {
	for (var i=0; i<OBST_LIST.length;i++){
		var Koll=-1;
		var PosProb=[OBST_LIST[i][2][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0][0]-OBST_LIST[i][2][0],Ball[0][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][2][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0][0]-OBST_LIST[i][2][0],Ball[0][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2]
		//draw_ball(2,PosProb,"#333", ctx)
		for (var k=2; k<OBST_LIST[i].length-1; k++){
			var PosProbk=[OBST_LIST[i][k+1][0]+(OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0][0]-OBST_LIST[i][k+1][0],Ball[0][1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2,OBST_LIST[i][k+1][1]+(OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0][0]-OBST_LIST[i][k+1][0],Ball[0][1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2]
			
			//draw_ball(2,PosProbk,"#333", ctx)
			if (DIST(PosProb, Ball[0])>DIST(PosProbk, Ball[0])){
				Koll=k
				PosProb=PosProbk
			}
		}
		
		//Koll désigne le segment à problèmes désormais, si la vitesse est trop élevée, il peut y avoir phasage, mais ça DEVRAIT aller, si -1 c'est entre 0 et le dernier.
		if (Koll!=-1){
			var PosREALProb = [OBST_LIST[i][Koll+1][0]+(OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0])*SCALAR([OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0],OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1]],[Ball[0][0]+Ball[1].re-OBST_LIST[i][Koll+1][0],Ball[0][1]+Ball[1].im-OBST_LIST[i][Koll+1][1]])/DIST(OBST_LIST[i][Koll+1],OBST_LIST[i][Koll])**2,OBST_LIST[i][Koll+1][1]+(OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1])*SCALAR([OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0],OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1]],[Ball[0][0]+Ball[1].re-OBST_LIST[i][Koll+1][0],Ball[0][1]+Ball[1].im-OBST_LIST[i][Koll+1][1]])/DIST(OBST_LIST[i][Koll+1],OBST_LIST[i][Koll])**2]
			var vectP= [(OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0])/DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1]), (OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1])/DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1])]
			
			if (SCALAR([PosREALProb[0]-OBST_LIST[i][Koll+1][0] , PosREALProb[1]-OBST_LIST[i][Koll+1][1]], vectP) > 0 && SCALAR([PosREALProb[0]-OBST_LIST[i][Koll+1][0],PosREALProb[1]-OBST_LIST[i][Koll+1][1]], vectP) < DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1])){
				//draw_ball(2,PosREALProb,"#393", ctx)
				if (DIST(PosREALProb, [Ball[0][0]+Ball[1].re,Ball[0][1]+Ball[1].im])<4){
					Ball[1]=Complex(vectP).mul(Ball[1].re*vectP[0]+Ball[1].im*vectP[1]).add(Ball[1].add(Complex(vectP).mul(-(Ball[1].re*vectP[0]+Ball[1].im*vectP[1]))).mul(-1))
				}
			}
		}
		else {
			var PosREALProb = [OBST_LIST[i][2][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0][0]+Ball[1].re-OBST_LIST[i][2][0],Ball[0][1]+Ball[1].im-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][1]+OBST_LIST[i][2][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0][0]+Ball[1].re-OBST_LIST[i][2][0],Ball[0][1]+Ball[1].im-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2]
			var vectP= [(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])/DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2]), (OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])/DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2])]
			if (SCALAR([PosREALProb[0]-OBST_LIST[i][2][0],PosREALProb[1]-OBST_LIST[i][2][1]], vectP) > 0 && SCALAR([PosREALProb[0]-OBST_LIST[i][2][0],PosREALProb[1]-OBST_LIST[i][2][1]], vectP) < DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2])){
				
				//draw_ball(2,PosREALProb,"#393", ctx)
				if (DIST(PosREALProb, [Ball[0][0]+Ball[1].re,Ball[0][1]+Ball[1].im])<4){
					Ball[1]=Complex(vectP).mul(Ball[1].re*vectP[0]+Ball[1].im*vectP[1]).add(Ball[1].add(Complex(vectP).mul(-(Ball[1].re*vectP[0]+Ball[1].im*vectP[1]))).mul(-1))
				}
			}
		}
		
		
	}
	
	return Ball
}

function draw_obst(LISTAGE, Color){
	ctx.strokeStyle=Color;
	for (var i=0;i<LISTAGE.length;i++){
		ctx.beginPath()
		ctx.moveTo(LISTAGE[i][LISTAGE[i].length-1][0],LISTAGE[i][LISTAGE[i].length-1][1])
		for (var k=2;k<LISTAGE[i].length;k++){
			ctx.lineTo(LISTAGE[i][k][0],LISTAGE[i][k][1])
		}
		ctx.closePath()
		ctx.stroke()
		//LISTAGE[i][1]+=LISTAGE[i][0] à modifier
	}
	return LISTAGE
}

function Player_Vector(){
	var Vect = [Player[0]-Pointer[0],Player[1]-Pointer[1]]
	return [Vect[0]/math.sqrt(Vect[0]**2+Vect[1]**2),Vect[1]/math.sqrt(Vect[0]**2+Vect[1]**2)]
}

function draw_ball(Size, Position, Color, Context){
	Context.fillStyle=Color;
	Context.strokeStyle="#eee";
	Context.beginPath()
	Context.moveTo(Position[0],Position[1]+Size)
	for (var i=0;i<101;i++){
		Context.lineTo(Position[0]+Size*math.sin(2*math.PI*i/100),Position[1]+Size*math.cos(2*math.PI*i/100))
	}
	Context.closePath()
	Context.fill()
	Context.stroke()
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
	
	draw_ball(Size, Position, Color, Context)
}

function DrawScreen(){
	draw_canon(10, Player, "#e90", ctx, Player_Vector())
	for (i=0; i<Player_Projectiles.length;i++){
		draw_ball(4, Player_Projectiles[i][0], "#e90", ctx)
	}
	for (i=0; i<Enemy_Projectiles.length;i++){
		draw_ball(4, Enemy_Projectiles[i][0], "#555", ctx)
	}
	for (i=0; i<Enemies.length;i++){
		draw_canon(10, Enemies[i][0], "#555", ctx, [math.cos(Enemies[i][1]*(2*math.PI/360)),math.sin(Enemies[i][1]*(2*math.PI/360))])
	}
	draw_obst(EnemiesObst, "#999")
	ctx.beginPath()
	ctx.moveTo(Pointer[0]-5,Pointer[1])
	ctx.lineTo(Pointer[0]+5,Pointer[1])
	ctx.moveTo(Pointer[0],Pointer[1]-5)
	ctx.lineTo(Pointer[0],Pointer[1]+5)
	ctx.closePath()
	ctx.stroke()
}

function myFunction() {
	if (SETTINGS){
		Movement()
		Hitter()
		ctx.clearRect(0, 0, 1000, 750);
		DrawScreen()
	}
	else{
		//écran de défaite + Press R to restart
	}
};


var tickpart=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
	tickpart += 33;
	if (tickpart>=33) {
		tickpart -= 33;
		loop();
	}
}, 33);

function loop() {
  myFunction();
}
