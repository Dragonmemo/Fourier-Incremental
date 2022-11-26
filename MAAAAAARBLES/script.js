/* To-Do list :
- Supprimer les obstacles morts 
- Mettre un timer ou un bouton pause (optionnel)
- Mettre des sliders pour les chances de deleter ou le temps max entre deux spawn (optionnel)
*/
var coords, tickpart=0, ObstTick = 1;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var Score =[0]

var Bouncy = 0.5

coords=[[50, 50, Complex(0,0), Complex(0,0), "rgb(250,0,0)"]]

//Un rectangle, premier = vit de montée, deux = centre actuel, coord mort = -450 min
Obstacles=[[0,0,[10,400],[490,450],[490,400],[10,450]]]

WinBar=[0,0,[0,490],[500,490],[500,500],[0,500]]

DeleteObst=[[0,0,[1,499],[1,1]],[0,0,[1,1],[499,1]],[0,0,[499,499],[499,1]]]

Ball_size = 5;
//d'abord juste une bille dans un rectangle de collisions...

function Reset(){
	var Players_Colors = (document.getElementById("Players").value).split(',')
	for (var i=0; i<Players_Colors.length; i++){
		coords[i]=[10+480*math.random(),10+40*math.random(), Complex(0,0), Complex(0,0), Players_Colors[i]]
		Score[i]=0
	}
	
	Ball_size = 5;
	
	DeleteObst=[[0,0,[1,499],[1,1]],[0,0,[1,1],[499,1]],[0,0,[499,499],[499,1]]]
	Obstacles=[]
	ObstTick = 1
	
	Bouncy = parseInt(document.getElementById("Bouncyness").value)/100
}

function Restart_Pos(Ball){
	Ball[0]= 10+480*math.random()
	Ball[1]= 10+40*math.random()
	return Ball
}

function ObstPlus(){
	var OBJECT =[-1,10]
	var BOOLS = true
	var Center = 10+480*math.random()
	while (BOOLS){
		if (math.random()<(3/2)**(4-OBJECT.length)){
			OBJECT=OBJECT.concat([[math.random()*100-50+Center,500+math.random()*100-50]])
		}
		else {
			BOOLS=false
		}
	}
	//console.log(2**(OBJECT.length-3))
	if (math.random()<0.1){
		DeleteObst = DeleteObst.concat([OBJECT])
	}
	else{
		Obstacles = Obstacles.concat([OBJECT])
	}
	ObstTick=math.random()*200
}

function ObstMinus(){
	for (var i = 0; i<Obstacles.length; i++){
		//console.log(Boolean(Obstacles[i]))
		if (Obstacles[i] && Obstacles[i][1]< -450){
			//console.log("YOLOOOOOP")
			Obstacles.splice(i,1)
			i-=1
		}
	}
	for (var i = 0; i<DeleteObst.length; i++){
		if (DeleteObst[i] && DeleteObst[i][1]< -450){
			DeleteObst.splice(i,1)
			i-=1
		}
	}
}

//l'axe y est inversé
function Acceleration(Ball){
	Ball[3]= Complex(0,10).add(Ball[2].mul(-0.001*DIST([0,0],[Ball[2].im,Ball[2].re])))
	return Ball
}

function Speed(Ball){
	Ball[2]= Ball[2].add(Ball[3].mul(0.05))
	return Ball
}

function Movement(Ball){
	Ball[1]= Ball[1]+Ball[2].im*0.05
	Ball[0]= Ball[0]+Ball[2].re*0.05
	return Ball
}

function SCALAR(A,B){
	return A[0]*B[0]+A[1]*B[1]
}

function DIST(A,B){
	return math.sqrt((A[0]-B[0])**2+(A[1]-B[1])**2)
}

