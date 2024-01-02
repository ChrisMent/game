// Definition der Klasse Level
class Level {
    enemies; // Array für Feinde im Level
    clouds; // Array für Wolken im Level
    backgroundObjects; // Array für Hintergrundobjekte
    level_end_x = 2200; // Definiert das Ende des Levels auf der X-Achse

    // Konstruktor der Klasse Level
    constructor(enemies, groundBottles, clouds, backgroundObjects, coins) {
        this.enemies = enemies; // Zuweisung der Feinde zum Level
        this.groundBottles = groundBottles; // Zuweisung der am Boden liegenden Flaschen
        this.clouds = clouds; // Zuweisung der Wolken
        this.backgroundObjects = backgroundObjects; // Zuweisung der Hintergrundobjekte
        this.coins = coins; // Zuweisung der Münzen
    }
}

