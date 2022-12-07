/* To-Do list :
- Mettre un timer ou un bouton pause (optionnel)
- Mettre des sliders pour les chances de deleter ou le temps max entre deux spawn (optionnel)
*/
var coords, tickpart=0, ObstTick = 1;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");

var Score =[0]

var Timer = 999999999
var PauseTime=200

var Bouncy = 0.5

var TickLife = [];
var LostLife = []

coords=[[50, 50, Complex(0,0), Complex(0,0), "rgb(250,0,0)"]]

//Un rectangle, premier = vit de montée, deux = centre actuel, coord mort = -450 min
Obstacles=[[0,0,[10,400],[490,450],[490,400],[10,450]]]

WinBar=[0,0,[0,490],[500,490],[500,500],[0,500]]

DeleteObst=[[0,0,[1,499],[1,1]],[0,0,[1,1],[499,1]],[0,0,[499,499],[499,1]]]

Ball_size = 5;

function Preview(){
	var LINK=document.getElementById("DFWMB")
	LINK.download = 'Preview.png';
	LINK.href = canvas2.toDataURL("image/png");
}

function Reset(){
	Score =[]
	coords=[]
	TickLife = [];
	LostLife = []
	Timer = parseFloat(document.getElementById("TimeOut").value)*6000
	PauseTime = 600
	var Players_Colors = (document.getElementById("Players").value).split('|')
        for (var i=0; i<Players_Colors.length; i++){
		coords[i]=[10+480*math.random(),10+40*math.random(), Complex(0,0), Complex(0,0), Players_Colors[i]]
		Score[i]=0
		if (document.getElementById("Lifetime").checked == true){
			TickLife[i] = parseInt(document.getElementById("TimeOut").value)
			Timer = 999999999
		}
	}
	
	Ball_size = 5;
	if (document.getElementById("Walled").checked == true){
		DeleteObst=[[0,0,[0,500],[0,0]],[0,0,[0,0],[500,0]],[0,0,[500,500],[500,0]]]
		Obstacles=[[0,0,[1,499],[1,1]],[0,0,[1,1],[499,1]],[0,0,[499,499],[499,1]]]
	}
	else {
		DeleteObst=[[0,0,[1,499],[1,1]],[0,0,[1,1],[499,1]],[0,0,[499,499],[499,1]]]
		Obstacles=[]
	}
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
	/*var Koll=-1;
	var PosProb=[WinBar[2][0]+(WinBar[WinBar.length-1][0]-WinBar[2][0])*SCALAR([WinBar[WinBar.length-1][0]-WinBar[2][0],WinBar[WinBar.length-1][1]-WinBar[2][1]],[Ball[0]-WinBar[2][0],Ball[1]-WinBar[2][1]])/DIST(WinBar[2],WinBar[WinBar.length-1])**2,WinBar[2][1]+(WinBar[WinBar.length-1][1]-WinBar[2][1])*SCALAR([WinBar[WinBar.length-1][0]-WinBar[2][0],WinBar[WinBar.length-1][1]-WinBar[2][1]],[Ball[0]-WinBar[2][0],Ball[1]-WinBar[2][1]])/DIST(WinBar[2],WinBar[WinBar.length-1])**2]
	
	for (var k=2; k<WinBar.length-1; k++){
		var PosProbk=[WinBar[k+1][0]+(WinBar[k][0]-WinBar[k+1][0])*SCALAR([WinBar[k][0]-WinBar[k+1][0],WinBar[k][1]-WinBar[k+1][1]],[Ball[0]-WinBar[k+1][0],Ball[1]-WinBar[k+1][1]])/DIST(WinBar[k+1],WinBar[k])**2,WinBar[k+1][1]+(WinBar[k][1]-WinBar[k+1][1])*SCALAR([WinBar[k][0]-WinBar[k+1][0],WinBar[k][1]-WinBar[k+1][1]],[Ball[0]-WinBar[k+1][0],Ball[1]-WinBar[k+1][1]])/DIST(WinBar[k+1],WinBar[k])**2]
		
		if (DIST(PosProb, [Ball[0],Ball[1]])>DIST(PosProbk, [Ball[0],Ball[1]])){
			Koll=k
			PosProb=PosProbk
		}
	}
	//faire gagner des points
	if (DIST(PosProb, Ball)<Ball_size){*/
	if (Ball[1]>=485){
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
				if (SCALAR([Balls[i][2].re,Balls[i][2].im],[Balls[k][2].re,Balls[k][2].im])<=0){
					[Balls[i][2],Balls[k][2]]=[Complex(vectP).mul(ScalaireI).mul(Bouncy).add(Complex(vectP).mul(ScalaireK).mul(1-Bouncy)).add(Balls[i][2].add(Complex(vectP).mul(-ScalaireI))),Complex(vectP).mul(ScalaireK).mul(Bouncy).add(Complex(vectP).mul(ScalaireI).mul(1-Bouncy)).add(Balls[k][2].add(Complex(vectP).mul(-ScalaireK)))]
				}
				else {
					if (Balls[i][2].abs()>Balls[k][2].abs()){
						[Balls[i][2],Balls[k][2]]=[Complex(vectP).mul(ScalaireI).mul(Bouncy).add(Balls[i][2].add(Complex(vectP).mul(-ScalaireI))),Complex(vectP).mul(ScalaireK).mul(Bouncy).add(Complex(vectP).mul(ScalaireI).mul(1-Bouncy)).add(Balls[k][2].add(Complex(vectP).mul(ScalaireK)))]
					}
					else {
						[Balls[i][2],Balls[k][2]]=[Complex(vectP).mul(ScalaireI).mul(Bouncy).add(Complex(vectP).mul(ScalaireK).mul(1-Bouncy)).add(Balls[i][2].add(Complex(vectP).mul(ScalaireI))),Complex(vectP).mul(ScalaireK).mul(Bouncy).add(Balls[k][2].add(Complex(vectP).mul(-ScalaireK)))]
					}
				}
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

function draw_marble(Size, Position, Color, Context){
	Context.fillStyle=Color;
	Context.strokeStyle="#000";
	Context.beginPath()
	Context.moveTo(Position[0],Position[1]+Size)
	for (var i=0;i<101;i++){
		Context.lineTo(Position[0]+Size*math.sin(2*math.PI*i/100),Position[1]+Size*math.cos(2*math.PI*i/100))
	}
	Context.closePath()
	Context.fill()
	Context.stroke()
}

function LifeTickDown(){
	var IcantStandName=[]
	for (var i = 0; i<coords.length;i++){
		IcantStandName[i]=[Score[i]*500+coords[i][1],i]
	}
	IcantStandName.sort(function(a,b){return a[0]-b[0]})
	TickLife[IcantStandName[0][1]] += -1
	if (TickLife[IcantStandName[0][1]] == 0){
		var PAULETTE = coords.splice(IcantStandName[0][1],1)
		Score.splice(IcantStandName[0][1],1)
		TickLife.splice(IcantStandName[0][1],1)
		LostLife = LostLife.concat(PAULETTE[0][4])
		for (var i=0; i<coords.length;i++){
			Score[i]=0
			Restart_Pos(coords[i])
		}
		PauseTime = 100
	}
}

function MAJ_SCORE(){
	for (var i=0; i<LostLife.length;i++){
		draw_marble(Ball_size, [50,490-15*i], LostLife[i], ctx2)
		ctx2.fillStyle="#000";
		ctx2.font="16px Arial"
		ctx2.fillText("DEAD",65,495-15*i)
		ctx2.fillText(LostLife[i],110,495-15*(i+LostLife.length))
	}
	var CoordClone = []
	
	if (document.getElementById("Lifetime").checked == true){
		for (var i=0; i<coords.length;i++){
			CoordClone[i]=[coords[i],TickLife[i],Score[i]]
		}
		CoordClone.sort(function(a,b){return a[1]-b[1]})
		for (var i=0; i<coords.length;i++){
			draw_marble(Ball_size, [50,490-15*(i+LostLife.length)], CoordClone[i][0][4], ctx2)
			ctx2.fillStyle="#000";
			ctx2.font="16px Arial"
			ctx2.fillText(CoordClone[i][1],65,495-15*(i+LostLife.length))
			ctx2.fillText(CoordClone[i][0][4],110,495-15*(i+LostLife.length))
			ctx2.fillText(CoordClone[i][2],15,495-15*(i+LostLife.length))
		}
	}
	else {
		for (var i=0; i<coords.length;i++){
			CoordClone[i]=[coords[i],Score[i]]
		}
		CoordClone.sort(function(a,b){return a[1]-b[1]})
		for (var i=0; i<coords.length;i++){
			draw_marble(Ball_size, [50,490-15*i], CoordClone[i][0][4], ctx2)
			ctx2.fillStyle="#000";
			ctx2.font="16px Arial"
			ctx2.fillText(CoordClone[i][1],65,495-15*i)
			ctx2.fillText(CoordClone[i][0][4],110,495-15*(i+LostLife.length))
		}
	}
}

function Time_Update(){
	ctx2.fillStyle="#000";
	ctx2.font="16px Arial"
	if (Timer>=6000){
		ctx2.fillText("Time left "+parseInt(Timer/6000)+":"+parseInt((Timer-parseInt(Timer/6000)*6000)/100),115,15)
	}
	else {
		ctx2.fillText("Time left "+Timer/100+"s",115,15)
	}
}

function myFunction() {
	ctx.clearRect(0, 0, 500, 500);
	ctx2.clearRect(0, 0, 300, 500);
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
		draw_marble(Ball_size, coords[i], coords[i][4], ctx)
		//LOL
	}
	if (document.getElementById("Lifetime").checked == true){
		LifeTickDown()
	}
	MAJ_SCORE()
};


var mainGameLoop = window.setInterval(function() { // runs the loop
	if (PauseTime>0){
		ctx2.clearRect(0, 0, 300, 500);
		ctx2.fillStyle="#ddd";
		ctx2.beginPath()
		ctx2.moveTo(0,0)
		ctx2.lineTo(300,0)
		ctx2.lineTo(300,500)
		ctx2.lineTo(0,500)
		ctx2.lineTo(0,0)
		ctx2.closePath()
		ctx2.fill()
		MAJ_SCORE()
		Preview()
		ctx2.fillStyle="#000";
		ctx2.font="32px Arial"
		ctx2.fillText("PAUSED",50,45)
		ctx2.beginPath()
		ctx2.moveTo(50,80)
		ctx2.lineTo(50,90)
		ctx2.lineTo(50+100*PauseTime/600,90)
		ctx2.lineTo(50+100*PauseTime/600,80)
		ctx2.lineTo(50,80)
		ctx2.closePath()
		ctx2.fill()
		PauseTime-=10
	}
	else{
		if (Timer>0){
			tickpart += 1;
			ObstTick -= 1
			//var d = Date.now();
			if (tickpart>=2) {
				tickpart -= 2;
				loop();
				Time_Update();
				ObstMinus();
				Timer -= 2;
			}
			if (ObstTick <= 0){
				ObstPlus()
			}
			//console.log(Date.now()-d
		}
	}
}, 1);

function loop() { // production
  myFunction();
}
