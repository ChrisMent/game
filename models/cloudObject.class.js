class Cloud extends MoveableObject{

    constructor(xPosition = 0){
        super().loadImage('../game/img/5_background/layers/4_clouds/1.png')
        this.x = xPosition;
        this.y = 30
        this.height = 200
        this.width = 350

        this.animate()
    }

    animate(){
        setInterval(() => {
            this.x -= 0.15;
            if(this.x < -this.width){
                this.x = 2400; // Setze die Wolke zurück, wenn sie aus dem Bild läuft
            }
        }, 1000 / 60);
    }
}