/**
 * Klasse, die eine Flasche repräsentiert. Erbt von MoveableObject.
 */
class Bottle extends MoveableObject {
    /**
     * Konstruktor für die Bottle-Klasse.
     * Lädt das Bild der Flasche und setzt die Größe und Position.
     * 
     * @param {number} x - Horizontale Position der Flasche.
     */
    constructor(x) {
        super().loadImage('../game/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); // Lädt das Bild der Flasche
        this.height = 70; // Höhe der Flasche
        this.width = 60; // Breite der Flasche
        this.x = x; // Horizontale Position der Flasche abhängig vom Parameter
        this.y = 356; // Vertikale Position der Flasche (nahe dem Boden)
    }
}

