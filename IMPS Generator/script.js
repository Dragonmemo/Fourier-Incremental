var i,j;
var Current_Loadout = {}
//document.getElementById("HAND1").addEventListener("click",function(){SelectIt(1)})
//document.getElementById("HAND2").addEventListener("click",function(){SelectIt(2)})
/*canvas.addEventListener("click",function(){
			if (SETTINGS && !SETTINGS2 && 430<event.clientX && 590>event.clientX && 420>event.clientY && 380<event.clientY){
				OpenYourMind()
			}
		})*/
var TXTimg ="<img id='BASE' src='Empty Base.png'>"
var TXTselect="<td><canvas id='myCanvas' width='512' height='512' style='background-color:#fff;border-width: 2px; border-style: solid; border-color: #000;'></canvas></td>"
for (let keys in LOAD){
	TXTselect+="<td><table style='background-color:#c44'><b style='background-color:#f55; font-family: Comic Sans MS, Comic Sans, cursive'>"+keys+"<tr id='"+ keys + "-None'><td style ='font-family: Comic Sans MS, Comic Sans, cursive; border-width: 2px; border-style: solid; border-color: #000;'>None</td></tr>"
	Current_Loadout[keys] = "None"
	for (i=0;i<LOAD[keys].length;i++){

		TXTimg+="<img id='"+ keys + "_" + LOAD[keys][i] +"' src='"+ keys + "/" + LOAD[keys][i] +".png'>"
		TXTselect+="<tr id='"+ keys + "-" + LOAD[keys][i] +"'><td style ='font-family: Comic Sans MS, Comic Sans, cursive'>"+LOAD[keys][i]+"</td></tr>"
	}
	
	TXTselect+="</b></table></td>"
	
}

document.getElementById("IMAGO").innerHTML=TXTimg
document.getElementById("listing").innerHTML=TXTselect

var canvas = document.getElementById("myCanvas");


for (let keys in LOAD){
	document.getElementById(keys + "-None").addEventListener("click",function(){SelectIt(keys,"None")})
	for (i=0;i<LOAD[keys].length;i++){
		let TROLL = LOAD[keys][i]
		document.getElementById(keys + "-" + LOAD[keys][i]).addEventListener("click",function(){SelectIt(keys,TROLL)})
	}	
}

function SelectIt(FOLDER,FILE){
	//console.log(FOLDER+"|"+FILE)
	
	//Affichage à améliorer pour dire ce qui est select
	
	document.getElementById(FOLDER + "-" + Current_Loadout[FOLDER]).innerHTML= "<td style ='font-family: Comic Sans MS, Comic Sans, cursive;'>"+Current_Loadout[FOLDER]+"</td>"
	document.getElementById(FOLDER + "-" + FILE).innerHTML= "<td style ='font-family: Comic Sans MS, Comic Sans, cursive; border-width: 2px; border-style: solid; border-color: #000;'>"+FILE+"</td>"
	
	Current_Loadout[FOLDER]=FILE
}


function WriteLog(Caption){
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
}

var STARTIMG = document.getElementById("BASE")
function DrawScreen(){
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,512,512);
	
	var Caption = document.getElementById("Caption").value
	WriteLog(Caption)
	//Caption
	
	ctx.drawImage(STARTIMG,0,0,512,512);
	for (let folder in Current_Loadout){
		if (Current_Loadout[folder]!="None"){
			ctx.drawImage(document.getElementById(folder+"_"+Current_Loadout[folder]),0,0,512,512);
		}
	}
}
function myFunction() {
	DrawScreen()
};

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
}

function DownloadImg(){
	var LINK=document.getElementById("Download")
	LINK.download = 'IMPS.png';
	LINK.href = canvas.toDataURL()//"image/png");
	LINK.click();
}

STARTIMG.onload = begin

function begin(){
	var mainGameLoop = window.setInterval(function() { // runs the loop
		loop();
	}, 33);
}

function loop() {
  myFunction();
  TextItAll();
}