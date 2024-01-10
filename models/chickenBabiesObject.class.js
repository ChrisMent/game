/**
 * Klasse, die ein ChickenBaby-Objekt repräsentiert, das sich bewegen und interagieren kann.
 * Erbt von der MoveableObject-Klasse.
 * 
 * @property {boolean} movingRight - Bestimmt, ob sich das ChickenBaby nach rechts bewegt. Initial auf 'false' gesetzt.
 * @property {boolean} otherDirection - Spiegelt das Bild des ChickensBybies. Wird auf 'true' gesetzt, um das Bild für die Bewegung nach rechts zu spiegeln.
 */
class ChickenBabies extends MoveableObject {
    /**
     * Bildpfade für die Laufanimation des Chickens.
     */
    IMAGES_WALKING = [
        '../game/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../game/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../game/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Bildpfad für die Todesanimation des Chickens.
     */
    IMAGE_DEATH = '../game/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * Konstruktor für ein Chicken-Objekt.
     * Initialisiert das Chicken-Objekt mit Startbild, Ladebildern, Todesgeräusch und Startposition.
     * Setzt die Größe, Geschwindigkeit und startet die Animationen.
     */
    constructor() {
        super().loadImage('../game/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.chicken_death_sound = new Audio('../game/audio/chicken-death.mp3');
        SoundManager.addSound(this.chicken_death_sound);
        this.x = 120 + Math.random() * (1800 - 120 - 50);
        this.y = 370;
        this.onGround = true; // Neues Attribut, um zu überprüfen, ob das Chicken auf dem Boden ist
        this.height = 50;
        this.width = 50;
        this.speed = 0.75 + Math.random() * 0.25;
        this.applyGravity();
        this.gravityInterval = setInterval(() => {
            this.applyGravity();
            this.checkOnGround();
        }, 20); 
        this.animate();
    }

    /**
     * Startet die Bewegungs- und Animations-Intervalle des Chickens.
     */
    animate() {
        this.movingRight = false;
        this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
        this.animationInterval = setInterval(() => this.handleAnimation(), 200);
        this.hopInterval = setInterval(() => this.randomHop(), 3000); // Lässt das Chicken alle 3 Sekunden zufällig hüpfen
    }

    /**
     * Handhabt die Bewegung des Chickens, indem es die Bewegungsrichtung und Position ändert.
     * - Prüft, ob das Chicken den linken oder rechten Rand erreicht hat und ändert entsprechend die Bewegungsrichtung.
     * - Bewegt das Chicken nach rechts oder links, abhängig von der Bewegungsrichtung.
     * - Ändert die Bildausrichtung, um die Bewegungsrichtung visuell darzustellen.
     */
    handleMovement() {
        if (this.maxRangeLeft()) {
            this.movingRight = true;
        }

        if (this.maxRangeRight()) {
            this.movingRight = false;
        }

        if (this.movingRight) {
            this.moveRight();
            this.otherDirection = true;
        } else {
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    /**
     * Überprüft, ob das Chicken den linken Rand erreicht hat.
     * @returns {boolean} Wahr, wenn das Chicken am linken Rand ist.
     */
    maxRangeLeft() {
        return this.x <= 120;
    }

    /**
     * Überprüft, ob das Chicken den rechten Rand erreicht hat.
     * @returns {boolean} Wahr, wenn das Chicken am rechten Rand ist.
     */
    maxRangeRight() {
        return this.x >= 1800;
    }

    /**
    * Überprüft, ob sich das Chicken über dem Boden befindet.
    * @returns {boolean} Gibt zurück, ob das Chicken über dem Boden ist.
    */
    isAboveGround() {
        return this.y < 370; // 370 ist die Y-Position des Bodens (angepasst an Ihr Spiel)
    }

    /**
     * Lässt das Chicken mit einer zufälligen Chance hüpfen.
     */
    randomHop() {
        if (this.onGround && Math.random() < 0.99) {
            this.speedY = 20; // Anpassen für eine realistischere Sprunghöhe
            this.onGround = false;
            this.isInAir = true;
        }
    }

    /**
     * Überprüft, ob das Chicken wieder auf dem Boden ist.
     */
    checkOnGround() {
        if (this.y >= 370) {
            this.onGround = true;
            this.y = 370; 
            this.speedY = 0; 
            this.isInAir = false; // Setzen Sie isInAir zurück, wenn das Chicken den Boden berührt
        }
    }
    /**
     * Wendet die Schwerkraft auf die ChickenBabies an.
     */
    applyGravity() {
        if (!this.onGround) {
            this.speedY -= this.acceleration; // Schwerkraft anwenden
            this.y -= this.speedY; // Vertikale Position aktualisieren
        }
    }

    /**
     * Lässt das Chicken hüpfen.
     * if (!this.isInAir) --> Nur hüpfen, wenn das Chicken NICHT schon in der Luft ist
     * speedY = {number} --> Festlegen der anfänglichen Aufwärtsgeschwindigkeit für das Hüpfen
     * isInAir = {boolean} --> Markieren, dass das Chicken in der Luft ist
     */
    hop() {
        if (!this.isInAir) {
            this.speedY = 20;
            this.isInAir = true;
        }
    }
    /**
     * Handhabt die Animationslogik des Chickens.
     * Spielt die Laufanimation des Chickens ab.
     */
    handleAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }
    /**
     * Bereinigt alle aktiven Intervalle und Ressourcen des ChickenBaby-Objekts.
     */
    cleanUp() {
        clearInterval(this.movementInterval); // Stoppt die Bewegungslogik
        clearInterval(this.animationInterval); // Stoppt die Animationslogik
        clearInterval(this.hopInterval); // Stoppt die Hüpflogik
        // Weitere Bereinigungslogik...
    }
    /**
     * Spielt die Todesanimation des Chickens ab.
     * Lädt das Todesbild, spielt das Todesgeräusch und markiert das Chicken zur Entfernung nach einer kurzen Verzögerung.
     */
    playDeathAnimation() {
        this.loadImage(this.IMAGE_DEATH);
        this.chicken_death_sound.play();
        setTimeout(() => {
            this.removeFromGame = true;
            this.cleanUp(); // Bereinigt das Objekt nach der Todesanimation
        }, 1000);
    }
}
