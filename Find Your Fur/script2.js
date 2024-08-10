var i,j;
var canvas = document.getElementById("myCanvas");
var Params = [0,0,0,0,0]
var ctx = canvas.getContext("2d");

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
	var NewParams=[0,0,0,1,0];
	NewParams[0]=parseInt(document.getElementById("red").value)
	NewParams[1]=parseInt(document.getElementById("green").value)
	NewParams[2]=parseInt(document.getElementById("blue").value)
	if (NewParams[0]<0){NewParams[0] = 0}
	if (NewParams[1]<0){NewParams[1] = 0}
	if (NewParams[2]<0){NewParams[2] = 0}
	if (NewParams[0]>255){NewParams[0] = 255}
	if (NewParams[1]>255){NewParams[1] = 255}
	if (NewParams[2]>255){NewParams[2] = 255}
	NewParams[3] = parseInt(document.getElementById("DIST").value)
	NewParams[4] = parseInt(document.getElementById("BLUE").value)
	var bool = false;
	for (var i = 0; i<5; i++){
		if (NewParams[i] != Params[i]){bool = true}
	}
	if (!bool){
		return;
	}
	else {Params=NewParams}
	//Calcul du HSL
	var ColPrime = [NewParams[0]/255,NewParams[1]/255,NewParams[2]/255]
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
	document.getElementById("color").innerHTML='HSL = ['+math.round(Hue,1)+'°,'+math.round(Saturation,3)+','+math.round(ColMax,3)+']'
	//Dessin des couelurs les plus proches
	//CurrentFurs.sort(function(a,b){return DistanceCol(NewParams,a)-DistanceCol(NewParams,b)})
	ctx.clearRect(0,0,256,256);
	for (i=0; i<256; i++){
		for (j=0; j<256; j++){
			if (distance_euc(RGB_To_LAB(NewParams), RGB_To_LAB([i,j,NewParams[4]]))<NewParams[3]){
				ctx.fillStyle = 'rgb('+i+','+j+','+NewParams[4]+')'
				ctx.fillRect(i, j, 1, 1);
			}
		}
	}
}
function myFunction() {
	DrawScreen()
};


var mainGameLoop = window.setInterval(function() { // runs the loop
	loop();
}, 33);

function loop() {
  myFunction();
}