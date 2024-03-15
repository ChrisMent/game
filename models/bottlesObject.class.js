/**
 * Represents a bottle object in the game, extending the MoveableObject class to inherit movement capabilities.
 */
class Bottle extends MoveableObject {
  /**
   * Constructs a new bottle instance.
   * @param {number} x - The initial x-coordinate of the bottle.
   */
  constructor(x) {
    super(); // Calls the constructor of the MoveableObject class.
    // Initialization and property setting is done below:
    this.loadImage("../game/img/6_salsa_bottle/1_salsa_bottle_on_ground.png"); // Loads the bottle image.
    this.height = 70; // Sets the height of the bottle object.
    this.width = 60; // Sets the width of the bottle object.
    this.x = x; // Sets the initial x-coordinate.
    this.y = 356; // Sets the initial y-coordinate to place the bottle on the ground.
  }
}
