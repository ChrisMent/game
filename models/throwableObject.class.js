/**
 * Represents an object that can be thrown by the player, such as a bottle.
 * Extends MoveableObject to inherit movement capabilities like gravity.
 */
class throwAbleObject extends MoveableObject {
  /**
   * The number of bottles collected, relevant if managing inventory or similar mechanics.
   * @type {number}
   */
  collectedBottles = 0;

  /**
   * Constructs a new throwable object instance.
   * @param {number} x - The initial x-coordinate where the object is created.
   * @param {number} y - The initial y-coordinate where the object is created.
   */
  constructor(x, y) {
    super(); // Call the parent class constructor.
    // Load the image for the throwable object.
    this.loadImage("../game/img/6_salsa_bottle/2_salsa_bottle_on_ground.png");

    // Initialize position and size of the object.
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;

    // Execute throw behavior to launch the object.
    this.throw();
  }

  /**
   * Defines the throw behavior of the object, setting initial speeds and applying gravity.
   */
  throw() {
    this.speedY = 35; // Set the initial vertical speed for the throw.
    this.speedX = 0; // The horizontal speed can be adjusted here if needed.
    this.applyGravity(); // Apply gravity to the object to make it fall.

    // Set an interval to continuously update the object's horizontal position.
    setInterval(() => {
      this.x += 10; // Move the object horizontally.
    }, 25);
  }
}
