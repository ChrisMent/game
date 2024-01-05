/**
 * Klasse, die ein Level im Spiel repräsentiert.
 * Beinhaltet Feinde, Wolken, Hintergrundobjekte, Flaschen und Münzen.
 * 
 * @property {MoveableObject[]} enemies - Array von Feindobjekten im Level.
 * @property {Bottle[]} groundBottles - Array von Flaschenobjekten am Boden.
 * @property {Cloud[]} clouds - Array von Wolkenobjekten im Level.
 * @property {DrawableObject[]} backgroundObjects - Array von Hintergrundobjekten im Level.
 * @property {Coin[]} coins - Array von Münzobjekten im Level.
 * @property {number} level_end_x - X-Koordinate, die das Ende des Levels definiert.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    /**
     * Konstruktor der Klasse Level.
     * Initialisiert das Level mit den übergebenen Objekten.
     * 
     * @param {MoveableObject[]} enemies - Array von Feinden im Level.
     * @param {Bottle[]} groundBottles - Array von am Boden liegenden Flaschen.
     * @param {Cloud[]} clouds - Array von Wolken im Level.
     * @param {DrawableObject[]} backgroundObjects - Array von Hintergrundobjekten.
     * @param {Coin[]} coins - Array von Münzen im Level.
     */
    constructor(enemies, groundBottles, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.groundBottles = groundBottles;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
    }
}


