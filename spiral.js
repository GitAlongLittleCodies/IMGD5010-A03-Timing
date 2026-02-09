let x, y, size, angle, angleVel, radius, radiusVel, myFill, frame, cycle;
let spirals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20,10); 
  translate(width/2,height/2);
  angle = 0; 
  radius = width;
  
  // populate spiral array
  for ( let i = 0; i < 5; i++){
    cycle = round(random(200,800));
    size = round(random(25,75));
    angleVel = random(0.0, 0.2);
    radius = round(random(width/2,width));
    radiusVel = random(0,1);
    myFill = [random(0,251), random(0,100), random(0,100), random(0,1)]
    // new spiral
    let spiral = new Spiral(cycle, size, angleVel, radius, radiusVel, myFill);
    
    // array it
    spirals.push(spiral);
    
    console.log(spirals)
  }
}

function draw() {

  background(20, 20, 20, 10); 
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
    fill(0,200,255); 
    // console.log(this.x)
    circle(this.x, this.y, this.size * frameCount%cycle);
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
}
