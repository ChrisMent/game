/**
 * Klasse, die ein Hintergrundbild repräsentiert. Erbt von MoveableObject.
 * 
 * @property {number} width - Breite des Hintergrundbildes.
 * @property {number} height - Höhe des Hintergrundbildes.
 */
class BackgroundImage extends MoveableObject {
    width = 720;
    height = 480;

    /**
     * Konstruktor für die BackgroundImage-Klasse.
     * Lädt ein Hintergrundbild und setzt dessen Position.
     * 
     * @param {string} imagePath - Pfad des Hintergrundbildes.
     * @param {number} x - Horizontale Position des Hintergrundbildes.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}

