class Statusbar extends DrawableObject {
    collectedBottles = 0; // Anzahl der gesammelten Flaschen
    collectedCoins = 0; // Anzahl der gesammelten Münzen

    // Konstruktor
    constructor(x, y, width, height, type) {
        super();
        this.x = x; // Horizontale Position der Statusleiste
        this.y = y; // Vertikale Position der Statusleiste
        this.width = width; // Breite der Statusleiste
        this.height = height; // Höhe der Statusleiste
        this.type = type; // Typ der Statusleiste (z.B. 'life', 'bottle', 'coin', 'endboss')

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

    // Methode zum Aktualisieren der Anzahl gesammelter Flaschen
    showCollectedBottles(count) {
        this.collectedBottles = count;
    }

    // Methode zum Aktualisieren der Anzahl gesammelter Münzen
    showCollectedCoins(count) {
        this.collectedCoins = count;
    }

}
