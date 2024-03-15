/**
 * Represents a wrapper around keyboard input for controlling game actions.
 */
class KeyboardObject {
  /**
   * Indicates whether the move right action is active.
   * @type {boolean}
   */
  moveRight = false;

  /**
   * Indicates whether the move left action is active.
   * @type {boolean}
   */
  moveLeft = false;

  /**
   * Indicates whether the space bar is pressed for jumping.
   * @type {boolean}
   */
  pushSpace = false;

  /**
   * Indicates whether the enter key is pressed for throwing a bottle.
   * @type {boolean}
   */
  throwBottle = false;

  /**
   * Handles key down events and activates the corresponding action.
   * @param {KeyboardEvent} event - The keyboard event.
   */
  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      this.moveLeft = true;
    } else if (event.key === "ArrowRight") {
      this.moveRight = true;
    } else if (event.key === " ") {
      this.pushSpace = true;
    } else if (event.key === "Enter") {
      this.throwBottle = true;
    }
  }

  /**
   * Handles key up events and deactivates the corresponding action.
   * @param {KeyboardEvent} event - The keyboard event.
   */
  handleKeyUp(event) {
    if (event.key === "ArrowLeft") {
      this.moveLeft = false;
    } else if (event.key === "ArrowRight") {
      this.moveRight = false;
    } else if (event.key === " ") {
      this.pushSpace = false;
    } else if (event.key === "Enter") {
      this.throwBottle = false;
    }
  }

  /**
   * Associates a touchscreen button with a specific keyboard action.
   * @param {string} buttonId - The DOM id of the button.
   * @param {string} action - The action to be triggered.
   */
  activateButton(buttonId, action) {
    const button = document.getElementById(buttonId);
    button.addEventListener("touchstart", () => (this[action] = true));
    button.addEventListener("touchend", () => (this[action] = false));
  }
}
