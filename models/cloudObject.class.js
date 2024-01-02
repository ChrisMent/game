// Definition der Klasse Cloud, die von MoveableObject erbt
class Cloud extends MoveableObject {

    // Konstruktor für Cloud-Objekte
    constructor(xPosition = 0) {
        super().loadImage('../game/img/5_background/layers/4_clouds/1.png'); // Laden des Wolkenbildes
        this.x = xPosition; // Startposition der Wolke auf der X-Achse
        this.y = 30; // Position der Wolke auf der Y-Achse
        this.height = 200; // Höhe der Wolke
        this.width = 350; // Breite der Wolke
        this.animate(); // Startet die Animation der Wolke
    }

    // Methode zur Animation der Wolke
    animate() {
        setInterval(() => {
            this.x -= 0.15; // Bewegung der Wolke nach links
            if (this.x < -this.width) {
                this.x = 2400; // Zurücksetzen der Wolke, wenn sie aus dem Bild läuft
            }
        }, 1000 / 60); // Aktualisierung der Position 60 Mal pro Sekunde
    }
}
