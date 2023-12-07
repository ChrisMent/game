class Endboss extends MoveableObject {

    x = 2500
    y = 120
    height = 320
    width = 300

    IMAGES_WALKING = [
        '../game/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../game/img/4_enemie_boss_chicken/2_alert/G12.png',
 
    ]

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING)
        this.animate()
    }

    animate(){
        setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING)
        },200 )
        
        

    }

}