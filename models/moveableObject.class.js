/**
 * Class representing objects that can move within the game world, extending DrawableObject.
 */
class MoveableObject extends DrawableObject {
  /**
   * The speed at which the object moves horizontally.
   */
  speed = 0.15;

  /**
   * Indicates if the object is moving in the opposite direction.
   */
  otherDirection = false;

  /**
   * The vertical speed of the object, used for jumping or falling.
   */
  speedY = 0;

  /**
   * The acceleration, affecting the rate of speed change when jumping or falling.
   */
  acceleration = 2;

  /**
   * Applies gravity effect to the object, making it fall down or jump.
   */
  applyGravity() {
    const gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.inAir = true;
        this.y -= this.speedY;
        if (this.speedY > 0) {
          this.speedY -= this.acceleration;
        } else {
          this.speedY -= this.acceleration;
        }
      } else {
        clearInterval(gravityInterval);
        this.inAir = false;
        this.y = 150;
        this.speedY = 0;
      }
    }, 1000 / 60);
  }

  /**
   * Displays the landing image for the object when it lands on the ground.
   */
  showLandingImage() {
    let landingImagePath = this.IMAGES_JUMPING[8];
    this.img = this.ImgStorage[landingImagePath];
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground.
   */
  isAboveGround() {
    if (this instanceof throwAbleObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  /**
   * Moves the object to the left by reducing its x-coordinate.
   */
  moveLeft() {
    this.x -= this.speed;
    this.lastX = this.x;
    this.lastActionTime = new Date().getTime();
  }

  /**
   * Moves the object to the right by increasing its x-coordinate.
   */
  moveRight() {
    this.x += this.speed;
    this.lastX = this.x;
    this.lastActionTime = new Date().getTime();
  }

  /**
   * Initiates a jumping action by setting a vertical speed.
   */
  jump() {
    this.speedY = 23;
    this.isJumping = true;
    this.lastX = this.x;
    this.lastActionTime = new Date().getTime();
  }

  /**
   * Initiates a second jump, usually while the object is already in the air, to increase its vertical speed.
   */
  secondJump() {
    this.speedY = 15;
    this.isJumping = true;
    this.lastX = this.x;
    this.lastActionTime = new Date().getTime();
  }

  /**
   * Plays a given array of images as an animation for the object.
   * @param {string[]} arr - The array of image paths representing the animation frames.
   */
  playAnimation(arr) {
    let i = Math.floor(this.currentImage) % arr.length;
    let path = arr[i];
    this.img = this.ImgStorage[path];
    if (this.img && this.img.complete) {
      if (this.inAir && arr === this.IMAGES_JUMPING) {
        this.currentImage += 0.5;
      } else {
        this.currentImage++;
      }
    } else {
      console.info("Image not yet loaded or defined:", path);
    }
  }

  /**
   * Checks if this object is colliding with another object.
   * @param {DrawableObject} obj - The other object to check collision against.
   * @returns {boolean} True if there is a collision.
   */
  isColliding(obj) {
    return (
      this.x + this.width > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x + obj.width &&
      this.y < obj.y + obj.height
    );
  }
}
