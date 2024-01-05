/**
 * Klasse, die eine Münze repräsentiert. Erbt von MoveableObject.
 * Verwaltet das Aussehen und die Positionierung einer Münze im Spiel.
 */
class Coin extends MoveableObject {
    /**
     * Konstruktor für die Coin-Klasse.
     * Lädt das Bild der Münze und setzt ihre Größe und Position.
     * 
     * @param {number} x - Horizontale Position der Münze.
     * @param {number} y - Vertikale Position der Münze.
     */
    constructor(x, y) {
        super().loadImage('../game/img/8_coin/coin_1.png'); // Lädt das Bild der Münze
        this.height = 100;
        this.width = 100; 
        this.x = x; // Horizontale Position der Münze, abhängig vom Paramter
        this.y = y; // Vertikale Position der Münze, abhängig vom Paramter
    }
}

