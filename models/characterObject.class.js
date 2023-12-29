class Character extends MoveableObject {
    world;
    x = 0 // Position: this.world.camera_x = -this.x + 100
    y = 150
    height = 280
    width = 100
    speed = 4
    lastX = 0;
    lastActionTime = 0;
    bottlesCollected = 0;
    coinsCollected = 0;
    lives = 5;
    lastHit = 0
    hasJustLanded = false; // Flag, um zu überwachen, ob der Charakter gerade gelandet ist
    inAir = false; // Neue Eigenschaft, um zu verfolgen, ob das Objekt in der Luft ist
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
        this.movementInterval = setInterval(() => {
            if (!this.world || !this.world.keyboard) {
                return; // Verlässt die Funktion, wenn die Welt oder die Tastatur nicht definiert sind
            }
            // Bewegen des Characters
            this.walking_sound.pause();
            if (this.world.keyboard.moveRight && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
                this.otherDirection = false;
            } else if (this.world.keyboard.moveLeft && this.x > 0) {
                this.moveLeft();
                this.walking_sound.play();
                this.otherDirection = true;
            } else if (this.world.keyboard.pushSpace && !this.isAboveGround()) {
                this.jump();
                this.jump_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    
        this.animationInterval = setInterval(() => {
            // Bewegungen animieren
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
        }, 125);
    }
    
    stopAnimation() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }

    loseLife() {
        if (this.lives > 0) {
            this.lives--;
            //console.log('Leben verloren. Verbleibende Leben:', this.lives);
        }
        if (this.lives === 0) {
            //console.log('Character ist gestorben.');
            // Hier könnten Sie eine Logik für das Spielende implementieren.
        }
    }

    hit() {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastHit > this.invulnerabilityDuration) {
            this.lives--;
            this.lastHit = currentTime;
            // Weitere Logik bei Treffer, z.B. Abspielen eines Sounds
        }
    }

    isDeath() {
        return this.lives <= 0;
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit // Differenz in ms
        timePassed = timePassed / 1000 // Berechnung der Differrenz in s
        return timePassed < 0.125 // Gibt true OR false zurück
    }

    isIdle() {
        let currentTime = new Date().getTime();
        let timeElapsed = (currentTime - this.lastActionTime) / 1000; // Zeit in Sekunden
        return timeElapsed;
    }

}
