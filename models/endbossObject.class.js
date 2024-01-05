/**
 * Klasse für den Endboss, erbt von MoveableObject.
 * Verwaltet das Verhalten und die Animationen des Endbosses im Spiel.
 * 
 * @property {number} x - Startposition auf der X-Achse.
 * @property {number} y - Startposition auf der Y-Achse.
 * @property {number} height - Höhe des Endbosses.
 * @property {number} width - Breite des Endbosses.
 * @property {number} originalX - Ursprüngliche X-Position.
 * @property {number} attackDelay - Verzögerung vor dem Angriff in Millisekunden.
 * @property {boolean} imagesLoaded - Status des Bildladens.
 * @property {boolean} isAttacking - Angriffsstatus.
 * @property {boolean} isMoving - Bewegungsstatus.
 * @property {boolean} isReturning - Rückkehrstatus.
 * @property {boolean} isAlerting - Alarmstatus.
 * @property {boolean} alertAnimationFinished - Status der Alarm-Animation.
 * @property {number} alertAnimationCount - Zähler für Alarm-Animationen.
 * @property {number} lives - Anzahl der Leben.
 * @property {boolean} isDead - Todesstatus.
 * @property {Object} animateInterval - Intervall für Animationen.
 * @property {string[]} IMAGES_ALERT - Bildpfade für den Alarmzustand.
 * @property {string[]} IMAGES_WALKING - Bildpfade für den Gehzustand.
 * @property {string[]} IMAGES_ATTACK - Bildpfade für den Angriffszustand.
 * @property {string[]} IMAGES_HURT - Bildpfade für den Verletzungszustand.
 * @property {string[]} IMAGES_DEAD - Bildpfade für den Todeszustand.
 */

class Endboss extends MoveableObject {

/**
 * Klasse für den Endboss, erbt von MoveableObject.
 * Verwaltet das Verhalten und die Animationen des Endbosses im Spiel.
 */
    x = 2500;
    y = 120; 
    height = 320;
    width = 300;
    originalX = 2500;
    attackDelay = 3000;
    imagesLoaded = false;
    isAttacking = false;
    isMoving = false;
    isReturning = false;
    isAlerting = true;
    alertAnimationFinished = false; 
    alertAnimationCount = 0;
    lives = 3;
    isDead = false; 
    animateInterval = null;

    IMAGES_ALERT = [
        '../game/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G12.png'
 
    ]

