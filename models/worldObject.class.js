class WorldObject {
    character = new Character()
    
    statusbars = {
        life: new Statusbar(10, 0, 200, 60, 'life'), /* Parameter für Lebenspunkte */
        bottle: new Statusbar(10, 70, 200, 60, 'bottle') /* Parameter für gesammelte Flaschen */
    };
    
    
    bottles = []
    level = level1
    canvas;
  
    keyboard;
    camera_x = 0
    
    


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        
        this.character = new Character(this); 
        this.setWorld();
        this.draw();
        this.run()

    }


    run(){
        setInterval(() => {
            this.checkCollisions()
            this.checkThrowObject()
        },200)

    }

    checkThrowObject(){
        if(this.keyboard.throwBottle){
            let bottle = new throwAbleObject(this.character.x + 40, this.character.y + 100)
            this.bottles.push(bottle)

        }

    }

    checkCollisions() {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    // Aktualisieren der Lebenspunkte-Statusleiste
                    this.statusbars.life.setPercentage(this.character.energy);
                    //console.log('Collision energy: ', this.character.energy);
                }
            });
    }

    setWorld(){
        this.character.world = this
        this.character.animate();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        // Zeichnen der Hintergrundobjekte
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Zurücksetzen der Translation für fixe Objekte

        // Zeichnen der Statusleisten
        this.addToMap(this.statusbars.life);
        //this.addToMap(this.statusbars.bottle);

        this.ctx.translate(this.camera_x, 0); // Wiederanwenden der Translation für bewegliche Objekte

        // Zeichnen des Charakters und anderer beweglicher Objekte
        this.addToMap(this.character);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.bottles);

        this.ctx.translate(-this.camera_x, 0); // Zurücksetzen der Translation

        // Anforderung des nächsten Zeichenrahmens
        let self = this;
        requestAnimationFrame(function() {
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