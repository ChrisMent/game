class Character extends MoveableObject {
    world;
    x = 0
    y = 170
    height = 260
    speed = 4
    IMAGES_WALKING = [
        '../game/img/2_character_pepe/2_walk/W-21.png',
        '../game/img/2_character_pepe/2_walk/W-22.png',
        '../game/img/2_character_pepe/2_walk/W-23.png',
        '../game/img/2_character_pepe/2_walk/W-24.png',
        '../game/img/2_character_pepe/2_walk/W-25.png',
        '../game/img/2_character_pepe/2_walk/W-26.png'
    
    ]

    constructor(world){
        super().loadImage('../game/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING)
        this.world = world;
        
        
    }
    
    animate() {  
        setInterval(() => {
            // Nach rechts bewegen
            if (this.world.keyboard.moveRight) {
                this.x += this.speed
                this.otherDirection = false
                
            } else if(this.world.keyboard.moveLeft){
                this.x -= this.speed
                this.otherDirection = true
            }
            this.world.camera_x = -this.x
        }, 1000 / 60);
        
        setInterval(() => {
            // Bewegungsanimation
            if (this.world.keyboard.moveRight || this.world.keyboard.moveLeft) {
                this.playAnimation(this.IMAGES_WALKING); 
            } 
        }, 50);
    }
    


}
