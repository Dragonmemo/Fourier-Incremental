var i,j;
var Current_Loadout = {}

var TXTimg =""
var TXTselect="<td><canvas id='myCanvas' width='512' height='512' style='background-color:#fff;border-width: 2px; border-style: solid; border-color: #000;'></canvas></td>"
/*for (let keys in LOAD){
	TXTselect+="<td><table style='background-color:#c44'><b style='background-color:#f55; font-family: Comic Sans MS, Comic Sans, cursive'>"+keys+"<tr id='"+ keys + "-None'><td style ='font-family: Comic Sans MS, Comic Sans, cursive; border-width: 2px; border-style: solid; border-color: #000;'>None</td></tr>"
	Current_Loadout[keys] = "None"
	for (i=0;i<LOAD[keys].length;i++){

		TXTimg+="<img id='"+ keys + "_" + LOAD[keys][i] +"' src='"+ keys + "/" + LOAD[keys][i] +".png'>"
		//TXTselect+="<tr id='"+ keys + "-" + LOAD[keys][i] +"'><td style ='font-family: Comic Sans MS, Comic Sans, cursive'>"+LOAD[keys][i]+"</td></tr>"
	}
	
	TXTselect+="</b></table></td>"
	
}*/

document.getElementById("IMAGO").innerHTML+=TXTimg
document.getElementById("listing").innerHTML=TXTselect

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*for (let keys in LOAD){
	document.getElementById(keys + "-None").addEventListener("click",function(){SelectIt(keys,"None")})
	for (i=0;i<LOAD[keys].length;i++){
		let TROLL = LOAD[keys][i]
		document.getElementById(keys + "-" + LOAD[keys][i]).addEventListener("click",function(){SelectIt(keys,TROLL)})
	}	
}*/

/*function SelectIt(FOLDER,FILE){
	
	//Affichage à améliorer pour dire ce qui est select
	
	document.getElementById(FOLDER + "-" + Current_Loadout[FOLDER]).innerHTML= "<td style ='font-family: Comic Sans MS, Comic Sans, cursive;'>"+Current_Loadout[FOLDER]+"</td>"
	document.getElementById(FOLDER + "-" + FILE).innerHTML= "<td style ='font-family: Comic Sans MS, Comic Sans, cursive; border-width: 2px; border-style: solid; border-color: #000;'>"+FILE+"</td>"
	
	Current_Loadout[FOLDER]=FILE
}*/

var vitesseAngulaireDeux = function (t){return Math.PI/20*(-2*Math.sin((t+6)%24*Math.PI/12)+2)}
var ticker2 = 0;

function Croix(Coord){
	ctx.strokeStyle
	ctx.beginPath();
	ctx.moveTo(-Coord[0]+5,-Coord[1])
	ctx.lineTo(-Coord[0]-5,-Coord[1])
	ctx.moveTo(-Coord[0],-Coord[1]+5)
	ctx.lineTo(-Coord[0],-Coord[1]-5)
	ctx.stroke();
	ctx.closePath();
}

