// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(500, 500); //=pixels
var x=[500,500]
var i
var j,tau


var MAX=0;
var CENTRE = [0,0]
var i;var j;
var Lcoords=[]; 
var n=1000;//nbre de points
var sZERO = 500 //position du centre dans la liste
var Cns=[[0,0,0,0,1]];
var Delta_t = 0.01


//ToDoList :
//V | Fonction de reset
//V | Fonction d'evolution
//X | Insérer ou retirer des points selon la distance
    


function myFunction() {
  MAX=0;
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 500, 500);
  
  //Redessine un cercle de rayon 1 avec n points au départ  
  for (i=0;i<n+1;i++){
	  Lcoords[i]=[math.cos(math.PI*2*i/(n)),math.sin(math.PI*2*i/(n))];
    MAX=Math.max(MAX,Math.abs(Lcoords[i][0]),Math.abs(Lcoords[i][1]))
  }
  document.getElementById("Size").innerHTML=MAX;
  for (i=0;i<n;i++){
      ctx.beginPath();
      ctx.strokeStyle="hsl("+(i/n*360)+",100%,30%)";
      ctx.moveTo(Lcoords[i+1][0]/MAX*250+250,Lcoords[i+1][1]/MAX*250+250);
      ctx.lineTo(Lcoords[i][0]/MAX*250+250,Lcoords[i][1]/MAX*250+250)
      ctx.stroke();
      ctx.closePath();
  }
  //Récupère les Cs pour ne pas avoir de problèmes post manipulations
  for (i=0; i<Cns.length;i++){
    Cns[i][1]=document.getElementById('CR'+i).value/100*(Cns[i][4]-Cns[i][3])+Cns[i][3];
    Cns[i][2]=parseInt(document.getElementById('CPhi'+i).value);
  };
  
};

function myFunction2() {
	MAX=0;
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 500, 500);
  
	//évolution des points suivant la fonction C dépendant du paramétrage par AC
      
	var Z = []
	for (j=0; j<Lcoords.length;j++){
		Z[j] = 0
	};
	for (j=1; j<sZERO;j++){
		Z[sZERO-j] = Z[sZERO-j+1] - math.sqrt((Lcoords[sZERO-j][0]-Lcoords[sZERO-j+1][0])**2+(Lcoords[sZERO-j][1]-Lcoords[sZERO-j+1][1])**2)
	}
	for (j=sZERO+1; j<Lcoords.length;j++){
		Z[j] = Z[j-1] + math.sqrt((Lcoords[j-1][0]-Lcoords[j][0])**2+(Lcoords[j-1][1]-Lcoords[j][1])**2)
	}
	
	var LC =[] 
	
	for (j=0; j<Lcoords.length;j++){
		Csigma = 0
		//n,radius,angle
		for (var k = 0; k<Cns.length; k++){
			Csigma+=Cns[k][1] * math.cos(Cns[k][0]*2*math.PI*Z[j] /(Z[Lcoords.length-1]-Z[0])  + Cns[k][2]*math.PI/50)
		}
		
		LC[j] = Csigma
	}
	
	var LNorm = []
	for (j=0; j<Lcoords.length;j++){
		LNorm[j] = normale(Lcoords[(j-1+Lcoords.length-1)%(Lcoords.length-1)],Lcoords[(j+1)%(Lcoords.length-1)])
	}
	
	
	for (i=0; i<Lcoords.length;i++){
		Lcoords[i][0] = Lcoords[i][0] + Delta_t * LC[i] * LNorm[i][0]
		Lcoords[i][1] = Lcoords[i][1] + Delta_t * LC[i] * LNorm[i][1]
	}
	
	Lcoords[0] = [(Lcoords[0][0]+Lcoords[Lcoords.length-1][0])/2,(Lcoords[0][1]+Lcoords[Lcoords.length-1][1])/2]
	Lcoords[Lcoords.length-1] = [Lcoords[0][0], Lcoords[0][1]]
	
	//Retirer les points trop proches
	for (i=1; i<Lcoords.length-1;i++){
		if (math.sqrt((Lcoords[i-1][0]-Lcoords[i+1][0])**2+(Lcoords[i-1][1]-Lcoords[i+1][1])**2)<Delta_t*0.01){
			Lcoords.splice(i,1)
			if (i<sZERO){
				sZERO--
			}
			i--
			
		}
	}
	
	//Ajouter les points manquants
	for (i=0; i<Lcoords.length-1;i++){
		if (math.sqrt((Lcoords[i][0]-Lcoords[i+1][0])**2+(Lcoords[i][1]-Lcoords[i+1][1])**2)>Delta_t*10){
			Lcoords.splice(i+1,0,[(Lcoords[i][0]+Lcoords[i+1][0])/2,(Lcoords[i][1]+Lcoords[i+1][1])/2])
			if (i<sZERO){
				sZERO++
			}
			i++
			
		}
	}
	
	//Dessin post process
	for (i=0;i<Lcoords.length;i++){
		MAX=Math.max(MAX,Math.abs(Lcoords[i][0]),Math.abs(Lcoords[i][1]))
	}
	for (i=0;i<Lcoords.length;i++){
		Lcoords[i] = [Lcoords[i][0]/MAX,Lcoords[i][1]/MAX]
	}
	document.getElementById("Size").innerHTML=MAX;
	for (i=0;i<Lcoords.length-1;i++){
		ctx.beginPath();
		ctx.strokeStyle="hsl("+(i/Lcoords.length*360)+",100%,30%)";
		ctx.moveTo(Lcoords[i+1][0]*250+250,Lcoords[i+1][1]*250+250);
		ctx.lineTo(Lcoords[i][0]*250+250,Lcoords[i][1]*250+250)
		ctx.stroke();
		ctx.closePath();
	}
};

