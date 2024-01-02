class StartScreen extends DrawableObject {
    // Eigenschaften
    canvas; // Das Canvas-Element, auf dem der Startbildschirm gezeichnet wird (nicht verwendet im Konstruktor)
    ctx; // Der Zeichenkontext des Canvas (nicht verwendet im Konstruktor)
    img; // Das Bildobjekt für den Startbildschirm
    isVisible = true; // Steuert, ob der Startbildschirm sichtbar ist

    width = 720; // Breite des Startbildschirms
    height = 480; // Höhe des Startbildschirms

    // Pfad zum Startbildschirm-Bild
    startScreen = '../game/img/9_intro_outro_screens/start/startscreen_1.png';

    // Konstruktor
    constructor() {
        super(); // Aufruf des Konstruktors der Elternklasse (DrawableObject)
        this.loadImage(this.startScreen); // Laden des Startbildschirm-Bildes
        this.x = 0; // Horizontale Position des Startbildschirms
        this.y = 0; // Vertikale Position des Startbildschirms
    }

   
}
