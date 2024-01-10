/**
 * Erstellt eine Gruppe von Münzen an einer bestimmten Startposition.
 * 
 * @param {number} startX - Die Start-X-Position der Münzgruppe.
 * @param {number} startY - Die Start-Y-Position der Münzgruppe.
 * @returns {Coin[]} Ein Array von Münzobjekten.
 */
function createCoinGroup(startX, startY) {
    const coins = []; 
    const yOffset = [0, 30, 50, 30, 0]; // Y-Versatz für jede Münze in der Gruppe

    // Schleife zum Erstellen von 5 Münzen in einer Gruppe
    for (let i = 0; i < 5; i++) {
        const x = startX + i * 45; // Berechnung der X-Position jeder Münze
        const y = startY - yOffset[i]; // Berechnung der Y-Position jeder Münze
        coins.push(new Coin(x, y)); // Erstellen und Hinzufügen der Münze zum Array
    }

    return coins; // Rückgabe des Arrays mit Münzen
}

/**
 * Erstellt Münzgruppen an verschiedenen Positionen --> createCoinGroup(x, y).
 */
const coinGroups = [
    ...createCoinGroup(200, 300),
    ...createCoinGroup(1400, 300),
    // Weitere Gruppen...
];

/**
 * Erstellt eine vorgegebene Anzahl an Chicken-Objekten --> length: Anzahl der Chicken
 */
const chickens = Array.from({ length: 3 }, () => new Chicken());

/**
 * Erstellt eine vorgegebene Anzahl an Chicken-Objekten --> length: Anzahl der Chicken
 */
const chickensBabies = Array.from({ length: 2 }, () => new ChickenBabies());

/**
 * Erstellt Flaschen am Boden an zufälligen Positionen. --> length: Anzahl der Flschen
 */
const groundBottles = Array.from({ length: 10 }, (_, index) => new Bottle(300 + (Math.random() * 100 + 200 ) * index));

/**
 * Kombiniert verschiedene Gegner in einem Array.
 */
const enemies = [...chickens,...chickensBabies];

/**
 * Erstellt Wolken.
 */
const clouds = [new Cloud()];

/**
 * Definiert Hintergrundobjekte des Spiels.
 * Mehrere Instanzen von BackgroundImage werden erstellt, jeweils mit unterschiedlichen Bildpfaden und Positionen.
 * Diese Objekte repräsentieren die verschiedenen Ebenen des Hintergrunds im Spiel.
 */
const backgroundObjects = [
    new BackgroundImage('../game/img/5_background/layers/air.png', 719 * -1),
    new BackgroundImage('../game/img/5_background/layers/3_third_layer/2.png', 719 * -1),
    new BackgroundImage('../game/img/5_background/layers/2_second_layer/2.png', 719 * -1),
    new BackgroundImage('../game/img/5_background/layers/1_first_layer/2.png', 719 * -1),
    new BackgroundImage('../game/img/5_background/layers/air.png', 0),
    new BackgroundImage('../game/img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundImage('../game/img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundImage('../game/img/5_background/layers/1_first_layer/1.png', 0),
    new BackgroundImage('../game/img/5_background/layers/air.png', 719),
    new BackgroundImage('../game/img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundImage('../game/img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundImage('../game/img/5_background/layers/1_first_layer/2.png', 719),
    new BackgroundImage('../game/img/5_background/layers/air.png', 719 * 2),
    new BackgroundImage('../game/img/5_background/layers/3_third_layer/1.png', 719 * 2),
    new BackgroundImage('../game/img/5_background/layers/2_second_layer/1.png', 719 * 2),
    new BackgroundImage('../game/img/5_background/layers/1_first_layer/1.png', 719 * 2),
    new BackgroundImage('../game/img/5_background/layers/air.png', 719 * 3),
    new BackgroundImage('../game/img/5_background/layers/3_third_layer/2.png', 719 * 3),
    new BackgroundImage('../game/img/5_background/layers/2_second_layer/2.png', 719 * 3),
    new BackgroundImage('../game/img/5_background/layers/1_first_layer/2.png', 719 * 3)
    // Weiter Hintergrundbilder ...
];

/**
 * Erstellt das Level-Objekt mit den vorher definierten Entitäten.
 */
const level1 = new Level(
    enemies,            // Gegner
    groundBottles,      // Flaschen auf dem Boden
    clouds,             // Wolken
    backgroundObjects,  // Hintergrundobjekte
    coinGroups          // Münzgruppen
);






