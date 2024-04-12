// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(500, 500); //=pixels
var x=[500,500]


var MAX=0;
var Angle=[]
var Lcoords=[]; 
//var n=1000;//nbre de points
//var sZERO = 500 //position du centre dans la liste
//var Cns=[[0,0,0,0,1]];
var Delta_t = 0.01



//ToDoList 2D :
//V | Classe points Mesh
//V | Classe points de croissance et retrait
//V | Fonction pour calculer la normale dans Mesh_Element
//V | Fonction d'evolution
//V | Insérer ou retirer des points selon la distance
//V | Fonction de dessin
//v | Fonction de reset
//X | Fonction d'ajout de points de croissance custom    
//X | Ajouter l'effet de perspective au dessin

function dist(A,B){
	var result = 0
	for (var i = 0; i<A.length; i++){
		result += (A[i]-B[i])**2
	}
	return Math.sqrt(result)
}

function scalarProduct(X,Y){
	var result = 0
	for (var i = 0; i<X.length; i++){
		result += X[i] * Y[i]
	}
	return result
}

function vectorNormalised(A,B){
	"Donne la valeur du vecteur AB normalisé"
	var result = []
	for (var i = 0; i<A.length; i++){
		result[i]= (B[i] - A[i])/dist(A,B);
	}
	return result
}

function normalExp(zero, pos, distMax){
	return zero*Math.exp(-pos/(2*distMax));
}

class Mesh_Element {
	
	constructor (position, normal){
		this.position = position;
		this.links = [];
		this.normalVector=normal;
	}
	
	addLink(el){
		if (this.links.indexOf(el) == -1) {
			this.links.push(el)
			el.links.push(this)
		}
	}
	
	removeLink(el){
		this.links.splice(this.links.indexOf(el) , 1)
		el.links.splice(el.links.indexOf(this), 1)
	}
	
	renormal(){
		var t = [0,0,0]
		for (var i = 0; i< this.links.length; i++){
			for (var j = i+1; j< this.links.length; j++){
				var res = normale(vectorNormalised(this.position, this.links[i].position),vectorNormalised(this.position, this.links[j].position))
				if (!isNaN(res[0])){
					if (scalarProduct(res, this.normalVector)>=0){
						t[0]+=res[0]
						t[1]+=res[1]
						t[2]+=res[2]
					}
					else{
						t[0]+=-res[0]
						t[1]+=-res[1]
						t[2]+=-res[2]
					}
				}
			}
		}
		this.normalVector = vectorNormalised([0,0,0],t)
	}
}

var meshList= []

class pushers {
	constructor(strengh, position, duration){
		this.strengh = strengh;
		this.position = position;
		this.duration = duration;
	}
	
	vectorVariate(el){
		var result = scalarProduct(el.normalVector, vectorNormalised(this.position, el.position));
		result = result * normalExp(this.strengh, dist(el.position, this.position)**2,1); //A ajouter la distance d'effet
		return result;
	}
	
	vectorVariate2(el){
		var result = normalExp(this.strengh, dist(el.position, this.position)**2,1); //A ajouter la distance d'effet
		return result;
	}
	
}

var pushList=[]
var pushElements=[]

