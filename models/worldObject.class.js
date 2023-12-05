class WorldObject{
    character = new Character();
    
    enemies = level1.enemies
    clouds = level1.clouds
    backgroundImages = level1.backgroundImage

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

    }

    setWorld(){
    this.character.world = this
    this.character.animate();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
       
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.backgroundImages);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies)
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
            this.ctx.save()
            this.ctx.translate(object.width, 0)
            this.ctx.scale(-1,1)
            object.x = object.x * - 1
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height)
        if(object.otherDirection){
            object.x = object.x * - 1
            this.ctx.restore()
        }
    }
}