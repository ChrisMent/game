class Bottle extends MoveableObject {
    // Konstruktor für die Bottle-Klasse
    constructor(x) {
        super().loadImage('../game/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); // Lädt das Bild der Flasche
        this.height = 70; // Setzt die Höhe der Flasche
        this.width = 60; // Setzt die Breite der Flasche
        this.x = x; // Setzt die horizontale Position der Flasche
        this.y = 356; // Setzt die vertikale Position der Flasche (nahe dem Boden)
    }

}
