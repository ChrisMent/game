/**
 * Klasse für den Startbildschirm des Spiels, erbt von DrawableObject.
 * Verwaltet das Anzeigen und Umschalten des Startbildschirms.
 *
 * @property {boolean} isVisible - Steuert, ob der Startbildschirm sichtbar ist.
 * @property {boolean} gameIsRunning - Zustand des Spiels, ob es läuft oder pausiert ist.
 * @property {number} width - Breite des Startbildschirms.
 * @property {number} height - Höhe des Startbildschirms.
 * @property {string} startScreenPath - Pfad zum Bild des Startbildschirms.
 */
class StartScreen extends DrawableObject {
    isVisible = true;
    gameIsRunning = false;
    width = 720;
    height = 480;
    startScreenPath = '../game/img/9_intro_outro_screens/start/startscreen_1.png';

    /**
     * Konstruktor für den StartScreen.
     * Initialisiert und lädt das Bild des Startbildschirms.
     */
    constructor() {
        super(); // Aufruf des Konstruktors der Elternklasse
        this.loadImage(this.startScreenPath); // Laden des Startbildschirm-Bildes
        this.x = 0; // Horizontale Position setzen
        this.y = 0; // Vertikale Position setzen
    }

    /**
     * Schaltet den Sichtbarkeitsstatus des Startbildschirms um und ändert den Zustand des Spiels.
     * Wird aufgerufen, um das Spiel zu starten oder zu pausieren.
     */
    toggleStartScreen() {
        this.isVisible = !this.isVisible;
        this.gameIsRunning = !this.gameIsRunning;
    }
}


