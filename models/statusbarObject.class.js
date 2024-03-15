/**
 * Represents a status bar in the game, used for displaying various status indicators like health, bottles collected, etc.
 * @extends DrawableObject
 */
class Statusbar extends DrawableObject {
  /**
   * Number of bottles collected, relevant if this status bar displays bottles.
   * @type {number}
   */
  collectedBottles = 0;

  /**
   * Number of coins collected, relevant if this status bar displays coins.
   * @type {number}
   */
  collectedCoins = 0;

  /**
   * Constructs a new instance of the Statusbar.
   * @param {number} x - The x-coordinate for the status bar's position.
   * @param {number} y - The y-coordinate for the status bar's position.
   * @param {number} width - The width of the status bar.
   * @param {number} height - The height of the status bar.
   * @param {string} type - The type of the status bar (e.g., "life", "bottle", "coin", "endboss").
   */
  constructor(x, y, width, height, type) {
    super(); // Calls the constructor of the DrawableObject class.
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // Determines the type of status bar and the related icon to load.

    // Loads an icon image based on the type of the status bar.
    if (type === "life") {
      this.loadImage("../game/img/7_statusbars/3_icons/icon_health.png");
    } else if (type === "bottle") {
      this.loadImage("../game/img/7_statusbars/3_icons/icon_salsa_bottle.png");
    } else if (type === "coin") {
      this.loadImage("../game/img/7_statusbars/3_icons/icon_coin.png");
    } else if (type === "endboss") {
      this.loadImage(
        "../game/img/7_statusbars/3_icons/icon_health_endboss.png"
      );
    }
  }

  /**
   * Updates the status bar to reflect the number of bottles collected.
   * @param {number} count - The number of bottles collected.
   */
  showCollectedBottles(count) {
    this.collectedBottles = count;
  }

  /**
   * Updates the status bar to reflect the number of coins collected.
   * @param {number} count - The number of coins collected.
   */
  showCollectedCoins(count) {
    this.collectedCoins = count;
  }
}
