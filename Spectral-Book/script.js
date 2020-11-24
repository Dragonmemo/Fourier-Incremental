var Pointer =[0,0]
var canvas = document.getElementById("myCanvas");
var BOOLER= false
var SETTINGS = false
var i,j; var OldI
canvas.addEventListener("mousedown", function(){BOOLER=true;x=[event.clientX,Pointer[0]];y=[event.clientY,Pointer[1]]});
canvas.addEventListener("mouseup", function(){BOOLER=false});
canvas.addEventListener("mousemove",function(){POINT(event)})
canvas.addEventListener("click",function(){PRESS(event)})
document.getElementById("HAND1").addEventListener("click",function(){SelectIt(1)})
document.getElementById("HAND2").addEventListener("click",function(){SelectIt(2)})

function SelectIt(k){
	if (OldI){
		if (OldI==k){
			document.getElementById("HAND"+k).removeAttribute("style");
			OldI=undefined
		}
		else{
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
  if (SETTINGS){
    if (event.clientX && event.clientY){
		
	}
}}

function DrawSettings(){
	SETTINGS=true;
	var ctx= canvas.getContext("2d");
	ctx.clearRect(0,0,1000,750);
	ctx.font("10px Lucida Console")
	ctx.fillText("SAVE",20,20)
	ctx.beginPath()
	ctx.strokeStyle="#999";
	ctx.moveTo(10,20)
	ctx.lineTo(10,50)
	ctx.lineTo(20,50)
	ctx.lineTo(20,20)
	ctx.stroke()
	ctx.closePath();
}
function DrawScreen(){
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 1000, 750);
	ctx.beginPath();
	ctx.strokeStyle="#ccc";
	ctx.moveTo(1+Pointer[0], 1+Pointer[1]);
	ctx.lineTo(1000+Pointer[0], 750+Pointer[1]);
	ctx.stroke(); 
	ctx.moveTo(1+Pointer[0], 750+Pointer[1]);
	ctx.lineTo(1000+Pointer[0], 1+Pointer[1]);
	ctx.stroke();
	ctx.closePath();
}
function myFunction() {
	if (!SETTINGS){DrawScreen()}
};

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
		//if (document.getElementById("Autosave").checked == true){save();}
	}
}, 33);

function loop() { // production
  myFunction();
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
