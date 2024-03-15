/**
 * Represents the chicken babies enemies in the game, extending MoveableObject.
 */
class ChickenBabies extends MoveableObject {
  /**
   * Image paths for the walking animation of chicken babies.
   */
  IMAGES_WALKING = [
    "../game/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../game/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../game/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Image path for the death state of chicken babies.
   */
  IMAGE_DEATH = "../game/img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  /**
   * Constructor for ChickenBabies. Initializes the object with default values, loads images, and sets properties.
   */
  constructor() {
    super().loadImage(
      "../game/img/3_enemies_chicken/chicken_small/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.chicken_death_sound = new Audio("../game/audio/chicken-death.mp3");
    SoundManager.addSound(this.chicken_death_sound);
    this.x = 120 + Math.random() * (1800 - 120 - 50);
    this.y = 370;
    this.onGround = true;
    this.height = 50;
    this.width = 50;
    this.speed = 0.75 + Math.random() * 0.25;
    this.applyGravity();
    this.gravityInterval = setInterval(() => {
      this.applyGravity();
      this.checkOnGround();
    }, 20);
    this.animate();
  }

  /**
   * Starts the animation loops for movement, regular animation, and random hops.
   */
  animate() {
    this.movingRight = false;
    this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
    this.animationInterval = setInterval(() => this.handleAnimation(), 200);
    this.hopInterval = setInterval(() => this.randomHop(), 3000);
  }

  /**
   * Handles the movement logic for the chicken babies, determining their direction and moving them accordingly.
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
   * Checks if the chicken baby has reached the maximum left boundary.
   * @returns {boolean} Whether the chicken baby is at the max left range.
   */
  maxRangeLeft() {
    return this.x <= 120;
  }

  /**
   * Checks if the chicken baby has reached the maximum right boundary.
   * @returns {boolean} Whether the chicken baby is at the max right range.
   */
  maxRangeRight() {
    return this.x >= 1800;
  }

  /**
   * Determines if the chicken baby is above the ground.
   * @returns {boolean} Whether the chicken baby is above the ground.
   */
  isAboveGround() {
    return this.y < 370;
  }

  /**
   * Causes the chicken baby to perform a random hop.
   */
  randomHop() {
    if (this.onGround && Math.random() < 0.99) {
      this.speedY = 20;
      this.onGround = false;
      this.isInAir = true;
    }
  }

  /**
   * Checks if the chicken baby is on the ground and resets its state if so.
   */
  checkOnGround() {
    if (this.y >= 370) {
      this.onGround = true;
      this.y = 370;
      this.speedY = 0;
      this.isInAir = false;
    }
  }

  /**
   * Applies gravity to the chicken baby, affecting its vertical speed and position.
   */
  applyGravity() {
    if (!this.onGround) {
      this.speedY -= this.acceleration;
      this.y -= this.speedY;
    }
  }

  /**
   * Initiates a hop action for the chicken baby.
   */
  hop() {
    if (!this.isInAir) {
      this.speedY = 20;
      this.isInAir = true;
    }
  }

  /**
   * Handles the animation of the chicken baby, cycling through the walking images.
   */
  handleAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Plays the death animation and sound for the chicken baby, and schedules its removal from the game.
   */
  cleanUp() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.hopInterval);
  }

  playDeathAnimation() {
    this.loadImage(this.IMAGE_DEATH);
    this.chicken_death_sound.play();
    setTimeout(() => {
      this.removeFromGame = true;
      this.cleanUp();
    }, 1000);
  }

  /**
   * Handles the collision between the chicken baby and a thrown bottle, triggering the death animation.
   * @param {number} bottleIndex - The index of the bottle in the bottles array.
   * @param {Array} bottles - The array of thrown bottles.
   */
  handleCollisionWithBottle(bottleIndex, bottles) {
    this.playDeathAnimation();
    bottles.splice(bottleIndex, 1);
  }
}
