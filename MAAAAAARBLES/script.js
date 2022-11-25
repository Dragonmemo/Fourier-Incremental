// client-side js, loaded by index.html
// run by the browser each time the page is loaded

// define variables that reference elements on our page
//Decimal.toExpPos= 2;
var coords, tickpart=0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var Bouncy = 0.5

coords=[[50, 50, Complex(0,0), Complex(0,0), "rgb(250,0,0)"]]

//Un rectangle
Obstacles=[[[10,400],[490,450],[490,400],[10,450]]]

WinBar=[[0,490],[500,490],[500,500],[0,500]]

DeleteObst=[[[1,499],[1,1]],[[1,1],[499,1]],[[499,499],[499,1]]]

Ball_size = 5;
//d'abord juste une bille dans un rectangle de collisions...

function Reset(){
	for (var i=0; i<24; i++){
		coords[i]=[10+480*math.random(),10+40*math.random(), Complex(0,0), Complex(0,0), "rgb("+parseInt(255*math.random())+","+parseInt(255*math.random())+","+parseInt(255*math.random())+")"]
	}
	
	Ball_size = 5;
	
	Obstacles=[[[10,400],[490,450],[490,400],[10,450]]]
	
	Bouncy = parseInt(document.getElementById("Bouncyness").value)/100
}

function Restart_Pos(Ball){
	Ball[0]= 10+480*math.random()
	Ball[1]= 10+40*math.random()
	return Ball
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
		var PosProb=[OBST_LIST[i][0][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1]],[Ball[0]-OBST_LIST[i][0][0],Ball[1]-OBST_LIST[i][0][1]])/DIST(OBST_LIST[i][0],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][0][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1]],[Ball[0]-OBST_LIST[i][0][0],Ball[1]-OBST_LIST[i][0][1]])/DIST(OBST_LIST[i][0],OBST_LIST[i][OBST_LIST[i].length-1])**2]
		
		for (var k=0; k<OBST_LIST[i].length-1; k++){
			var PosProbk=[OBST_LIST[i][k+1][0]+(OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0]-OBST_LIST[i][k+1][0],Ball[1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2,OBST_LIST[i][k+1][1]+(OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0]-OBST_LIST[i][k+1][0],Ball[1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2]
			
			if (DIST(PosProb, [Ball[0],Ball[1]])>DIST(PosProbk, [Ball[0],Ball[1]])){
				Koll=k
				PosProb=PosProbk
			}
		}
		
		//Koll désigne le segment à problèmes désormais, si la vitesse est trop élevée, il peut y avoir phasage, mais ça DEVRAIT aller, si -1 c'est entre 0 et le dernier.
		if (Koll!=-1){
			var PosREALProb = [OBST_LIST[i][Koll+1][0]+(OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0])*SCALAR([OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0],OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][Koll+1][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][Koll+1][1]])/DIST(OBST_LIST[i][Koll+1],OBST_LIST[i][Koll])**2,OBST_LIST[i][Koll+1][1]+(OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1])*SCALAR([OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0],OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][Koll+1][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][Koll+1][1]])/DIST(OBST_LIST[i][Koll+1],OBST_LIST[i][Koll])**2]
			var vectP= [(OBST_LIST[i][Koll][0]-OBST_LIST[i][Koll+1][0])/DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1]), (OBST_LIST[i][Koll][1]-OBST_LIST[i][Koll+1][1])/DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1])]
			if (!(SCALAR([PosREALProb[0]-OBST_LIST[i][Koll+1][0],PosREALProb[1]-OBST_LIST[i][Koll+1][1]], vectP) > 0 && SCALAR([PosREALProb[0]-OBST_LIST[i][Koll+1][0],PosREALProb[1]-OBST_LIST[i][Koll+1][1]], vectP) < DIST(OBST_LIST[i][Koll],OBST_LIST[i][Koll+1]))){
				return Ball
			}
		}
		else {
			var PosREALProb = [OBST_LIST[i][0][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][0][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][0][1]])/DIST(OBST_LIST[i][0],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][0][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1]],[Ball[0]+Ball[2].re*0.05-OBST_LIST[i][0][0],Ball[1]+Ball[2].im*0.05-OBST_LIST[i][0][1]])/DIST(OBST_LIST[i][0],OBST_LIST[i][OBST_LIST[i].length-1])**2]
			var vectP= [(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0])/DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][0]), (OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1])/DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][0])]
			if (!(SCALAR([PosREALProb[0]-OBST_LIST[i][0][0],PosREALProb[1]-OBST_LIST[i][0][1]], vectP) > 0 && SCALAR([PosREALProb[0]-OBST_LIST[i][0][0],PosREALProb[1]-OBST_LIST[i][0][1]], vectP) < DIST(OBST_LIST[i][OBST_LIST[i].length-1],OBST_LIST[i][0]))){
				return Ball
			}
		}
		
		//enfin, changement de trajectoire SI collision prochain tour
		if (DIST(PosREALProb, [Ball[0]+Ball[2].re*0.05,Ball[1]+Ball[2].im*0.05])<Ball_size){
			Ball[2]=Complex(vectP).mul(Ball[2].re*vectP[0]+Ball[2].im*vectP[1]).add(Ball[2].add(Complex(vectP).mul(-(Ball[2].re*vectP[0]+Ball[2].im*vectP[1]))).mul(-Bouncy))
		}
		
	}
	
	return Ball
}

