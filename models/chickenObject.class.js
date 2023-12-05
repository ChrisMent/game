class Chicken extends MoveableObject{

    IMAGES_WALKING = [
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../game/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
 
    ]
    


    constructor(){
        super().loadImage('../game/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING)
        this.x = 200 + Math.random() * 500
        this.y = 378
        this.height = 50
        this.width = 50
        this.speed = 0.15 + Math.random() * 0.25
        

        this.animate()
    }

    animate(){
        setInterval(() =>{
            let i = this.currentImage % this.IMAGES_WALKING.length
            let path = this.IMAGES_WALKING[i]
            this.img = this.ImgStorage[path]
            this.currentImage++
        },150 )
        
        this.moveLeft()

    }


}
