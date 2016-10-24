const tick = function clock() {
	let accumulator = sum => (n => sum += n);
	let x = accumulator(1);
	console.log(x(5));
	accumulator(3);
	console.log(x(2.3));
};

var color = ['#bada55','#f66','#55dad6','#d1c59b','#0c729e','#bb55da','#dda2d5','#d28c15'];
var toggled = false;
var minMaxRand = 0;
var vpWidth = window.innerWidth;
var vpHeight = window.innerHeight;


function minMax(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.round(Math.random() * (max - min)) + min;
 }

 function toggleClick(){
   if (toggled === false) {
     toggled = true;
   } else {
     toggled = false;
   }
 }

 function randHeading(){
   var degrees = Math.random()*360;
   return parseInt(degrees.toFixed(0));
 }

function toRad(deg){
  return deg*(Math.PI/180);
}

function toDeg(rad){
  return rad*(180/Math.PI);
}

function radius(options){
  options=options||{};

  var ax = options.ax;
  var ay = options.ay;
  var bx = options.bx;
  var by = options.by;

  return Math.sqrt(((ax-bx)*(ax-bx))+((ay-by)*(ay-by)))/2;
}

function anglize(options){
  var ax = options.ax;
  var ay = options.ay;
  var bx = options.bx;
  var by = options.by;

  return Math.abs( toDeg( Math.atan2( by,bx ) - Math.atan2( ay,ax ) ) );
}

function cycling(elem){
  if (elem>359) {
    return (elem % 360);
  }
  return elem;
}

function accel(elem,max){
  switch (true) {
    case (elem < (max/8)):
      return 8;
    case (elem < (max/4)):
      return 4;
    case (elem < (max/3)):
      return 2.6;
    case (elem < (max/2)):
      return 2;
    case (elem < (max/1.5)):
      return 1.5;
    default:
      return 1;

  }
}

function decel(elem,max){
  switch (true) {
    case (elem < (max/8)):
      return 1;
    case (elem < (max/4)):
      return 0.75;
    case (elem < (max/3)):
      return 0.66;
    case (elem < (max/2)):
      return 0.5;
    case (elem < (max/1.5)):
      return 0.25;
    case (elem < (max/1.2)):
      return 0.2;
    case (elem < (max/1.1)):
      return 0.1;
    default:
      return 0.000001;

  }
}

var Count = function(){

  this.mili = 0;
  this.tick = 0;

    if (this.mili >= 60) {
      this.mili = 0;
      this.tick+=1e-5;
    }

    if (this.mili < -180) {
      this.mili = 0;
      this.tick-=1e-5;
    }
};

function sigRange (range) {
  return (Math.random()*-range)+(Math.random()*range);
}

function sigmoid(t) { //from 0 -> 1
    return 1/(1+Math.exp(-t));
}

function tanh(x) {//from -1 -> 1
  e = Math.exp(2*x);
  return (e-1) / (e+1);
}

var monteCarloHigh = function (elem){
  var r1 = Math.random() * elem;
  var proba = r1;
  var r2 = Math.random() * elem;

  for (var i = 0; i < elem; i++) {
    if (r2 < proba) {
      return r1;
    }
  }
};
var monteCarloLow = function (elem){

  elem = elem || 1;

  var r1 = Math.random() * elem;
  var proba = r1;
  var r2 = Math.random() * elem;

  for (var i = 0; i < elem; i++) {
    if (r2 > proba) {
      return r1;
    }
  }
};

var ClassicalNoise = function() { // Classic Perlin noise in 3D, for comparison
  this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                                 [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                                 [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
  this.p = [];
  for (var i=0; i<256; i++) {
	  this.p[i] = Math.floor(Math.random()*256);
  }
  // To remove the need for index wrapping, double the permutation table length
  this.perm = [];
  for(var j=0; j<512; j++) {
		this.perm[j]=this.p[j & 255];
  }
};

ClassicalNoise.prototype.dot = function(g, x, y, z) {
    return g[0]*x + g[1]*y + g[2]*z;
};

ClassicalNoise.prototype.mix = function(a, b, t) {
    return (1.0-t)*a + t*b;
};

ClassicalNoise.prototype.fade = function(t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
};

  // Classic Perlin noise, 3D version
ClassicalNoise.prototype.noise = function(x, y, z) {

  x = x || Math.random();
  y = y || Math.random();
  z = z || Math.random();

  // Find unit grid cell containing point
  var X = Math.floor(x);
  var Y = Math.floor(y);
  var Z = Math.floor(z);

  // Get relative xyz coordinates of point within that cell
  x = x - X;
  y = y - Y;
  z = z - Z;

  // Wrap the integer cells at 255 (smaller integer period can be introduced here)
  X = X & 255;
  Y = Y & 255;
  Z = Z & 255;

  // Calculate a set of eight hashed gradient indices
  var gi000 = this.perm[X+this.perm[Y+this.perm[Z]]] % 12;
  var gi001 = this.perm[X+this.perm[Y+this.perm[Z+1]]] % 12;
  var gi010 = this.perm[X+this.perm[Y+1+this.perm[Z]]] % 12;
  var gi011 = this.perm[X+this.perm[Y+1+this.perm[Z+1]]] % 12;
  var gi100 = this.perm[X+1+this.perm[Y+this.perm[Z]]] % 12;
  var gi101 = this.perm[X+1+this.perm[Y+this.perm[Z+1]]] % 12;
  var gi110 = this.perm[X+1+this.perm[Y+1+this.perm[Z]]] % 12;
  var gi111 = this.perm[X+1+this.perm[Y+1+this.perm[Z+1]]] % 12;


  // Calculate noise contributions from each of the eight corners
  var n000= this.dot(this.grad3[gi000], x, y, z);
  var n100= this.dot(this.grad3[gi100], x-1, y, z);
  var n010= this.dot(this.grad3[gi010], x, y-1, z);
  var n110= this.dot(this.grad3[gi110], x-1, y-1, z);
  var n001= this.dot(this.grad3[gi001], x, y, z-1);
  var n101= this.dot(this.grad3[gi101], x-1, y, z-1);
  var n011= this.dot(this.grad3[gi011], x, y-1, z-1);
  var n111= this.dot(this.grad3[gi111], x-1, y-1, z-1);
  // Compute the fade curve value for each of x, y, z
  var u = this.fade(x);
  var v = this.fade(y);
  var w = this.fade(z);
   // Interpolate along x the contributions from each of the corners
  var nx00 = this.mix(n000, n100, u);
  var nx01 = this.mix(n001, n101, u);
  var nx10 = this.mix(n010, n110, u);
  var nx11 = this.mix(n011, n111, u);
  // Interpolate the four results along y
  var nxy0 = this.mix(nx00, nx10, v);
  var nxy1 = this.mix(nx01, nx11, v);
  // Interpolate the two last results along z
  var nxyz = this.mix(nxy0, nxy1, w);

  return nxyz;
};

var mapping = function (f, startLow,startHigh,newLow,NewHigh){
  return newLow + (NewHigh - newLow) * (f - startLow) / (startHigh - startLow);
};
