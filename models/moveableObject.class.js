/**
 * Klasse für bewegliche Objekte, erbt von DrawableObject.
 * Enthält grundlegende Mechanismen für Bewegung, Schwerkraft und Kollisionserkennung.
 * 
 * @property {number} speed - Geschwindigkeit des Objekts.
 * @property {boolean} otherDirection - Richtungswechsel (wahr, wenn die Richtung umgekehrt wird).
 * @property {number} speedY - Vertikale Geschwindigkeit, insbesondere für Sprünge.
 * @property {number} acceleration - Beschleunigung, hauptsächlich für Schwerkrafteffekte.
 */
class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false; 
    speedY = 0;
    acceleration = 1.5;
    /**
     * Wendet Schwerkraft auf das Objekt an.
     * Aktualisiert die vertikale Position basierend auf der Geschwindigkeit und Schwerkraft.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.inAir = true;
                this.y -= this.speedY; // Bewegung nach oben oder unten
                this.speedY -= this.acceleration; // Anpassen der Geschwindigkeit durch Schwerkraft
            } else {
                this.inAir = false; // Das Objekt hat den Boden erreicht
                this.speedY = 0;
            }
        }, 1000 / 45); 
    }
    /**
     * Zeigt ein Landungsbild, typischerweise nach einem Sprung.
     * Wird verwendet, um eine spezifische Landungsanimation oder ein Bild anzuzeigen.
     */
    showLandingImage() {
        let landingImagePath = this.IMAGES_JUMPING[8]; // Pfad zum Landungsbild
        this.img = this.ImgStorage[landingImagePath]; // Aktualisiert das Bild des Objekts
    }
    /**
     * Überprüft, ob sich das Objekt über dem Boden befindet.
     * 
     * @returns {boolean} Wahr, wenn sich das Objekt über dem Boden befindet.
     */
    isAboveGround() {
        if(this instanceof throwAbleObject){
            return true;
        } else {
            return this.y < 150; // Grundlinie für Schwerkraft-Logik
        }
    }
    /**
     * Bewegt das Objekt nach links.
     */
    moveLeft() {
        this.x -= this.speed; // Aktualisieren der X-Position
        this.lastX = this.x;
        this.lastActionTime = new Date().getTime();
    }
    /**
     * Bewegt das Objekt nach rechts.
     */
    moveRight() {
        this.x += this.speed; // Aktualisieren der X-Position
        this.lastX = this.x;
        this.lastActionTime = new Date().getTime();
    }
    /**
     * Lässt das Objekt springen.
     */
    jump() {
        this.speedY = 25; // Festlegen der Sprunggeschwindigkeit
        this.isJumping = true;
        this.lastX = this.x;
        this.lastActionTime = new Date().getTime();
    }
    /**
     * Führt einen zweiten Sprung aus, wenn das Objekt bereits springt.
     */
    secondJump() {
        this.speedY = 15; // Geringere Sprunggeschwindigkeit für den zweiten Sprung
        this.isJumping = true;
        this.lastX = this.x;
        this.lastActionTime = new Date().getTime();
    }
    /**
     * Spielt eine Animation aus einem Array von Bildpfaden ab.
     * 
     * @param {string[]} arr - Array von Bildpfaden für die Animation.
     */
    playAnimation(arr) {
        let i = this.currentImage % arr.length; // Index des aktuellen Bildes
        let path = arr[i]; // Pfad des aktuellen Bildes
        this.img = this.ImgStorage[path]; // Aktualisieren des Bildes

        if (this.img && this.img.complete) {
            this.currentImage++; // Inkrementieren für die nächste Animation
        } else {
            console.error("Bild nicht geladen oder definiert:", path);
        }
    }
    /**
     * Überprüft, ob dieses Objekt mit einem anderen Objekt kollidiert.
     * 
     * @param {MoveableObject} obj - Das andere Objekt, mit dem die Kollision überprüft wird.
     * @returns {boolean} Wahr, wenn eine Kollision vorliegt.
     */
    isColliding(obj) {
        // Rechter Rand dieses Objekts ist rechts vom linken Rand des anderen Objekts
        return  this.x + this.width > obj.x &&
        // Unterer Rand dieses Objekts ist unterhalb vom oberen Rand des anderen Objekts    
                this.y + this.height > obj.y &&
        // Linker Rand dieses Objekts ist links vom rechten Rand des anderen Objekts
                this.x < obj.x + obj.width &&
        // Oberer Rand dieses Objekts ist oberhalb vom unteren Rand des anderen Objekts
                this.y < obj.y + obj.height;       
    }
}


