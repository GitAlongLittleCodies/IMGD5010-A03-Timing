// change of perspective:
// usually a walk cycle is a complete left/right set, ie 1 cycle might be 1 seconds
// this system, one cycle is the timing to move one leg, ie 1 cycle would be 0.5 seconds

let isRunning = false;

let foot = {
  name: "fred",
  side: 1,     /* think 'left' or 'right' - but use an integer for id & sequence */
  
  xPos: -50,
  yPos: 300,
  size: 50, 
  
  stride: 2,
  
//  holdTime: 30, /* hold time is just the other foot's swing time */
  swingTime: 30, 
  inTime: 3,
  outTime: 3,

  holdSize: 1.0,
  inSize: 1.0,
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
  cycle.frameSeq = frameCount % cycle.time;
  
  // BEGIN with inTime and outTime 
  // FOOT 1 begins inTime, it's picking up, shifting weight to FOOT 2
  // FOOT 2 begins outTime, it's staying in place, adjusting for the extra weight - as though it just stepped
  // result: Frames 1-3, FOOT 1 should decrease in size & FOOT 2 should increase in size
  // incrementally over the first 3 frames of cycle
  
  // just do FOOT 2 for now 
  
  // here's where the current foot needs to reference the timing of the other foot to coordinate
  // footSizes are relative to foot.size - they increase or decrease; foot.size -1 to get there
  
  if ( cycle.frameSeq <= foot.inTime ) { 
    // FRAMES 1 through 3 
    // this foot is getting more weight put on it as the other foot begins to swing
    foot.size = foot.size + ( foot.size * ( foot.outSize - 1 ) * ( cycle.frameSeq / foot.outTime ) ) ; 
    // looks like 50.333 = 50 + ( 50 * ( 1.2 - 1 ) * ( 1 / 3 ) ) for FRAME 1
    circle(width/2,height/2,foot.size);
  } 
  else if ( cycle.frameSeq <= foot.inTime + foot.swingTime ) {
    // FRAMES 4 though 33
    // while the other foot swings, this foot stays solidly in place - no x,y or d change
    // this foot holds in place while the other foot swings
    foot.size = foot.size + foot.size * ( foot.outSize - 1 ) ; 
    circle(width/2,height/2,foot.size);
  } 
  else if ( cycle.frameSeq <= foot.inTime + foot.swingTime + foot.outTime ) {
    // FRAMES 34 through 36
    // this foot begins to shift its weight to the other foot
    // need to know how many frames INTO this stage of the cycle we are
    // if we're at 34, this sequence is at local frame 1
    let localFrame = ( cycle.frameSeq % ( foot.inTime + foot.swingTime ) )
    // looks like  1 = ( 34 % ( 3 + 30 ) ) 
    foot.size = 
      (foot.size + foot.size * ( foot.outSize - 1 ) ) /* match existing size */  +
      foot.size * (foot.inSize - foot.outSize) * ( localFrame / foot.outTime ) ;
    // 56.666 = (60) + 50 * (1.0 - 1.2) * ( 1 / 3 )
    circle(width/2,height/2,foot.size);
  }
  
  isRunning = !isRunning;
    
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
























