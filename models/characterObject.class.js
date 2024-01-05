/**
 * Klasse, die einen spielbaren Charakter repräsentiert, erbt von MoveableObject.
 * 
 * @property {Object} world - Referenz zur Spielwelt.
 * @property {number} x - Horizontale Position des Charakters.
 * @property {number} y - Vertikale Position des Charakters.
 * @property {number} height - Höhe des Charakters.
 * @property {number} width - Breite des Charakters.
 * @property {number} speed - Geschwindigkeit des Charakters.
 * @property {number} lastX - Letzte horizontale Position für Bewegungen.
 * @property {number} lastActionTime - Zeitpunkt der letzten Aktion.
 * @property {number} bottlesCollected - Anzahl gesammelter Flaschen.
 * @property {number} coinsCollected - Anzahl gesammelter Münzen.
 * @property {number} lives - Anzahl der Leben.
 * @property {number} lastHit - Zeitpunkt des letzten Treffers.
 * @property {boolean} hasJustLanded - Überprüfung, ob der Charakter gerade gelandet ist.
 * @property {boolean} inAir - Überprüfung, ob der Charakter in der Luft ist.
 * @property {number} invulnerabilityDuration - Dauer der Unverwundbarkeit nach einem Treffer in Millisekunden.
 */
class Character extends MoveableObject {
    world;
    x = 0;
    y = 150;
    height = 280;
    width = 100;
    speed = 4;
    lastX = 0;
    lastActionTime = 0;
    bottlesCollected = 0;
    coinsCollected = 0;
    lives = 5;
    lastHit = 0;
    hasJustLanded = false;
    inAir = false;
    invulnerabilityDuration = 1000;
     
    IMAGES_WALKING = [
        '../game/img/2_character_pepe/2_walk/W-21.png',
        '../game/img/2_character_pepe/2_walk/W-22.png',
        '../game/img/2_character_pepe/2_walk/W-23.png',
        '../game/img/2_character_pepe/2_walk/W-24.png',
        '../game/img/2_character_pepe/2_walk/W-25.png',
        '../game/img/2_character_pepe/2_walk/W-26.png'
    
    ]

    IMAGES_JUMPING = [
        '../game/img/2_character_pepe/3_jump/J-31.png',
        '../game/img/2_character_pepe/3_jump/J-32.png',
        '../game/img/2_character_pepe/3_jump/J-33.png',
        '../game/img/2_character_pepe/3_jump/J-34.png',
        '../game/img/2_character_pepe/3_jump/J-35.png',
        '../game/img/2_character_pepe/3_jump/J-36.png',
        '../game/img/2_character_pepe/3_jump/J-37.png',
        '../game/img/2_character_pepe/3_jump/J-38.png',
        '../game/img/2_character_pepe/3_jump/J-39.png'
    
    ]

    IMAGES_DEATH = [
        '../game/img/2_character_pepe/5_dead/D-51.png',
        '../game/img/2_character_pepe/5_dead/D-52.png',
        '../game/img/2_character_pepe/5_dead/D-53.png',
        '../game/img/2_character_pepe/5_dead/D-54.png',
        '../game/img/2_character_pepe/5_dead/D-55.png',
        '../game/img/2_character_pepe/5_dead/D-56.png',
        '../game/img/2_character_pepe/5_dead/D-57.png'

    ]

    IMAGES_HURT = [
        '../game/img/2_character_pepe/4_hurt/H-41.png',
        '../game/img/2_character_pepe/4_hurt/H-42.png',
        '../game/img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_IDLE = [
        '../game/img/2_character_pepe/1_idle/idle/I-1.png',
        '../game/img/2_character_pepe/1_idle/idle/I-2.png',
        '../game/img/2_character_pepe/1_idle/idle/I-3.png',
        '../game/img/2_character_pepe/1_idle/idle/I-4.png',
        '../game/img/2_character_pepe/1_idle/idle/I-5.png',
        '../game/img/2_character_pepe/1_idle/idle/I-6.png',
        '../game/img/2_character_pepe/1_idle/idle/I-7.png',
        '../game/img/2_character_pepe/1_idle/idle/I-8.png',
        '../game/img/2_character_pepe/1_idle/idle/I-9.png',
        '../game/img/2_character_pepe/1_idle/idle/I-10.png'

    ]

