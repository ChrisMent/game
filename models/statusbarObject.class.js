class Statusbar extends DrawableObject {
    
    collectedBottles = 0 // Neue Eigenschaft
    collectedCoins = 0

    constructor(x, y, width, height, type) {
        super()
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type; // Speichern des Typs


        // Entscheiden, welche Bildpfade basierend auf dem Typ verwendet werden sollen
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
   
    showCollectedBottles(count) {
        this.collectedBottles = count;
    }

    showCollectedCoins(count) {
        this.collectedCoins = count;
    }
    

    



}