/**
 * Represents a background image in the game, extending MoveableObject to allow for potential movement (e.g., parallax effects).
 */
class BackgroundImage extends MoveableObject {
  /**
   * The width of the background image.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background image.
   * @type {number}
   */
  height = 480;

  /**
   * Creates an instance of a background image.
   * @param {string} imagePath - The path to the image file.
   * @param {number} x - The x-coordinate where the image should be placed.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
