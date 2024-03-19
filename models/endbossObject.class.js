/**
 * Class for the final boss, inherits from MoveableObject.
 * Manages the behavior and animations of the final boss in the game.
 */
class Endboss extends MoveableObject {
  x = 2500;
  y = 120;
  height = 320;
  width = 300;
  originalX = 2500;
  attackDelay = 750;
  imagesLoaded = false;
  isAttacking = false;
  isMoving = false;
  isReturning = false;
  isAlerting = true;
  alertAnimationFinished = false;
  alertAnimationCount = 0;
  lives = 6;
  isDead = false;
  animateInterval = null;

  IMAGES_ALERT = [
    "../game/img/4_enemie_boss_chicken/2_alert/G5.png",
    "../game/img/4_enemie_boss_chicken/2_alert/G6.png",
    "../game/img/4_enemie_boss_chicken/2_alert/G7.png",
    "../game/img/4_enemie_boss_chicken/2_alert/G8.png",
    "../game/img/4_enemie_boss_chicken/2_alert/G9.png",
    "../game/img/4_enemie_boss_chicken/2_alert/G10.png",
    "../game/img/4_enemie_boss_chicken/2_alert/G11.png",
    "../game/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_WALKING = [
    "../game/img/4_enemie_boss_chicken/1_walk/G1.png",
    "../game/img/4_enemie_boss_chicken/1_walk/G2.png",
    "../game/img/4_enemie_boss_chicken/1_walk/G3.png",
    "../game/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ATTACK = [
    "../game/img/4_enemie_boss_chicken/3_attack/G13.png",
    "../game/img/4_enemie_boss_chicken/3_attack/G14.png",
    "../game/img/4_enemie_boss_chicken/3_attack/G15.png",
    "../game/img/4_enemie_boss_chicken/3_attack/G16.png",
    "../game/img/4_enemie_boss_chicken/3_attack/G17.png",
    "../game/img/4_enemie_boss_chicken/3_attack/G18.png",
    "../game/img/4_enemie_boss_chicken/3_attack/G19.png",
    "../game/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "../game/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../game/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../game/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "../game/img/4_enemie_boss_chicken/5_dead/G24.png",
    "../game/img/4_enemie_boss_chicken/5_dead/G25.png",
    "../game/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructor for the final boss.
   * Loads the initial image and sets the world reference and starts animation.
   *
   * @param {Object} world - Reference to the game world.
   */
  constructor(world) {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.world = world;
    this.loadEndbossImages();
    this.loadEndbossSounds();
    this.animate();
  }

  /**
   * Loads all images for the final boss.
   */
  loadEndbossImages() {
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Loads all sounds for the final boss.
   */
  loadEndbossSounds() {
    this.endbossSound = new Audio("../game/audio/endboss_sound_loop.mp3");
    this.hurtSound = new Audio("../game/audio/endboss_hurt.mp3");
    this.endbossDeadSound = new Audio("../game/audio/endboss_dead.mp3");
    SoundManager.addSound(this.endbossSound);
    SoundManager.addSound(this.hurtSound);
    SoundManager.addSound(this.endbossDeadSound);
  }

  /**
   * Method to flip the image for attack animations.
   */
  flipImageForAttack() {
    this.otherDirection = !this.otherDirection;
  }

  /**
   * Checks if the final boss is near the character and plays sound if so.
   *
   * @returns {boolean} True if the final boss is near the character.
   */
  isNearCharacter() {
    if (this.world && this.world.character) {
      const distanceToCharacter = Math.abs(this.x - this.world.character.x);
      if (distanceToCharacter < 400 && !this.endbossSoundPlaying) {
        this.endbossSound.loop = true;
        this.endbossSound.volume = 0.5;
        this.endbossSound.play();
        this.endbossSoundPlaying = true;
      }
      return distanceToCharacter < 400;
    }
    return false;
  }

  /**
   * Moves the final boss to the left by a specified distance.
   *
   * @param {number} distance - Distance to move the final boss to the left.
   */
  moveLeftBy(distance) {
    this.x -= distance;
  }

  /**
   * Moves the final boss to the right by a specified distance.
   *
   * @param {number} distance - Distance to move the final boss to the right.
   */
  moveRightBy(distance) {
    this.x += distance;
  }

  /**
   * Checks if the alert animation is finished.
   *
   * @returns {boolean} True if the alert animation is finished.
   */
  isAlertAnimationFinished() {
    return this.currentImage === this.IMAGES_ALERT.length - 1;
  }

  /**
   * Main animation routine of the final boss.
   */
  animate() {
    if (this.isDead) return;
    clearInterval(this.animateInterval);
    this.animateInterval = setInterval(() => this.checkAnimationState(), 100);
  }

  /**
   * Checks and controls the current animation state of the final boss.
   */
  checkAnimationState() {
    if (this.isNearCharacter()) {
      this.handleAlertAnimation();
      this.handleMovementAnimation();
      this.handleAttackAnimation();
    } else {
      this.resetEndbossState();
      this.playAnimation(this.IMAGES_ALERT);
    }
  }

  /**
   * Handles the alert animation of the final boss.
   * Plays the alert animation up to three times before setting the alert status to "finished".
   */
  handleAlertAnimation() {
    if (this.alertAnimationCount < 3) {
      this.playAnimation(this.IMAGES_ALERT);
      if (this.isAlertAnimationFinished()) {
        this.alertAnimationCount++;
        this.currentImage = 0;
      }
    } else if (!this.alertAnimationFinished) {
      this.alertAnimationFinished = true;
      this.currentImage = 0;
    }
  }

  /**
   * Controls the movement animation of the final boss.
   * Makes the final boss walk and then switches to the attack state once a certain distance has been covered.
   */
  handleMovementAnimation() {
    if (this.alertAnimationFinished && !this.isMoving && !this.isAttacking) {
      this.isMoving = true;
      this.playAnimation(this.IMAGES_WALKING);
    }
    if (this.isMoving) {
      this.moveLeftBy(60);
      if (this.x <= this.originalX - 300) {
        this.isMoving = false;
        this.isAttacking = true;
        this.currentImage = 0;
      }
    }
  }

  /**
   * Checks for collisions between thrown bottles and the final boss.
   * Executes the appropriate collision logic on collision.
   *
   * @param {throwAbleObject[]} bottles - Array of thrown bottles.
   */
  checkBottleCollisions(bottles) {
    bottles.forEach((bottle, bottleIndex) => {
      if (bottle.isColliding(this)) {
        this.handleCollisionWithBottle(bottleIndex, bottles);
      }
    });
  }

  /**
   * Handles the collision between a bottle and the final boss.
   * Reduces the life points of the final boss and plays the appropriate animation.
   *
   * @param {number} bottleIndex - Index of the bottle in the `bottles` array.
   * @param {throwAbleObject[]} bottles - Array of thrown bottles.
   */
  handleCollisionWithBottle(bottleIndex, bottles) {
    this.lives -= 1;
    bottles.splice(bottleIndex, 1);
    if (this.lives > 0) {
      this.playHurtAnimation();
    } else {
      this.playDeathAnimation();
    }
  }

  /**
   * Controls the attack animation of the final boss.
   * Plays the attack animation and initiates the return to the original position after the animation is finished.
   */
  handleAttackAnimation() {
    if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
      setTimeout(() => this.returnToOriginalPosition(), 2000);
    }
  }

  /**
   * Plays the hurt animation of the final boss.
   */
  playHurtAnimation() {
    let animationIndex = 0;
    const animationInterval = 200;
    this.hurtSound.play();
    const animationTimer = setInterval(() => {
      if (animationIndex < this.IMAGES_HURT.length) {
        let imagePath = this.IMAGES_HURT[animationIndex];
        this.loadImage(imagePath);
        animationIndex++;
      } else {
        clearInterval(animationTimer);
      }
    }, animationInterval);
  }

  /**
   * Plays the death animation of the final boss.
   * Stops all ongoing sounds and animations and starts the death animation sequence.
   */
  playDeathAnimation() {
    this.isDead = true;
    this.endbossSound.pause();
    this.endbossSound.currentTime = 0;
    this.endbossDeadSound.play();
    clearInterval(this.animateInterval);
    this.startDeathAnimation();
  }

  /**
   * Starts the death animation sequence of the final boss.
   * Runs through all images of the death animation at a set interval.
   */
  startDeathAnimation() {
    let animationIndex = 0;
    const animationInterval = 300;
    const animationTimer = setInterval(() => {
      if (animationIndex < this.IMAGES_DEAD.length) {
        let imagePath = this.IMAGES_DEAD[animationIndex];
        this.loadImage(imagePath);
        animationIndex++;
      } else {
        clearInterval(animationTimer);
      }
    }, animationInterval);
  }

  /**
   * Resets the state of the final boss.
   * Used to reset the final boss to its original state.
   */
  resetEndbossState() {
    this.alertAnimationCount = 0;
    this.alertAnimationFinished = false;
    this.isAttacking = false;
    this.isMoving = false;
    this.isReturning = false;
    this.isAlerting = true;
    this.currentImage = 0;
  }

  /**
   * Returns the final boss to its original position.
   * Called to reset the final boss after an attack.
   */
  returnToOriginalPosition() {
    this.x = this.originalX;
    this.alertAnimationCount = 0;
    this.alertAnimationFinished = false;
    this.isAttacking = false;
    this.isMoving = false;
    this.currentImage = 0;
  }
}
