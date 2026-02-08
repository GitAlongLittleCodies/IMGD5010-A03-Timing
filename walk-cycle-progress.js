// TOP DOWN WALK CYCLES
// can circles look like they're walking?
// ----------------------------------------------
// using #FREEZE_FRAME while working on the code:
// substitutes using myFrame in place of frameCount
// mouse click to advance frame by frame
let isRunning = false;
let myFrame = 0;
let vectorStart, vectorStop, vectorLength, fullStep, halfStep, totalSteps;

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
        vectorApex: null,
        totalSteps: 0,
        stepCount: 0,
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
        vectorApex: null,
        totalSteps: 0,
        stepCount: 0,
      },
    ],
    [
      { frame: 0, start: [100, -20], stop: [100, 500], acc: 1.0 },
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

    vectorTranslator(walk);

    vectorStart = vectorStart.add(vectorFullStep);

    circle(vectorStart.x, vectorStart.y, 25);

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

  for (let i = 0; i < walk.length; i++) {
    // -i- NAMES
    for (let j = walk[i][2].length - 1; j >= 0; j--) {
      // -j- INSTRUCTIONS | reverse |

      if (myFrame >= walk[i][2][j].frame) {
        // #TODO replace #FREEZE_FRAME

        for (let k = 0; k < walk[i][1].length; k++) {
          // -k- FEET

          // < NEW_INSTRUCTION > what to do when New Instructions are encountered
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

            // half steps - one at the start & one at the end
            if (vectorLength % fullStep >= fullStep / 1.25) {
              // aesthetically, half-steps shouldn't be too short
              halfStep = (vectorLength % fullStep) / 2;
            } else {
              // take a 1/2 step away from vector length and add it to the remainder
              halfStep = ((vectorLength % fullStep) + fullStep / 2) / 2;
            }

            totalSteps = ((vectorLength - halfStep * 2) % fullStep) + 2;

            // translate steps to vector increments
            vectorFullStep = createVector(
              (vectorStop.x - vectorStart.x) / walk[i][1][k].swingTime,
              (vectorStop.y - vectorStart.y) / walk[i][1][k].swingTime
            );
            vectorHalfStep = vectorFullStep.mult(halfStep / fullStep);

            // vector of apex to use in calculating circle size
            vectorApex = p5.Vector.lerp(
              vectorStart,
              vectorStop,
              walk[i][1][k].arcApex
            );

            // pass to global for future use
            walk[i][1][k].vectorLastPos = vectorStart.copy();
            walk[i][1][k].vectorDestination = vectorStop.copy();
            walk[i][1][k].vectorFullStep = vectorFullStep.copy();
            walk[i][1][k].vectorHalfStep = vectorFullStep.copy();
            walk[i][1][k].vectorApex = vectorApex.copy();
            walk[i][1][k].totalSteps = totalSteps;
            walk[i][1][k].stepCount = 0;
            // That should be all the stuff needed to draw
          }
          // < / NEW_INSTRUCTION >

          // < FOLLOWING_INSTRUCTION >
          else if (walk[i][1][k].lastPos) {
            if (
              walk[i][1][k].stepCount === 0 ||
              walk[i][1][k].stepCount === walk[i][1][k].totalSteps - 1
            ) {
              // first step or last step, take half step
              vectorStart = walk[i][1][k].lastPos.add(
                walk[i][1][k].vectorHalfStep
              );
            } else {
              // take a full step
              vectorStart = walk[i][1][k].lastPos.add(
                walk[i][1][k].vectorFullStep
              );
            }
            
            circle(vectorStart.x, vectorStart.y, 25);
          }

          // #############################################
          // CONSOLE LOG
          console.log(
            walk[i][0] +
              "  start: " +
              round(vectorStart.x) +
              "," +
              round(vectorStart.y) +
              "  len: " +
              vectorLength +
              "  phase: " +
              walk[i][1][k].phase
          );
        }

        j = -1; // TODO for empty array (low)
      }
    }
  }
}
