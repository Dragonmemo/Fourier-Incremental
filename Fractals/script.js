// client-side js, loaded by index.html
// run by the browser each time the page is loaded

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.createImageData(500, 500); //=pixels
var x=[500,500]
var i
var j

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
			p.push(((x => (y => x[0]*y**x[1]))(P[i])))
			if (P[i][1]!=0) {
			dp.push(((x => (y => x[0]*x[1]*y**(x[1]-1)))(P[i])))
			}
		}
	}
	finally{
	return [p,dp]
}}

function SuiteNewton(x0,p,dp){
    var k=10000
    var Num = 0
	for (i=0;i<p.length;i++){Num+=p[i](x0)}
	var Denum = 0
	for (i=0;i<dp.length;i++){Denum+=dp[i](x0)}
	var y = x0 - Num / Denum
    for (j=0;j<k;j++){
        if (math.abs(Num/Denum)<1/k){
            break
		}
        Num = 0
		for (i=0;i<p.length;i++){Num+=p[i](y)}
		Denum = 0
		for (i=0;i<dp.length;i++){Denum+=dp[i](y)}
		y = y - Num / Denum
	}
    return [y,j]
}
/*
def FractNewton(StrPoly):
    PIX=IMG.load()
    LRAC=[]
    LP=[]
    p,dp=DerivPoly(StrPoly)
    for i in range(512):
        if i%10==0 :print(i)
        for j in range(512):
            try :
                Rac=SuiteNewton(10*(i-256)*1j/256+10*(j-256)/256,p,dp)
                if Rac[1]==9999 :
                    PIX[i,j]=(0,0,0)
                elif LRAC!=[] and True in [abs(x-Rac[0])<0.1 for x in LRAC]:
                    LP.append([i,j,[abs(x-Rac[0])<0.1 for x in LRAC].index(True)])
                else :
                    LRAC.append(Rac[0])
                    LP.append([i,j,len(LRAC)-1])
                    print(LRAC)
            except Exception as e:
                PIX[i,j]=(0,0,0)
                print(e)
    LEN=len(LRAC)
    for k in LP:
        PIX[k[0],k[1]]=(int(255*abs(math.sin(k[2]/LEN*math.pi))),int(255*abs(math.sin(k[2]/LEN*math.pi+math.pi/3))),int(255*abs(math.sin(k[2]/LEN*math.pi+2*math.pi/3))))
    IMG.show()
*/