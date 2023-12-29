class Endboss extends MoveableObject {

    x = 2500
    y = 120
    height = 320
    width = 300

    originalX = 2500;
    attackDelay = 3000; // Wartezeit vor dem Angriff in Millisekunden
    
    imagesLoaded = false; // Neue Eigenschaft, um den Ladestatus zu verfolgen
    isAttacking = false;
    isMoving = false;
    isReturning = false;
    isAlerting = true;
    alertAnimationFinished = false;
    alertAnimationCount = 0; // Zählt, wie oft die Alert-Animation abgespielt wurde
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

    constructor(world){
        super().loadImage(this.IMAGES_ALERT[0])
        this.world = world;
        this.loadImages(this.IMAGES_ALERT)
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_ATTACK)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_DEAD)
        this.endbossSound = new Audio('../game/audio/endboss_sound_loop.mp3');
        this.hurtSound = new Audio('../game/audio/endboss_hurt.mp3')
        this.endbossDeadSound = new Audio('../game/audio/endboss_dead.mp3');
        SoundManager.addSound(this.endbossSound);
        SoundManager.addSound(this.hurtSound);
        SoundManager.addSound(this.endbossDeadSound);
        this.animate()
    }


    flipImageForAttack() {
        this.otherDirection = !this.otherDirection; // Kehrt die Richtung um
    }   
    
    isNearCharacter() {
        if (this.world && this.world.character) {
            const distanceToCharacter = Math.abs(this.x - this.world.character.x);
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
    
    moveLeftBy(distance) {
        // Bewegt den Endboss um eine bestimmte Distanz nach links
        this.x -= distance;
    }

    moveRightBy(distance) {
        // Bewegt den Endboss um eine bestimmte Distanz nach rechts
        this.x += distance;
    }

    isAlertAnimationFinished() {
        return this.currentImage === this.IMAGES_ALERT.length - 1;
    }


    animate() {
        if (this.isDead) return;
        clearInterval(this.animateInterval);
        this.animateInterval = setInterval(() => {
            if (this.isNearCharacter()) {
                if (this.alertAnimationCount < 3) {
                    this.playAnimation(this.IMAGES_ALERT);
                    if (this.currentImage === this.IMAGES_ALERT.length - 1) {
                        this.alertAnimationCount++;
                        this.currentImage = 0; // Reset nach jeder Alert-Animation
                    }
                } else if (!this.alertAnimationFinished) {
                    this.alertAnimationFinished = true;
                    this.currentImage = 0; // Reset für die Bewegungsphase
                }
    
                if (this.alertAnimationFinished && !this.isMoving && !this.isAttacking) {
                    this.isMoving = true;
                    this.playAnimation(this.IMAGES_WALKING);
                }
    
                if (this.isMoving) {
                    this.moveLeftBy(60); // Kleinere Schritte für Bewegung
                    if (this.x <= this.originalX - 300) {
                        this.isMoving = false;
                        this.isAttacking = true;
                        this.currentImage = 0; // Reset für die Angriffsphase
                    }
                }
    
                if (this.isAttacking) {
                    this.playAnimation(this.IMAGES_ATTACK);
                    setTimeout(() => {
                        this.returnToOriginalPosition(); // Rückkehr zur ursprünglichen Position
                    }, 2000); // Wartezeit von 2 Sekunden
                }
            } else {
                this.resetEndbossState();
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 100); // Schnelleres Intervall für flüssigere Animation
    }

    playHurtAnimation() {
        let animationIndex = 0;
        const animationInterval = 200;
    
        this.hurtSound.play();
    
        const animationTimer = setInterval(() => {
            if (animationIndex < this.IMAGES_HURT.length) {
                let imagePath = this.IMAGES_HURT[animationIndex];
                this.loadImage(imagePath); // Verwenden Sie loadImage, um das Bild direkt zu laden
                animationIndex++;
            } else {
                clearInterval(animationTimer);
            }
        }, animationInterval);
    }
    

    playDeathAnimation() {
        this.isDead = true;
        this.endbossSound.pause(); // Stoppt den Loop-Sound
        this.endbossSound.currentTime = 0; // Setzt den Loop-Sound zurück
        this.endbossDeadSound.play(); // Spielt den Todes-Sound einmal ab
        
        clearInterval(this.animateInterval);

        let animationIndex = 0;
        const animationInterval = 300;

        const animationTimer = setInterval(() => {
            if (animationIndex < this.IMAGES_DEAD.length) {
                let imagePath = this.IMAGES_DEAD[animationIndex];
                this.loadImage(imagePath);
                animationIndex++;
            } else {
                clearInterval(animationTimer);
                // Optional: Zusätzliche Aktionen nach dem Ende der Todesanimation
            }
        }, animationInterval);
    }
    
    
    resetEndbossState() {
        this.alertAnimationCount = 0;
        this.alertAnimationFinished = false;
        this.isAttacking = false;
        this.isMoving = false;
        this.isReturning = false;
        this.isAlerting = true;
        this.currentImage = 0; // Reset für die Alert-Animation
    }
    
    returnToOriginalPosition() {
        this.x = this.originalX; // Setzt die Position des Endbosses zurück
        this.alertAnimationCount = 0;
        this.alertAnimationFinished = false;
        this.isAttacking = false;
        this.isMoving = false;
        this.currentImage = 0; // Reset für die nächste Angriffssequenz
    }
      

}