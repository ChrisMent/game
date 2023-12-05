class Cloud extends MoveableObject{

    constructor(){
        super().loadImage('../game/img/5_background/layers/4_clouds/1.png')
        this.x = Math.random() * 500 // Zahl zwischen 200 und 700 
        this.y = 30
        this.height = 200
        this.width = 350

        this.animate()
    }

    animate(){
        setInterval(() =>{ // setInterval wiederholt die Anweisung alle 1000ms
            this.x -= 0.15
        }, 1000 / 60)


    }
}