class throwAbleObject extends MoveableObject {

    collectedBottles = 0

    constructor(x , y) {
    super().loadImage('../game/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = x
    this.y = y
    this.width = 80
    this.height = 80
    this.throw()
    

    }

    // Methoden

    throw(){
        this.speedY = 35
        this.speedX = 0
        this.applyGravity()
        setInterval(() => {
            this.x += 10
        }, 25)
    }
}