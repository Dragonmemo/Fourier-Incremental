var Pointer =[0,0]
var BOOLER= false;
var BOOLER2=false;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var List_Blocks=[
[["20px Arial","POP POM"],[50,100],[100,100]],
[["20px Comic Sans MS","POPMPOM"],[150,50],[100,100]],
[["20px Comic Sans MS","POPMPOM"],[250,250],[25,25]],
[["20px Comic Sans MS","POPMPOM"],[200,350],[400,100]]]

canvas.addEventListener("mousedown", function(){
	BOOLER=true;
	x=[event.clientX,Pointer[0]];
	y=[event.clientY,Pointer[1]];
	for (keys in List_Map){
		//for (var kk = 0; kk< List_Map[keys][Progress[keys]].length-1 ;kk++){//Xmin, Xmax, Ymin, Ymax
			if (Progress[keys]!=-1 &&  List_Map[keys][Progress[keys]][List_Map[keys][Progress[keys]].length-1][0]<-Pointer[0]+event.clientX && List_Map[keys][Progress[keys]][List_Map[keys][Progress[keys]].length-1][1]>-Pointer[0]+event.clientX && List_Map[keys][Progress[keys]][List_Map[keys][Progress[keys]].length-1][2]<-Pointer[1]+event.clientY && List_Map[keys][Progress[keys]][List_Map[keys][Progress[keys]].length-1][3]>-Pointer[1]+event.clientY){
				Progress[keys]++
			}
		//}
	}
});
canvas.addEventListener("mouseup", function(){BOOLER=false});
canvas.addEventListener("mousemove",function(){POINT(event)})

function POINT(event){
	/*for (var i=0; i<List_Blocks.length;i++){
		if (true &&  List_Blocks[i][1][0]-List_Blocks[i][2][0]/2<-Pointer[0]+event.clientX && List_Blocks[i][1][0]+List_Blocks[i][2][0]/2>-Pointer[0]+event.clientX && List_Blocks[i][1][1]-List_Blocks[i][2][1]/2<-Pointer[1]+event.clientY && List_Blocks[i][1][1]+List_Blocks[i][2][1]/2>-Pointer[1]+event.clientY){
			BOOLER2=true
		}
	}*/
	if (Progress["Sign"] ==-1){Progress["Sign"] ++}
	for (keys in List_Map){
		//for (var k=0; k<Progress[keys]; k++){
			for (var kk = 0; kk< List_Map[keys][Progress[keys]].length-1 ;kk++){
				if (Progress[keys]!=-1 &&  List_Map[keys][Progress[keys]][kk][1][0]-List_Map[keys][Progress[keys]][kk][2][0]/2<-Pointer[0]+event.clientX && List_Map[keys][Progress[keys]][kk][1][0]+List_Map[keys][Progress[keys]][kk][2][0]/2>-Pointer[0]+event.clientX && List_Map[keys][Progress[keys]][kk][1][1]-List_Map[keys][Progress[keys]][kk][2][1]/2<-Pointer[1]+event.clientY && List_Map[keys][Progress[keys]][kk][1][1]+List_Map[keys][Progress[keys]][kk][2][1]/2>-Pointer[1]+event.clientY){
					BOOLER2=true
				}
			}
		//}
	}
	if (BOOLER && BOOLER2){
		Pointer[0]=event.clientX-x[0]+x[1];
		Pointer[1]=event.clientY-y[0]+y[1];
		BOOLER2=false
	}
	else{BOOLER=false;}
}

//var Small_Square = [[0,0],[0,24],[24,24],[24,0]]
//var Square = [[0,0],[0,100],[100,100],[100,0]]
//var Dial_Box = [[0,0],[0,100],[400,100],[400,0]]

function DrawItem(TEXTURE,Pos,Shape,TEXTURE2){
	ctx.beginPath();
	ctx.fillStyle=TEXTURE2;
	ctx.strokeStyle="#000";
	ctx.moveTo(Pointer[0]+Pos[0]+Shape[0]/2,Pointer[1]+Pos[1]+Shape[1]/2);
	ctx.lineTo(Pointer[0]+Pos[0]-Shape[0]/2,Pointer[1]+Pos[1]+Shape[1]/2);
	ctx.lineTo(Pointer[0]+Pos[0]-Shape[0]/2,Pointer[1]+Pos[1]-Shape[1]/2);
	ctx.lineTo(Pointer[0]+Pos[0]+Shape[0]/2,Pointer[1]+Pos[1]-Shape[1]/2);
	ctx.lineTo(Pointer[0]+Pos[0]+Shape[0]/2,Pointer[1]+Pos[1]+Shape[1]/2);
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
	if (TEXTURE != 0){
		WriteLog(TEXTURE[0],TEXTURE[1],[Pointer[0]+Pos[0],Pointer[1]+Pos[1]], Shape[0])
	}
	
}

function WriteLog(FONT, Caption, POSITION, LENGTH){
	ctx.fillStyle="#000";
	ctx.font = FONT //"30px Comic Sans MS"
	var words = Caption.split(" ");
	var lines = [];
	var line="";
	var i=0;
	while (i<words.length){
		if (words[i] == "|")
		{
			i++;
			lines.push(line);
			line = "";
			continue;
		}
		testLine = line+" "+words[i];
		if (ctx.measureText(testLine).width < LENGTH)
		{
			line = testLine;
			i++;
		}
		else {
			if (ctx.measureText(" "+words[i]).width >= LENGTH){
				lines.push(line); lines.push(" "+words[i]); line=""; i++
			}
			else {lines.push(line); line=""}
		}
	}
	if (line!=''){lines.push(line)}
	for (i=0;i<lines.length;i++){
		ctx.fillText(lines[i],POSITION[0]-ctx.measureText(lines[i]).width/2,POSITION[1]+20*i-10*lines.length)
	}
}

var Progress={}
for (keys in List_Map){
	Progress[keys] = 0
}
Progress["Sign"]=-1

function DrawMap(){
	for (keys in List_Map){
		//for (var k=0; k<Progress[keys]; k++){
			if(Progress[keys]!=-1){
				for (var kk = 0; kk< List_Map[keys][Progress[keys]].length-1 ;kk++){
					DrawItem(List_Map[keys][Progress[keys]][kk][0],List_Map[keys][Progress[keys]][kk][1],List_Map[keys][Progress[keys]][kk][2],List_Map[keys][Progress[keys]][kk][3])
				}
			}
		//}
	}
}

function myFunction() {
	ctx.clearRect(0, 0, 500, 500);
	DrawMap()
};

function RPos(){
Pointer=[0,0]
}

var tickpart=0;
var tickpart2=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
	tickpart += 33;
	tickpart2+=33;
	if (tickpart>=33) {
		tickpart -= 33;
		loop();
	}
}, 33);

function loop() {
  myFunction();
}