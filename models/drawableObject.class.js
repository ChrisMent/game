class DrawableObject {
    img;
    ImgStorage = {};
    currentImage = 0

    // Methoden

    // Laden bzw. Abspielen eines Bildes z.B. loadImage('img/test.png')

    loadImage(path) {
        this.img = new Image();
        this.img.onload = () => {
            console.log("Bild geladen:", path);
            this.imageLoaded = true; // Diese Zeile ist optional, da img.complete verwendet werden kann
        };
        this.img.onerror = () => {
            console.error("Fehler beim Laden des Bildes:", path);
        };
        this.img.src = path;
    }
    
    

    /**
     * Laden bzw. Abspielen von Bildern im Array
     * @param {Array} arr - ['game/img/1.png', 'game/img/2.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.onload = () => {
                this.ImgStorage[path] = img;
                // console.log("Bild geladen:", path);
            };
            img.src = path;
        });
    }
    
    

    draw(ctx) {
        if (this.img.complete && this.img.naturalWidth !== 0) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } 
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

}