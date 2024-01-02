// Definition der Klasse BackgroundImage, die von MoveableObject erbt

class BackgroundImage extends MoveableObject {
    width = 720; // Breite des Hintergrundbildes
    height = 480; // Höhe des Hintergrundbildes

    // Konstruktor der Klasse
    constructor(imagePath, x) {
        super().loadImage(imagePath); // Aufruf der loadImage-Methode der Elternklasse (MoveableObject) mit dem Bildpfad
        this.x = x; // Setzen der horizontalen Position des Hintergrundbildes
        this.y = 480 - this.height; // Setzen der vertikalen Position des Hintergrundbildes
        // Die vertikale Position wird so gesetzt, dass das Bild am unteren Rand des Bildschirms ausgerichtet ist
    }
}
