/**
 * Klasse, die ein Chicken-Objekt repräsentiert, das sich bewegen und interagieren kann.
 * Erbt von der MoveableObject-Klasse.
 * 
 * @property {boolean} movingRight - Bestimmt, ob sich das Chicken nach rechts bewegt. Initial auf 'false' gesetzt.
 * @property {boolean} otherDirection - Spiegelt das Bild des Chickens. Wird auf 'true' gesetzt, um das Bild für die Bewegung nach rechts zu spiegeln.
 */
class Chicken extends MoveableObject {
    /**
     * Bildpfade für die Laufanimation des Chickens.
     */
    IMAGES_WALKING = [
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Bildpfad für die Todesanimation des Chickens.
     */
    IMAGE_DEATH = '../game/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * Konstruktor für ein Chicken-Objekt.
     * Initialisiert das Chicken-Objekt mit Startbild, Ladebildern, Todesgeräusch und Startposition.
     * Setzt die Größe, Geschwindigkeit und startet die Animationen.
     */
    constructor() {
        super().loadImage('../game/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.chicken_death_sound = new Audio('../game/audio/chicken-death.mp3');
        SoundManager.addSound(this.chicken_death_sound);
        this.x = 120 + Math.random() * (1800 - 120 - 50);
        this.y = 370;
        this.height = 50;
        this.width = 50;
        this.speed = 0.75 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Startet die Bewegungs- und Animations-Intervalle des Chickens.
     */
    animate() {
        this.movingRight = false;
        this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
        this.animationInterval = setInterval(() => this.handleAnimation(), 200);
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
     * Handhabt die Animationslogik des Chickens.
     * Spielt die Laufanimation des Chickens ab.
     */
    handleAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
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
        }, 1000);
    }
}