function COLLISION(OBST_LIST, Ball) {
	for (var i=0; i<OBST_LIST.length;i++){
		var Koll=-1;
		var PosProb=[OBST_LIST[i][2][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0]-OBST_LIST[i][2][0],Ball[1]-OBST_LIST[i][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][1]+OBST_LIST[i][2][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0]-OBST_LIST[i][2][0],Ball[1]-OBST_LIST[i][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2]
		//draw_marble(2,PosProb,"#333")
		for (var k=2; k<OBST_LIST[i].length-1; k++){
			var PosProbk=[OBST_LIST[i][k+1][0]+(OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0]-OBST_LIST[i][k+1][0],Ball[1]-OBST_LIST[i][1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2,OBST_LIST[i][1]+OBST_LIST[i][k+1][1]+(OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0]-OBST_LIST[i][k+1][0],Ball[1]-OBST_LIST[i][1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2]
			
			//draw_marble(2,PosProbk,"#333")
			if (DIST(PosProb, [Ball[0],Ball[1]])>DIST(PosProbk, [Ball[0],Ball[1]])){
				Koll=k
				PosProb=PosProbk
			}
		}
		
		//Koll désigne le segment à problèmes désormais, si la vitesse est trop élevée, il peut y avoir phasage, mais ça DEVRAIT aller, si -1 c'est entre 0 et le dernier.
		if (Koll!=-1){
			var PosREALProb = [OBST_LIST[i][Koll+1][0]+(OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0])*SCALAR([OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0],OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][Koll+1][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][1]-OBST_LIST[i][Koll+1][1]])/DIST(OBST_LIST[i][Koll+1],OBST_LIST[i][Koll])**2,OBST_LIST[i][1]+OBST_LIST[i][Koll+1][1]+(OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1])*SCALAR([OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0],OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][Koll+1][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][1]-OBST_LIST[i][Koll+1][1]])/DIST(OBST_LIST[i][Koll+1],OBST_LIST[i][Koll])**2]
			var vectP= [(OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0])/DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1]), (OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1])/DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1])]
			
			if (SCALAR([PosREALProb[0]-OBST_LIST[i][Koll+1][0] , PosREALProb[1]-OBST_LIST[i][1]-OBST_LIST[i][Koll+1][1]], vectP) > 0 && SCALAR([PosREALProb[0]-OBST_LIST[i][Koll+1][0],PosREALProb[1]-OBST_LIST[i][1]-OBST_LIST[i][Koll+1][1]], vectP) < DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1])){
				//draw_marble(2,PosREALProb,"#393")
				if (DIST(PosREALProb, [Ball[0]+Ball[2].re*0.05,Ball[1]+Ball[2].im*0.05])<Ball_size){
					Ball[2]=Complex(vectP).mul(Ball[2].re*vectP[0]+Ball[2].im*vectP[1]).add(Ball[2].add(Complex(vectP).mul(-(Ball[2].re*vectP[0]+Ball[2].im*vectP[1]))).mul(-Bouncy-0.1))
				}
			}
		}
		else {
			var PosREALProb = [OBST_LIST[i][2][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][2][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][1]+OBST_LIST[i][2][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][2][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2]
			var vectP= [(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])/DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2]), (OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])/DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2])]
			if (SCALAR([PosREALProb[0]-OBST_LIST[i][2][0],PosREALProb[1]-OBST_LIST[i][1]-OBST_LIST[i][2][1]], vectP) > 0 && SCALAR([PosREALProb[0]-OBST_LIST[i][2][0],PosREALProb[1]-OBST_LIST[i][1]-OBST_LIST[i][2][1]], vectP) < DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2])){
				
				//draw_marble(2,PosREALProb,"#393")
				if (DIST(PosREALProb, [Ball[0]+Ball[2].re*0.05,Ball[1]+Ball[2].im*0.05])<Ball_size){
					Ball[2]=Complex(vectP).mul(Ball[2].re*vectP[0]+Ball[2].im*vectP[1]).add(Ball[2].add(Complex(vectP).mul(-(Ball[2].re*vectP[0]+Ball[2].im*vectP[1]))).mul(-Bouncy-0.1))
				}
			}
		}
		
		
	}
	
	return Ball
}

