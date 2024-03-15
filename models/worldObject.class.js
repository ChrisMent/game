/**
 * Represents the game world, containing all game objects and managing the game state.
 */
class WorldObject {
  infoScreen = new InfoScreen();
  character = new Character();
  bottle = new Bottle();
  bottles = [];
  groundBottles = [];
  groundCoins = [];
  canvas;
  keyboard;
  camera_x = 0;
  startScreen;
  gameIsRunning = false;

  /**
   * Initializes a new instance of the WorldObject class.
   * @param {HTMLCanvasElement} canvas - The target canvas for rendering the game.
   * @param {KeyboardObject} keyboard - The keyboard input object.
   * @param {Level} level - The current level of the game.
   */
  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.startScreen = new StartScreen();
    this.level = level;
    this.groundBottles = level.groundBottles;
    this.groundCoins = level.coins;
    this.character = new Character(this);
    this.endboss = new Endboss(this);
    this.level.enemies.push(this.endboss);
    this.endGameObject = new EndGameObject(this.ctx, this.canvas, this);
    this.setWorld();
    this.initializeStatusbar();
    this.initializeEndscreen();
    this.initializeGameOver();
    this.initializeClouds();
    this.draw();
    this.run();
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (
        x >= this.canvas.width / 2 - 100 &&
        x <= this.canvas.width / 2 + 100 &&
        y >= 50 &&
        y <= 100
      ) {
        this.restartGame();
      }
    });
  }

  /**
   * Restarts the game by reloading the page.
   */
  restartGame() {
    location.reload();
  }

  /**
   * Main game loop that checks collisions, handles object collection, and triggers end game conditions.
   */
  run() {
    this.interval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObject();
      this.checkForBottleCollection();
      this.checkForCoinCollection();
      if (this.endboss.lives <= 0 && !this.endScreenTriggered) {
        this.endGameObject.showEndScreen();
      }
      if (this.character.lives <= 0 && !this.gameOverTriggered) {
        this.endGameObject.gameOver();
      }
    }, 200);
  }

  initializeEndscreen() {
    this.endScreenTriggered = false;
    this.endScreenImage = new Image();
    this.endScreenImage.src = "../game/img/9_intro_outro_screens/youwin.png";
    this.endScreenImage.onload = () => {
      this.endScreenImageLoaded = true;
    };
  }

  /**
   * Initializes the end screen when the game is won.
   */
  initializeGameOver() {
    this.gameOverImage = new Image();
    this.gameOverImage.src =
      "../game/img/9_intro_outro_screens/game_over/ohnoyoulost!.png";
    this.gameOverImage.onload = () => {
      this.gameOverImageLoaded = true;
    };
  }

  /**
   * Initializes the game over screen when the player loses all lives.
   */
  initializeStatusbar() {
    this.statusbars = {
      life: new Statusbar(15, 0, 75, 75, "life", 0, this.ctx),
      bottle: new Statusbar(110, 10, 63, 63, "bottle", 0, this.ctx),
      coin: new Statusbar(200, 10, 63, 63, "coin", 0, this.ctx),
      endboss: new Statusbar(640, 15, 63, 63, "endboss", 0, this.ctx),
    };
  }

  /**
   * Initializes the status bar for displaying game stats such as life, bottles collected, and coins collected.
   */
  initializeClouds() {
    this.clouds = [];
    this.clouds.push(new Cloud(0));
    this.clouds.push(new Cloud(2400 / 2));
    this.clouds.push(new Cloud(2400 - 350));
  }

  /**
   * Initializes clouds in the game world for aesthetic purposes.
   */
  checkCollisions() {
    this.checkEnemyCollisions();
    if (this.endboss) {
      this.endboss.checkBottleCollisions(this.bottles);
    }
  }

  /**
   * Checks for collisions between the character, enemies, and bottles.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.jumpOnChicken(enemy)) {
        enemy.playDeathAnimation();
        this.removeEnemy(enemy, index);
      } else if (
        this.character.isColliding(enemy) &&
        !this.character.jumpOnChicken(enemy)
      ) {
        this.character.hit();
        this.drawLivesCount();
      }
      this.bottles.forEach((bottle, bottleIndex) => {
        this.level.enemies.forEach((enemy, index) => {
          if (bottle.isColliding(enemy)) {
            if (enemy instanceof Endboss) {
              enemy.handleCollisionWithBottle(bottleIndex, this.bottles);
            } else {
              enemy.handleCollisionWithBottle(bottleIndex, this.bottles);
              this.removeEnemy(enemy, index);
            }
          }
        });
      });
    });
  }

  /**
   * Removes an enemy from the game world.
   * @param {MoveableObject} enemy - The enemy to remove.
   * @param {number} index - The index of the enemy in the enemies array.
   */
  removeEnemy(enemy, index) {
    this.level.enemies.splice(index, 1);
  }

  /**
   * Checks if the character has collected a bottle and handles the collection.
   */
  checkForBottleCollection() {
    this.groundBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(index);
      }
    });
  }

  /**
   * Checks if the character has collected a coin and handles the collection.
   */
  checkForCoinCollection() {
    this.groundCoins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  /**
   * Handles the action of collecting a bottle.
   * @param {number} index - The index of the bottle in the groundBottles array.
   */
  collectBottle(index) {
    this.groundBottles.splice(index, 1);
    this.character.bottlesCollected++;
    this.character.collect_bottle_sound.play();
  }

  /**
   * Handles the action of collecting a coin.
   * @param {number} index - The index of the coin in the groundCoins array.
   */
  collectCoin(index) {
    this.groundCoins.splice(index, 1);
    this.character.coinsCollected++;
    this.character.collect_coin_sound.play();
  }

  /**
   * Checks if the player has initiated a throw object action and handles it.
   */
  checkThrowObject() {
    if (this.keyboard.throwBottle && this.character.bottlesCollected > 0) {
      let bottle = new throwAbleObject(
        this.character.x + 40,
        this.character.y + 100
      );
      this.bottles.push(bottle);
      this.character.bottlesCollected--;
    }
  }

  /**
   * Sets the world reference for the character and starts the character's animation.
   */
  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  /**
   * Main drawing function that renders the game world and all its objects.
   */
  draw() {
    this.selectScreenToDraw();
    if (!this.gameOverTriggered && !this.endScreenTriggered) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.infoScreen.draw(this.ctx);
      this.drawGameScreen();
    }
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Determines which screen to draw based on the game state (game over, end screen, or the game world).
   */
  selectScreenToDraw() {
    if (this.gameOverTriggered) {
      this.endGameObject.drawGameOverScreen();
    } else if (this.endScreenTriggered) {
      this.endGameObject.drawEndScreen();
    }
  }

  /**
   * Draws the game screen including all active game objects.
   */
  drawGameScreen() {
    if (this.startScreen && this.startScreen.isVisible) {
      this.startScreen.draw(this.ctx);
    } else if (this.world && this.world.gameOverTriggered) {
      this.drawGameOverScreen();
    } else if (this.world && this.world.endScreenTriggered) {
      this.drawEndScreen();
    } else {
      this.prepareCanvasForGameObjects();
      this.drawGameObjects();
      this.restoreCanvasState();
      this.drawFixedObjects();
    }
  }

  /**
   * Prepares the canvas for drawing game objects, potentially translating the canvas based on camera position.
   */
  prepareCanvasForGameObjects() {
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.updateCameraPosition();
  }

  /**
   * Draws game objects including the character, enemies, collectibles, and environmental objects.
   */
  drawGameObjects() {
    this.addBackgroundObjectsToMap();
    if (this.clouds) {
      this.clouds.forEach((cloud) => cloud.draw(this.ctx));
    }
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.groundBottles);
    this.addObjectsToMap(this.groundCoins);
    this.addToMap(this.character);
    this.checkCollisions();
    this.character.applyGravityToCharacter();
    this.addObjectsToMap(this.bottles);
  }

  /**
   * Restores the canvas state after drawing game objects.
   */
  restoreCanvasState() {
    this.ctx.restore();
  }

  /**
   * Draws fixed objects like the status bar which do not move with the camera.
   */
  drawFixedObjects() {
    this.addToMap(this.statusbars.life);
    this.addToMap(this.statusbars.bottle);
    this.addToMap(this.statusbars.coin);
    if (this.camera_x >= -2200 && this.camera_x <= -1800) {
      this.addToMap(this.statusbars.endboss);
    }
    this.drawCollectedBottlesCount();
    this.drawLivesCount();
    this.drawCollectedCoinsCount();
  }

  /**
   * Draws the number of collected bottles near the bottle status bar.
   */
  drawCollectedBottlesCount() {
    if (this.statusbars.bottle.type === "bottle") {
      this.ctx.font = "48px rio-grande";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        this.character.bottlesCollected,
        this.statusbars.bottle.x + 50,
        this.statusbars.bottle.y + 51
      );
    }
  }

  /**
   * Draws the number of collected coins near the coin status bar.
   */
  drawCollectedCoinsCount() {
    if (this.statusbars.coin.type === "coin") {
      this.ctx.font = "48px rio-grande";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        this.character.coinsCollected,
        this.statusbars.coin.x + 60.5,
        this.statusbars.coin.y + 52
      );
    }
  }

  /**
   * Draws the number of remaining lives near the life status bar and the number of endboss lives when applicable.
   */
  drawLivesCount() {
    if (this.statusbars.life.type === "life") {
      this.ctx.font = "48px rio-grande";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        this.character.lives,
        this.statusbars.life.x + 70,
        this.statusbars.life.y + 59.5
      );
    }
    if (
      this.camera_x >= -2200 &&
      this.camera_x <= -1800 &&
      this.statusbars.endboss.type === "endboss"
    ) {
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        this.endboss.lives,
        this.statusbars.endboss.x - 25,
        this.statusbars.endboss.y + 45
      );
    }
  }

  /**
   * Adds background objects to the game map.
   */
  addBackgroundObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
  }

  /**
   * Updates the camera position based on the character's current position.
   */
  updateCameraPosition() {
    this.camera_x = -this.character.x + 100;
  }

  /**
   * Adds an array of objects to the game map and draws them.
   * @param {DrawableObject[]} objects - Objects to add and draw.
   */
  addObjectsToMap(objects) {
    if (!objects) {
      return;
    }
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the game map and draws it.
   * @param {DrawableObject} object - The object to add and draw.
   */
  addToMap(object) {
    if (object.otherDirection) {
      this.flipImage(object);
    }
    object.draw(this.ctx);
    if (object.otherDirection) {
      this.flipImageRestore(object);
    }
  }

  /**
   * Flips the image of an object for drawing when the object is facing the opposite direction.
   * @param {DrawableObject} object - The object to flip.
   */
  flipImage(object) {
    this.ctx.save();
    this.ctx.translate(object.width, 0);
    this.ctx.scale(-1, 1);
    object.x = object.x * -1;
  }

  /**
   * Restores the flipped image of an object after drawing.
   * @param {DrawableObject} object - The object to restore.
   */
  flipImageRestore(object) {
    object.x = object.x * -1;
    this.ctx.restore();
  }
}
