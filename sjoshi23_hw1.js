// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor
} // end color class

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
function getInputBoxes() {
    const INPUT_BOXES_URL = "https://pages.github.ncsu.edu/dnhancoc/json-files/boxes.json";
        //"https://ncsucgclass.github.io/prog1/boxes.json";
        
    // load the boxes file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_BOXES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input boxes file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input boxes
// Vector class
class Vector { 
    constructor(x=0,y=0,z=0) {
        this.set(x,y,z);
    } // end constructor
    
    // sets the components of a vector
    set(x,y,z) {
        try {
            if ((typeof(x) !== "number") || (typeof(y) !== "number") || (typeof(z) !== "number"))
                throw "vector component not a number";
            else
                this.x = x; this.y = y; this.z = z; 
        } // end try
        
        catch(e) {
            console.log(e);
        }
    } // end vector set
    
    // copy the passed vector into this one
    copy(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.copy: non-vector parameter";
            else
                this.x = v.x; this.y = v.y; this.z = v.z;
        } // end try
        
        catch(e) {
            console.log(e);
        }
    }
    
    toConsole(prefix) {
        console.log(prefix+"["+this.x+","+this.y+","+this.z+"]");
    } // end to console
    
    // static dot method
    static dot(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.dot: non-vector parameter";
            else
                return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end dot static method
    
    // static add method
    static add(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return(new Vector(v1.x+v2.x,v1.y+v2.y,v1.z+v2.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end add static method

    // static subtract method, v1-v2
    static subtract(v1,v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x-v2.x,v1.y-v2.y,v1.z-v2.z);
                //v.toConsole("Vector.subtract: ");
                return(v);
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end subtract static method

    // static scale method
    static scale(c,v) {
        try {
            if (!(typeof(c) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                return(new Vector(c*v.x,c*v.y,c*v.z));
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    
    // static normalize method
    static normalize(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.normalize: parameter not a vector";
            else {
                var lenDenom = 1/Math.sqrt(Vector.dot(v,v));
                return(Vector.scale(lenDenom,v));
            }
        } // end try
        
        catch(e) {
            console.log(e);
            return(new Vector(NaN,NaN,NaN));
        }
    } // end scale static method
    // static cross method
    static cross(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.cross: non-vector parameter";
            else
                return(new Vector((v1.y*v2.z - v1.z*v2.y), (v1.z*v2.x - v1.x*v2.z), (v1.x*v2.y - v1.y*v2.x)));
        } // end try
        
        catch(e) {
            console.log(e);
            return(NaN);
        }
    } // end cross static method  
} // end Vector class
function getWin(lookAt, viewUp, eye) {
	var w = 1;
    var h = 1;
    var d = 0.5;


    var cent = Vector.add(eye, Vector.scale(d, lookAt));    
    var right = Vector.cross(viewUp, lookAt); 

    ul = Vector.add(cent, Vector.add(Vector.scale(-w/2, right), Vector.scale(h/2, viewUp)));
    ur = Vector.add(cent, Vector.add(Vector.scale(w/2, right), Vector.scale(h/2, viewUp)));
    ll = Vector.add(cent, Vector.add(Vector.scale(-w/2, right), Vector.scale(-h/2, viewUp)));
    lr = Vector.add(cent, Vector.add(Vector.scale(w/2, right), Vector.scale(-h/2, viewUp)));
    return ({ul,ur,ll,lr});
}
function calculatecolor (box,point,light,eye) {
 /*   For some reason this does not work
        if(box.fz==point.z || box.rz==point.z){
            if(point.z == box.fz){
                return new Vector(0,0,-1);}
            else{
                return new Vector(0,0,1);}}
        if(box.by==point.y || box.ty == point.y){
            if(box.by==point.y){
                return new Vector(0,-1,0);}
            else{
                return new Vector(0,1,0);}}
        if(box.lx==point.x || box.rx == point.x){
            if(box.lx==point.x){
                return new Vector(-1,0,0);}
            else{
                return new Vector(1,0,0);}} 
        */
        var tmp1 = Math.abs(box.fz-point.z); 
        var tmp2 = Math.abs(box.rz-point.z);
        var tmp3 = Math.abs(box.ty-point.y);
        var tmp4 = Math.abs(box.by-point.y);
        var tmp5 = Math.abs(box.lx-point.x);
        var tmp6 = Math.abs(box.rx-point.x);
        var intersect = Math.min(tmp1,tmp2,tmp3,tmp4,tmp5,tmp6);
        if(tmp1==intersect)
        {
            normal = new Vector(0,0,-1);
        }
        else if (tmp2==intersect) {
            normal = new Vector(0,0,1);
        }
        else if (tmp3==intersect) {
            normal = new Vector(0,1,0);
        }
        else if (tmp4==intersect) {
            normal = new Vector(0,-1,0);
        }
        else if (tmp5==intersect) {
            normal = new Vector(-1,0,0);
        }
        else if (tmp6==intersect) {
            normal = new Vector(1,0,0);
        }   
        var L = Vector.normalize(Vector.subtract(light,point));
        var V = Vector.normalize(Vector.subtract(eye,point));
        var H = Vector.normalize(Vector.add(V,L));
        var NHfactor = Math.pow(Vector.dot(normal,H),box.n);
        var prodNL = Vector.dot(normal,L);

        var red = Math.max(0,(1 * box.ambient[0])) + Math.max(0,(1 * box.diffuse[0] * prodNL)) + Math.max(0,(1 * box.specular[0] * NHfactor));
        var green = Math.max(0,(1 * box.ambient[1])) + Math.max(0,(1 * box.diffuse[1] * prodNL)) + Math.max(0,(1 * box.specular[1] * NHfactor));
        var blue = Math.max(0,(1 * box.ambient[2])) + Math.max(0,(1 * box.diffuse[2] * prodNL)) + Math.max(0,(1 * box.specular[2] * NHfactor));
        var color = new Color(red*255,green*255,blue*255,255);
        //here each factor is given to be 1 in the question so I have put up the values manually
        // for ambient : 1 diffuse : 1 and specular : 1
        return color;
    }
function rcast (context) {
    // body...
     var w = context.canvas.width; // as set in html
    var h = context.canvas.height;  // as set in html
    var imagedata = context.createImageData(w,h);

    var lookAt = new Vector(0,0,1);
    var viewUp = new Vector(0,1,0);
    var lightpos = new Vector(-0.5,1.5,-0.5);
    var eye = new Vector(0.5,0.5,-0.5);

    var boxes = getInputBoxes();
    for(var x = 0;x<w;x++)
    {
        for(var y = 0;y<h;y++)
        {
            var isfilled = false;
            var s = x/w;
            var t = y/h;
            var win = getWin(lookAt,viewUp,eye);
            var pl = Vector.add(win.ul,Vector.scale(s,Vector.subtract(win.ll,win.ul)));
            var pr = Vector.add(win.ur,Vector.scale(s,Vector.subtract(win.lr,win.ur)));
            var point = Vector.add(pl,(Vector.scale(t,Vector.subtract(pr,pl))));
            var d = Vector.subtract(point,eye);
            var tmin = Number.POSITIVE_INFINITY;
            var closest = -1;
            for(var z = 0;z<boxes.length;z++)
            {
                if(!isfilled)
                {
                var leftx = (boxes[z].lx-eye.x)/d.x;
                var rightx = (boxes[z].rx-eye.x)/d.x;
                var tx0 = Math.min(leftx,rightx);
                var tx1 = Math.max(leftx,rightx);

                var bottomy = (boxes[z].by-eye.y)/d.y;
                var topy = (boxes[z].ty-eye.y)/d.y;
                var ty0 = Math.min(topy,bottomy);
                var ty1 = Math.max(topy,bottomy);

                var frontz = (boxes[z].fz-eye.z)/d.z;
                var rearz = (boxes[z].rz-eye.z)/d.z;
                var tz0 = Math.min(frontz,rearz);
                var tz1 = Math.max(frontz,rearz);

                
                var t0 = Math.max(tx0,ty0,tz0);
                var t1 = Math.min(tx1,ty1,tz1);

                if(t0<t1 && t0>=1)  
                {
                    var inter = Vector.add(eye,Vector.scale(t0,d));
                    drawPixel(imagedata,y,x,calculatecolor(boxes[z],inter,lightpos,eye)); 
                    isfilled = true;
                }
                else
                {
                    drawPixel(imagedata, y, x, new Color(0,0,0,255));
                }
            }
            }
        }
    }
    context.putImageData(imagedata,0,0);
}
function main() {

    // Get the canvas, context, and image data
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    rcast(context);
}