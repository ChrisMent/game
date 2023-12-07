class MoveableObject{
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    ImgStorage = {};
    currentImage = 0
    speed = 0.15
    otherDirection = false
    speedY = 0
    acceleration = 2
    energy = 100
    


    // Methoden

    loadImage(path) { // loadImage('img/test.png')
        this.img = new Image(); // Nichts anderes als Zugriff im DOM this.img = document.getElementById('image') <img id="image" src...>
        this.img.src = path;
        //console.log("Bild geladen:", path);
    }

    /**
     * 
     * @param {Array} arr - ['game/img/1.png', 'game/img/2.png', ...] 
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            this.ImgStorage[path] = img
    })
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0; // Charakter hat den Boden erreicht
                this.isJumping = false;
                this.showLandingImage();
            }
        }, 1000 / 45);
    }

    showLandingImage() {
        if (!this.isAboveGround()) {
            let landingImagePath = this.IMAGES_JUMPING[8];
            this.img = this.ImgStorage[landingImagePath];
        }
    }

    isAboveGround(){
        //console.log('this.y: ', this.y)
        return this.y < 160
        
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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

    }

    drawRect(ctx){
        if(this instanceof Character){
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }

        if(this instanceof Chicken){
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            }
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
        }
        console.log('Collision energy: ', this.energy)
    }

    isDeath(){
        return this.energy == 0 // Gibt true OR fals zurück

    }

}

