// Definition der Klasse KeyboardObject
class KeyboardObject {
    // Initialisierung der Zustände der Tastatureingaben
    moveRight = false;
    moveLeft = false;
    pushSpace = false;
    throwBottle = false;

    // Methode zur Behandlung des Tastendrucks (KeyDown-Event)
    handleKeyDown(event) {
        // Aktualisierung der Zustände basierend auf der gedrückten Taste
        if (event.key === "ArrowLeft") {
            this.moveLeft = true; // Links bewegen
        } else if (event.key === "ArrowRight") {
            this.moveRight = true; // Rechts bewegen
        } else if (event.key === " ") {
            this.pushSpace = true; // Springen oder andere Aktion
        } else if (event.key === "Enter") {
            this.throwBottle = true; // Flasche werfen oder andere Aktion
        }
    }

    // Methode zur Behandlung des Tastenloslassens (KeyUp-Event)
    handleKeyUp(event) {
        // Zurücksetzen der Zustände, wenn die Tasten losgelassen werden
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

    // Methode zum Aktivieren von berührungsbasierten Steuerungsknöpfen
    activateButton(buttonId, action) {
        // Auswahl des Buttons über seine ID
        const button = document.getElementById(buttonId);
        // Hinzufügen von Event-Listenern für Touch-Events
        button.addEventListener('touchstart', () => this[action] = true); // Aktion starten bei Berührung
        button.addEventListener('touchend', () => this[action] = false); // Aktion beenden bei Loslassen
    }
}