    IMAGES_WALKING = [
        '../game/img/4_enemie_boss_chicken/1_walk/G1.png',
        '../game/img/4_enemie_boss_chicken/1_walk/G2.png',
        '../game/img/4_enemie_boss_chicken/1_walk/G3.png',
        '../game/img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ATTACK = [
        '../game/img/4_enemie_boss_chicken/3_attack/G13.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G14.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G15.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G16.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G17.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G18.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G19.png',
        '../game/img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_HURT = [
        '../game/img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../game/img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../game/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        '../game/img/4_enemie_boss_chicken/5_dead/G24.png',
        '../game/img/4_enemie_boss_chicken/5_dead/G25.png',
        '../game/img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    /**
     * Konstruktor für den Endboss.
     * Lädt das initiale Bild und setzt die Weltreferenz und startet die Animation.
     * 
     * @param {Object} world - Referenz zur Spielwelt.
     */
    constructor(world){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.world = world;
        this.loadEndbossImages();
        this.loadEndbossSounds();
        this.animate();
    }
    /**
     * Lädt alle Bilder für den Endboss.
     */
    loadEndbossImages(){
        this.loadImages(this.IMAGES_ALERT)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_ATTACK)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD)
    }
    /**
     * Lädt alle Sounds für den Endboss.
     */
    loadEndbossSounds(){
        this.endbossSound = new Audio('../game/audio/endboss_sound_loop.mp3');
        this.hurtSound = new Audio('../game/audio/endboss_hurt.mp3')
        this.endbossDeadSound = new Audio('../game/audio/endboss_dead.mp3');
        SoundManager.addSound(this.endbossSound);
        SoundManager.addSound(this.hurtSound);
        SoundManager.addSound(this.endbossDeadSound);
    }
    /**
     * Methode zum Spiegeln des Bildes für Angriffsanimationen.
     */
    flipImageForAttack() {
        this.otherDirection = !this.otherDirection; // Kehrt die Richtung um
    }   
    
    /**
     * Überprüft, ob der Endboss in der Nähe des Charakters ist und spielt ggf. einen Sound ab.
     * @returns {boolean} Wahr, wenn der Endboss in der Nähe des Charakters ist.
     */
    isNearCharacter() {
        if (this.world && this.world.character) {
            const distanceToCharacter = Math.abs(this.x - this.world.character.x);
            // Spielt den Endboss-Sound ab, wenn der Charakter in der Nähe ist
            if (distanceToCharacter < 400 && !this.endbossSoundPlaying) {
                this.endbossSound.loop = true;
                this.endbossSound.volume = 0.5; // Setzen Sie die Lautstärke nach Bedarf (0.0 bis 1.0)
                this.endbossSound.play();
                this.endbossSoundPlaying = true;
            }
            return distanceToCharacter < 400;
        }
        return false;
    }

    /**
     * Bewegt den Endboss nach links um eine angegebene Distanz.
     * @param {number} distance - Distanz, um die der Endboss nach links bewegt wird.
     */
    moveLeftBy(distance) {
        this.x -= distance;
    }
    /**
     * Bewegt den Endboss nach rechts um eine angegebene Distanz.
     * @param {number} distance - Distanz, um die der Endboss nach rechts bewegt wird.
     */
    moveRightBy(distance) {
        this.x += distance;
    }

    /**
     * Überprüft, ob die Alarm-Animation abgeschlossen ist.
     * @returns {boolean} Wahr, wenn die Alarm-Animation abgeschlossen ist.
     */
    isAlertAnimationFinished() {
        return this.currentImage === this.IMAGES_ALERT.length - 1;
    }

    /**
     * Hauptanimationsroutine des Endbosses.
     */
    animate() {
        if (this.isDead) return;
        clearInterval(this.animateInterval);
        this.animateInterval = setInterval(() => this.checkAnimationState(), 100);
    }
    /**
     * Überprüft und steuert den aktuellen Animationszustand des Endbosses.
     */
    checkAnimationState() {
        if (this.isNearCharacter()) {
            this.handleAlertAnimation();
            this.handleMovementAnimation();
            this.handleAttackAnimation();
        } else {
            this.resetEndbossState();
            this.playAnimation(this.IMAGES_ALERT);
        }
    }
    /**
     * Handhabt die Alarm-Animation des Endbosses.
     * Spielt die Alarm-Animation bis zu dreimal ab, bevor der Alarmstatus auf "fertig" gesetzt wird.
     */
    handleAlertAnimation() {
        if (this.alertAnimationCount < 3) {
            this.playAnimation(this.IMAGES_ALERT);
            if (this.isAlertAnimationFinished()) {
                this.alertAnimationCount++;
                this.currentImage = 0;
            }
        } else if (!this.alertAnimationFinished) {
            this.alertAnimationFinished = true;
            this.currentImage = 0;
        }
    }
    /**
     * Steuert die Bewegungsanimation des Endbosses.
     * Lässt den Endboss laufen und wechselt dann zum Angriffszustand, sobald er eine bestimmte Distanz zurückgelegt hat.
     */
    handleMovementAnimation() {
        if (this.alertAnimationFinished && !this.isMoving && !this.isAttacking) {
            this.isMoving = true;
            this.playAnimation(this.IMAGES_WALKING);
        }
        if (this.isMoving) {
            this.moveLeftBy(60);
            if (this.x <= this.originalX - 300) {
                this.isMoving = false;
                this.isAttacking = true;
                this.currentImage = 0;
            }
        }
    }
    /**
     * Überprüft Kollisionen zwischen geworfenen Flaschen und dem Endboss.
     * Bei Kollision wird die entsprechende Kollisionslogik ausgeführt.
     * @param {throwAbleObject[]} bottles - Array der geworfenen Flaschen.
     */
    checkBottleCollisions(bottles) {
        bottles.forEach((bottle, bottleIndex) => {
            if (bottle.isColliding(this)) {
                this.handleCollisionWithBottle(bottleIndex, bottles);
            }
        });
    }

    /**
     * Handhabt die Kollision zwischen einer Flasche und dem Endboss.
     * Reduziert die Lebenspunkte des Endbosses und spielt die entsprechende Animation ab.
     * @param {number} bottleIndex - Index der Flasche im Array `bottles`.
     * @param {throwAbleObject[]} bottles - Array der geworfenen Flaschen.
     */
    handleCollisionWithBottle(bottleIndex, bottles) {
        this.lives -= 1; // Ein Leben abziehen
        bottles.splice(bottleIndex, 1); // Flasche entfernen

        if (this.lives > 0) {
            this.playHurtAnimation(); // Abspielen der Verletzungsanimation
        } else {
            this.playDeathAnimation(); // Abspielen der Todesanimation
        }
    }

    /**
     * Steuert die Angriffsanimation des Endbosses.
     * Spielt die Angriffsanimation und initiiert nach Abschluss der Animation die Rückkehr in die Ausgangsposition.
     */
    handleAttackAnimation() {
        if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
            setTimeout(() => this.returnToOriginalPosition(), 2000);
        }
    }

    /**
     * Spielt die Verletzungsanimation des Endbosses ab.
     */
    playHurtAnimation() {
        let animationIndex = 0;
        const animationInterval = 200;
    
        this.hurtSound.play();

         // Timer für die Animationssequenz
        const animationTimer = setInterval(() => {
            if (animationIndex < this.IMAGES_HURT.length) {
                let imagePath = this.IMAGES_HURT[animationIndex];
                this.loadImage(imagePath);
                animationIndex++;
            } else {
                clearInterval(animationTimer);
            }
        }, animationInterval);
    }
    /**
     * Spielt die Todesanimation des Endbosses ab.
     * Stoppt alle laufenden Sounds und Animationen und startet die Todesanimationssequenz.
     */
    playDeathAnimation() {
        this.isDead = true; 
        this.endbossSound.pause(); 
        this.endbossSound.currentTime = 0; 
        this.endbossDeadSound.play(); 
        clearInterval(this.animateInterval); // Stoppt die laufende Animationsroutine
        this.startDeathAnimation(); // Startet die Todesanimationssequenz
    }
    /**
     * Startet die Todesanimationssequenz des Endbosses.
     * Läuft durch alle Bilder der Todesanimation in einem festgelegten Intervall.
     */
    startDeathAnimation() {
        let animationIndex = 0;
        const animationInterval = 300; // Intervall zwischen den Animationsbildern
        
        // Timer für das Durchlaufen der Todesanimationsbilder
        const animationTimer = setInterval(() => {
            if (animationIndex < this.IMAGES_DEAD.length) {
                let imagePath = this.IMAGES_DEAD[animationIndex];
                this.loadImage(imagePath); // Lädt das aktuelle Animationsbild
                animationIndex++;
            } else {
                clearInterval(animationTimer); // Beendet die Animation, wenn alle Bilder abgespielt wurden
            }
        }, animationInterval);
    }
    /**
     * Setzt den Zustand des Endbosses zurück.
     * Wird verwendet, um den Endboss auf seinen Ausgangszustand zurückzusetzen.
     */
    resetEndbossState() {
        this.alertAnimationCount = 0;
        this.alertAnimationFinished = false;
        this.isAttacking = false;
        this.isMoving = false;
        this.isReturning = false;
        this.isAlerting = true;
        this.currentImage = 0; // Reset für die Alert-Animation
    }
    /**
     * Bringt den Endboss zurück in seine ursprüngliche Position.
     * Wird aufgerufen, um den Endboss nach einem Angriff zurückzusetzen.
     */
    returnToOriginalPosition() {
        this.x = this.originalX; // Setzt die Position des Endbosses zurück
        this.alertAnimationCount = 0;
        this.alertAnimationFinished = false;
        this.isAttacking = false;
        this.isMoving = false;
        this.currentImage = 0; // Reset für die nächste Angriffssequenz
    }
    
}