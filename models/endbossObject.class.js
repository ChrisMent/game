class Endboss extends MoveableObject {

    // Initialisierung von Eigenschaften
    x = 2500; // Startposition auf der X-Achse
    y = 120; // Startposition auf der Y-Achse
    height = 320; // Höhe des Endbosses
    width = 300; // Breite des Endbosses
    originalX = 2500; // Ursprüngliche X-Position
    attackDelay = 3000; // Verzögerung vor dem Angriff
    imagesLoaded = false; // Status des Bildladens
    isAttacking = false; // Angriffsstatus
    isMoving = false; // Bewegungsstatus
    isReturning = false; // Rückkehrstatus
    isAlerting = true; // Alarmstatus
    alertAnimationFinished = false; // Status der Alarm-Animation
    alertAnimationCount = 0; // Zähler für Alarm-Animationen
    lives = 3; // Anzahl der Leben
    isDead = false; // Todesstatus
    animateInterval = null; // Intervall für Animationen

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

    constructor(world){
        super().loadImage(this.IMAGES_ALERT[0])
        this.world = world; // Referenz zur Spielwelt
        this.loadImages(this.IMAGES_ALERT)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_ATTACK)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD)
         // Laden der Bilder und Sounds
        this.endbossSound = new Audio('../game/audio/endboss_sound_loop.mp3');
        this.hurtSound = new Audio('../game/audio/endboss_hurt.mp3')
        this.endbossDeadSound = new Audio('../game/audio/endboss_dead.mp3');
        SoundManager.addSound(this.endbossSound);
        SoundManager.addSound(this.hurtSound);
        SoundManager.addSound(this.endbossDeadSound);
        // Starte Animationen
        this.animate()
    }
    
    // Methode zum Spiegeln des Bildes für Angriffsanimationen
    flipImageForAttack() {
        this.otherDirection = !this.otherDirection; // Kehrt die Richtung um
    }   
    
    // Überprüft, ob der Endboss in der Nähe des Charakters ist
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

    // Bewegt den Endboss nach links um eine angegebene Distanz
    moveLeftBy(distance) {
        this.x -= distance;
    }
    // Bewegt den Endboss nach rechts um eine angegebene Distanz
    moveRightBy(distance) {
        this.x += distance;
    }

    // Überprüft, ob die Alarm-Animation abgeschlossen ist
    isAlertAnimationFinished() {
        return this.currentImage === this.IMAGES_ALERT.length - 1;
    }

    // Hauptanimationsroutine
    animate() {
        if (this.isDead) return;
        clearInterval(this.animateInterval);
        this.animateInterval = setInterval(() => this.checkAnimationState(), 100);
    }

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

    handleAttackAnimation() {
        if (this.isAttacking) {
            this.playAnimation(this.IMAGES_ATTACK);
            setTimeout(() => this.returnToOriginalPosition(), 2000);
        }
    }

    // Spielt die Verletzungsanimation ab
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
    
    // Spielt die Todesanimation ab
    playDeathAnimation() {
        this.isDead = true; // Setzt den Status des Endbosses auf "tot"
        this.endbossSound.pause(); // Stoppt den Loop-Sound
        this.endbossSound.currentTime = 0; // Setzt den Loop-Sound zurück
        this.endbossDeadSound.play(); // Spielt den Todes-Sound einmal ab
        
        clearInterval(this.animateInterval); // Stoppt die laufende Animationsroutine

        this.startDeathAnimation(); // Startet die Todesanimationssequenz
    }

    // Startet die Todesanimationssequenz
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
    
    // Setzt den Zustand des Endbosses zurück
    resetEndbossState() {
        this.alertAnimationCount = 0;
        this.alertAnimationFinished = false;
        this.isAttacking = false;
        this.isMoving = false;
        this.isReturning = false;
        this.isAlerting = true;
        this.currentImage = 0; // Reset für die Alert-Animation
    }
    
    // Bringt den Endboss zurück in seine ursprüngliche Position
    returnToOriginalPosition() {
        this.x = this.originalX; // Setzt die Position des Endbosses zurück
        this.alertAnimationCount = 0;
        this.alertAnimationFinished = false;
        this.isAttacking = false;
        this.isMoving = false;
        this.currentImage = 0; // Reset für die nächste Angriffssequenz
    }
      

}