    IMAGES_LONG_IDLE = [
        '../game/img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../game/img/2_character_pepe/1_idle/long_idle/I-20.png',

    ]
    /**
     * Konstruktor für die Character-Klasse.
     * Lädt alle notwendigen Bilder und Sounds für den Charakter und initialisiert grundlegende Eigenschaften.
     * 
     * @param {Object} world - Die Spielwelt, in der der Charakter existiert. Wird verwendet, um Interaktionen mit der Spielwelt zu ermöglichen.
     */
    constructor(world){
        super().loadImage('../game/img/2_character_pepe/2_walk/W-21.png')
        this.loadCharacterImages()
        this.loadCharacterSounds()
        this.world = world
        this.lastX = this.x
        this.lastActionTime = new Date().getTime()
        this.applyGravity()
    }
    /**
     * Lädt die Bilder für die Animationen
     */
    loadCharacterImages(){
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEATH)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
    }

    /**
     * Lädt die Sounds für die Animationen
     */
    loadCharacterSounds(){
        this.walking_sound = new Audio('../game/audio/walking.mp3')
        this.hurt_sound = new Audio('../game/audio/pain.mp3')
        this.die_sound = new Audio('../game/audio/die.mp3')
        this.jump_sound = new Audio('../game/audio/jump.mp3')
        this.collect_bottle_sound = new Audio('../game/audio/bottle_collect.mp3')
        this.collect_coin_sound = new Audio('../game/audio/coin.mp3')
        SoundManager.addSound(this.walking_sound);
        SoundManager.addSound(this.hurt_sound);
        SoundManager.addSound(this.die_sound);
        SoundManager.addSound(this.jump_sound);
        SoundManager.addSound(this.collect_bottle_sound);
        SoundManager.addSound(this.collect_coin_sound);
    }

    /**
     * Steuert die Animation des Charakters basierend auf dessen Zustand.
     */
   animate() {
        this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
        this.animationInterval = setInterval(() => this.handleAnimation(), 125);
    }

    /**
     * Handhabt die Bewegung des Charakters basierend auf Eingaben und Spielzustand.
     */
    handleMovement() {
        if (!this.world || !this.world.keyboard) {
            return;
        }
        this.walking_sound.pause();
        if (this.canMoveRight()) 
            this.moveRight();
         else if (this.canMoveLeft()) 
            this.moveLeft();
         else if (this.canMoveJump()) 
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

        /**
     * Überprüft, ob der Charakter sich nach rechts bewegen kann.
     * @returns {boolean} Wahr, wenn Bewegung nach rechts möglich ist.
     */
    canMoveRight() {
        return this.world.keyboard.moveRight && this.x < this.world.level.level_end_x;
    }

    /**
     * Bewegt den Charakter nach rechts und spielt das Gehgeräusch ab.
     */
    moveRight() {
        super.moveRight();
        this.walking_sound.play();
        this.otherDirection = false;
    }

    /**
     * Überprüft, ob der Charakter sich nach links bewegen kann.
     * @returns {boolean} Wahr, wenn Bewegung nach links möglich ist.
     */
    canMoveLeft() {
        return this.world.keyboard.moveLeft && this.x > 0;
    }

    /**
     * Bewegt den Charakter nach links und spielt das Gehgeräusch ab.
     */
    moveLeft() {
        super.moveLeft();
        this.walking_sound.play();
        this.otherDirection = true;
    }

    /**
     * Überprüft, ob der Charakter springen kann.
     * @returns {boolean} Wahr, wenn der Charakter springen kann.
     */
    canMoveJump() {
        return this.world.keyboard.pushSpace && !this.isAboveGround();
    }

    /**
     * Lässt den Charakter springen und spielt das Sprunggeräusch ab.
     */
    jump() {
        super.jump();
        this.jump_sound.play();
    }

    /**
     * Überprüft, ob der Charakter auf einen Feind (Chicken) springt.
     * Ermöglicht dem Charakter einen weiteren Sprung, wenn er erfolgreich auf einen Feind springt.
     * @param {MoveableObject} enemy - Das Feindobjekt.
     * @returns {boolean} Gibt zurück, ob der Charakter auf das Chicken gesprungen ist.
     */
        jumpOnChicken(enemy) {
            let isJumpingOnChicken = (enemy.constructor === Chicken) &&
                this.isColliding(enemy) &&
                this.isAboveGround() &&
                this.speedY < 0;
            if (isJumpingOnChicken) {
                this.secondJump(); // Triggern eines weiteren Sprungs
            }
        
            return isJumpingOnChicken;
        }

    /**
     * Wendet Schwerkraft auf den Charakter an.
     * Diese Methode sollte in jedem Frame aufgerufen werden, um die vertikale Bewegung des Charakters zu steuern.
     */
        applyGravityToCharacter() {
            if (this.isAboveGround() || this.speedY > 0) {
                this.inAir = true;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                if (this.y > 150) {
                    this.y = 150;
                    if (this.inAir) {
                        this.showLandingImage(); // Zeige Landungsbild
                    }
                }
                this.inAir = false;
                this.speedY = 0;
            }
        }

    /**
     * Steuert die Animation des Charakters basierend auf dessen Zustand und Aktionen.
     * Spielt verschiedene Animationen abhängig von der Inaktivität, dem Tod, Verletzungen, Sprüngen und der Bewegungsrichtung.
     */
    handleAnimation() {
        let idleTime = this.isIdle();
        if (idleTime > 2 && idleTime < 15) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (idleTime >= 15) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else if (this.isDeath()) {
            this.playAnimation(this.IMAGES_DEATH);
            this.die_sound.play();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurt_sound.play();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Stoppt die Animation des Charakters.
     */
    stopAnimation() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }

    /**
     * Verringert die Lebenspunkte des Charakters und behandelt den Tod.
     */
    loseLife() {
        if (this.lives > 0) {
            this.lives--;
        }
        if (this.lives === 0) {
        }
    }

    /**
     * Behandelt den Treffer des Charakters und verringert die Lebenspunkte entsprechend.
     */
    hit() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastHit > this.invulnerabilityDuration) {
            this.lives--;
            this.lastHit = currentTime;
        }
    }

    /**
     * Überprüft, ob der Charakter tot ist.
     * @returns {boolean} Wahr, wenn der Charakter keine Leben mehr hat.
     */
    isDeath() {
        return this.lives <= 0;
    }

    /**
     * Überprüft, ob der Charakter verletzt ist. Eine Verletzung wird angenommen, wenn seit dem letzten Treffer weniger als 0,125 Sekunden vergangen sind.
     * @returns {boolean} Wahr, wenn der Charakter kürzlich getroffen wurde und als verletzt gilt.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; 
        timePassed = timePassed / 1000; // Umrechnung in Sekunden
        return timePassed < 0.125; ist
    }

    /**
     * Überprüft, wie lange der Charakter inaktiv (nicht bewegt) ist und gibt diese Zeit in Sekunden zurück.
     * @returns {number} Zeit der Inaktivität in Sekunden.
     */
    isIdle() {
        let currentTime = new Date().getTime();
        let timeElapsed = (currentTime - this.lastActionTime) / 1000; 
        return timeElapsed;
    }


}
