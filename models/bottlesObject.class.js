class Bottle extends MoveableObject {

    constructor(x) {
        super().loadImage('../game/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.height = 70;
        this.width = 60;
        this.x = x;
        this.y = 356;

    }


}