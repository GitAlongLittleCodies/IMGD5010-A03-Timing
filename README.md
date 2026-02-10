<p align="center">Todd Stewart &bull; 2026 FEB 10</p>

# IMGD 5010 &bull; Assignment 03: Timing

### Submission
1. **Sketch Only:** [Spirals -public-](https://editor.p5js.org/GitAlongLittleCodies/full/z9RrUgW7l)
2. **P5 code:** [Spirals -public-](https://editor.p5js.org/GitAlongLittleCodies/full/z9RrUgW7l)

### What inspired me:

1. Don Hertzfeldt's [The Meaning of Life](https://youtu.be/qz9NTMtXV70?si=qUfdHb4B35B2f6Le&t=71)
   * The walk cycles that begin at 1:11 are the specific point of inspiration.
   * Even more specifically, I wanted to reproduce the ability to identify a single walk cycle that's surrounded by a sea of walk cycles.
   * I love this comment on the YouTube page & have to share
> I had a girl come into my life around this time last year, show me your movie, make me fall madly in love with her and then leave all in the span of like two months, so I may be biased when I say your work is more impactful than it should be but I stand by that statement even so

2. [FRAME COUNT AND TIMING](https://editor.p5js.org/jeffThompson/sketches/rrssQYach)
    * I arrived at this resource looking to learn about frames, I left remembering how, when stuck in traffic, I am fascinated with how blinkers on a line of cars will sync together in a single blink once in a while.

### Summary

1. Top-Down Walk Cycle Animation - failed attempt -
    * I couldn't complete what I really wanted to do: Build a "walk cycle machine" that would read properties about a set of "feet" with an additional set of instructions to perform.
    * The feet would be represented as a top-down view of a walk cycle. You would see a set of circles, the feet, moving across the canvas.
    * One "foot" would remain planted while the other moved.
    * Each set of feet would have their own "personality" - such as shoe size, stride length, etc
    * The effort requried a skillset slightly above my ability.
    * I abandoned the code when I realized that I needed to set up my data differently -and- look at using classes.
    * I learned all about vectors, digging deep into nested arrays, and counting frames in P5js

2. Spiral Circles - success -
    * My submission titled, [Spirals - public -](https://editor.p5js.org/GitAlongLittleCodies/full/z9RrUgW7l), rests on the timing I was exposed to in FRAME COUNT TIMING mentioned above.
    * Like the line of cars with their turns signals on, I wanted to observe circles on randomly timed cycle sizes, go in and out of sync. 
      - Writing this out, I see now I should have declared the frame rate in the setup()... maybe?
    * Add to that, it would be cool if the undulating circles also operated in another system - like draining.
    * Combine the two and that's the code.

### DEFENSE OF TIMING

3. Where's the score? Great question!
   * I argue that it's buried in how the circles synchronize.
   * That is:
     * When you watch Spirals, the circles repeat in uniquely identifiable ways - like actors. 
     * These actor-circles are at most times asynchronous thus building tension - like plot.
     * As the circles spin from the outside-in, they collide and have minor moments of synchronous timing - like plot points.
     * Finally, if you watch long enough, it will all come together in a single moment at the center of the screen - the climax.
     * Then they'll repeat all over again.
     * This only happens because they all cycle at the same frame rate. It's as pre-destinate that they'll eventually meet in a climax as certain as if I wrote the script verbatim. 

There's actually a whole bunch more I'd want to try but this one is getting submitted now. 
