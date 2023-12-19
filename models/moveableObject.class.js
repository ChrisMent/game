class MoveableObject extends DrawableObject{
    speed = 0.15
    otherDirection = false
    speedY = 0
    acceleration = 1.5
    

    // Methoden

    // Gravitiy Methode beinhaltet alle Objekte außer Character.
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.inAir = true; // Das Objekt ist in der Luft
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.inAir = false; // Das Objekt hat den Boden erreicht
                this.speedY = 0;
            }
        }, 1000 / 45);
    }
    

    showLandingImage() {
        let landingImagePath = this.IMAGES_JUMPING[8];
        this.img = this.ImgStorage[landingImagePath];
    }

    isAboveGround(){
         //console.log('this.y: ', this.y)
        // -----------------
        /* Gibt "true" zurück wenn der Character über 150 auf der Y - Achse ist
           Das ist immer der Fall wenn der Character springt, da 150 ist die
           Grundlinie ist */
        
        if(this instanceof throwAbleObject){
            return true
        } else {
            return this.y < 150 
        }
    }

    moveLeft(){
        this.x -= this.speed
        this.lastX = this.x
        this.lastActionTime = new Date().getTime()
        
     }

    moveRight(){
        //console.log(`Character x before moving right: ${this.x}`);
        this.x += this.speed
        this.lastX = this.x
        this.lastActionTime = new Date().getTime()
        //console.log(`Character x after moving right: ${this.x}`)
        
        
    }

    jump(){
        this.speedY = 25
        this.isJumping = true;
        this.lastX = this.x
        this.lastActionTime = new Date().getTime()
        // console.log("Character jumped. y:", this.y, "speedY:", this.speedY);
        
    }

    secondJump(){
        this.speedY = 15
        this.isJumping = true;
        this.lastX = this.x
        this.lastActionTime = new Date().getTime()
        // console.log("Character second jumped. y:", this.y, "speedY:", this.speedY);
        
    }

    playAnimation(arr) {
        let i = this.currentImage % arr.length; // Bestimmt den Index des aktuellen Bildes
        let path = arr[i]; // Pfad des aktuellen Bildes
        this.img = this.ImgStorage[path]; // Setzt das aktuelle Bild aus dem Speicher
    
        // Überprüfen, ob das Bild geladen und vollständig ist
        if (this.img && this.img.complete) {
            this.currentImage++; // Inkrementiert currentImage für die nächste Animation
        } else {
            console.error("Bild nicht geladen oder definiert:", path);
            // Optional: Setzen Sie eine Ersatzlogik hier ein, falls das Bild nicht geladen ist
        }
    }
    

    isColliding(obj) {
        // Rechter Rand dieses Objekts ist rechts vom linken Rand des anderen Objekts
        return  this.x + this.width > obj.x &&
        // Unterer Rand dieses Objekts ist unterhalb vom oberen Rand des anderen Objekts    
                this.y + this.height > obj.y &&
        // Linker Rand dieses Objekts ist links vom rechten Rand des anderen Objekts
                this.x < obj.x + obj.width &&
        // Oberer Rand dieses Objekts ist oberhalb vom unteren Rand des anderen Objekts
                this.y < obj.y + obj.height;       
    }  
    




}

