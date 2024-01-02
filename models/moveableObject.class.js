// Definition der Klasse MoveableObject, die von DrawableObject erbt
class MoveableObject extends DrawableObject {
    speed = 0.15; // Geschwindigkeit des Objekts
    otherDirection = false; // Richtungswechsel
    speedY = 0; // Vertikale Geschwindigkeit (für Sprünge)
    acceleration = 1.5; // Beschleunigung (genutzt für Schwerkraft)

    // Methode zur Anwendung von Schwerkraft
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.inAir = true; // Das Objekt befindet sich in der Luft
                this.y -= this.speedY; // Bewegung nach oben oder unten
                this.speedY -= this.acceleration; // Anpassen der Geschwindigkeit durch Schwerkraft
            } else {
                this.inAir = false; // Das Objekt hat den Boden erreicht
                this.speedY = 0;
            }
        }, 1000 / 45); // Aktualisierungsintervall (hier 45 Mal pro Sekunde)
    }

    // Methode zum Anzeigen eines Landungsbildes (nach einem Sprung)
    showLandingImage() {
        let landingImagePath = this.IMAGES_JUMPING[8];
        this.img = this.ImgStorage[landingImagePath];
    }

    // Überprüfung, ob sich das Objekt über dem Boden befindet
    isAboveGround() {
        if(this instanceof throwAbleObject){
            return true;
        } else {
            return this.y < 150; // Grundlinie für Schwerkraft-Logik
        }
    }

    // Bewegung nach links
    moveLeft() {
        this.x -= this.speed; // Aktualisieren der X-Position
        this.lastX = this.x;
        this.lastActionTime = new Date().getTime();
    }

    // Bewegung nach rechts
    moveRight() {
        this.x += this.speed; // Aktualisieren der X-Position
        this.lastX = this.x;
        this.lastActionTime = new Date().getTime();
    }

    // Erster Sprung
    jump() {
        this.speedY = 25; // Festlegen der Sprunggeschwindigkeit
        this.isJumping = true;
        this.lastX = this.x;
        this.lastActionTime = new Date().getTime();
    }

    // Zweiter Sprung (während des Sprungs)
    secondJump() {
        this.speedY = 15; // Geringere Sprunggeschwindigkeit für den zweiten Sprung
        this.isJumping = true;
        this.lastX = this.x;
        this.lastActionTime = new Date().getTime();
    }

    // Animation abspielen
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

    // Kollisionserkennung
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


