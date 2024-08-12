var i,j;
var Parameters = [-1,0,0,0,0,0]
var canvas = document.getElementById("myCanvas");

//le fichier Furs.js contient les valeurs de chaque fourrures comme indiquées dans parameters et en 6e le lien.

FurList = FurList.split('\n')
for (var row in FurList) {
	FurList[row]=FurList[row].split(',');
	if (FurList[row][3] =='') FurList[row][3] = 9999
	else FurList[row][3] = parseFloat(FurList[row][3])
	if (FurList[row][5] =='') FurList[row][5] = 9999
	else FurList[row][5] = parseInt(FurList[row][5])
	if (FurList[row][6] =='') FurList[row][6] = "Aucune"
	FurList[row][7] = parseFloat(FurList[row][7])
}
function RGB_To_LAB(COLOR){
	var var_R = ( COLOR[0] / 255 )
	var var_G = ( COLOR[1] / 255 )
	var var_B = ( COLOR[2] / 255 )

	if ( var_R > 0.04045 ) var_R = ( ( var_R + 0.055 ) / 1.055 ) ** 2.4
	else                   var_R = var_R / 12.92
	if ( var_G > 0.04045 ) var_G = ( ( var_G + 0.055 ) / 1.055 ) ** 2.4
	else                   var_G = var_G / 12.92
	if ( var_B > 0.04045 ) var_B = ( ( var_B + 0.055 ) / 1.055 )** 2.4
	else                   var_B = var_B / 12.92

	var var_X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
	var var_Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
	var var_Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505
	
	if ( var_X > 0.008856 ) var_X = var_X ** ( 1/3 )
	else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 )
	if ( var_Y > 0.008856 ) var_Y = var_Y ** ( 1/3 )
	else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 )
	if ( var_Z > 0.008856 ) var_Z = var_Z ** ( 1/3 )
	else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 )

	return [( 116 * var_Y ) - 16, 500 * ( var_X - var_Y ), 200 * ( var_Y - var_Z )]	
}
function distance_euc(a,b){
	var SUM = (a[0]-b[0])**2+(a[1]-b[1])**2+(a[2]-b[2])**2
	return math.sqrt(SUM)
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
	NewParams[4] = document.getElementById("grammage").value
	NewParams[3] = document.getElementById("length").value
	NewParams[5] = document.getElementById("price").value
	var bool = false;
	for (var i = 0; i<6; i++){
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
			if (FurList[i][3]>=Parameters[3] && FurList[i][5]>=Parameters[4] && FurList[i][7]>=Parameters[5]){
				CurrentFurs.push(FurList[i])
			}
		}
		//Calcul des fourures les plus proches
		CurrentFurs.sort(function(a,b){return distance_euc(RGB_To_LAB(Parameters), RGB_To_LAB(a))-distance_euc(RGB_To_LAB(Parameters), RGB_To_LAB(b))})
		
		
		console.log(CurrentFurs.length)
		var LOL = ""
		for (var i=0; i<CurrentFurs.length;i++){
			LOL+="<p>"
			LOL+="Color : ["+CurrentFurs[i][0]+','+CurrentFurs[i][1]+','+CurrentFurs[i][2]+'] <span style="color:rgb('+NewParams[0]+','+NewParams[1]+','+NewParams[2]+');background-color:rgb('+CurrentFurs[i][0]+','+CurrentFurs[i][1]+','+CurrentFurs[i][2]+');">||||||||||</span><br>'
			LOL+='Longueur : '+CurrentFurs[i][3]+'cm<br>'
			LOL+='Grammage : '+CurrentFurs[i][5]+'g/ml<br>'
			LOL+='Spécialité : '+CurrentFurs[i][6]+'<br>'
			LOL+='Price : '+CurrentFurs[i][7]+'$/m<br>'
			LOL+='<a href="'+CurrentFurs[i][9]+'">Look this Fur</a>'
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