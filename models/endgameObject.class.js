/**
 * Represents the end game object responsible for managing the display
 * of end game screens such as the victory or game over screens.
 */
class EndGameObject {
  /**
   * Creates an instance of the EndGameObject.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {object} world - The game world.
   */
  constructor(ctx, canvas, world) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.world = world;
  }

  /**
   * Displays the end screen after a delay, indicating the player has won.
   */
  showEndScreen() {
    setTimeout(() => {
      localStorage.setItem("gameIsRunning", "false");
      localStorage.setItem("gameWon", "true");
      localStorage.setItem("gameOver", "false");
      this.prepareForEndScreen();
      this.world.endScreenTriggered = true;
      this.drawEndScreen();
    }, 3000);
  }

  /**
   * Prepares the game for displaying the end screen by stopping animations,
   * muting sounds, and hiding all game objects.
   */
  prepareForEndScreen() {
    clearInterval(this.interval);
    this.world.gameIsRunning = false;
    this.world.character.stopAnimation();
    SoundManager.toggleMute(true);
    this.hideAllObjects();
    this.world.character.visible = false;
  }

  /**
   * Hides all game objects by making them invisible on the screen.
   */
  hideAllObjects() {
    if (this.world.enemies) {
      this.world.enemies.forEach((enemy) => (enemy.visible = false));
    }
    if (this.world.bottles) {
      this.world.bottles.forEach((bottle) => (bottle.visible = false));
    }
    if (this.world.coins) {
      this.world.coins.forEach((coin) => (coin.visible = false));
    }
  }

  /**
   * Draws the end screen image if it's loaded and triggers the end screen.
   */
  drawEndScreen() {
    if (this.world.endScreenTriggered && this.world.endScreenImageLoaded) {
      this.ctx.drawImage(
        this.world.endScreenImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.drawRestartButton();
    }
  }

  /**
   * Draws the game over screen image if it's loaded.
   */
  drawGameOverScreen() {
    if (this.world.gameOverImageLoaded) {
      this.ctx.drawImage(
        this.world.gameOverImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.drawRestartButton();
    }
  }

  /**
   * Handles the game over logic, including setting local storage flags,
   * and preparing for showing the game over screen.
   */
  gameOver() {
    localStorage.setItem("gameIsRunning", "false");
    localStorage.setItem("gameOver", "true");
    this.world.gameOverTriggered = true;
    this.prepareForGameOver();
    this.drawGameOverScreen();
  }

  /**
   * Prepares the game for displaying the game over screen by stopping animations,
   * muting sounds, and hiding all game objects.
   */
  prepareForGameOver() {
    clearInterval(this.world.interval);
    this.world.gameIsRunning = false;
    this.world.character.stopAnimation();
    SoundManager.toggleMute(true);
    this.hideAllObjects();
    this.world.character.visible = false;
  }

  /**
   * Draws a restart button on the canvas.
   */
  drawRestartButton() {
    let x = this.canvas.width / 2 - 100;
    let y = 50;
    let width = 200;
    let height = 50;
    let borderRadius = 5;
    this.ctx.strokeStyle = "#2B1800";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(x + borderRadius, y);
    this.ctx.lineTo(x + width - borderRadius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    this.ctx.lineTo(x + width, y + height - borderRadius);
    this.ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - borderRadius,
      y + height
    );
    this.ctx.lineTo(x + borderRadius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    this.ctx.lineTo(x, y + borderRadius);
    this.ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    this.ctx.closePath();
    this.ctx.fillStyle = "#FFB12F";
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.font = "25px rio-grande";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Restart", this.canvas.width / 2, y + height / 2);
  }
}
