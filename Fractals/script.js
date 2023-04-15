// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(500, 500); //=pixels
var x=[500,500]
var i
var j,tau

function DerivPoly(StrPoly){ //StrPoly = an*X**n+an-1*X**n-1...+a1*X**1+a0*X**0
    var P=[]
    var d=0
    try{
        while (true){
            var X=StrPoly.slice(d).indexOf("X")+d
            var f=X+3
            while (f<StrPoly.length && "0123456789".includes(StrPoly[f])){
                f++
			}
            P.push([math.complex(StrPoly.slice(d,X-1)),parseInt(StrPoly.slice(X+3,f))])
            d=f
		}
	}
    catch{
		var p=[]
		var dp=[]
		for (i=0;i<P.length;i++){
			p.push(((x => (y => math.multiply(x[0],math.pow(y,x[1]))))(P[i])))
			if (P[i][1]!=0) {
			dp.push(((x => (y => math.multiply(x[0],math.multiply(x[1],math.pow(y,x[1]-1)))))(P[i])))
			}
		}
	}
	finally{
	return [p,dp]
}}

function SuiteNewton(x0,p,dp){
    var k=5
    var Num = math.complex(0.)
	for (i=0;i<p.length;i++){Num=Num.add(p[i](x0))}
	var Denum = math.complex(0.)
	for (i=0;i<dp.length;i++){Denum=Denum.add(dp[i](x0))}
	var y = math.subtract(x0,Num.div(Denum))
    for (j=0;j<k;j++){
        if (math.abs(Num.div(Denum))<1/k){
            break
		}
        Num = math.complex(0.)
		for (i=0;i<p.length;i++){Num=Num.add(p[i](y))}
		Denum = math.complex(0.)
		for (i=0;i<dp.length;i++){Denum=Denum.add(dp[i](y))}
		y = math.subtract(y, Num.div(Denum))
	}
    return [y,j]
}

function FractNewton(){
	var StrPoly=document.getElementById("Polynom").value
    var LRAC=[]
    var LP=[]
    var [p,dp]=DerivPoly(StrPoly)
	var col, lig
    for (lig=0;lig<500;lig++){
        if (lig%10==0){console.log(lig)}
        for (col=0;col<500;col++){ //j in range(512):
			try {
                Rac=SuiteNewton(math.complex("i").mul(10*(lig-250)/250).add(10*(col-250)/250),p,dp)
                if (Rac[1]==10){
                    imageData.data[4*500*lig+4*col]=0
					imageData.data[4*500*lig+4*col+1]=0
					imageData.data[4*500*lig+4*col+2]=0
					imageData.data[4*500*lig+4*col+3]=255
				}
                else{
					var LMin=[]
					for (tau=0;tau<LRAC.length;tau++){LMin.push(math.abs(math.subtract(LRAC[tau],Rac[0]))<0.1)}
					if(LRAC!=[] && LMin.includes(true)){
                    LP.push([lig,col,LMin.indexOf(true)])
					}
					else {
						LRAC.push(Rac[0])
						LP.push([lig,col,LRAC.length-1])
						//console.log(LRAC)
					}
				}
			}
            catch(error){
				//console.error(error)
                imageData.data[4*500*lig+4*col]=0
				imageData.data[4*500*lig+4*col+1]=0
				imageData.data[4*500*lig+4*col+2]=0
				imageData.data[4*500*lig+4*col+3]=255
			}
		}
	}
    var LEN=LRAC.length
    for (j=0;j<LP.length;j++){
        imageData.data[4*500*LP[j][0]+4*LP[j][1]]=parseInt(255*math.abs(math.sin(LP[j][2]/LEN*math.pi)))
		imageData.data[4*500*LP[j][0]+4*LP[j][1]+1]=parseInt(255*math.abs(math.sin(LP[j][2]/LEN*math.pi+math.pi/3)))
		imageData.data[4*500*LP[j][0]+4*LP[j][1]+2]=parseInt(255*math.abs(math.sin(LP[j][2]/LEN*math.pi+2*math.pi/3)))
		imageData.data[4*500*LP[j][0]+4*LP[j][1]+3]=255
	}
    ctx.putImageData(imageData,0,0)
}

