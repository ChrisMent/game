/**
 * Represents the start screen of the game, extending DrawableObject to use its rendering capabilities.
 */
class StartScreen extends DrawableObject {
  /**
   * Controls the visibility of the start screen.
   * @type {boolean}
   */
  isVisible = true;

  /**
   * Width of the start screen.
   * @type {number}
   */
  width = 720;

  /**
   * Height of the start screen.
   * @type {number}
   */
  height = 480;

  /**
   * Path to the start screen image.
   * @type {string}
   */
  startScreenPath = "../game/img/9_intro_outro_screens/start/startscreen_1.png";

  /**
   * Constructs the StartScreen object by loading the start screen image and setting its initial position.
   */
  constructor() {
    super();
    this.loadImage(this.startScreenPath);
    this.x = 0;
    this.y = 0;
  }

  /**
   * Toggles the visibility of the start screen.
   */
  toggleStartScreen() {
    this.isVisible = !this.isVisible;
  }
}
