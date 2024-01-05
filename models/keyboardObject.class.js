/**
 * Klasse für die Verwaltung von Tastatureingaben.
 * Hält den Status der Tastatureingaben und verarbeitet Tastendruck- und Tastenloslass-Ereignisse.
 */
class KeyboardObject {
    /**
     * Klasse für die Verwaltung von Tastatureingaben.
     * Hält den Status der Tastatureingaben und verarbeitet Tastendruck- und Tastenloslass-Ereignisse.
     * 
     * @property {boolean} moveRight - Status der Bewegung nach rechts.
     * @property {boolean} moveLeft - Status der Bewegung nach links.
     * @property {boolean} pushSpace - Status des Springens oder anderer Aktionen, die mit der Leertaste ausgelöst werden.
     * @property {boolean} throwBottle - Status des Werfens einer Flasche oder einer anderen Aktion, die mit der Eingabetaste ausgelöst wird.
     */
    moveRight = false;
    moveLeft = false;
    pushSpace = false;
    throwBottle = false;

    /**
     * Behandelt das Drücken von Tasten (KeyDown-Event).
     * Aktualisiert die Zustände basierend auf der gedrückten Taste.
     * 
     * @param {KeyboardEvent} event - Das Tastendruck-Event.
     */
    handleKeyDown(event) {
        if (event.key === "ArrowLeft") {
            this.moveLeft = true; // Aktiviert die Bewegung nach links
        } else if (event.key === "ArrowRight") {
            this.moveRight = true; // Aktiviert die Bewegung nach rechts
        } else if (event.key === " ") {
            this.pushSpace = true; // Aktiviert die Sprungaktion
        } else if (event.key === "Enter") {
            this.throwBottle = true; // Aktiviert die Wurfaktion
        }
    }

    /**
     * Behandelt das Loslassen von Tasten (KeyUp-Event).
     * Setzt die Zustände zurück, wenn die Tasten losgelassen werden.
     * 
     * @param {KeyboardEvent} event - Das Tastenloslass-Event.
     */
    handleKeyUp(event) {
        if (event.key === "ArrowLeft") {
            this.moveLeft = false;
        } else if (event.key === "ArrowRight") {
            this.moveRight = false;
        } else if (event.key === " ") {
            this.pushSpace = false;
        } else if (event.key === "Enter") {
            this.throwBottle = false;
        }  
    }

    /**
     * Aktiviert berührungsbasierte Steuerungsknöpfe für bestimmte Aktionen.
     * 
     * @param {string} buttonId - Die ID des Buttons im HTML-Dokument.
     * @param {string} action - Die Aktion, die durch den Button ausgelöst wird.
     */
    activateButton(buttonId, action) {
        const button = document.getElementById(buttonId);
        // Aktiviert die Aktion bei Berührung
        button.addEventListener('touchstart', () => this[action] = true); 
        // Deaktiviert die Aktion bei Loslassen
        button.addEventListener('touchend', () => this[action] = false); 
    }
}
