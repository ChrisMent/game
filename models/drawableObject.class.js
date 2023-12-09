class DrawableObject {
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    img;
    ImgStorage = {};
    currentImage = 0

    // Methoden

    // Laden bzw. Abspielen eines Bildes z.B. loadImage('img/test.png')
    loadImage(path) {
        // Zugriff im DOM this.img = document.getElementById('image') <img id="image" src...>
        this.img = new Image(); 
        this.img.src = path;
        
        //console.log("Bild geladen:", path);
    }

    /**
     * Laden bzw. Abspielen von Bildern im Array
     * @param {Array} arr - ['game/img/1.png', 'game/img/2.png', ...] 
     */
    loadImages(arr){
        arr.forEach((path) => {
        let img = new Image()
        img.src = path;
        this.ImgStorage[path] = img
        })
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

}