function Death_Penalty(OBST_LIST, Ball) {
	for (var i=0; i<OBST_LIST.length;i++){
		var Koll=-1;
		var PosProb=[OBST_LIST[i][2][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0]-OBST_LIST[i][2][0],Ball[1]-OBST_LIST[i][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][1]+OBST_LIST[i][2][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0]-OBST_LIST[i][2][0],Ball[1]-OBST_LIST[i][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2]
		
		//draw_marble(2,PosProb,"#933")
		for (var k=2; k<OBST_LIST[i].length-1; k++){
			var PosProbk=[OBST_LIST[i][k+1][0]+(OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0]-OBST_LIST[i][k+1][0],Ball[1]-OBST_LIST[i][1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2,OBST_LIST[i][1]+OBST_LIST[i][k+1][1]+(OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0]-OBST_LIST[i][k+1][0],Ball[1]-OBST_LIST[i][1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2]
			//draw_marble(2,PosProb,"#933")
		
			if (DIST(PosProb, [Ball[0],Ball[1]])>DIST(PosProbk, [Ball[0],Ball[1]])){
				Koll=k
				PosProb=PosProbk
			}
		}
		
		if (Koll!=-1){
			var PosREALProb = [OBST_LIST[i][Koll+1][0]+(OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0])*SCALAR([OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0],OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][Koll+1][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][1]-OBST_LIST[i][Koll+1][1]])/DIST(OBST_LIST[i][Koll+1],OBST_LIST[i][Koll])**2,OBST_LIST[i][1]+OBST_LIST[i][Koll+1][1]+(OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1])*SCALAR([OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0],OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][Koll+1][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][1]-OBST_LIST[i][Koll+1][1]])/DIST(OBST_LIST[i][Koll+1],OBST_LIST[i][Koll])**2]
			var vectP= [(OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0])/DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1]), (OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1])/DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1])]
			if (SCALAR([PosREALProb[0]-OBST_LIST[i][Koll+1][0],PosREALProb[1]-OBST_LIST[i][1]-OBST_LIST[i][Koll+1][1]], vectP) > 0 && SCALAR([PosREALProb[0]-OBST_LIST[i][Koll+1][0],PosREALProb[1]-OBST_LIST[i][1]-OBST_LIST[i][Koll+1][1]], vectP) < DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1])){
				//draw_marble(2,PosREALProb,"#939")
				if (DIST(PosREALProb, Ball)<Ball_size){
					Restart_Pos(Ball)
				}
			}
		}
		else {
			var PosREALProb = [OBST_LIST[i][2][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][2][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][1]+OBST_LIST[i][2][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][2][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][1]-OBST_LIST[i][2][1]])/DIST(OBST_LIST[i][2],OBST_LIST[i][OBST_LIST[i].length-1])**2]
			var vectP= [(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][2][0])/DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2]), (OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][2][1])/DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2])]
			if (SCALAR([PosREALProb[0]-OBST_LIST[i][2][0],PosREALProb[1]-OBST_LIST[i][1]-OBST_LIST[i][2][1]], vectP) > 0 && SCALAR([PosREALProb[0]-OBST_LIST[i][2][0],PosREALProb[1]-OBST_LIST[i][1]-OBST_LIST[i][2][1]], vectP) < DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][2])){
				//draw_marble(2,PosREALProb,"#939")
				if (DIST(PosREALProb, Ball)<Ball_size){
					Restart_Pos(Ball)
				}
			}
		}
		
		
		
	}
	
	return Ball
}

//a upgrade
function Victory_Lap(Ball, INDEX) {
	var Koll=-1;
	var PosProb=[WinBar[2][0]+(WinBar[WinBar.length-1][0]-WinBar[2][0])*SCALAR([WinBar[WinBar.length-1][0]-WinBar[2][0],WinBar[WinBar.length-1][1]-WinBar[2][1]],[Ball[0]-WinBar[2][0],Ball[1]-WinBar[2][1]])/DIST(WinBar[2],WinBar[WinBar.length-1])**2,WinBar[2][1]+(WinBar[WinBar.length-1][1]-WinBar[2][1])*SCALAR([WinBar[WinBar.length-1][0]-WinBar[2][0],WinBar[WinBar.length-1][1]-WinBar[2][1]],[Ball[0]-WinBar[2][0],Ball[1]-WinBar[2][1]])/DIST(WinBar[2],WinBar[WinBar.length-1])**2]
	
	for (var k=2; k<WinBar.length-1; k++){
		var PosProbk=[WinBar[k+1][0]+(WinBar[k][0]-WinBar[k+1][0])*SCALAR([WinBar[k][0]-WinBar[k+1][0],WinBar[k][1]-WinBar[k+1][1]],[Ball[0]-WinBar[k+1][0],Ball[1]-WinBar[k+1][1]])/DIST(WinBar[k+1],WinBar[k])**2,WinBar[k+1][1]+(WinBar[k][1]-WinBar[k+1][1])*SCALAR([WinBar[k][0]-WinBar[k+1][0],WinBar[k][1]-WinBar[k+1][1]],[Ball[0]-WinBar[k+1][0],Ball[1]-WinBar[k+1][1]])/DIST(WinBar[k+1],WinBar[k])**2]
		
		if (DIST(PosProb, [Ball[0],Ball[1]])>DIST(PosProbk, [Ball[0],Ball[1]])){
			Koll=k
			PosProb=PosProbk
		}
	}
	
	//faire gagner des points
	if (DIST(PosProb, Ball)<Ball_size){
		Restart_Pos(Ball)
		
		Score[INDEX]++
	}
	
	return Ball
}