/*function WriteLog(Caption){
	var ctx= canvas.getContext("2d");
	//ctx.clearRect(222,12,436,728);
	ctx.fillStyle="#000";
	ctx.font = "30px Comic Sans MS"
	var words = Caption.split(" ");
	var lines = [];
	var line="";
	i=0;
	while (i<words.length){
		if (words[i] == "|")
		{
			i++;
			lines.push(line);
			line = "";
			continue;
		}
		testLine = line+" "+words[i];
		if (ctx.measureText(testLine.toUpperCase()).width < 500)
		{
			line = testLine;
			i++;
		}
		else {
			if (ctx.measureText(" "+words[i].toUpperCase()).width >= 500){
				lines.push(line); lines.push(" "+words[i]); line=""; i++
			}
			else {lines.push(line); line=""}
		}
	}
	if (line!=''){lines.push(line)}
	for (i=0;i<lines.length;i++){
		ctx.fillText(lines[i].toUpperCase(),246-ctx.measureText(lines[i].toUpperCase()).width/2,30*i+40)
	}
}*/
var ticker = 0;
var STARTIMG = document.getElementById("WalkMan_Body")
function DrawAnim(){
	
	ctx.clearRect(-100,-100,712,712);
	
	ctx.drawImage(document.getElementById("WalkMan_Shadow"),0,0,512,512);
	
	var angle = 0*Math.sin(ticker%24*Math.PI/12)
	var angle2=-angle;
	var Zero;
	var Zero2;
	var x = 0;
	var y = 0;
	
	//Zero2=[parseInt(document.getElementById("Xer").value),parseInt(document.getElementById("Yer").value)]
	angle = Math.PI/20*(2*Math.sin(ticker%24*Math.PI/12)-1)
	angle2 = vitesseAngulaireDeux(ticker);
	Zero=[-286,-400]
	Zero2 = [-2,-44]
	//Croix(Zero2);
	ctx.translate(-Zero[0],-Zero[1])
	ctx.rotate(angle);
	//Croix(Zero2);
	
	
		ctx.translate(-Zero2[0],-Zero2[1])
		ctx.rotate(angle2);
		ctx.drawImage(document.getElementById("WalkMan_Foot Left"),Zero[0]+Zero2[0],Zero[1]+Zero2[1],512,512);
		ctx.rotate(-angle2);
		ctx.translate(Zero2[0],Zero2[1])
	
	
	ctx.drawImage(document.getElementById("WalkMan_Leg Left"),Zero[0],Zero[1],512,512);
	//Croix(Zero2);
	ctx.rotate(-angle);
	ctx.translate(Zero[0],Zero[1])
	
	
	Zero=[-281,-304]
	Zero2 = [0,0]
	angle = Math.PI/20*(2*Math.sin((ticker+12)%24*Math.PI/12)-1)
	angle2 = 0
	
	
	ctx.translate(-Zero[0],-Zero[1])
	ctx.rotate(angle);
	//Croix(Zero2);
	
		ctx.translate(-Zero2[0],-Zero2[1])
		ctx.rotate(angle2);
		ctx.drawImage(document.getElementById("WalkMan_Hand Left"),Zero[0]+Zero2[0],Zero[1]+Zero2[1],512,512);
		ctx.rotate(-angle2);
		ctx.translate(Zero2[0],Zero2[1])
	
	ctx.drawImage(document.getElementById("WalkMan_Arm Left"),Zero[0],Zero[1],512,512);
	//Croix(Zero2);
	ctx.rotate(-angle);
	ctx.translate(Zero[0],Zero[1])
	
	
	ctx.drawImage(document.getElementById("WalkMan_Body"),0,0,512,512);
	//Croix(Zero);
	
	//Zero2=[parseInt(document.getElementById("Xer").value),parseInt(document.getElementById("Yer").value)]
	Zero=[-229,-400]
	Zero2 = [0,-40]
	angle = Math.PI/20*(2*Math.sin((ticker+12)%24*Math.PI/12)-1)
	angle2 = vitesseAngulaireDeux(ticker+12);
	
	ctx.translate(-Zero[0],-Zero[1])
	ctx.rotate(angle);
	//Croix(Zero2);
	
		ctx.translate(-Zero2[0],-Zero2[1])
		ctx.rotate(angle2);
		ctx.drawImage(document.getElementById("WalkMan_Foot Right"),Zero[0]+Zero2[0],Zero[1]+Zero2[1],512,512);
		ctx.rotate(-angle2);
		ctx.translate(Zero2[0],Zero2[1])
	
	ctx.drawImage(document.getElementById("WalkMan_Leg Right"),Zero[0],Zero[1],512,512);
	//Croix(Zero2);
	ctx.rotate(-angle);
	ctx.translate(Zero[0],Zero[1])
	
	Zero=[-226,-304]
	Zero2 = [0,0]
	angle = Math.PI/20*(2*Math.sin((ticker)%24*Math.PI/12)-1)
	angle2 = 0
	
	ctx.translate(-Zero[0],-Zero[1])
	ctx.rotate(angle);
	ctx.drawImage(document.getElementById("WalkMan_Arm Right"),Zero[0],Zero[1],512,512);
	//Croix(Zero2);
	
		ctx.translate(-Zero2[0],-Zero2[1])
		ctx.rotate(angle2);
		ctx.drawImage(document.getElementById("WalkMan_Hand Right"),Zero[0]+Zero2[0],Zero[1]+Zero2[1],512,512);
		ctx.rotate(-angle2);
		ctx.translate(Zero2[0],Zero2[1])
	
	//Croix(Zero2);
	ctx.rotate(-angle);
	ctx.translate(Zero[0],Zero[1])
	
	
	/*var Caption = document.getElementById("Caption").value
	WriteLog(Caption)*/
	//Caption
	
	//ctx.drawImage(STARTIMG,0,0,512,512);
	/*for (let folder in Current_Loadout){
		if (Current_Loadout[folder]!="None"){
			ctx.drawImage(document.getElementById(folder+"_"+Current_Loadout[folder]),0,0,512,512);
		}
	}*/
}
function myFunction() {
	DrawAnim();
	ticker++;
};
/*
var Texter=[];// Texte, Couleur ( rgba(bla,bla,bla, ), Position, Temps
function TextItAll(){
	var ctx=canvas.getContext("2d");
	ctx.beginPath();
	ctx.font = "30px Lucida Console"
	for (i=0;i<Texter.length;i++){
		ctx.fillStyle=Texter[i][1]+(1/(1+2/Texter[i][3]))+")"
		ctx.fillText(Texter[i][0],Texter[i][2][0],Texter[i][2][1]);
		ctx.stroke();
		Texter[i][3]=Texter[i][3]-1
	}
	ctx.closePath();
	for (i=0;i<Texter.length;i++){
		if (Texter[i][3]<=0){j=i;}
	}
	if (j+1){
		Texter.pop(j);
		j=undefined
	}
}*/

STARTIMG.onload = begin

function begin(){
	var mainGameLoop = window.setInterval(function() { // runs the loop
		loop();
	}, 33);
}

function loop() {
  myFunction();
  //TextItAll();
}