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

    moveRight(){
        console.log('Move right')
    }

    moveLeft(){
        setInterval(() =>{ // setInterval wiederholt die Anweisung alle 1000ms = 1 Sekunde
            this.x -= 0.15
        }, 1000 / 60)
    }

    playAnimation(arr){
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.ImgStorage[path]; 
        this.currentImage++;
    }
}