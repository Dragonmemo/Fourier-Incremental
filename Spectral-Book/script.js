var Pointer =[330,220]
var canvas = document.getElementById("myCanvas");
var BOOLER= false;
var SETTINGS = false;
var i,j; var OldI;
var GlassesLevel=0;
canvas.addEventListener("mousedown", function(){BOOLER=true;x=[event.clientX,Pointer[0]];y=[event.clientY,Pointer[1]]});
canvas.addEventListener("mouseup", function(){BOOLER=false});
canvas.addEventListener("mousemove",function(){POINT(event)})
canvas.addEventListener("click",function(){if (SETTINGS){PRESS(event)} else {CellClick(event)}})
document.getElementById("HAND1").addEventListener("click",function(){SelectIt(1)})
document.getElementById("HAND2").addEventListener("click",function(){SelectIt(2)})

function SelectIt(k){
	if (k==2){DrawSettings();}
	if (OldI){
		if (OldI==k){
			document.getElementById("HAND"+k).removeAttribute("style");
			OldI=undefined
		}
		else{
			if (OldI==2){DrawSettings();}
		document.getElementById("HAND"+OldI).removeAttribute("style");
		OldI=k
		document.getElementById("HAND"+k).setAttribute("style","background-color: #c92;");
	}}
	else {
		OldI=k
		document.getElementById("HAND"+k).setAttribute("style","background-color: #c92;");
	}
}
function POINT(event){
  if (BOOLER && !SETTINGS){
    Pointer[0]=event.clientX-x[0]+x[1]
    Pointer[1]=event.clientY-y[0]+y[1]
}}
function PRESS(event){
	if (event.clientX && event.clientY){
		
	}
}

var CELLAR=[];//Xe elem = Xe emplacement, puis une matrice de bordel. un bordel = Cellule [Objet, niveau]
var ActiveSigil;// Cellule cliqué [num emplacement, coords]
function CellClick(event){
	if (200<event.clientX-Pointer[0]<320 && 20<event.clientY-Pointer[1]<140){
		ActiveSigil=[0,parseInt(-(event.clientX-Pointer[0]-200)/40),parseInt(-(event.clientY-Pointer[1]-20)/40)]
		canvas.addEventListener("click",function kappa(){
			if (600<event.clientX || 400>event.clientX || 100>event.clientY || 650<event.clientY){
				ActiveSigil=undefined;
				canvas.removeEventListener("click",kappa);
			}
		})
	}
}
function SelectedSigilDraw(SIGIL){
	var ctx=canvas.getContext("2d");
	ctx.fillStyle="#c92";
	if (SIGIL[0]==0){
		ctx.fillRect(40*SIGIL[1]+200+Pointer[0],40*SIGIL[2]+20+Pointer[1],40,40)
	}
	ctx.clearRect(400,100,200,450);
	ctx.strokeStyle="#eee"
	ctx.beginPath();
	ctx.moveTo(400,100)
	ctx.lineTo(400,550)
	ctx.lineTo(600,550)
	ctx.lineTo(600,100)
	ctx.lineTo(400,100)
	ctx.stroke();
	ctx.closePath()
}

