/**
 * Klasse für die Anzeige einer Statusleiste, erbt von DrawableObject.
 * Zeigt verschiedene Informationen wie Lebenspunkte, gesammelte Flaschen oder Münzen an.
 * 
 * @property {number} collectedBottles - Anzahl der gesammelten Flaschen.
 * @property {number} collectedCoins - Anzahl der gesammelten Münzen.
 * @property {number} x - Horizontale Position der Statusleiste.
 * @property {number} y - Vertikale Position der Statusleiste.
 * @property {number} width - Breite der Statusleiste.
 * @property {number} height - Höhe der Statusleiste.
 * @property {string} type - Typ der Statusleiste (z.B. 'life', 'bottle', 'coin', 'endboss').
 */
class Statusbar extends DrawableObject {
    collectedBottles = 0;
    collectedCoins = 0;

    /**
     * Konstruktor für die Statusbar.
     * Initialisiert und lädt das Bild basierend auf dem Typ der Statusleiste.
     * 
     * @param {number} x - Horizontale Position der Statusleiste.
     * @param {number} y - Vertikale Position der Statusleiste.
     * @param {number} width - Breite der Statusleiste.
     * @param {number} height - Höhe der Statusleiste.
     * @param {string} type - Typ der Statusleiste.
     */
    constructor(x, y, width, height, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;

        // Laden des entsprechenden Bildes basierend auf dem Typ
        if (type === 'life') {
            this.loadImage('../game/img/7_statusbars/3_icons/icon_health.png');
        } else if (type === 'bottle') {
            this.loadImage('../game/img/7_statusbars/3_icons/icon_salsa_bottle.png');
        } else if (type === 'coin') {
            this.loadImage('../game/img/7_statusbars/3_icons/icon_coin.png');
        } else if (type === 'endboss') {
            this.loadImage('../game/img/7_statusbars/3_icons/icon_health_endboss.png');
        }
    }

    /**
     * Aktualisiert die Anzahl der gesammelten Flaschen.
     * 
     * @param {number} count - Die neue Anzahl der gesammelten Flaschen.
     */
    showCollectedBottles(count) {
        this.collectedBottles = count;
    }

    /**
     * Aktualisiert die Anzahl der gesammelten Münzen.
     * 
     * @param {number} count - Die neue Anzahl der gesammelten Münzen.
     */
    showCollectedCoins(count) {
        this.collectedCoins = count;
    }
}

