// change of perspective:
// usually a walk cycle is a complete left/right set, ie 1 cycle might be 1 seconds
// this system, one cycle is the timing to move one leg, ie 1 cycle would be 0.5 seconds

let isRunning = false;
let myFrame = 0; /* mousePress frame by frame */

let foot = {
  name: "fred",
  side: 1,     /* think 'left' or 'right' - but use an integer for id & sequence */
  shoeSize: 50,
  
  xPos: -50,
  yPos: 300,
  size: 50, 
  
  stride: 2,
  
//  holdTime: 30, /* hold time is just the other foot's swing time */
  swingTime: 30, 
  shiftTime: 3,
  strikeTime: 3,

  holdSize: 1.0,
  shiftSize: 0.8,
  shiftInc: 0,
  swingSize: 0.5, 
  swingInc: 0,
  strikeSize: 1.2,
  strikeInc: 0,
  
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
    
  background(0)

  // a full cycleLength = sum of all feet per name 
  // #TODO - need to store/retrieve values of all feet per name #
  // for now, assume (a) only 2 feet -and- (b) each foot has identical timing
  
  cycle.time = ( foot.shiftTime + foot.swingTime + foot.strikeTime ) ;
  
  // how many frames are we into the current cycle?
  cycle.frame = myFrame % cycle.time + 1; /* what frame of the cycle are we on? */
  
  // BEGIN with inTime and outTime 
  // FOOT 1 begins inTime, it's picking up, shifting weight to FOOT 2
  // FOOT 2 begins outTime, it's staying in place, adjusting for the extra weight - as though it just stepped
  // result: Frames 1-3, FOOT 1 should decrease in size & FOOT 2 should increase in size
  // incrementally over the first 3 frames of cycle
  
  // just do FOOT 2 for now 

  let msg = "    local: " + cycle.frame + "   Size: " + foot.size;

  if ( cycle.frame <= foot.shiftTime ) { 
    // STRIKE FRAMES 1 through 3 
    // 1 foot shifts / the other strikes

    foot.strikeInc = round( ( ( foot.shoeSize * foot.strikeSize ) - 
                              ( foot.shoeSize + foot.shiftInc * foot.shiftTime ) ) / 
                                foot.strikeTime, 0);
    
    foot.size = foot.size + foot.strikeInc;
        
    circle(width/2,height/2,foot.size);

    console.log("stage: STRIKE" + "    size: " + foot.size + "    inc: " + foot.strikeInc);
  } 
    else if ( cycle.frame <= foot.shiftTime + foot.swingTime ) {
    // SWING   FRAMES 4 though 33
    // this foot HOLDS while the other swings
    circle(width/2,height/2,foot.size);
    console.log("stage: SWING" + "    size: " + foot.size + "    inc: 0");
  } 
    else {
      
    // OUT   FRAMES 34 through 36
    // this foot begins to shift its weight to the other foot
    // need to know how many frames INTO this stage of the cycle we are
    // if we're at 34, this sequence is at local frame 1
      
    foot.shiftInc = round( ( ( foot.shoeSize * foot.shiftSize) - 
                             ( foot.shoeSize + foot.strikeInc * foot.strikeTime ) ) / 
                               foot.shiftTime, 0);
            
    circle(width/2,height/2,foot.size);

    foot.size = foot.size + foot.shiftInc; 
      
    console.log("stage: SHIFT" + "    size: " + foot.size + "    inc: " + foot.shiftInc);
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
























