/**
 * Generates a group of coins in a specified formation.
 * @param {number} startX - The starting X coordinate for the first coin.
 * @param {number} startY - The starting Y coordinate for the first coin.
 * @returns {Coin[]} An array of Coin objects.
 */
function createCoinGroup(startX, startY) {
  const coins = [];
  const yOffset = [0, 30, 50, 30, 0];
  for (let i = 0; i < 5; i++) {
    const x = startX + i * 45;
    const y = startY - yOffset[i];
    coins.push(new Coin(x, y));
  }
  return coins;
}

/**
 * Creates groups of coins positioned at specified coordinates.
 */
const coinGroups = [
  ...createCoinGroup(200, 300),
  ...createCoinGroup(1400, 300),
];

/**
 * Creates an array of Chicken enemies.
 */
const chickens = Array.from({ length: 3 }, () => new Chicken());

/**
 * Creates an array of ChickenBabies enemies.
 */
const chickensBabies = Array.from({ length: 2 }, () => new ChickenBabies());

/**
 * Creates an array of ground Bottles spread across the level.
 */
const groundBottles = Array.from(
  { length: 10 },
  (_, index) => new Bottle(300 + (Math.random() * 100 + 200) * index)
);

/**
 * Combines chickens and chicken babies into a single array of enemies.
 */
const enemies = [...chickens, ...chickensBabies];

/**
 * Creates an array containing a single cloud object.
 */
const clouds = [new Cloud()];

/**
 * Creates an array of background objects to be rendered in the game.
 */
const backgroundObjects = [
  new BackgroundImage("../game/img/5_background/layers/air.png", 719 * -1),
  new BackgroundImage(
    "../game/img/5_background/layers/3_third_layer/2.png",
    719 * -1
  ),
  new BackgroundImage(
    "../game/img/5_background/layers/2_second_layer/2.png",
    719 * -1
  ),
  new BackgroundImage(
    "../game/img/5_background/layers/1_first_layer/2.png",
    719 * -1
  ),
  new BackgroundImage("../game/img/5_background/layers/air.png", 0),
  new BackgroundImage("../game/img/5_background/layers/3_third_layer/1.png", 0),
  new BackgroundImage(
    "../game/img/5_background/layers/2_second_layer/1.png",
    0
  ),
  new BackgroundImage("../game/img/5_background/layers/1_first_layer/1.png", 0),
  new BackgroundImage("../game/img/5_background/layers/air.png", 719),
  new BackgroundImage(
    "../game/img/5_background/layers/3_third_layer/2.png",
    719
  ),
  new BackgroundImage(
    "../game/img/5_background/layers/2_second_layer/2.png",
    719
  ),
  new BackgroundImage(
    "../game/img/5_background/layers/1_first_layer/2.png",
    719
  ),
  new BackgroundImage("../game/img/5_background/layers/air.png", 719 * 2),
  new BackgroundImage(
    "../game/img/5_background/layers/3_third_layer/1.png",
    719 * 2
  ),
  new BackgroundImage(
    "../game/img/5_background/layers/2_second_layer/1.png",
    719 * 2
  ),
  new BackgroundImage(
    "../game/img/5_background/layers/1_first_layer/1.png",
    719 * 2
  ),
  new BackgroundImage("../game/img/5_background/layers/air.png", 719 * 3),
  new BackgroundImage(
    "../game/img/5_background/layers/3_third_layer/2.png",
    719 * 3
  ),
  new BackgroundImage(
    "../game/img/5_background/layers/2_second_layer/2.png",
    719 * 3
  ),
  new BackgroundImage(
    "../game/img/5_background/layers/1_first_layer/2.png",
    719 * 3
  ),
];

/**
 * Initializes the first level with the specified game objects.
 */
const level1 = new Level(
  enemies,
  groundBottles,
  clouds,
  backgroundObjects,
  coinGroups
);
