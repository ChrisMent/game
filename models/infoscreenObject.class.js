/**
 * Represents an information screen in the game.
 */
class InfoScreen {
  /**
   * Indicates whether the information screen is visible.
   * @type {boolean}
   */
  isVisible = false;

  /**
   * Draws the information screen on the canvas context if it's visible.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the information screen should be drawn.
   */
  draw(ctx) {
    if (this.isVisible) {
      // Drawing logic would be placed here.
    }
  }
}
