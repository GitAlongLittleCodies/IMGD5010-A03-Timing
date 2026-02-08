// TOP DOWN WALK CYCLES
// can circles look like they're walking?
// ----------------------------------------------
// using #FREEZE_FRAME while working on the code:
// substitutes using myFrame in place of frameCount
// mouse click to advance frame by frame
let isRunning = false;
let myFrame = 0;

let vectorStart,
  vectorStop,
  vectorLength,
  fullStep,
  halfStep,
  framesToDraw,
  shoeSize;
let TEST123 = "";
let counter = 0;

let json = {
  walk: [
    {
      name: "fred",
      feet: [
        {
          foot: 1,
          phase: "swing",
          shoeSize: 20,
          stride: 3,
          swingTime: 30,
          restTime: 0,
          arcSize: 0.9,
          arcApex: 0.7,
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
          shoeSizeIncOUT: null,
        },
        {
          foot: 2,
          phase: "strike",
          stride: 3,
          shoeSize: 20,
          swingTime: 30,
          restTime: 0,
          arcSize: 0.9,
          arcApex: 0.7,
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
          shoeSizeIncOUT: null,
        },
      ],
      instr: [
        { frame: 0, start: [100, -20], stop: [100, 500], acc: 1.0 },
        { frame: 200, stop: [200, 500], acc: 1.0 },
        { frame: 400, stop: [300, 400], acc: 1.0 },
      ],
    },
  ],
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  noStroke();
  //p5.disableFriendlyErrors = true;                          // #TODO if animation stutters
}

function draw() {
  if (isRunning) {
    background(0);

    vectorTranslator(json.walk);

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
  // json.walk[i].name
  // json.walk[i].instr[j].stop
  // json.walk[i].feet[k].phase
  // json.walk[i].instr.length
  
  // <i> NAMES
  for (let i = 0; i < json.walk.length; i++) {

    // <j> INSTRUCTIONS, reverse iteration
    for (let j = json.walk[i].instr.length - 1; j >= 0; j--) {
      if (myFrame >= json.walk[i].instr[j].frame) {                         // #TODO - replace myFrame
        // <k> FEET
        for (let k = 0; k < json.walk[i].feet.length; k++) {
        // < PROCESS_INSTRUCTION >  done only once per new set of instructions
          
          // the origin vector, the vectorStart
          if (myFrame === json.walk[i].instr[j].frame) {
            // new cycle, new calcs
            if (json.walk[i].feet[k].vectorLastPos) { // if exists...
              vectorStart = json.walk[i].feet[k].vectorLastPos.copy();
            } else if (json.walk[i].instr[j].start) {
              vectorStart = createVector(
                json.walk[i].instr[j].start[0],
                json.walk[i].instr[j].start[1]
              );
            } else {
              vectorStart = createVector(random(1, width), random(1, height));
            } }

           // destination point
            vectorStop = createVector(
              json.walk[i].instr[j].stop[0],
              json.walk[i].instr[j].stop[1]
            );
            vectorLength = vectorStart.dist(vectorStop);
            fullStep = json.walk[i].feet[k].shoeSize * json.walk[i].feet[k].stride;        
          
            // halfSteps absorb the remainder that the fullSteps can't use
            if (vectorLength % fullStep >= fullStep / 1.5) {
              // the half step takes 1/2 the swing time
              halfStep = (vectorLength % fullStep) / 2;
            } else {
              // take a 1/2 step away from vector length and add it to the remainder
              halfStep = ((vectorLength % fullStep) + fullStep / 2) / 2;
            }
          
            framesToDraw =
              ((vectorLength - halfStep * 2) / fullStep) *
                json.walk[i].feet[k].swingTime +
              2 /* half-steps */ * json.walk[i].feet[k].swingTime;
          
          
            // translate steps to vector increments
            // timing: 1 full step requires 1 full swing time (measured in frames)
            // half-step should be 1/2 swing time
            vectorFullStepInc = createVector(
              (vectorStop.x - vectorStart.x) / fullStep,
              (vectorStop.y - vectorStart.y) / fullStep
            ).mult(1 / json.walk[i].feet[k].swingTime);
            vectorHalfStepInc = vectorFullStepInc.mult(halfStep / fullStep);

            // vector of apex to use in calculating circle size
            vectorApex = p5.Vector.lerp(
              vectorStart,
              vectorStop,
              json.walk[i].feet[k].arcApex
            );
          
            // how to size a shoe
            arcFramesIN = json.walk[i].feet[k].arcApex * framesToDraw;
            arcFramesOUT = framesToDraw - arcFramesIN;
            shoeSizeIncIN =
              (json.walk[i].feet[k].shoeSize * json.walk[i].feet[k].arcSize -
                json.walk[i].feet[k].shoeSize) / arcFramesIN;
            shoeSizeIncOUT =
              (json.walk[i].feet[k].shoeSize - shoeSizeIncIN * arcFramesIN) / arcFramesOUT;

          
            // pass to global for future use
            json.walk[i].feet[k].vectorLastPos = vectorStart.copy();
            json.walk[i].feet[k].vectorDestination = vectorStop.copy();
            json.walk[i].feet[k].vectorFullStepInc = vectorFullStepInc.copy();
            json.walk[i].feet[k].vectorHalfStepInc = vectorFullStepInc.copy(); 
            json.walk[i].feet[k].vectorApex = vectorApex.copy();
            json.walk[i].feet[k].framesToDraw = framesToDraw;
            json.walk[i].feet[k].framesCompleted = 0;
            json.walk[i].feet[k].lastShoeSize = shoeSize;
            json.walk[i].feet[k].arcFramesIN = arcFramesIN;
            json.walk[i].feet[k].arcFramesOUT = arcFramesOUT;
            json.walk[i].feet[k].shoeSizeIncIN = shoeSizeIncIN;
            json.walk[i].feet[k].shoeSizeIncOUT = shoeSizeIncOUT;

            // That should be all the stuff needed to draw
          
          console.log(json.walk[i].feet[k].shoeSizeIncOUT);
          // < / PROCESS_INSTRUCTION >
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
        }// </k> FEET
      }// <if> getting new instruction
    }// </j> INSTR
  }// </i> NAME
}// end function
