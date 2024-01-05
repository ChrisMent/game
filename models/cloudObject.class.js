/**
 * Klasse, die eine Wolke repräsentiert. Erbt von MoveableObject.
 * Diese Klasse verwaltet das Verhalten und die Animation einer Wolke im Spiel.
 */
class Cloud extends MoveableObject {
    /**
     * Konstruktor für Cloud-Objekte.
     * Initialisiert eine Wolke mit einem Bild, setzt die Größe und Position und startet die Animation.
     * 
     * @param {number} xPosition - Startposition der Wolke auf der X-Achse. Standardwert ist 0.
     */
    constructor(xPosition = 0) {
        super().loadImage('../game/img/5_background/layers/4_clouds/1.png');
        this.x = xPosition; // Horizontale Position der Wolke abhängig vom Paramter
        this.y = 30; // Vertikale Position der Wolke
        this.height = 200;
        this.width = 350; 
        this.animate(); 
    }

    /**
     * Animiert die Bewegung der Wolke.
     * Lässt die Wolke kontinuierlich nach links gleiten und setzt sie zurück, wenn sie den Bildschirmrand verlässt.
     */
    animate() {
        setInterval(() => {
            this.x -= 0.15; // Bewegung der Wolke nach links
            if (this.x < -this.width) {
                this.x = 2400; // Zurücksetzen der Wolke, wenn sie aus dem Bild läuft
            }
        }, 1000 / 60);
    }
}

