class Coin extends MoveableObject {
    // Konstruktor für die Coin-Klasse
    constructor(x, y) {
        super().loadImage('../game/img/8_coin/coin_1.png'); // Lädt das Bild der Münze
        this.height = 100; // Setzt die Höhe der Münze
        this.width = 100; // Setzt die Breite der Münze
        this.x = x; // Setzt die horizontale Position der Münze
        this.y = y; // Setzt die vertikale Position der Münze
    }

}
