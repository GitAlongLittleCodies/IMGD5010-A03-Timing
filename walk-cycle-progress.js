// TOP DOWN WALK CYCLES
// can circles look like they're walking?
// ----------------------------------------------
// using #FREEZE_FRAME while working on the code: 
// substitutes using myFrame in place of frameCount
// mouse click to advance frame by frame
let isRunning = false;
let myFrame = 0;
let vect00, vect01;

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
        arcApex: 1.2,
        drag: 0,
        lastX: 1,
        lastY: 1
      },
      {
        phase: "strike",
        shoeSize: 20,
        stride: 3,
        swingTime: 30,
        restTime: 0,
        arcSize: 0.9,
        arcApex: 1.2,
        drag: 0,
        lastX: 1,
        lastY: 1
      }
    ],
    [
      { frame: 0, start:[100, -20], stop: [100, 500], acc: 1.0 }, 
      { frame: 200, stop: [200, 500], acc: 1.0 }, 
      { frame: 400, stop: [300, 400], acc: 1.0 }, 
    ]
  ],
  [
    "barney",
    [
      {
        phase: "swing",
        shoeSize: 20,
        stride: 3,
        swingTime: 30,
        restTime: 0,
        arcSize: 0.9,
        arcApex: 1.2,
        drag: 0,
        lastX: 1,
        lastY: 1
      },
      {
        phase: "strike",
        shoeSize: 20,
        stride: 3,
        swingTime: 30,
        restTime: 0,
        arcSize: 0.9,
        arcApex: 1.2,
        drag: 0,
        lastX: 1,
        lastY: 1
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
            // determine start point - if it isn't set in instructions, use last postion
            if ( walk[i][2][j].start ) { 
                  vect00 = createVector( walk[i][2][j].start[0], walk[i][2][j].start[1] );
                } else { // use existing
                  vect00 = createVector(walk[i][1][k].lastX,walk[i][1][k].lastY);
                }


            // destination point
            vect01 = createVector( walk[i][2][j].stop[0], walk[i][2][j].stop[1] );  
            
            stroke(255)
            line(vect00.x, vect00.y, vect01.x, vect01.y);            
            
            // 1 stride = 1 foot step = 1/2 one full walk cycle
            // 520px length with a 60px stride | 520 / 60 = 8.6666
            // 8 strides = 4 steps Swing foot and 4 steps with Strike foot
            // 40 pixels remaining (0.666) can be used for the in and out 1/2 steps
            // if there was no remainder, use 1 stride and divide it to the in/out
            // in step = 20px | increment steps = 30 - as set | out step = 20
            
            // Set increments for this and future draws
            // pretend stuff
            let inc = createVector ( 
              (vect01.x-vect00.x)/walk[i][1][k].swingTime, 
              (vect01.y-vect00.y)/walk[i][1][k].swingTime
            )
            
            vect00 = vect00.add(inc);
            
            circle(vect00.x, vect00.y, 25)

            
            
// #############################################
// CONSOLE LOG
   console.log(
     walk[i][0] + 
     "  start: " + vect00.x + "," + vect00.y + 
     "  vectDist: " + round(vect00.dist(vect01)) + 
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
