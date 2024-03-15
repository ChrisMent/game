/**
 * Represents a coin object in the game, extending the MoveableObject class to inherit movement capabilities.
 */
class Coin extends MoveableObject {
  /**
   * Constructs a new coin instance.
   * @param {number} x - The initial x-coordinate of the coin.
   * @param {number} y - The initial y-coordinate of the coin.
   */
  constructor(x, y) {
    super(); // Calls the constructor of the MoveableObject class.
    this.loadImage("../game/img/8_coin/coin_1.png"); // Loads the coin image.
    this.height = 100; // Sets the height of the coin object.
    this.width = 100; // Sets the width of the coin object.
    this.x = x; // Sets the initial x-coordinate.
    this.y = y; // Sets the initial y-coordinate.
  }
}
