/**
 * Represents a cloud in the game, extending the MoveableObject class to inherit movement capabilities.
 */
class Cloud extends MoveableObject {
  /**
   * Constructs a new cloud instance.
   * @param {number} xPosition - The initial x-coordinate of the cloud. Defaults to 0 if not specified.
   */
  constructor(xPosition = 0) {
    super(); // Calls the constructor of the MoveableObject class.
    this.loadImage("../game/img/5_background/layers/4_clouds/1.png"); // Loads the cloud image.
    this.x = xPosition; // Sets the initial x-coordinate.
    this.y = 30; // Sets the y-coordinate to place the cloud at a certain height.
    this.height = 200; // Sets the height of the cloud object.
    this.width = 350; // Sets the width of the cloud object.
    this.animate(); // Initiates cloud animation.
  }

  /**
   * Animates the cloud, moving it horizontally across the screen.
   */
  animate() {
    setInterval(() => {
      this.x -= 0.15; // Moves the cloud to the left.
      if (this.x < -this.width) {
        // Resets the cloud's position once it moves off screen to create a looping effect.
        this.x = 2400;
      }
    }, 1000 / 60); // Sets the interval based on a 60 frames per second animation.
  }
}
