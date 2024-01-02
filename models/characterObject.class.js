class Character extends MoveableObject {
    // Eigenschaften
    world; // Referenz zur Spielwelt
    x = 0; // Horizontale Position des Charakters
    y = 150; // Vertikale Position des Charakters
    height = 280; // Höhe des Charakters
    width = 100; // Breite des Charakters
    speed = 4; // Geschwindigkeit des Charakters
    lastX = 0; // Letzte horizontale Position (für Bewegungen)
    lastActionTime = 0; // Zeitpunkt der letzten Aktion
    bottlesCollected = 0; // Anzahl gesammelter Flaschen
    coinsCollected = 0; // Anzahl gesammelter Münzen
    lives = 5; // Anzahl der Leben
    lastHit = 0; // Zeitpunkt des letzten Treffers
    hasJustLanded = false; // Überprüfung, ob der Charakter gerade gelandet ist
    inAir = false; // Überprüfung, ob der Charakter in der Luft ist
    invulnerabilityDuration = 1000; // Dauer der Unverwundbarkeit nach einem Treffer  
     
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

 

    constructor(world){
        super().loadImage('../game/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEATH)
        this.loadImages(this.IMAGES_HURT)
        this.loadImages(this.IMAGES_IDLE)
        this.loadImages(this.IMAGES_LONG_IDLE)
        this.world = world
        this.lastX = this.x
        this.lastActionTime = new Date().getTime()
        this.applyGravity()
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

   animate() {
        this.movementInterval = setInterval(() => this.handleMovement(), 1000 / 60);
        this.animationInterval = setInterval(() => this.handleAnimation(), 125);
    }

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

    canMoveRight(){
        return this.world.keyboard.moveRight && this.x < this.world.level.level_end_x 
    }

    moveRight(){
        super.moveRight();
        this.walking_sound.play();
        this.otherDirection = false;
    }

    canMoveLeft(){
        return this.world.keyboard.moveLeft && this.x > 0
    }

    moveLeft(){
        super.moveLeft();
        this.walking_sound.play();
        this.otherDirection = true;
    }

    canMoveJump(){
        return this.world.keyboard.pushSpace && !this.isAboveGround()
    }

    jump(){
        super.jump();
        this.jump_sound.play();
    }

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

    // Methode zum Stoppen der Animation
    stopAnimation() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }

    // Methode zum Verlieren eines Lebens
    loseLife() {
        if (this.lives > 0) {
            this.lives--;
        }
        if (this.lives === 0) {
        }
    }

    // Methode für Treffer
    hit() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastHit > this.invulnerabilityDuration) {
            this.lives--;
            this.lastHit = currentTime;
        }
    }

    // Überprüfung, ob der Charakter tot ist
    isDeath() {
        return this.lives <= 0;
    }

    // Überprüfung, ob der Charakter verletzt ist
    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit // Differenz in ms
        timePassed = timePassed / 1000 // Berechnung der Differrenz in s
        return timePassed < 0.125 // Gibt true OR false zurück
    }

    // Überprüfung, ob der Charakter inaktiv ist
    isIdle() {
        let currentTime = new Date().getTime();
        let timeElapsed = (currentTime - this.lastActionTime) / 1000; // Zeit in Sekunden
        return timeElapsed;
    }

}