function normale(X1,X2){
  T = [X2[1]-X1[1],X1[0]-X2[0]]
  var Norme=Math.sqrt(T[0]**2+T[1]**2);
  return [T[0]/Norme,T[1]/Norme]
};







function thatCfunction(){
  Cns.push([parseInt(document.getElementById('N').value),0,0,0,1]);//n,radius,angle,RadLeft,RadRight
  RewriteHTML();
}

function RewriteHTML(){
  var TEXTE='<div style="overflow-y:scroll;height:600px;">';
  var MainC=document.getElementById('MainC');
  for (i=0;i<Cns.length;i++){
    TEXTE+='<p>n = '+Cns[i][0]+'</p>'
    TEXTE+='<p style="display:flex;">0<input type="range" min="0" max="100" value="'+Cns[i][2]+'" class="slider" id="CPhi'+i+'">2pi</p>'
    TEXTE+='<p style="display:flex;">'+Cns[i][3]+'<input type="range" min="0" max="100" value="'+((Cns[i][1]-Cns[i][3])/(Cns[i][4]-Cns[i][3])*100)+'" class="slider" id="CR'+i+'">'+Cns[i][4]+'</p>';
    TEXTE+='<p style="display:flex;"><button onclick="leftC('+i+')">Set left limit</button><button onclick="rightC('+i+')">Set right limit</button></p>'
  }
  TEXTE+='</div>'
  MainC.innerHTML=TEXTE;
}


function rightC(m){
  Cns[m][5]=Cns[m][1];
  RewriteHTML();
}
function leftC(m){
  Cns[m][4]=Cns[m][1];
  RewriteHTML();
}
RewriteHTML();

function resetC(){
  Cns=[[0,0,0,0,1]];
  RewriteHTML();
}

var tickpart=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
  loop();
}, 10);

function resetForme(){
    Lcoords=[]
	myFunction(); 
	sZERO = 500
}
myFunction(); 
    
function loop(){
  myFunction2();
}


/* Is ok, pas besoin de modif, à garder*/
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

function Import(){
  let loadgame = "";
  loadgame = JSON.parse(atob(prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")));
  if (loadgame !== "") {
    var Storager=loadgame.Kns.split(',').map(Number)
    for (i=0;i<Storager.length/5;i++){
      Kns[i]=Storager.slice(5*i,5*i+5);
    }
    Storager=loadgame.Tns.split(',').map(Number)
    for (i=0;i<Storager.length/5;i++){
      Tns[i]=Storager.slice(5*i,5*i+5);
    }
    RewriteHTML();
  }
}
function Export(){
  localStorage.setItem('Kns',Kns)
  localStorage.setItem('Tns',Tns)
  copyStringToClipboard(btoa(JSON.stringify(localStorage)));
}