function Death_Penalty(OBST_LIST, Ball) {
	for (var i=0; i<OBST_LIST.length;i++){
		var Koll=-1;
		var PosProb=[OBST_LIST[i][0][0]+(OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1]],[Ball[0]-OBST_LIST[i][0][0],Ball[1]-OBST_LIST[i][0][1]])/DIST(OBST_LIST[i][0],OBST_LIST[i][OBST_LIST[i].length-1])**2,OBST_LIST[i][0][1]+(OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1])*SCALAR([OBST_LIST[i][OBST_LIST[i].length-1][0]-OBST_LIST[i][0][0],OBST_LIST[i][OBST_LIST[i].length-1][1]-OBST_LIST[i][0][1]],[Ball[0]-OBST_LIST[i][0][0],Ball[1]-OBST_LIST[i][0][1]])/DIST(OBST_LIST[i][0],OBST_LIST[i][OBST_LIST[i].length-1])**2]
		
		for (var k=0; k<OBST_LIST[i].length-1; k++){
			var PosProbk=[OBST_LIST[i][k+1][0]+(OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0]-OBST_LIST[i][k+1][0],Ball[1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2,OBST_LIST[i][k+1][1]+(OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1])*SCALAR([OBST_LIST[i][k][0]-OBST_LIST[i][k+1][0],OBST_LIST[i][k][1]-OBST_LIST[i][k+1][1]],[Ball[0]-OBST_LIST[i][k+1][0],Ball[1]-OBST_LIST[i][k+1][1]])/DIST(OBST_LIST[i][k+1],OBST_LIST[i][k])**2]
			
			if (DIST(PosProb, [Ball[0],Ball[1]])>DIST(PosProbk, [Ball[0],Ball[1]])){
				Koll=k
				PosProb=PosProbk
			}
		}
		
		if (DIST(PosProb, Ball)<Ball_size){
			Restart_Pos(Ball)
		}
		
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
				
				[Balls[i][2],Balls[k][2]]=[Complex(vectP).mul(ScalaireI).mul(-Bouncy).add(Complex(vectP).mul(ScalaireK).mul(1-Bouncy)).add(Balls[i][2].add(Complex(vectP).mul(-ScalaireI))),Complex(vectP).mul(ScalaireK).mul(-Bouncy).add(Complex(vectP).mul(ScalaireI).mul(1-Bouncy)).add(Balls[k][2].add(Complex(vectP).mul(-ScalaireK)))]
		
			}
		}		
	}
	
	return Balls
}

function draw_obst(LISTAGE, Color){
	ctx.fillStyle=Color;
	for (var i=0;i<LISTAGE.length;i++){
		ctx.beginPath()
		ctx.moveTo(LISTAGE[i][LISTAGE[i].length-1][0],LISTAGE[i][LISTAGE[i].length-1][1])
		for (var k=0;k<LISTAGE[i].length;k++){
			ctx.lineTo(LISTAGE[i][k][0],LISTAGE[i][k][1])
		}
		ctx.closePath()
		ctx.fill()
	}
}

function draw_marble(Size, Position, Color){
	ctx.fillStyle=Color;
	ctx.beginPath()
	ctx.moveTo(Position[0],Position[1]+Size)
	for (var i=0;i<101;i++){
		ctx.lineTo(Position[0]+Size*math.sin(2*math.PI*i/100),Position[1]+Size*math.cos(2*math.PI*i/100))
	}
	ctx.closePath()
	ctx.fill()
}

function myFunction() {
	ctx.clearRect(0, 0, 500, 500);
	ctx.strokeStyle="#BBBBBB";
	
	for (var i=0; i<coords.length; i++){
		coords[i]=Acceleration(coords[i])
		coords[i]=Speed(coords[i])
		//collision detection
		coords[i]=COLLISION(Obstacles, coords[i])
	}
	
	coords=Ball_Collision(coords)
	
	draw_obst(Obstacles,"#111")
	for (var i=0; i<coords.length; i++){
		coords[i]=Movement(coords[i])
		Death_Penalty(DeleteObst,coords[i])
		draw_obst(DeleteObst,"#911")
		draw_marble(Ball_size, coords[i], coords[i][4])
	}
};


var mainGameLoop = window.setInterval(function() { // runs the loop
	tickpart += 1;
	//var d = new Date();
	//var n = d.getTime();
	if (tickpart>=2) {
		tickpart -= 2;
		loop();
	}
}, 1);

function loop() { // production
  myFunction();
}
