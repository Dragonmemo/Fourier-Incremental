var i,j;
var Parameters = [-1,0,0,0,0]
var canvas = document.getElementById("myCanvas");

//le fichier Furs.js contient les valeurs de chaque fourrures comme indiquées dans parameters et en 6e le lien.

function DistanceCol(Col1,Col2){ //couleurs données en RGB, Col1 est la couleur qui est approchée
	var ColPrime1 = [Col1[0]/255,Col1[1]/255,Col1[2]/255]
	var ColMin1 = math.min(ColPrime1)
	var ColMax1 = math.max(ColPrime1)
	var Delta1 = ColMax1-ColMin1
	var Saturation1 = ColMax1;
	if (ColMax1!=0){Saturation1 = Delta1/ColMax1}
	var Hue1 = 0;
	if (Delta1!=0){
		if (ColMax1==ColPrime1[0]){
			Hue1 = (ColPrime1[1]-ColPrime1[2])/Delta1+6
		}
		else if (ColMax1==ColPrime1[1]){
			Hue1 = (ColPrime1[2]-ColPrime1[0])/Delta1+2
		}
		else{
			Hue1 = (ColPrime1[0]-ColPrime1[1])/Delta1+4
		}
	}
	var ColPrime2 = [Col2[0]/255,Col2[1]/255,Col2[2]/255]
	var ColMin2 = math.min(ColPrime2)
	var ColMax2 = math.max(ColPrime2)
	var Delta2 = ColMax2-ColMin2
	var Saturation2 = ColMax2;
	if (ColMax2!=0){Saturation2 = Delta2/ColMax2}
	var Hue2 = 0;
	if (Delta2!=0){
		if (ColMax2==ColPrime2[0]){
			Hue2 = (ColPrime2[1]-ColPrime2[2])/Delta2+6
		}
		else if (ColMax2==ColPrime2[1]){
			Hue2 = (ColPrime2[2]-ColPrime2[0])/Delta2+2
		}
		else{
			Hue2 = (ColPrime2[0]-ColPrime2[1])/Delta2+4
		}
	}

	return (math.min(math.abs(Hue1-Hue2), math.abs(Hue1-Hue2+6),math.abs(Hue1-Hue2-6)))**2*ColMax1 + (ColMax1-ColMax2)**2 + (Saturation1-Saturation2)**2 
	
}


function DrawScreen(){
	var NewParams=[Parameters[0],Parameters[1],Parameters[2]];
	NewParams[0]=parseInt(document.getElementById("red").value)
	NewParams[1]=parseInt(document.getElementById("green").value)
	NewParams[2]=parseInt(document.getElementById("blue").value)
	if (NewParams[0]<0){NewParams[0] = 0}
	if (NewParams[1]<0){NewParams[1] = 0}
	if (NewParams[2]<0){NewParams[2] = 0}
	if (NewParams[0]>255){NewParams[0] = 255}
	if (NewParams[1]>255){NewParams[1] = 255}
	if (NewParams[2]>255){NewParams[2] = 255}
	NewParams[3] = document.getElementById("grammage").value
	NewParams[4] = document.getElementById("price").value
	var bool = false;
	for (var i = 0; i<5; i++){
		if (NewParams[i] != Parameters[i]){bool = true}
	}
	if (bool){
		Parameters = NewParams
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = 'rgb('+NewParams[0]+','+NewParams[1]+','+NewParams[2]+')'
		ctx.clearRect(0,0,100,20);
		ctx.rect(0, 0, 100, 20);
		ctx.fill()
		//Calcul du HSL
		var ColPrime = [Parameters[0]/255,Parameters[1]/255,Parameters[2]/255]
		var ColMin = math.min(ColPrime)
		var ColMax = math.max(ColPrime)
		var Delta = ColMax-ColMin
		var Saturation = ColMax;
		if (ColMax!=0){Saturation = Delta/ColMax}
		var Hue = 0;
		if (Delta!=0){
			if (ColMax==ColPrime[0]){
				Hue = ((ColPrime[1]-ColPrime[2])/Delta+6)%6*60
			}
			else if (ColMax==ColPrime[1]){
				Hue = ((ColPrime[2]-ColPrime[0])/Delta+2)*60
			}
			else{
				Hue = ((ColPrime[0]-ColPrime[1])/Delta+4)*60
			}
		}
		//Ecriture dans la page
		document.getElementById("color").innerHTML="RGB = ["+NewParams[0]+','+NewParams[1]+','+NewParams[2]+'] | HSL = ['+math.round(Hue,1)+'°,'+math.round(Saturation,3)+','+math.round(ColMax,3)+']'
		//calcul des fourures valides
		var CurrentFurs = []
		for (var i=0; i< FurList.length; i++){
			if (FurList[i][3]>=Parameters[3] && FurList[i][4]>=Parameters[4]){
				CurrentFurs.push(FurList[i])
			}
		}
		//Calcul des fourures les plus proches
		CurrentFurs.sort(function(a,b){return DistanceCol(Parameters,a)-DistanceCol(Parameters,b)})
		
		
		console.log(CurrentFurs.length)
		var LOL = ""
		for (var i=0; i<CurrentFurs.length;i++){
			LOL+="<p>"
			LOL+="Color : ["+CurrentFurs[i][0]+','+CurrentFurs[i][1]+','+CurrentFurs[i][2]+'] <span style="color:rgb('+NewParams[0]+','+NewParams[1]+','+NewParams[2]+');background-color:rgb('+CurrentFurs[i][0]+','+CurrentFurs[i][1]+','+CurrentFurs[i][2]+');">||||||||||</span><br>'
			LOL+='Grammage : '+CurrentFurs[i][3]+'g/ml<br>'
			LOL+='Price : '+CurrentFurs[i][4]+'$/m<br>'
			LOL+='<a href="'+CurrentFurs[i][5]+'">Look this Fur</a>'
			LOL+="</p>"
		}
		document.getElementById("List").innerHTML = LOL
	}
}
function myFunction() {
	DrawScreen()
};


function DownloadImg(){
	var LINK=document.getElementById("Download")
	LINK.download = 'IMPS.png';
	LINK.href = canvas.toDataURL()//"image/png");
}


var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
}, 33);

function loop() {
  myFunction();
}