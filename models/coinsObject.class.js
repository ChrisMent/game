class Coin extends MoveableObject {

    constructor(x, y) {
        super().loadImage('../game/img/8_coin/coin_1.png');
        this.height = 100;
        this.width = 100;
        this.x = x;
        this.y = y;

    }


}