function DrawSettings(){
	SETTINGS=!SETTINGS;
	if (SETTINGS){
		var ctx= canvas.getContext("2d");
		ctx.clearRect(0,0,1000,750);
		ctx.fillStyle="#eee";
		ctx.font = "30px Lucida Console"
		ctx.fillText("SETTINGS",430,100)
		ctx.fillText("SAVE",465,220)
		ctx.fillText("EXPORT",445,280)
		ctx.fillText("IMPORT",445,340)
		ctx.beginPath()
		ctx.strokeStyle="#999";
		ctx.moveTo(455,230)
		ctx.lineTo(455,190)
		ctx.lineTo(545,190)
		ctx.lineTo(545,230)
		ctx.lineTo(455,230)
		ctx.moveTo(435,290)
		ctx.lineTo(435,250)
		ctx.lineTo(565,250)
		ctx.lineTo(565,290)
		ctx.lineTo(435,290)
		ctx.moveTo(435,350)
		ctx.lineTo(435,310)
		ctx.lineTo(565,310)
		ctx.lineTo(565,350)
		ctx.lineTo(435,350)
		/*
		for (i=0;i<1000;i=i+10){
			ctx.moveTo(i,0)
			ctx.lineTo(i,750)
		}
		for (i=0;i<750;i=i+10){
			ctx.moveTo(0,i)
			ctx.lineTo(1000,i)
		}
		*/
		ctx.stroke()
		ctx.closePath();
	}
	//Ajouter les fonctions et le retirer dans le if et ajouter un else dans le cas de les retirer
}
function DrawScreen(){
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.strokeStyle="#ccc";
	//Table Et mur gauche (ne change pas)
	ctx.moveTo(Pointer[0]+400,Pointer[1]+160)
	ctx.lineTo(Pointer[0],Pointer[1]+160)
	ctx.lineTo(Pointer[0],Pointer[1])
	ctx.lineTo(Pointer[0]+400,Pointer[1])
	ctx.moveTo(Pointer[0]+30,Pointer[1]+30)
	ctx.lineTo(Pointer[0]+55,Pointer[1]+5)
	ctx.lineTo(Pointer[0]+65,Pointer[1]+15)
	ctx.lineTo(Pointer[0]+40,Pointer[1]+40)
	ctx.lineTo(Pointer[0]+30,Pointer[1]+30)
	//première zone de pose
	ctx.moveTo(Pointer[0]+200,Pointer[1]+20)
	ctx.lineTo(Pointer[0]+320,Pointer[1]+20)
	ctx.lineTo(Pointer[0]+320,Pointer[1]+140)
	ctx.lineTo(Pointer[0]+200,Pointer[1]+140)
	ctx.lineTo(Pointer[0]+200,Pointer[1]+20)
	ctx.moveTo(Pointer[0]+240,Pointer[1]+20)
	ctx.lineTo(Pointer[0]+240,Pointer[1]+140)
	ctx.moveTo(Pointer[0]+280,Pointer[1]+20)
	ctx.lineTo(Pointer[0]+280,Pointer[1]+140)
	ctx.moveTo(Pointer[0]+200,Pointer[1]+60)
	ctx.lineTo(Pointer[0]+320,Pointer[1]+60)
	ctx.moveTo(Pointer[0]+200,Pointer[1]+100)
	ctx.lineTo(Pointer[0]+320,Pointer[1]+100)
	//Premier mur de fond
	ctx.moveTo(Pointer[0]+400,Pointer[1]+160)
	ctx.lineTo(Pointer[0]+400,Pointer[1])
	ctx.stroke();
	if (ActiveSigil){
		SelectedSigilDraw(ActiveSigil);
	}
	ctx.closePath();
}
function myFunction() {
	if (!SETTINGS){
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 1000, 750);
		if (GlassesLevel>0 || OldI==1){
			DrawScreen()
		}
	}
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


var tickpart=0;
var tickpart2=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
	tickpart += 33;
	tickpart2+=33;
	if (tickpart>=33) {
		tickpart -= 33;
		loop();
	}
	if (tickpart2>=10000){
		tickpart2-=10000
		//save();
	}
}, 33);

function loop() {
  myFunction();
  TextItAll();
}
/*
if(!(localStorage.lastTick)){localStorage.lastTick=Date.now();}
function save() { 
  localStorage.setItem('Max',MAX);
  localStorage.setItem("MCur",x);
  localStorage.setItem("PCur",y);
  localStorage.setItem("Zero",Zero);
  localStorage.setItem("Coords",coords);
  localStorage.setItem("PCN",positives);
  localStorage.setItem("NCN",negatives);
  localStorage.setItem("PBC",pbaseCost);
  localStorage.setItem("NPOW",NPOW);
  localStorage.setItem("NFIC",FicNeg);  
  localStorage.setItem("Other",OtherQuantity);
  localStorage.setItem("R",R);
  localStorage.setItem("Achieves",Achieves);
  localStorage.setItem("Skills",Skills);
  localStorage.setItem("lastTick",Date.now());
  localStorage.setItem("AutoBuy",document.getElementById("AUTOBUY").checked)
} 
//loading all the stuff...
function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el);
  document.body.removeChild(el);
  alert("Copied to clipboard");
}

function copyToClipboard(el) {
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    el.select();
  }
  document.execCommand("copy");
}
function Export(){
	copyStringToClipboard(btoa(JSON.stringify(localStorage)));
}
function Import(){
  let loadgame = "";
  loadgame = prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE");
  if (loadgame=="Fermat" && Achieves[68]==0){
	  Achieves[68]++;
	SOUND.pause();SOUND.play();
	document.getElementById("A7C9").setAttribute("style","background-color: #5B5;");
	document.getElementById("A7C9").removeAttribute("hidden");
  }
  else {
	  if (loadgame !="" ) {
	  
  }}
}
if(localStorage.MCur) {
  
}*/
