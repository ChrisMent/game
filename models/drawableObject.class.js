/**
 * Represents a drawable object in the game.
 */
class DrawableObject {
  /**
   * The current image to be drawn.
   * @type {Image}
   */
  img;

  /**
   * Storage for loaded images to prevent re-loading.
   * @type {Object.<string, Image>}
   */
  ImgStorage = {};

  /**
   * Index of the current image being displayed.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Loads an image and stores it in the `img` property.
   * @param {string} path - Path to the image file.
   */
  loadImage(path) {}

  /**
   * Loads multiple images and stores them in `ImgStorage`.
   * @param {string[]} arr - Array of image paths.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.onload = () => {
      this.imageLoaded = true;
    };
    this.img.onerror = () => {
      console.error("Error while loading image:", path);
    };
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in `ImgStorage`.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.onload = () => {
        this.ImgStorage[path] = img;
      };
      img.src = path;
    });
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   */
  draw(ctx) {
    if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
   * Draws a rectangle outline around the object. Specific to `Character` and `Chicken` instances.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   */
  drawRect(ctx) {
    if (this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
    if (this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
