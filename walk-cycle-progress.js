// TOP DOWN WALK CYCLES
// can circles look like they're walking?
// ----------------------------------------------
// using #FREEZE_FRAME while working on the code: 
// substitutes using myFrame in place of frameCount
// mouse click to advance frame by frame
let isRunning = false;
let myFrame = 0;
let test;

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
        drag: 0
      },
      {
        phase: "strike",
        shoeSize: 20,
        stride: 3,
        swingTime: 30,
        restTime: 0,
        arcSize: 0.9,
        arcApex: 1.2,
        drag: 0
      },
    ],
    [
      { frame: 0, start: [100,-20], stop: [100, 500], acc: 1.0 }, 
      { frame: 200, stop: [200, 500], acc: 1.0 }, 
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

    // -1- iterate through the names
    // -2- iterate through instructions backwards
    // -3- draw each foot
    // from standing, take 1/2 stride

    for (let i = 0; i < walk.length; i++) {                    // -1- iterate through names
      //console.log(walk[i][0]) /* returns name */
      for (let j = walk[i][2].length - 1; j >= 0; j--) {       // -2- rev iterate to target frame
        if (myFrame >= walk[i][2][j].frame) {                  // REMOVE #FREEZE_FRAME 
          //console.log(walk[i][2][j].stop[0]); /* xPos for stopping */
          for ( let k = walk[i][1].length - 1; k >= 0; k--) {
            console.log(walk[i][1][k]); /* object containing FOOT params */
            
            // need start and end points - but they aint' so obvious
            
            if ( walk[i][2][j].start ) {
                POS0 = walk[i][2][j].start
                test = test + "   Positon 0: " + POS0; 
                } else {
                  pos0 = createVector( walk[i][1][j].start[0], walk[i][2][j].start[1] ); 
                  pos1 = createVector( walk[i][2][j].stop[0], walk[i][2][j].stop[1] );  
                }
            
            

            
            test = test + "    Vector distance: " + pos0.dist(pos1);
            // 520px length with a 60px stride
            // that's 8 full strides (8 full cycles of each leg) - TODO allow for more legs
            // with 0.66 remainder - almost 40 pixels
            // starting & stopping require a partial-steps to even up the feet
            // divide the remainder in two and use at start & stop
            // TODO allow for ease-in & ease-out

            
            
            
            
            
            console.log(test);
            
            
          }
          j = -1;                                              // TODO for empty array (low)
        }
      }
    }

    isRunning = !isRunning;                                    // #FREEZE_FRAME
    myFrame++;
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
