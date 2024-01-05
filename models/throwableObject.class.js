/**
 * Klasse für ein werfbares Objekt, erbt von MoveableObject.
 * Repräsentiert Objekte, die im Spiel geworfen werden können, wie Flaschen.
 * 
 * @property {number} collectedBottles - Anzahl der gesammelten Flaschen, die für eine Wurfbegrenzung verwendet werden können.
 * @property {number} x - Horizontale Startposition des Objekts.
 * @property {number} y - Vertikale Startposition des Objekts.
 * @property {number} width - Breite des Objekts.
 * @property {number} height - Höhe des Objekts.
 * @property {number} speedX - Horizontale Geschwindigkeit des Objekts.
 * @property {number} speedY - Vertikale Geschwindigkeit des Objekts.
 */
class throwAbleObject extends MoveableObject {
    collectedBottles = 0;
    /**
     * Konstruktor für ein werfbares Objekt.
     * Initialisiert das Objekt und startet die Wurfbewegung.
     * 
     * @param {number} x - Horizontale Startposition des Objekts.
     * @param {number} y - Vertikale Startposition des Objekts.
     */
    constructor(x, y) {
        super().loadImage('../game/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'); // Lädt das Bild der Flasche
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.throw(); // Startet die Wurfbewegung
    }
    /**
     * Methode zum Werfen des Objekts.
     * Setzt die Anfangsgeschwindigkeiten und wendet Schwerkraft an.
     */
    throw() {
        this.speedY = 35;
        this.speedX = 0; 
        this.applyGravity(); // Anwenden der Schwerkraft auf das Objekt

        setInterval(() => {
            this.x += 10; // Bewegt das Objekt horizontal mit jedem Intervall (Erzeugt Wurfbewegung)
        }, 25);
    }

}

