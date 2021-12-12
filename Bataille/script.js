// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(500, 500); //=pixels
var x=[500,500]
var L1,L2
ctx.font = "30px Arial";

function StartNew(){
	L1 = document.getElementById("Deck1").value.split(",")
	L2 = document.getElementById("Deck2").value.split(",")
	for(var k=0; k<L1.length;k++){
		L1[k]=[parseInt(L1[k]),1]
		L2[k]=[parseInt(L2[k]),2]
	}
	ctx.strokeStyle="#000"
	ctx.clearRect(0,0,500,500)
	ctx.beginPath();
	ctx.moveTo(250,0)
	ctx.lineTo(250,500)
	ctx.stroke();
	ctx.closePath()
}

function DrawTurn(){
	var P01=[Math.random()*150,Math.random()*300]
	var P02=[Math.random()*150+250,Math.random()*300]
	ctx.clearRect(P01[0],P01[1],100,200)
	ctx.strokeStyle="#000"
	ctx.beginPath();
	ctx.moveTo(P01[0],P01[1])
	ctx.lineTo(P01[0]+100,P01[1])
	ctx.lineTo(P01[0]+100,P01[1]+200)
	ctx.lineTo(P01[0],P01[1]+200)
	ctx.lineTo(P01[0],P01[1])
	ctx.stroke();
	ctx.closePath()
	ctx.clearRect(P02[0],P02[1],100,200)
	ctx.strokeStyle="#000"
	ctx.beginPath();
	ctx.moveTo(P02[0],P02[1])
	ctx.lineTo(P02[0]+100,P02[1])
	ctx.lineTo(P02[0]+100,P02[1]+200)
	ctx.lineTo(P02[0],P02[1]+200)
	ctx.lineTo(P02[0],P02[1])
	ctx.stroke();
	ctx.closePath()
	C1=L1.shift()
	C2=L2.shift()
	ctx.fillText(C1[0],P01[0]+45,P01[1]+105)
	ctx.fillText(C2[0],P02[0]+45,P02[1]+105)	
	L1.push(C1)
	L2.push(C2)
}

