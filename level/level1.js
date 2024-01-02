// Funktion, um eine Gruppe von Münzen zu erstellen
function createCoinGroup(startX, startY) {
    const coins = []; // Array, das die erstellten Münzen speichert
    const yOffset = [0, 30, 50, 30, 0]; // Y-Versatz für jede Münze in der Gruppe

    // Schleife zum Erstellen von 5 Münzen in einer Gruppe
    for (let i = 0; i < 5; i++) {
        const x = startX + i * 45; // Berechnung der X-Position jeder Münze
        const y = startY - yOffset[i]; // Berechnung der Y-Position jeder Münze
        coins.push(new Coin(x, y)); // Erstellen und Hinzufügen der Münze zum Array
    }

    return coins; // Rückgabe des Arrays mit Münzen
}

// Erstellen von Münzgruppen an verschiedenen Positionen
const coinGroups = [
    ...createCoinGroup(200, 300), // Erste Gruppe von Münzen
    ...createCoinGroup(1400, 300), // Zweite Gruppe von Münzen
    // Weitere Gruppen können hier hinzugefügt werden
];

// Erstellen von einer Anzahl an Chicken-Objekten
const chickens = Array.from({ length: 1 }, () => new Chicken());

// Erstellen von Flaschen am Boden an zufälligen Positionen
const groundBottles = Array.from({ length: 5 }, (_, index) => new Bottle(300 + (Math.random() * 100 + 200 ) * index));

// Kombinieren von verschiedenen Gegnern in einem Array
const enemies = [...chickens];

// Erstellen von Wolken
const clouds = [new Cloud()];

const backgroundObjects = [
    // Hier werden mehrere Instanzen von BackgroundImage erstellt, jeweils mit verschiedenen Bildpfaden und Positionen
    // Diese Objekte repräsentieren die verschiedenen Ebenen des Hintergrunds im Spiel
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
];

// Erstellen des Level-Objekts mit den vorher definierten Entitäten
const level1 = new Level(
    enemies,            // Gegner
    groundBottles,      // Flaschen auf dem Boden
    clouds,             // Wolken
    backgroundObjects,  // Hintergrundobjekte
    coinGroups          // Münzgruppen
);






