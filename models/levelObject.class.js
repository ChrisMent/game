/**
 * Represents a level in the game, containing all entities such as enemies, clouds, background objects, and collectibles.
 */
class Level {
  /**
   * The enemies present in the level.
   * @type {Enemy[]}
   */
  enemies;

  /**
   * The clouds present in the level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * The background objects present in the level, such as trees and mountains.
   * @type {BackgroundObject[]}
   */
  backgroundObjects;

  /**
   * X coordinate marking the end of the level. Used to determine when the level is completed.
   * @type {number}
   */
  level_end_x = 2200;

  /**
   * Constructs a new instance of the Level class.
   * @param {Enemy[]} enemies - Array of enemies in the level.
   * @param {GroundBottle[]} groundBottles - Array of ground bottles in the level.
   * @param {Cloud[]} clouds - Array of clouds in the level.
   * @param {BackgroundObject[]} backgroundObjects - Array of background objects in the level.
   * @param {Coin[]} coins - Array of coins in the level.
   */
  constructor(enemies, groundBottles, clouds, backgroundObjects, coins) {
    this.enemies = enemies;
    this.groundBottles = groundBottles; // Bottles placed on the ground as collectibles.
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins; // Collectible items in the level.
  }
}
