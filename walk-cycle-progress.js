// TOP DOWN WALK CYCLES
// can circles look like they're walking?
// ----------------------------------------------
// using #FREEZE_FRAME while working on the code:
// substitutes using myFrame in place of frameCount
// mouse click to advance frame by frame
let isRunning = false;
let myFrame = 0;


let vectorStart, vectorStop, vectorLength, fullStep, halfStep, framesToDraw, shoeSize;
let TEST123 = "";
let counter = 0;

let walk = [
  [
    "fred",
    [
      {
        phase: "swing",
        shoeSize: 20,
        stride: 3,
        swingTime: 30,
        restTime: 0,
        arcSize: 0.9, 
        arcApex: 0.7, // the num of frames before apex maximum
        arcFramesIN: null,
        arcFramesOUT: null,
        drag: 0,
        vectorLastPos: null,
        vectorDestination: null,
        vectorFullStepInc: null,
        vectorHalfStepInc: null,
        vectorApex: null, // depreciated
        framesToDraw: 0,
        framesCompleted: 0,
        lastShoeSize: 0,
        shoeSizeIncIN: null,
        shoeSizeIncOUT: null
      },
      {
        phase: "strike",
        shoeSize: 20,
        stride: 3,
        swingTime: 30,
        restTime: 0,
        arcSize: 0.9, 
        arcApex: 0.7, // the num of frames before apex maximum
        arcFramesIN: null,
        arcFramesOUT: null,
        drag: 0,
        vectorLastPos: null,
        vectorDestination: null,
        vectorFullStepInc: null,
        vectorHalfStepInc: null,
        vectorApex: null, // depreciated
        framesToDraw: 0,
        framesCompleted: 0,
        lastShoeSize: 0,
        shoeSizeIncIN: null,
        shoeSizeIncOUT: null
      },
    ],
    [
      { frame: 0, start: [100, -20], stop: [100, 500], acc: 1.0 },
      { frame: 5, stop: [200, 500], acc: 1.0 },
      { frame: 400, stop: [300, 400], acc: 1.0 },
    ],
  ],
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  noStroke();
  //p5.disableFriendlyErrors = true;                          // #TODO if animation stutters
}

function draw() {
  if (isRunning) {
    background(0);

    vectorTranslator(walk);

    isRunning = !isRunning; // TODO remove #FREEZE_FRAME
    myFrame++;
  }
}

function mousePressed() {
  // #FREEZE_FRAME
  isRunning = !isRunning; // Toggle state
  if (isRunning) {
    loop(); // Resume draw()
  } else {
    noLoop(); // Stop draw()
  }
}

