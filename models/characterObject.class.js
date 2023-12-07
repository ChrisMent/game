class Character extends MoveableObject {
    world;
    x = 0
    y = 160
    height = 280
    speed = 4
    isJumping = false;
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



    walking_sound = new Audio('../game/audio/walking.mp3')

    constructor(world){
        super().loadImage('../game/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGES_JUMPING)
        this.loadImages(this.IMAGES_DEATH)
        this.world = world;
        this.applyGravity()
        
        
    }
    
    animate() {  
        setInterval(() => {
            // Bewegen des Characters 
            this.walking_sound.pause()
            if (this.world.keyboard.moveRight && this.x < this.world.level.level_end_x) {
                this.moveRight()
                this.walking_sound.play()
                this.otherDirection = false
                
            } else if(this.world.keyboard.moveLeft && this.x > 0){
                this.moveLeft()
                this.walking_sound.play()
                this.otherDirection = true
            } else if(this.world.keyboard.pushSpace && !this.isAboveGround() ){
                this.jump()
            }

            this.world.camera_x = -this.x + 100
        }, 10);
        
        setInterval(() => {
            // Bewegungsanimation
            if(this.isDeath()){
                this.playAnimation(this.IMAGES_DEATH)
            }
            else if (this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING)

            } else {
                if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
                this.playAnimation(this.IMAGES_WALKING); 
            }}

        }, 1);


    }
    


}
