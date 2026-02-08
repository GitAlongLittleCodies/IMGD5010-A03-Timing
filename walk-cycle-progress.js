// TOP DOWN WALK CYCLES
// can circles look like they're walking?
// ----------------------------------------------
// using #FREEZE_FRAME while working on the code: 
// substitutes using myFrame in place of frameCount
// mouse click to advance frame by frame
let isRunning = false;
let myFrame = 0;
let vectorStart, vectorStop, vectorLength , fullStep, halfStep;

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
        arcApex: 0.7,
        drag: 0,
        vectorLastPos: null,
        vectorDestination: null,
        vectorFullStep: null, 
        vectorHalfStep: null,
        vectorApex: null
      },
      {
        phase: "strike",
        shoeSize: 20,
        stride: 3,
        swingTime: 30,
        restTime: 0,
        arcSize: 0.9,
        arcApex: 0.7,
        drag: 0,
        vectorLastPos: null,
        vectorDestination: null,
        vectorFullStep: null, 
        vectorHalfStep: null,
        vectorApex: null
      }
    ],
    [ 
      { frame: 0, start:[100, -20], stop: [100, 500], acc: 1.0 }, 
      { frame: 200, stop: [200, 500], acc: 1.0 }, 
      { frame: 400, stop: [300, 400], acc: 1.0 }, 
    ]
  ]
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

    // -1- iterate through the names
    // -2- iterate through instructions backwards
    // -3- draw each foot
    // from standing, take 1/2 stride
    
    // REFERENCE
    // walk[i][0] name
    // walk[i][2][j] instructions / walk[i][2][j].frame 
    // walk[i][1][k] foot         / walk[i][1][k].shoeSize
 

    for (let i = 0; i < walk.length; i++) {                      // -i- NAMES 
      for (let j = walk[i][2].length - 1; j >= 0; j--) {         // -j- INSTRUCTIONS | reverse |

        if (myFrame >= walk[i][2][j].frame) {                    // #TODO replace #FREEZE_FRAME

          for ( let k = 0; k < walk[i][1].length; k++) {         // -k- FEET 

            
            if ( myFrame === walk[i][2][j].frame ) {             // NEW INSTRUCTION
                
                // establish the start vector
                if ( walk[i][1][k].vectorLastPos ) { // check for last postion
                  vectorStart = walk[i][1][k].vectorLastPos.copy();
                } else if ( walk[i][2][j].start ) {  
                  vectorStart = createVector( walk[i][2][j].start[0], walk[i][2][j].start[1] ); 
                } else {
                  vectorStart = createVector( random(1,width), random(1,height) )
                }
            
                  vectorStop = createVector( walk[i][2][j].stop[0], walk[i][2][j].stop[1] );   // destination point
                  vectorLength = vectorStart.dist(vectorStop); 
                  fullStep = walk[i][1][k].shoeSize * walk[i][1][k].stride;
                  
                  // half steps, need 2, one at start & one at end
                  if ( vectorLength % fullStep >= fullStep / 1.25 ) { // aesthetically, half-steps shouldn't be too short
                    halfStep = ( vectorLength % fullStep ) / 2 ;  
                  } else { // take a 1/2 step away from vectorDist and add it to the remainder 
                    halfStep = ( ( vectorLength % fullStep ) + fullStep/2 ) / 2 ;  
                  }
              
                  // translate that to vector increments
                  vectorFullStep = createVector ( 
                              (vectorStop.x-vectorStart.x)/walk[i][1][k].swingTime, 
                              (vectorStop.y-vectorStart.y)/walk[i][1][k].swingTime );
                  vectorHalfStep = vectorFullStep.mult(halfStep/fullStep);
              
                  // apex for circle size
                  apexLength = walk[i][1][k].arcApex * vectorLength/2; // where the apex happens
                  vectorApex = createVector (
                              ()
                  )
              
              
                  // pass to global for future use
                  walk[i][1][k].vectorLastPos = vectorStart.copy(); 
                  walk[i][1][k].vectorDestination = vectorStop.copy(); 
                  walk[i][1][k].vectorFullStep = vectorFullStep.copy();
                  walk[i][1][k].vectorHalfStep = vectorFullStep.copy();
              
                  // That should be all the stuff needed to draw
              
              
              
              
              
              
              
              
              
              
              
              
              
            
          }

            
           
            
            // 1 stride = 1 foot step = 1/2 one full walk cycle
            // 520px length with a 60px stride | 520 / 60 = 8.6666
            // 8 strides = 4 steps Swing foot and 4 steps with Strike foot
            // 40 pixels remaining (0.666) can be used for the in and out 1/2 steps
            // if there was no remainder, use 1 stride and divide it to the in/out
            // in step = 20px | increment steps = 30 - as set | out step = 20
            
            
            vectorStart = vectorStart.add(vectorFullStep);
            
            circle(vectorStart.x, vectorStart.y, 25)

            
            
// #############################################
// CONSOLE LOG
   console.log(
     walk[i][0] + 
     "  start: " + round(vectorStart.x) + "," + round(vectorStart.y) + 
     "  len: " + vectorLength + 
     "  phase: " + walk[i][1][k].phase);
            
          }
          
          j = -1;                                              // TODO for empty array (low)
          
        }
      }
    }

    isRunning = !isRunning;                                    // TODO remove #FREEZE_FRAME
    myFrame++;
    TEST123="";
  }
}

function mousePressed() {                                      // #FREEZE_FRAME
  isRunning = !isRunning; // Toggle state
  if (isRunning) {
    loop(); // Resume draw()
  } else {
    noLoop(); // Stop draw()
  }
}