function vectorTranslator() {
  // -1- iterate through the names
  // -2- iterate through instructions
  // -3- iterate through feet

  // REFERENCE
  // walk[i][0]    name         / fred
  // walk[i][2][j] instructions / walk[i][2][j].frame  /  100
  // walk[i][1][k] foot         / walk[i][1][k].shoeSize  / 20

  for (let i = 0; i < walk.length; i++) {                                           // -i- NAMES

    for (let j = walk[i][2].length - 1; j >= 0; j--) {                              // -j- INSTRUCTIONS | reverse |
counter = j;
TEST123 = counter ; 
      if (myFrame >= walk[i][2][j].frame) {                                         // #TODO replace #FREEZE_FRAME

      // use the instructions that work with the current frame count
        for (let k = 0; k < walk[i][1].length; k++) {                               // -k- FEET

          // < PROCESS_INSTRUCTION >  done once per set of instructions
          if (myFrame === walk[i][2][j].frame) { 

            // the first position (start) for the foot
            if (walk[i][1][k].vectorLastPos) {
              // check if it exists already
              vectorStart = walk[i][1][k].vectorLastPos.copy();
            } else if (walk[i][2][j].start) {
              vectorStart = createVector(
                walk[i][2][j].start[0],
                walk[i][2][j].start[1]
              );

            } else {
              vectorStart = createVector(random(1, width), random(1, height));
            }
            // destination point
            vectorStop = createVector(
              walk[i][2][j].stop[0],
              walk[i][2][j].stop[1]
            );
            vectorLength = vectorStart.dist(vectorStop);
            fullStep = walk[i][1][k].shoeSize * walk[i][1][k].stride;

            // halfSteps absorb the remainder that the fullSteps can't use
            if ( vectorLength % fullStep >= fullStep / 1.5 ) {
              // the half step takes 1/2 the swing time
              halfStep = (vectorLength % fullStep) / 2;
            } else {
              // take a 1/2 step away from vector length and add it to the remainder
              halfStep = ((vectorLength % fullStep) + fullStep / 2) / 2;
            }

            framesToDraw = (vectorLength - halfStep * 2) / fullStep * walk[i][1][k].swingTime +
                             2 /* half-steps */ * walk[i][1][k].swingTime;

            // translate steps to vector increments
            // timing: 1 full step requires 1 full swing time (measured in frames)
            // half-step should be 1/2 swing time
            vectorFullStepInc = createVector( 
              ( vectorStop.x - vectorStart.x) / 
                fullStep, (vectorStop.y - vectorStart.y) / fullStep ).mult(1/walk[i][1][k].swingTime);
            vectorHalfStepInc = vectorFullStepInc.mult(halfStep / fullStep);

            // vector of apex to use in calculating circle size
            vectorApex = p5.Vector.lerp(
              vectorStart,
              vectorStop,
              walk[i][1][k].arcApex
            );

            // how to size a shoe
              arcFramesIN = walk[i][1][k].arcApex * framesToDraw; 
              arcFramesOUT = framesToDraw - arcFramesIN; 
              shoeSizeIncIN = 
                ( walk[i][1][k].shoeSize * walk[i][1][k].arcSize - walk[i][1][k].shoeSize ) / arcFramesIN ; 
              shoeSizeIncOUT = 
                ( walk[i][1][k].shoeSize - shoeSizeIncIN * arcFramesIN ) / arcFramesOUT ; 
        
            // pass to global for future use
            walk[i][1][k].vectorLastPos = vectorStart.copy(); 
            walk[i][1][k].vectorDestination = vectorStop.copy();
            walk[i][1][k].vectorFullStepInc = vectorFullStepInc.copy();
            walk[i][1][k].vectorHalfStepInc = vectorFullStepInc.copy(); // not calc'ing right
            walk[i][1][k].vectorApex = vectorApex.copy();
            walk[i][1][k].framesToDraw = framesToDraw;
            walk[i][1][k].framesCompleted = 0;
            walk[i][1][k].lastShoeSize = shoeSize; 
            walk[i][1][k].arcFramesIN = arcFramesIN;
            walk[i][1][k].arcFramesOUT = arcFramesOUT;
            walk[i][1][k].shoeSizeIncIN = shoeSizeIncIN;
            walk[i][1][k].shoeSizeIncOUT = shoeSizeIncOUT;

            // That should be all the stuff needed to draw
            } 
          // < / PROCESS_INSTRUCTION >
          
          // < DRAW >
          // draw every frame!
          // each full step takes 1 swing time
          // each half step takes 1 swing time
          // technically each leg should have its own custom timing
          // ie the strike leg waits for the swing leg - right now, each leg has same timing so it doesn't matter

          // calc position using vectors
          if ( walk[i][1][k].framesCompleted >= walk[i][1][k].framesToDraw || walk[i][1][k].phase != "swing" ) { 
                    // nothing to do but to redraw last position
                    vectorStart = walk[i][1][k].lastPos; } 
          else if ( walk[i][1][k].framesCompleted <= walk[i][1][k].swingTime || 
                    walk[i][1][k].framesCompleted >= walk[i][1][k].framesToDraw - walk[i][1][k].swingTime ) {
            // take half steps when in the first or last set of frames
            vectorStart = walk[i][1][k].vectorLastPos.add(walk[i][1][k].vectorHalfStepInc);
          } else {
            // take full steps for all other frames
            vectorStart = walk[i][1][k].vectorLastPos.add(walk[i][1][k].vectorFullStepInc);
          }

          // calc shoe size referencing frames 
          if ( walk[i][1][k].framesCompleted >= walk[i][1][k].framesToDraw ||
                    walk[i][1][k].phase != "swing" ) { 
                    // nothing to do but to redraw last position
                    shoeSize = walk[i][1][k].lastShoeSize; 
          } else if ( walk[i][1][k].framesCompleted <= walk[i][1][k].arcFramesIN ) {
                    shoeSize = walk[i][1][k].lastShoeSize + walk[i][1][k].shoeSizeIncIN ;  
          } else { 
                    shoeSize = walk[i][1][k].lastShoeSize + walk[i][1][k].shoeSizeIncOUT ; 
          }
          
    
// #######################################################################
console.log("myFrame: " + myFrame + "   test: " + TEST123 );
// ########################################################################

//          circle( vectorStart.x, vectorStart.y, shoeSize );

          // pass to global for future use 
          // walk[i][1][k].vectorLastPos = vectorStart.copy();
          walk[i][1][k].lastShoeSize = shoeSize;
          walk[i][1][k].framesCompleted++
          // < / DRAW >

        } } } } }
