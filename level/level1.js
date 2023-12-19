// Funktion, um eine Gruppe von Münzen zu erstellen
function createCoinGroup(startX, startY) {
    const coins = [];
    const yOffset = [0, 30, 50, 30, 0]; // Y-Versatz für jede Münze in der Gruppe

    for (let i = 0; i < 5; i++) {
        const x = startX + i * 45; // X-Position der Münze
        const y = startY - yOffset[i]; // Y-Position der Münze
        coins.push(new Coin(x, y));
    }

    return coins;
}


// Erstellen von Münzgruppen
const coinGroups = [
    ...createCoinGroup(200, 300), // Erste Gruppe von Münzen
    ...createCoinGroup(1400, 300), // Zweite Gruppe von Münzen
    // Weitere Gruppen können hier hinzugefügt werden
];

// Erstellen von x Ojekten mit lenght
const chickens = Array.from({ length: 1 }, () => new Chicken());

const groundBottles = Array.from({ length: 5 }, (_, index) => new Bottle(300 + (Math.random() * 100 + 200 ) * index))

const enemies = [...chickens, new Endboss()];
const clouds = [new Cloud()];
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
];



const level1 = new Level(
        enemies,
        groundBottles,
        clouds,
        backgroundObjects,
        coinGroups

);