function Ball_Collision(Balls) {
	for (var i=0; i<Balls.length;i++){
		for (var k=0; k<Balls.length; k++){
			if (i!=Balls.length && k!=Balls.length && i!=k && DIST([Balls[i][0]+Balls[i][2].re*0.05,Balls[i][1]+Balls[i][2].im*0.05], [Balls[k][0]+Balls[k][2].re*0.05,Balls[k][1]+Balls[k][2].im*0.05])<2*Ball_size){
				var DISTANCE = DIST(Balls[i],Balls[k])
				
				var vectP = [(Balls[i][0]-Balls[k][0])/DISTANCE, (Balls[i][1]-Balls[k][1])/DISTANCE]
				
				var ScalaireI = Balls[i][2].re*vectP[0]+Balls[i][2].im*vectP[1];
				var ScalaireK = Balls[k][2].re*vectP[0]+Balls[k][2].im*vectP[1];
				
				[Balls[i][2],Balls[k][2]]=[Complex(vectP).mul(ScalaireI).mul(Bouncy).add(Complex(vectP).mul(ScalaireK).mul(1-Bouncy)).add(Balls[i][2].add(Complex(vectP).mul(-ScalaireI))),Complex(vectP).mul(ScalaireK).mul(Bouncy).add(Complex(vectP).mul(ScalaireI).mul(1-Bouncy)).add(Balls[k][2].add(Complex(vectP).mul(-ScalaireK)))]
		
			}
		}		
	}
	
	return Balls
}

function draw_obst(LISTAGE, Color){
	ctx.fillStyle=Color;
	ctx.strokeStyle=Color;
	for (var i=0;i<LISTAGE.length;i++){
		ctx.beginPath()
		ctx.moveTo(LISTAGE[i][LISTAGE[i].length-1][0],LISTAGE[i][1]+LISTAGE[i][LISTAGE[i].length-1][1])
		for (var k=2;k<LISTAGE[i].length;k++){
			ctx.lineTo(LISTAGE[i][k][0],LISTAGE[i][1]+LISTAGE[i][k][1])
		}
		ctx.closePath()
		ctx.fill()
		ctx.stroke()
		LISTAGE[i][1]+=LISTAGE[i][0]
	}
	return LISTAGE
}

function draw_marble(Size, Position, Color){
	ctx.fillStyle=Color;
	ctx.strokeStyle="#000";
	ctx.beginPath()
	ctx.moveTo(Position[0],Position[1]+Size)
	for (var i=0;i<101;i++){
		ctx.lineTo(Position[0]+Size*math.sin(2*math.PI*i/100),Position[1]+Size*math.cos(2*math.PI*i/100))
	}
	ctx.closePath()
	ctx.fill()
	ctx.stroke()
}

function MAJ_SCORE(){
	var CoordClone = []
	for (var i=0; i<coords.length;i++){
		CoordClone[i]=[coords[i],Score[i]]
	}
	CoordClone.sort(function(a,b){return a[1]-b[1]})
	for (var i=0; i<coords.length;i++){
		draw_marble(Ball_size, [600,485-15*i], CoordClone[i][0][4])
		ctx.fillStyle="#000";
		ctx.font="16px Arial"
		ctx.fillText(CoordClone[i][1],615,490-15*i)
	}
}

function myFunction() {
	ctx.clearRect(0, 0, 800, 500);
	ctx.strokeStyle="#BBBBBB";
	
	for (var i=0; i<coords.length; i++){
		coords[i]=Acceleration(coords[i])
		coords[i]=Speed(coords[i])
		//collision detection
		coords[i]=COLLISION(Obstacles, coords[i])
	}
	
	coords=Ball_Collision(coords)
	
	draw_obst(Obstacles,"#111")
	draw_obst(DeleteObst,"#911")
	draw_obst([WinBar],"#191")
	for (var i=0; i<coords.length; i++){
		coords[i]=Movement(coords[i])
		Victory_Lap(coords[i],i)
		Death_Penalty(DeleteObst,coords[i])
		draw_marble(Ball_size, coords[i], coords[i][4])
	}
	MAJ_SCORE()
};


var mainGameLoop = window.setInterval(function() { // runs the loop
	tickpart += 1;
	ObstTick -= 1
	//var d = new Date();
	//var n = d.getTime();
	if (tickpart>=2) {
		tickpart -= 2;
		loop();
		ObstMinus()
	}
	if (ObstTick <= 0){
		ObstPlus()
	}
}, 1);

function loop() { // production
  myFunction();
}
