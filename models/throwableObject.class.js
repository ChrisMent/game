class throwAbleObject extends MoveableObject {
    collectedBottles = 0; // Anzahl der gesammelten Flaschen (könnte für eine Wurfbegrenzung verwendet werden)

    // Konstruktor
    constructor(x, y) {
        super().loadImage('../game/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'); // Lädt das Bild der Flasche
        this.x = x; // Setzt die horizontale Startposition
        this.y = y; // Setzt die vertikale Startposition
        this.width = 80; // Breite des Objekts
        this.height = 80; // Höhe des Objekts
        this.throw(); // Startet die Wurfbewegung
    }

    // Methode zum Werfen des Objekts
    throw() {
        this.speedY = 35; // Startgeschwindigkeit in vertikaler Richtung
        this.speedX = 0; // Horizontale Geschwindigkeit (könnte angepasst werden, um seitliche Bewegung zu ermöglichen)
        this.applyGravity(); // Anwenden der Schwerkraft auf das Objekt

        setInterval(() => {
            this.x += 10; // Bewegt das Objekt horizontal mit jedem Intervall (Erzeugt Wurfbewegung)
        }, 25); // Intervallzeit (schneller für schnellere Bewegung)
    }

}
