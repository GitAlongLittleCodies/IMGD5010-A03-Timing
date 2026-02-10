// -----> UPDATE ME <-----
let           n = 5 ;        // how many spirals?
let   circleMag = 0.7 ;      // magnitude multiplier 0.01 to 1
let circleTrans = 225 ;      // set circle transparency 0 to 255
let     bgTrans = 15 ;       // set background transparency 0 to 255

let x, y, size, angle, angleVel, radius, radiusVel, myFill, frame, cycle;
let spirals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(2); // 
  translate(width/2,height/2);
  angle = 0; 
  radius = width;
  
  // populate spiral array
  for ( let i = 0; i < n; i++){
    cycle = round(random(200,800));
    size = round(random(50,100));
    angleVel = random(0.0, 0.2);
    radius = round(random(width/3,width));
    radiusVel = random(0,1);
    myFill = [random(0,251), random(0,100), random(0,100), random(0,1)]; // unused 
    // new spiral
    let spiral = new Spiral(cycle, size, angleVel, radius, radiusVel, myFill);
    
    // array it
    spirals.push(spiral);
  }
}

function draw() {

  background(2, bgTrans); 
  
  translate(width/2,height/2);
  
  for ( let spiral of spirals) {
    spiral.show();
    spiral.move();
    spiral.reset();
  }
  
}


class Spiral{
  constructor() {
    this.size = size;
    this.angle = 0;
    this.angleVel = angleVel;
    this.radius = radius;
    this.radiusVel = radiusVel;
    this.startRadius = radius;
    this.myFill = myFill;
    this.frame = frameCount;
    this.cycle = cycle;
    this.x = this.radius * cos(this.angle); 
    this.y = this.radius * sin(this.angle);
  }
  show(){
    noStroke();
    fill( 0, 200, 225, circleTrans ); 
    circle(this.x, this.y, this.size * 
      frameCount%cycle * circleMag );
  }
  move(){
    this.angle += this.angleVel;
    this.radius -= this.radiusVel;
    this.size = this.size;
    this.x = this.radius * cos(this.angle); 
    this.y = this.radius * sin(this.angle);
  }
  reset(){
    if (this.radius < 0) {
      this.radius = this.startRadius;
    }
  }
  addNew(){

    }
}