function myFunction2() {
	MAX=0;
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 500, 500);
  
    //Recréer la liste
	var tempMeshList = []
	for (var i=0; i<meshList.length;i++){
		tempMeshList[i] = new Mesh_Element(meshList[i].position, meshList[i].normalVector)
	};
	for (var i=0; i<meshList.length;i++){
		for (var j=0; j<meshList[i].links.length;j++){
			tempMeshList[i].addLink(tempMeshList[meshList.indexOf(meshList[i].links[j])])
		}
	}
	
	//Calculer les normales
	for (var i=0; i<tempMeshList.length;i++){
		tempMeshList[i].renormal();
	};
	
	//Faire evoluer les points
	for (var i = 0; i<pushList.length; i++){
		for (var j = 0; j<meshList.length; j++){
			var resultante = pushList[i].vectorVariate2(tempMeshList[j]);
			/*tempMeshList[j].position[0] += resultante*tempMeshList[j].normalVector[0]*Delta_t;
			tempMeshList[j].position[1] += resultante*tempMeshList[j].normalVector[1]*Delta_t;
			tempMeshList[j].position[2] += resultante*tempMeshList[j].normalVector[2]*Delta_t;*/
			tempMeshList[j].position[0] += resultante*vectorNormalised(pushList[i].position, tempMeshList[j].position)[0]*Delta_t;
			tempMeshList[j].position[1] += resultante*vectorNormalised(pushList[i].position, tempMeshList[j].position)[1]*Delta_t;
			tempMeshList[j].position[2] += resultante*vectorNormalised(pushList[i].position, tempMeshList[j].position)[2]*Delta_t;
		}
		pushList[i].duration+= -1;
	}
	for (var i = 0; i< pushList.length; i++){
		if (pushList[i].duration == 0){
			pushList.splice(i,1);
			i-=1;
		}
	}
	
	//Ajouter les points manquants
	while (true){
		boolorean = true;
		for (var i =0; i<tempMeshList.length; i++){
			for (var j = 0; j<tempMeshList[i].links.length; j++){
				if (dist(tempMeshList[i].position, tempMeshList[i].links[j].position)>1){
					var P1 = new Mesh_Element([
						tempMeshList[i].position[0]/3+tempMeshList[i].links[j].position[0]*2/3,
						tempMeshList[i].position[1]/3+tempMeshList[i].links[j].position[1]*2/3,
						tempMeshList[i].position[2]/3+tempMeshList[i].links[j].position[2]*2/3,
						], tempMeshList[i].normalVector );
					var P2 = new Mesh_Element([
						tempMeshList[i].position[0]*2/3+tempMeshList[i].links[j].position[0]/3,
						tempMeshList[i].position[1]*2/3+tempMeshList[i].links[j].position[1]/3,
						tempMeshList[i].position[2]*2/3+tempMeshList[i].links[j].position[2]/3,
						], tempMeshList[i].links[j].normalVector );
					
					
					for (var ij=0; ij<tempMeshList[i].links.length; ij++){
						if (tempMeshList[i].links[j].links.indexOf(tempMeshList[i].links[ij]) != -1){
							P1.addLink(tempMeshList[i].links[ij]);
							P2.addLink(tempMeshList[i].links[ij]);
						}
					}
					P2.addLink(tempMeshList[i]);
					P1.addLink(tempMeshList[i].links[j]);
					P1.addLink(P2);
					
					tempMeshList.push(P1);
					tempMeshList.push(P2);
					tempMeshList[i].removeLink(tempMeshList[i].links[j]);
					
					boolorean = false;
					break;
				}
				if (!boolorean){break}
			}
		}
		if (boolorean){break}
	}
	
	//Retirer les points trop proches
	while (true){
		boolorean = true;
		for (var i =0; i<tempMeshList.length; i++){
			for (var j = 0; j<tempMeshList[i].links.length; j++){
				if (dist(tempMeshList[i].position, tempMeshList[i].links[j].position)<0.1){
					var P1 = tempMeshList[i];
					var P2 = tempMeshList[i].links[j];
					var P3 = new Mesh_Element([
						P1.position[0]/2+P2.position[0]/2,
						P1.position[1]/2+P2.position[1]/2,
						P1.position[2]/2+P2.position[2]/2,
						],[
						P1.normalVector[0]/2+P2.normalVector[0]/2,
						P1.normalVector[1]/2+P2.normalVector[1]/2,
						P1.normalVector[2]/2+P2.normalVector[2]/2,
						]);
					
					P1.removeLink(P2)
					
					for (var ij=0; ij<P1.links.length; ij++){
						P3.addLink(P1.links[ij]);
					}
					for (var ij=0; ij<P2.links.length; ij++){
						P3.addLink(P2.links[ij]);
					}
					
					tempMeshList.push(P3);
					
					while (P1.links.length>0){
						P1.removeLink(P1.links[0]);
					}
					while (P2.links.length>0){
						P2.removeLink(P2.links[0]);
					}
					
					tempMeshList.splice(tempMeshList.indexOf(P1),1);
					tempMeshList.splice(tempMeshList.indexOf(P2),1);
					boolorean = false;
					break;
				}
				if (!boolorean){break}
			}
		}
		if (boolorean){break}
	}
	
	//Fusionner à la liste d'origine
	meshList = tempMeshList;
	
	//Dessin post process
	for (var i=0;i<meshList.length;i++){
		MAX=Math.max(MAX,Math.abs(meshList[i].position[0]),Math.abs(meshList[i].position[1]),Math.abs(meshList[i].position[2]))
	}
	document.getElementById("Size").innerHTML=MAX;
	document.getElementById("Tick").innerHTML=ticker;
	Angle=[parseInt(document.getElementById("Angle1").value)/100,parseInt(document.getElementById("Angle2").value)/100,parseInt(document.getElementById("Angle3").value)/100]
	
	for (var i=0;i<meshList.length;i++){
		for (var j=0;j<meshList[i].links.length;j++){
			ctx.strokeStyle="hsla(300,50%,30%,"+(Frenet(meshList[i].position)[2]/(2*MAX)*100+50)+"%)";
			ctx.beginPath();
			ctx.moveTo(Frenet(meshList[i].position)[0]/MAX*250+250,Frenet(meshList[i].position)[1]/MAX*250+250);
			ctx.lineTo(Frenet(meshList[i].links[j].position)[0]/MAX*250+250,Frenet(meshList[i].links[j].position)[1]/MAX*250+250)	
			ctx.stroke();
			ctx.closePath();
		}
	}
};

