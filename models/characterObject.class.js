/**
 * Represents a character in the game.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
  world;
  x = 0;
  y = 150;
  height = 280;
  width = 100;
  speed = 4;
  lastX = 0;
  lastActionTime = 0;
  bottlesCollected = 0;
  coinsCollected = 0;
  lives = 6;
  lastHit = 0;
  hasJustLanded = false;
  inAir = false;
  invulnerabilityDuration = 1000;

  /**
   * Array of image paths for walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "../game/img/2_character_pepe/2_walk/W-21.png",
    "../game/img/2_character_pepe/2_walk/W-22.png",
    "../game/img/2_character_pepe/2_walk/W-23.png",
    "../game/img/2_character_pepe/2_walk/W-24.png",
    "../game/img/2_character_pepe/2_walk/W-25.png",
    "../game/img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Array of image paths for jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "../game/img/2_character_pepe/3_jump/J-31.png",
    "../game/img/2_character_pepe/3_jump/J-32.png",
    "../game/img/2_character_pepe/3_jump/J-33.png",
    "../game/img/2_character_pepe/3_jump/J-34.png",
    "../game/img/2_character_pepe/3_jump/J-35.png",
    "../game/img/2_character_pepe/3_jump/J-36.png",
    "../game/img/2_character_pepe/3_jump/J-37.png",
    "../game/img/2_character_pepe/3_jump/J-38.png",
    "../game/img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Array of image paths for death animation.
   * @type {string[]}
   */
  IMAGES_DEATH = [
    "../game/img/2_character_pepe/5_dead/D-51.png",
    "../game/img/2_character_pepe/5_dead/D-52.png",
    "../game/img/2_character_pepe/5_dead/D-53.png",
    "../game/img/2_character_pepe/5_dead/D-54.png",
    "../game/img/2_character_pepe/5_dead/D-55.png",
    "../game/img/2_character_pepe/5_dead/D-56.png",
    "../game/img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Array of image paths for hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "../game/img/2_character_pepe/4_hurt/H-41.png",
    "../game/img/2_character_pepe/4_hurt/H-42.png",
    "../game/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Array of image paths for idle animation.
   * @type {string[]}
   */
  IMAGES_IDLE = [
    "../game/img/2_character_pepe/1_idle/idle/I-1.png",
    "../game/img/2_character_pepe/1_idle/idle/I-2.png",
    "../game/img/2_character_pepe/1_idle/idle/I-3.png",
    "../game/img/2_character_pepe/1_idle/idle/I-4.png",
    "../game/img/2_character_pepe/1_idle/idle/I-5.png",
    "../game/img/2_character_pepe/1_idle/idle/I-6.png",
    "../game/img/2_character_pepe/1_idle/idle/I-7.png",
    "../game/img/2_character_pepe/1_idle/idle/I-8.png",
    "../game/img/2_character_pepe/1_idle/idle/I-9.png",
    "../game/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Array of image paths for long idle animation.
   * @type {string[]}
   */
  IMAGES_LONG_IDLE = [
    "../game/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "../game/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  /**
   * Constructor to initialize the character object.
   * @param {World} world - The world object in which the character exists.
   */
  /**
   * Constructor to initialize the character object.
   * @param {World} world - The world object in which the character exists.
   */
  constructor(world) {
    super().loadImage("../game/img/2_character_pepe/2_walk/W-21.png");
    this.loadCharacterImages();
    this.loadCharacterSounds();
    this.world = world;
    this.lastX = this.x;
    this.lastActionTime = new Date().getTime();
    this.applyGravity();
  }

  /**
   * Loads the character images for animations.
   */
  loadCharacterImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEATH);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
  }

  /**
   * Loads the character sounds for interactions.
   */
  loadCharacterSounds() {
    this.walking_sound = new Audio("../game/audio/walking.mp3");
    this.hurt_sound = new Audio("../game/audio/pain.mp3");
    this.die_sound = new Audio("../game/audio/die.mp3");
    this.jump_sound = new Audio("../game/audio/jump.mp3");
    this.collect_bottle_sound = new Audio("../game/audio/bottle_collect.mp3");
    this.collect_coin_sound = new Audio("../game/audio/coin.mp3");
    SoundManager.addSound(this.walking_sound);
    SoundManager.addSound(this.hurt_sound);
    SoundManager.addSound(this.die_sound);
    SoundManager.addSound(this.jump_sound);
    SoundManager.addSound(this.collect_bottle_sound);
    SoundManager.addSound(this.collect_coin_sound);
  }

  /**
   * Initiates the animation for the character.
   */
  animate() {
    this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
    this.animationInterval = setInterval(() => this.handleAnimation(), 200);
  }

  /**
   * Handles the movement of the character based on user input.
   */
  handleMovement() {
    if (!this.world || !this.world.keyboard) {
      return;
    }
    this.walking_sound.pause();
    if (this.canMoveRight()) {
      this.moveRight();
    }
    if (this.canMoveLeft()) {
      this.moveLeft();
    }
    if (this.canMoveJump()) {
      this.jump();
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character can move to the right.
   * @returns {boolean} True if the character can move right, false otherwise.
   */
  canMoveRight() {
    return (
      this.world.keyboard.moveRight && this.x < this.world.level.level_end_x
    );
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    super.moveRight();
    this.walking_sound.play();
    this.otherDirection = false;
  }

  /**
   * Checks if the character can move to the left.
   * @returns {boolean} True if the character can move left, false otherwise.
   */
  canMoveLeft() {
    return this.world.keyboard.moveLeft && this.x > 0;
  }

  /**
   * Moves the character to the left.
   */
  moveLeft() {
    super.moveLeft();
    this.walking_sound.play();
    this.otherDirection = true;
  }

  /**
   * Checks if the character can perform a jump.
   * @returns {boolean} True if the character can jump, false otherwise.
   */
  canMoveJump() {
    return this.world.keyboard.pushSpace && !this.isAboveGround();
  }

  /**
   * Initiates the character's jump action.
   */
  jump() {
    if (!this.inAir) {
      super.jump();
      this.speedY = 25;
      this.jump_sound.play();
      this.inAir = true;
    }
  }

  /**
   * Handles the character's jump on a chicken enemy.
   * @param {Enemy} enemy - The enemy character.
   * @returns {boolean} True if the character jumps on the enemy, false otherwise.
   */
  jumpOnChicken(enemy) {
    let isJumpingOnChicken =
      this.isColliding(enemy) && this.isAboveGround() && this.speedY < 0;

    if (isJumpingOnChicken) {
      this.secondJump();
    }

    return isJumpingOnChicken;
  }

  /**
   * Applies gravity to the character's movement.
   */
  applyGravityToCharacter() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      if (this.speedY > 0) {
        this.speedY -= this.acceleration;
      } else {
        this.speedY -= this.acceleration / 4;
      }
      if (this.isJumping || this.inAir) {
        this.playJumpAnimationBasedOnHeightOrSpeedY();
      }
    } else {
      if (this.y > 150) {
        this.y = 150;
        if (this.inAir) {
          this.showLandingImage();
          this.inAir = false;
        }
      }
      this.speedY = 0;
    }
  }

  /**
   * Plays the jump animation based on the character's height or speed.
   */
  playJumpAnimationBasedOnHeightOrSpeedY() {
    const totalImages = this.IMAGES_JUMPING.length;
    const animationSpeedFactor = 3;
    let imageIndex = Math.abs(Math.floor(this.speedY / animationSpeedFactor));
    if (imageIndex >= totalImages) {
      imageIndex = totalImages - 1;
    }
    this.img = this.ImgStorage[this.IMAGES_JUMPING[imageIndex]];
  }

  /**
   * Handles the character's animation based on its actions.
   */
  handleAnimation() {
    let idleTime = this.isIdle();
    if (idleTime > 2 && idleTime < 15) {
      this.playAnimation(this.IMAGES_IDLE);
    } else if (idleTime >= 15) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else if (this.isDeath()) {
      this.playAnimation(this.IMAGES_DEATH);
      this.die_sound.play();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.hurt_sound.play();
    } else if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Stops the character's animation.
   */
  stopAnimation() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  /**
   * Reduces the character's life count by 1.
   */
  loseLife() {
    if (this.lives > 0) {
      this.lives--;
    }
    if (this.lives === 0) {
      // Perform actions when lives reach 0
    }
  }

  /**
   * Registers a hit on the character.
   */
  hit() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastHit > this.invulnerabilityDuration) {
      this.lives--;
      this.lastHit = currentTime;
    }
  }

  /**
   * Checks if the character is dead (no lives left).
   * @returns {boolean} True if the character is dead, false otherwise.
   */
  isDeath() {
    return this.lives <= 0;
  }

  /**
   * Checks if the character is hurt based on the invulnerability duration.
   * @returns {boolean} True if the character is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.125;
  }

  /**
   * Calculates the time elapsed since the last action of the character.
   * @returns {number} The time elapsed in seconds.
   */
  isIdle() {
    let currentTime = new Date().getTime();
    let timeElapsed = (currentTime - this.lastActionTime) / 1000;
    return timeElapsed;
  }
}
