class WorldObject{
    character = new Character();
    
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0

    


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        
        this.character = new Character(this); 
        this.setWorld();
        this.draw();
        this.checkCollisions()

    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)){
                    //console.log('Collision with character :', enemy)
                    this.character.hit()
                    console.log('Collision energy: ', this.character.energy)
                }
            })

        }, 200)

    }

    setWorld(){
        this.character.world = this
        this.character.animate();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
       
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)

        this.ctx.translate(-this.camera_x, 0)


        // draw() wird immer wieder neu gemalt
        let self = this
        requestAnimationFrame(function(){
            self.draw();
        });
    }
    // Durchinterieren für jedes Objekt im Canvas 
    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object)
        })
    }
    // Hinzufügen zum Canvas-Fenster
    addToMap(object){
        if(object.otherDirection) {
            this.flipImage(object)
        }
        object.draw(this.ctx)
        object.drawRect(this.ctx)
        
        if(object.otherDirection){
            this.flipImageRestore(object)
        }
    }

    flipImage(object){
        this.ctx.save()
        this.ctx.translate(object.width, 0)
        this.ctx.scale(-1,1)
        object.x = object.x * - 1

    }

    flipImageRestore(object){
        object.x = object.x * - 1
        this.ctx.restore()

    }
}