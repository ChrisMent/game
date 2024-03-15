/**
 * Represents a chicken enemy in the game that extends from MoveableObject.
 */
class Chicken extends MoveableObject {
  /**
   * Paths to the images used for the walking animation of the chicken.
   */
  IMAGES_WALKING = [
    "../game/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../game/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../game/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  /**
   * Path to the image used when the chicken dies.
   */
  IMAGE_DEATH = "../game/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
   * Constructor for the chicken enemy.
   * Initializes the chicken with default properties and starts its animation.
   */
  constructor() {
    super().loadImage(
      "../game/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.chicken_death_sound = new Audio("../game/audio/chicken-death.mp3");
    SoundManager.addSound(this.chicken_death_sound);
    this.x = 120 + Math.random() * (1800 - 120 - 50);
    this.y = 370;
    this.height = 50;
    this.width = 50;
    this.speed = 0.75 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Initiates the chicken's movement and animation intervals.
   */
  animate() {
    this.movingRight = false;
    this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
    this.animationInterval = setInterval(() => this.handleAnimation(), 200);
  }

  /**
   * Handles the chicken's movement logic, including changing directions.
   */
  handleMovement() {
    if (this.maxRangeLeft()) {
      this.movingRight = true;
    }
    if (this.maxRangeRight()) {
      this.movingRight = false;
    }
    if (this.movingRight) {
      this.moveRight();
      this.otherDirection = true;
    } else {
      this.moveLeft();
      this.otherDirection = false;
    }
  }

  /**
   * Checks if the chicken has reached the maximum left range it can move to.
   * @returns {boolean} True if the chicken is at the left boundary.
   */
  maxRangeLeft() {
    return this.x <= 120;
  }

  /**
   * Checks if the chicken has reached the maximum right range it can move to.
   * @returns {boolean} True if the chicken is at the right boundary.
   */
  maxRangeRight() {
    return this.x >= 1800;
  }

  /**
   * Plays the chicken's walking animation.
   */
  handleAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Plays the chicken's death animation and sound, then removes it from the game.
   */
  playDeathAnimation() {
    this.loadImage(this.IMAGE_DEATH);
    this.chicken_death_sound.play();
    setTimeout(() => {
      this.removeFromGame = true;
    }, 1000);
  }

  /**
   * Handles what happens when the chicken collides with a thrown bottle.
   * @param {number} bottleIndex - The index of the bottle in the bottles array.
   * @param {Array} bottles - The array containing all thrown bottles.
   */
  handleCollisionWithBottle(bottleIndex, bottles) {
    this.playDeathAnimation();
    bottles.splice(bottleIndex, 1);
  }
}
