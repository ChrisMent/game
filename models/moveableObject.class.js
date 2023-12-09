class MoveableObject extends DrawableObject{
    speed = 0.15
    otherDirection = false
    speedY = 0
    acceleration = 2
    energy = 100
    lastHit = 0
    hasJustLanded = false; // Flag, um zu überwachen, ob der Charakter gerade gelandet ist
    inAir = false; // Neue Eigenschaft, um zu verfolgen, ob das Objekt in der Luft ist


    // Methoden

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.inAir = true; // Der Charakter ist in der Luft
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                if (this.inAir) {
                    this.inAir = false; // Der Charakter hat den Boden erreicht
                    if (!this.hasJustLanded) {
                        this.showLandingImage(); // Zeigen Sie das Landungsbild an
                        this.hasJustLanded = true; // Setzen Sie das Flag, da der Charakter gerade gelandet ist
                    }
                } else {
                    this.hasJustLanded = false; // Reset, wenn der Charakter am Boden ist und nicht springt
                }
                this.speedY = 0;
            }
        }, 1000 / 45);
    }

    showLandingImage() {
        let landingImagePath = this.IMAGES_JUMPING[8];
        this.img = this.ImgStorage[landingImagePath];
    }

    isAboveGround(){
        // console.log('this.y: ', this.y)
        // -----------------
        /* Gibt "true" zurück wenn der Character über 160 auf der Y - Achse ist
           Das ist immer der Fall wenn der Character springt, da 160 ist die
           Grundlinie ist */
        
        if(this instanceof throwAbleObject){
            return true
        } else {
        return this.y < 160 
        }
    }

    moveLeft(){
        this.x -= this.speed
        
     }

    moveRight(){
        this.x += this.speed
        
        
    }

    jump(){
        this.speedY = 30
        this.isJumping = true;
        
    }

    playAnimation(arr){
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.ImgStorage[path];
        if (!this.img.complete) {
            console.error("Bild nicht geladen:", path);
        }
        this.currentImage++;
    }

    isColliding(obj) {
        return  this.x + this.width > obj.x &&
                this.y + this.height > obj.y &&
                this.x < obj.x &&
                this.y < obj.y + obj.height

    }

    hit(){
        this.energy -= 5
        if(this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime()
        }
        // console.log('Collision energy: ', this.energy)
    }

    isDeath(){
        return this.energy == 0 // Gibt true OR false zurück

    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit // Differenz in ms
        timePassed = timePassed / 1000 // Berechnung der Differrenz in s
        return timePassed < 0.125 // Gibt true OR false zurück
    }

}

