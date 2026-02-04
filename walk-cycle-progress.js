// change of perspective:
// usually a walk cycle is a complete left/right set, ie 1 cycle might be 1 seconds
// this system, one cycle is the timing to move one leg, ie 1 cycle would be 0.5 seconds

let isRunning = false;
let myFrame = 0;

let foot = {
  name: "fred",
  side: 1,     /* think 'left' or 'right' - but use an integer for id & sequence */
  
  xPos: -50,
  yPos: 300,
  size: 50, 
  
  stride: 2,
  
//  holdTime: 30, /* hold time is just the other foot's swing time */
  swingTime: 15, 
  inTime: 3,
  outTime: 3,

  holdSize: 1.0,
  inSize: 0.8,
  swingSize: 0.5, 
  outSize: 1.2,
  
  swingApex: 1.3,
  swingDrag: 0.0   /* don't worry about drag for now */
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  frameRate(60); 
}

function draw() {

  if (isRunning) {
  
  let cycle = {};

  background(0);

  // a full cycleLength = sum of all feet per name 
  // #TODO - need to store/retrieve values of all feet per name #
  // for now, assume (a) only 2 feet -and- (b) each foot has identical timing
  
  cycle.time = ( foot.inTime + foot.swingTime + foot.outTime ) ;
  
  // how many frames are we into the current cycle?
  cycle.frameSeq = myFrame % cycle.time + 1;
  
  // BEGIN with inTime and outTime 
  // FOOT 1 begins inTime, it's picking up, shifting weight to FOOT 2
  // FOOT 2 begins outTime, it's staying in place, adjusting for the extra weight - as though it just stepped
  // result: Frames 1-3, FOOT 1 should decrease in size & FOOT 2 should increase in size
  // incrementally over the first 3 frames of cycle
  
  // just do FOOT 2 for now 
  
  // here's where the current foot needs to reference the timing of the other foot to coordinate
  // footSizes are relative to foot.size - they increase or decrease; foot.size -1 to get there

  if ( cycle.frameSeq <= foot.inTime ) { 
    // IN   FRAMES 1 through 3 
    // this foot gets bigger as the other foot swings
    foot.size = foot.size + ( foot.size * foot.outSize - foot.size ) / foot.outTime; 
    circle(width/2,height/2,foot.size);
    console.log( "IN    local: " + cycle.frameSeq + "   frame: " + myFrame + "    Size: " + foot.size );
  } 
    else if ( cycle.frameSeq <= foot.inTime + foot.swingTime ) {
    // SWING   FRAMES 4 though 33
    // this foot HOLDS while the other swings
    circle(width/2,height/2,foot.size);
    console.log( "SWING    local: " + cycle.frameSeq + "   frame: " + myFrame + "    Size: " + foot.size );
  } 
    else {
      
    // OUT   FRAMES 34 through 36
    // this foot begins to shift its weight to the other foot
    // need to know how many frames INTO this stage of the cycle we are
    // if we're at 34, this sequence is at local frame 1
      
    let localFrame = ( cycle.frameSeq % ( foot.inTime + foot.swingTime ) )
    // looks like  1 = ( 34 % ( 3 + 30 ) ) 
    
    foot.size =  foot.size + ( foot.size * foot.inSize - foot.size ) / foot.inTime; 
      
    circle(width/2,height/2,foot.size);
    console.log( "OUT    local: " + cycle.frameSeq + "   frame: " + myFrame + "    Size: " + foot.size );
  }
  
  isRunning = !isRunning;
  myFrame++; 
  }
  
}










function mousePressed() {
  isRunning = !isRunning; // Toggle state
  if (isRunning) {
    loop(); // Resume draw()
  } else {
    noLoop(); // Stop draw()
  }
}
























