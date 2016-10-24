class Game {
  constructor() {
    // Holds a timestamp indicating when the last tick occurred.
    // Initially set to null, indicating that no tick has taken place.
    this.time = null;

    // Holds the accumulative time remaining for physics steps.
    this.accumulator = 0.0;

    // Holds the size of a single timestep in milliseconds, in this
    // case we will perform around 60 steps per second.
    this.stepSize = 60 / 1;

    // Request an animation frame to invoke this.tick
    requestAnimationFrame(this.tick.bind(this));
  }

  step(deltaTime) {
    // ...
  }

  draw(deltaTime) {
    // ...
  }

  tick(time) {
      // requestAnimationFrame's callback gives a very high resolution
      // timestamp (DOMHighResTimeStamp) as an argument. The timestamp
      // is accurate to a microsecond so we no longer need, nor want to
      // call Date.now as it is only accurate to the millisecond.

      // On the first tick delta time should be 0.
    const deltaTime = time - (this.time || time);
    this.time = time;

    // Add delta time to our accumulator, iterate over the steps we
    // can do, and carry the leftovers over to the next frame.
    this.accumulator += this.deltaTime;
    while (this.accumulator >= this.stepSize) {
      this.step(this.stepSize);
      this.accumulator -= this.stepSize;
    }

    this.draw(deltaTime);

      // Request an animation frame to invoke this.tick again
    requestAnimationFrame(this.tick.bind(this));
  }
}