function normale(X,Y){
	"X et Y deux vecteurs"
	var T = [Y[1]*X[2]-X[1]*Y[2], Y[2]*X[0]-X[2]*Y[0], Y[0]*X[1]-X[0]*Y[1]]
	var Norme=dist(T,[0,0,0]);
	return [T[0]/Norme,T[1]/Norme,T[2]/Norme];
};

function Frenet(PT){ // Converti un pt en 3D sur le plan en 2D après la transformation nécessaire.
  var TempVar=PT;
  TempVar=[TempVar[0]*Math.cos(Angle[0]*2*Math.PI)+TempVar[1]*Math.sin(Angle[0]*2*Math.PI),TempVar[1]*Math.cos(Angle[0]*2*Math.PI)-TempVar[0]*Math.sin(Angle[0]*2*Math.PI),TempVar[2]];
  TempVar=[TempVar[0]*Math.cos(Angle[1]*2*Math.PI)+TempVar[2]*Math.sin(Angle[1]*2*Math.PI),TempVar[1],TempVar[2]*Math.cos(Angle[1]*2*Math.PI)-TempVar[0]*Math.sin(Angle[1]*2*Math.PI)];
  TempVar=[TempVar[0],TempVar[1]*Math.cos(Angle[2]*2*Math.PI)-TempVar[2]*Math.sin(Angle[2]*2*Math.PI),TempVar[2]*Math.cos(Angle[2]*2*Math.PI)+TempVar[1]*Math.sin(Angle[2]*2*Math.PI)];
  return [TempVar[0], TempVar[1], TempVar[2]]
}

function pushIt(){
  pushElements.push([
  parseInt(document.getElementById('start').value),
  parseFloat(document.getElementById('strength').value),
  [parseFloat(document.getElementById('posX').value), parseFloat(document.getElementById('posY').value), parseFloat(document.getElementById('posZ').value)],
  parseInt(document.getElementById('duration').value)]);//debut,strength,position,duration
  RewriteHTML();
}

function pushRandom(){
  pushElements.push([
  parseInt(Math.random()*10000),
  Math.random()*10,
  [Math.random()*10-5, Math.random()*10-5, Math.random()*10-5],
  parseInt(Math.random()*1000)]);//debut,strength,position,duration
  RewriteHTML();
}


function RewriteHTML(){
  var TEXTE='<div style="overflow-y:scroll;height:600px;">';
  var MainC=document.getElementById('MainC');
  for (var i=0;i<pushElements.length;i++){
	TEXTE+='<p>-------------------</p>'
    TEXTE+='<p>Debut : '+pushElements[i][0]+'</p>'
    TEXTE+='<p>Durée : '+pushElements[i][3]+'</p>'
    TEXTE+='<p>Force : '+pushElements[i][1]+'</p>'
    TEXTE+='<p>Position : '+pushElements[i][2]+'</p>'
    TEXTE+='<p>-------------------</p>'
  }
  TEXTE+='</div>'
  MainC.innerHTML=TEXTE;
}

function resetPushers(){
  pushElements=[];
  RewriteHTML();
}

var ticker=0;
var mainGameLoop = window.setInterval(function() { // runs the loop
  loop();
}, 30);

function resetForme(){
    meshList = [];
	meshList.push(new Mesh_Element([0.1,0,0],[1,0,0]));
	meshList.push(new Mesh_Element([0,0.1,0],[0,1,0]));
	meshList.push(new Mesh_Element([0,0,0.1],[0,0,1]));
	meshList.push(new Mesh_Element([-0.1,0,0],[-1,0,0]));
	meshList.push(new Mesh_Element([0,-0.1,0],[0,-1,0]));
	meshList.push(new Mesh_Element([0,0,-0.1],[0,0,-1]));
	
	meshList[0].addLink(meshList[1]);
	meshList[0].addLink(meshList[2]);
	meshList[0].addLink(meshList[4]);
	meshList[0].addLink(meshList[5]);
	meshList[3].addLink(meshList[1]);
	meshList[3].addLink(meshList[2]);
	meshList[3].addLink(meshList[4]);
	meshList[3].addLink(meshList[5]);
	meshList[1].addLink(meshList[2]);
	meshList[1].addLink(meshList[5]);
	meshList[4].addLink(meshList[2]);
	meshList[4].addLink(meshList[5]);
	ticker =0;
	pushList=[];
	
}
//myFunction(); 
resetForme();
pushList=[];
pushList.push(new pushers(1,[0,0,0],1000));
    
function loop(){
	for (var i=0; i<pushElements.length; i++) {
		if (pushElements[i][0] == ticker){
			pushList.push(new pushers(pushElements[i][1], pushElements[i][2], pushElements[i][3]));
		}
	}
	myFunction2();
	ticker++;
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